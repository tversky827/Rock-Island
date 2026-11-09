import "server-only";
import { fieldLabels, formLabels, type FormType } from "./schemas";

/**
 * FORM DELIVERY — pluggable providers, selected by environment variables:
 *
 *   1. RESEND_API_KEY + FORMS_FROM_EMAIL        → email via Resend (supports resume attachments)
 *   2. FORMS_WEBHOOK_URL (+ FORMS_WEBHOOK_SECRET) → JSON POST to a CRM / automation endpoint
 *
 * Recipients: FORMS_TO_<FORM> (e.g. FORMS_TO_ADMISSIONS) or FORMS_TO_DEFAULT.
 *
 * If no provider is configured:
 *   • development → submission is logged to the server console (for testing UX)
 *   • production  → returns `not_configured`; the UI shows an error with the phone number.
 *     A form is NEVER reported as sent unless delivery actually succeeded.
 */

export interface Attachment { filename: string; content: string /* base64 */; contentType: string }
export type DeliveryResult = { ok: true; mode: "email" | "webhook" | "development-log" } | { ok: false; reason: "not_configured" | "provider_error" };

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function recipients(form: FormType): string[] {
  const specific = process.env[`FORMS_TO_${form.toUpperCase()}`];
  return (specific || process.env.FORMS_TO_DEFAULT || "").split(",").map((s) => s.trim()).filter(Boolean);
}

function format(form: FormType, data: Record<string, unknown>) {
  const rows = Object.entries(data).filter(([k]) => !["consent", "noPhiAttestation"].includes(k) && data[k] !== "" && data[k] !== undefined);
  const text = [`New ${formLabels[form]} — Rock Island Nursing Home website`, "", ...rows.map(([k, v]) => `${fieldLabels[k] ?? k}: ${String(v)}`), "", `Submitted: ${new Date().toISOString()}`].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;color:#1c2230"><h2 style="color:#0f2138">New ${esc(formLabels[form])}</h2><table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="vertical-align:top;color:#5f574e"><strong>${esc(fieldLabels[k] ?? k)}</strong></td><td style="white-space:pre-wrap">${esc(String(v))}</td></tr>`)
    .join("")}</table><p style="color:#7c7368;font-size:12px">Submitted ${esc(new Date().toISOString())} via rockislandnursinghome.com</p></div>`;
  return { text, html };
}

export async function deliver(form: FormType, data: Record<string, unknown>, attachments: Attachment[] = []): Promise<DeliveryResult> {
  const { text, html } = format(form, data);
  const subject = `[Website] ${formLabels[form]}${typeof data.name === "string" ? ` — ${data.name}` : ""}`;
  const to = recipients(form);

  if (process.env.RESEND_API_KEY && process.env.FORMS_FROM_EMAIL && to.length) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.FORMS_FROM_EMAIL, to, subject, text, html,
          reply_to: typeof data.email === "string" ? data.email : undefined,
          attachments: attachments.map((a) => ({ filename: a.filename, content: a.content })),
        }),
      });
      if (!res.ok) { console.error("[forms] Resend error", res.status, await res.text().catch(() => "")); return { ok: false, reason: "provider_error" }; }
      return { ok: true, mode: "email" };
    } catch (e) {
      console.error("[forms] Resend exception", e);
      return { ok: false, reason: "provider_error" };
    }
  }

  if (process.env.FORMS_WEBHOOK_URL) {
    try {
      const res = await fetch(process.env.FORMS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(process.env.FORMS_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.FORMS_WEBHOOK_SECRET } : {}) },
        body: JSON.stringify({ form, formLabel: formLabels[form], submittedAt: new Date().toISOString(), data, attachments }),
      });
      if (!res.ok) { console.error("[forms] Webhook error", res.status); return { ok: false, reason: "provider_error" }; }
      return { ok: true, mode: "webhook" };
    } catch (e) {
      console.error("[forms] Webhook exception", e);
      return { ok: false, reason: "provider_error" };
    }
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(`[forms] (development — no provider configured) ${subject}\n${text}${attachments.length ? `\nAttachments: ${attachments.map((a) => a.filename).join(", ")}` : ""}`);
    return { ok: true, mode: "development-log" };
  }
  return { ok: false, reason: "not_configured" };
}
