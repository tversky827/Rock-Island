"use client";

import Link from "next/link";
import Script from "next/script";
import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2, Lock, Phone } from "lucide-react";
import type { z } from "zod";
import { schemas, type FormType } from "@/lib/forms/schemas";
import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from "@/lib/forms/spam";
import { track, formConversionEvent } from "@/lib/analytics";
import { site, telHref } from "@/content/site";
import { routes } from "@/content/navigation";

type Status = "idle" | "submitting" | "success" | "error";
const Ctx = createContext<{ errors: Record<string, string>; formId: string }>({ errors: {}, formId: "" });

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function FormShell({
  type, children, submitLabel, successTitle, successText, className = "",
}: {
  type: FormType; children: ReactNode; submitLabel: string; successTitle: string; successText: ReactNode; className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [started, setStarted] = useState(false);
  /** When the visitor first saw the form — used by the server's minimum-fill-time spam check. */
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const formId = `form-${type}`;

  useEffect(() => { startedAt.current = Date.now(); }, []);
  useEffect(() => { if (status === "success" || status === "error") statusRef.current?.focus(); }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set(TIMESTAMP_FIELD, String(startedAt.current));
    const values: Record<string, unknown> = {};
    for (const [k, v] of fd.entries()) if (typeof v === "string") values[k] = v;

    const schema = schemas[type] as z.ZodTypeAny;
    const parsed = schema.safeParse(values);
    const fieldErrors: Record<string, string> = {};
    if (!parsed.success) for (const i of parsed.error.issues) fieldErrors[String(i.path[0])] ??= i.message;

    if (type === "careers") {
      const f = fd.get("resume");
      if (f && typeof f !== "string" && f.size > 0) {
        if (f.size > 5 * 1024 * 1024) fieldErrors.resume = "Resume must be 5 MB or smaller.";
        else if (!/\.(pdf|docx?|PDF|DOCX?)$/.test(f.name)) fieldErrors.resume = "Please upload a PDF or Word document.";
      }
    }

    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) {
      setStatus("idle");
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(fieldErrors)[0]}"]`);
      first?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(`/api/forms/${type}`, { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: Record<string, string> };
      if (res.ok && data.ok) {
        setStatus("success");
        track("form_submit_success", { form_type: type });
        track(formConversionEvent[type], { form_type: type });
        form.reset();
      } else {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setMessage(data.error || "Something went wrong.");
        setStatus("error");
        track("form_submit_error", { form_type: type });
      }
    } catch {
      setMessage("We couldn't reach our server. Please check your connection and try again.");
      setStatus("error");
      track("form_submit_error", { form_type: type });
    }
  }

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-champagne-400/60 bg-white p-10 text-center outline-none md:p-14">
        <CheckCircle2 className="mx-auto h-12 w-12 text-champagne-600" strokeWidth={1.2} aria-hidden />
        <h3 className="mt-6 text-h3">{successTitle}</h3>
        <div className="mx-auto mt-4 max-w-md text-stone-600">{successText}</div>
        <p className="mt-6 text-sm text-stone-500">Need to speak with someone sooner? Call <a href={telHref(site.contact.phone.e164)} className="font-semibold text-navy-900 underline decoration-champagne-400 underline-offset-4">{site.contact.phone.display}</a>.</p>
        <button type="button" onClick={() => { setStatus("idle"); startedAt.current = Date.now(); }} className="btn btn-outline btn-sm mt-8">Send another message</button>
      </div>
    );
  }

  return (
    <Ctx.Provider value={{ errors, formId }}>
      {TURNSTILE_KEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}
      <form ref={formRef} id={formId} noValidate onSubmit={onSubmit} encType="multipart/form-data" className={`space-y-6 ${className}`}
        onFocus={() => { if (!started) { setStarted(true); track("form_start", { form_type: type }); } }}>
        {/* Spam protection: hidden honeypot (timing is attached at submit) */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${formId}-hp`}>Leave this field empty</label>
          <input id={`${formId}-hp`} type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </div>

        {status === "error" && (
          <div ref={statusRef} tabIndex={-1} role="alert" className="flex gap-3 border-l-2 border-red-800 bg-red-50 p-5 text-sm text-red-900 outline-none">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <div>
              <p className="font-semibold">{message}</p>
              <p className="mt-1">Please try again, or call us directly at <a className="font-semibold underline" href={telHref(site.contact.phone.e164)}>{site.contact.phone.display}</a>.</p>
            </div>
          </div>
        )}

        {children}

        {TURNSTILE_KEY && <div className="cf-turnstile" data-sitekey={TURNSTILE_KEY} data-theme="light" />}

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" disabled={status === "submitting"} className="btn btn-primary w-full sm:w-auto">
            {status === "submitting" ? (<><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…</>) : submitLabel}
          </button>
          <p className="flex items-center gap-2 text-xs text-stone-500"><Lock className="h-3.5 w-3.5" aria-hidden /> Sent over an encrypted connection</p>
        </div>
      </form>
    </Ctx.Provider>
  );
}

function useField(name: string) {
  const { errors, formId } = useContext(Ctx);
  const id = `${formId}-${name}`;
  const error = errors[name];
  return { id, error, describedBy: error ? `${id}-error` : undefined };
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  return error ? <p id={`${id}-error`} className="field-error">{error}</p> : null;
}

export function Field({ name, label, type = "text", required, autoComplete, placeholder, hint, ...rest }: {
  name: string; label: string; type?: string; required?: boolean; autoComplete?: string; placeholder?: string; hint?: string; min?: string; max?: string; inputMode?: "numeric" | "tel" | "email" | "text";
}) {
  const { id, error, describedBy } = useField(name);
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}{required ? <span className="text-champagne-700" aria-hidden> *</span> : <span className="ml-1 font-normal normal-case tracking-normal text-stone-500">(optional)</span>}</label>
      <input id={id} name={name} type={type} required={required} autoComplete={autoComplete} placeholder={placeholder} aria-invalid={!!error} aria-describedby={[describedBy, hint ? `${id}-hint` : ""].filter(Boolean).join(" ") || undefined} className="field-input" {...rest} />
      {hint && <p id={`${id}-hint`} className="mt-1.5 text-xs text-stone-500">{hint}</p>}
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function SelectField({ name, label, options, required, placeholder = "Please select" }: { name: string; label: string; options: readonly string[]; required?: boolean; placeholder?: string }) {
  const { id, error, describedBy } = useField(name);
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}{required && <span className="text-champagne-700" aria-hidden> *</span>}</label>
      <select id={id} name={name} required={required} defaultValue="" aria-invalid={!!error} aria-describedby={describedBy} className="field-input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23162c49%22 stroke-width=%221.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10">
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function RadioGroup({ name, label, options, required }: { name: string; label: string; options: readonly string[]; required?: boolean }) {
  const { id, error, describedBy } = useField(name);
  return (
    <fieldset aria-describedby={describedBy} aria-invalid={!!error}>
      <legend className="field-label">{label}{required && <span className="text-champagne-700" aria-hidden> *</span>}</legend>
      <div className="flex flex-wrap gap-3">
        {options.map((o, i) => (
          <label key={o} className="relative cursor-pointer">
            <input type="radio" name={name} value={o} id={i === 0 ? id : undefined} className="peer sr-only" />
            <span className="inline-flex items-center border border-beige-300 bg-white px-5 py-2.5 text-sm text-stone-700 transition-colors peer-checked:border-navy-900 peer-checked:bg-navy-900 peer-checked:text-ivory peer-focus-visible:ring-2 peer-focus-visible:ring-champagne-400">{o}</span>
          </label>
        ))}
      </div>
      <ErrorText id={id} error={error} />
    </fieldset>
  );
}

export function TextareaField({ name, label, required, rows = 5, hint, maxLength, placeholder }: { name: string; label: string; required?: boolean; rows?: number; hint?: ReactNode; maxLength?: number; placeholder?: string }) {
  const { id, error, describedBy } = useField(name);
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}{required ? <span className="text-champagne-700" aria-hidden> *</span> : <span className="ml-1 font-normal normal-case tracking-normal text-stone-500">(optional)</span>}</label>
      {hint && <p id={`${id}-hint`} className="-mt-1 mb-2 text-xs text-stone-500">{hint}</p>}
      <textarea id={id} name={name} rows={rows} required={required} maxLength={maxLength} placeholder={placeholder} aria-invalid={!!error} aria-describedby={[describedBy, hint ? `${id}-hint` : ""].filter(Boolean).join(" ") || undefined} className="field-input resize-y" />
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function FileField({ name, label, hint, accept }: { name: string; label: string; hint?: string; accept?: string }) {
  const { id, error, describedBy } = useField(name);
  return (
    <div>
      <label htmlFor={id} className="field-label">{label} <span className="ml-1 font-normal normal-case tracking-normal text-stone-500">(optional)</span></label>
      <input id={id} name={name} type="file" accept={accept} aria-invalid={!!error} aria-describedby={[describedBy, hint ? `${id}-hint` : ""].filter(Boolean).join(" ") || undefined}
        className="block w-full border border-dashed border-beige-300 bg-white px-4 py-4 text-sm text-stone-600 file:mr-4 file:border-0 file:bg-navy-900 file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.14em] file:text-ivory hover:file:bg-navy-700" />
      {hint && <p id={`${id}-hint`} className="mt-1.5 text-xs text-stone-500">{hint}</p>}
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function Checkbox({ name, children }: { name: string; children: ReactNode }) {
  const { id, error, describedBy } = useField(name);
  return (
    <div>
      <div className="flex gap-3">
        <input id={id} name={name} type="checkbox" aria-invalid={!!error} aria-describedby={describedBy} className="mt-1 h-4 w-4 shrink-0 accent-navy-900" />
        <label htmlFor={id} className="text-sm leading-relaxed text-stone-600">{children}</label>
      </div>
      <ErrorText id={id} error={error} />
    </div>
  );
}

/** Standard privacy notice + consent checkbox used on every form. */
export function PrivacyConsent() {
  return (
    <Checkbox name="consent">
      I agree that {site.name} may contact me about this request. I understand that this form is not for emergencies and should not be used to send medical information. See our{" "}
      <Link href={routes.privacy} className="text-navy-800 underline decoration-champagne-400 underline-offset-4" target="_blank">Privacy Policy</Link>.
    </Checkbox>
  );
}

export function NoPhiNotice({ children }: { children?: ReactNode }) {
  return (
    <div className="flex gap-3 border-l-2 border-champagne-500 bg-cream px-5 py-4 text-sm leading-relaxed text-stone-700">
      <Lock className="mt-0.5 h-4 w-4 shrink-0 text-champagne-700" aria-hidden />
      <p>{children ?? <>Please <strong>do not include medical information</strong> — such as diagnoses, medications, or health history — in this form. Our team will discuss care needs with you by phone.</>}</p>
    </div>
  );
}

export function CallInstead({ label = "Prefer to talk?" }: { label?: string }) {
  return (
    <a href={telHref(site.contact.phone.e164)} onClick={() => track("phone_click", { cta_location: "form-sidebar" })} className="group flex items-center gap-4 border border-beige-300 bg-white p-5 transition-colors hover:border-champagne-500">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-champagne-300"><Phone className="h-5 w-5" strokeWidth={1.5} aria-hidden /></span>
      <span><span className="block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-stone-500">{label}</span><span className="font-display text-2xl text-navy-900">{site.contact.phone.display}</span></span>
    </a>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="grid gap-6 sm:grid-cols-2">{children}</div>;
}
