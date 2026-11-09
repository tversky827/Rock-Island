import { NextResponse, type NextRequest } from "next/server";
import { schemas, formTypes, RESUME_MAX_BYTES, RESUME_TYPES, type FormType } from "@/lib/forms/schemas";
import { spamCheck, rateLimited, verifyTurnstile, HONEYPOT_FIELD, TIMESTAMP_FIELD } from "@/lib/forms/spam";
import { deliver, type Attachment } from "@/lib/forms/deliver";

export const runtime = "nodejs";

const MAX_BODY = RESUME_MAX_BYTES + 512 * 1024;

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function sniff(buf: Uint8Array): string | null {
  if (buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46) return "pdf";
  if (buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0) return "doc";
  if (buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x03 && buf[3] === 0x04) return "docx";
  return null;
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ form: string }> }) {
  const { form } = await ctx.params;
  if (!formTypes.includes(form as FormType)) return json(404, { ok: false, error: "Unknown form." });
  const type = form as FormType;

  // Same-origin check (defense in depth against cross-site form posts).
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return json(403, { ok: false, error: "Invalid origin." });

  const length = Number(req.headers.get("content-length") || 0);
  if (length > MAX_BODY) return json(413, { ok: false, error: "Submission is too large." });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(`${type}:${ip}`)) return json(429, { ok: false, error: "Too many submissions. Please try again later or call us." });

  let fd: FormData;
  try { fd = await req.formData(); } catch { return json(400, { ok: false, error: "Invalid submission." }); }

  // Honeypot hits are accepted silently (and not delivered) so bots learn nothing.
  // Timing failures are rejected visibly so a real visitor can simply resubmit.
  const spam = spamCheck(fd);
  if (spam === "honeypot") {
    if (process.env.NODE_ENV !== "production") console.warn(`[forms] ${type}: discarded (honeypot filled)`);
    return json(200, { ok: true });
  }
  if (spam === "timing") return json(400, { ok: false, error: "Please take a moment to review the form, then submit again." });
  if (!(await verifyTurnstile(fd.get("cf-turnstile-response") as string | null, ip))) {
    return json(400, { ok: false, error: "We couldn't verify this submission. Please try again." });
  }

  const raw: Record<string, unknown> = {};
  for (const [k, v] of fd.entries()) {
    if (typeof v === "string" && ![HONEYPOT_FIELD, TIMESTAMP_FIELD, "cf-turnstile-response"].includes(k)) raw[k] = v;
  }
  const parsed = schemas[type].safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) { const key = String(issue.path[0] ?? "form"); fieldErrors[key] ??= issue.message; }
    return json(422, { ok: false, error: "Please review the highlighted fields.", fieldErrors });
  }

  const attachments: Attachment[] = [];
  if (type === "careers") {
    const file = fd.get("resume");
    if (file && typeof file !== "string" && file.size > 0) {
      if (file.size > RESUME_MAX_BYTES) return json(422, { ok: false, error: "Please review the highlighted fields.", fieldErrors: { resume: "Resume must be 5 MB or smaller." } });
      const buf = new Uint8Array(await file.arrayBuffer());
      const kind = sniff(buf);
      if (!kind || !Object.values(RESUME_TYPES).includes(kind)) {
        return json(422, { ok: false, error: "Please review the highlighted fields.", fieldErrors: { resume: "Please upload a PDF or Word document." } });
      }
      const safeName = `resume-${parsed.data.name.replace(/[^a-z0-9]+/gi, "-").slice(0, 40)}.${kind}`;
      attachments.push({ filename: safeName, content: Buffer.from(buf).toString("base64"), contentType: file.type || "application/octet-stream" });
    }
  }

  const result = await deliver(type, parsed.data as Record<string, unknown>, attachments);
  if (!result.ok) {
    return json(503, { ok: false, error: result.reason === "not_configured" ? "Online submissions are temporarily unavailable." : "We couldn't send your message right now." });
  }
  return json(200, { ok: true });
}

export function GET() {
  return json(405, { ok: false, error: "Method not allowed." });
}
