/** Spam protection: honeypot + minimum fill time + optional Cloudflare Turnstile + per-IP rate limit. */

export const HONEYPOT_FIELD = "company_website";
export const TIMESTAMP_FIELD = "form_started_at";
const MIN_FILL_MS = 2500;

/**
 * Returns "honeypot" (silently discard — only bots fill a hidden field),
 * "timing" (reject visibly so a real person can retry), or null (passes).
 */
export function spamCheck(form: FormData): "honeypot" | "timing" | null {
  const honeypot = form.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") return "honeypot";
  const started = Number(form.get(TIMESTAMP_FIELD));
  if (!Number.isFinite(started) || started <= 0) return "timing";
  const elapsed = Date.now() - started;
  return elapsed < MIN_FILL_MS || elapsed > 1000 * 60 * 60 * 24 ? "timing" : null;
}

export async function verifyTurnstile(token: string | null, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile not configured — rely on honeypot, timing, and rate limiting.
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/**
 * Simple in-memory sliding-window limiter. Adequate for a single instance.
 * For multi-instance/serverless production, replace with a shared store
 * (e.g., Upstash Redis / Vercel KV) — see docs/FORMS.md.
 */
const hits = new Map<string, number[]>();
export function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return recent.length > limit;
}
