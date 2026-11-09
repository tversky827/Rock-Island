/**
 * Privacy-safe analytics helper.
 *
 * RULES (HIPAA-conscious):
 *  • Never pass names, emails, phone numbers, message text, or any health
 *    information into analytics. Only send event names and non-identifying
 *    context such as `form_type` or `cta_location`.
 *  • `sanitize()` enforces an allow-list of parameter keys as a safeguard.
 */
export type AnalyticsEvent =
  | "phone_click" | "email_click" | "cta_click" | "directions_click"
  | "form_start" | "form_submit_success" | "form_submit_error"
  | "contact_submission" | "tour_request" | "admissions_inquiry" | "referral_inquiry" | "employment_application";

const ALLOWED_KEYS = new Set(["form_type", "cta_location", "cta_label", "destination", "link_type", "page_path"]);

type Params = Record<string, string | number | boolean | undefined>;

function sanitize(params: Params = {}) {
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) if (ALLOWED_KEYS.has(k) && v !== undefined) out[k] = v;
  return out;
}

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}

export function track(event: AnalyticsEvent, params?: Params) {
  if (typeof window === "undefined") return;
  const clean = { ...sanitize(params), page_path: window.location.pathname };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...clean });
  if (typeof window.gtag === "function" && !process.env.NEXT_PUBLIC_GTM_ID) window.gtag("event", event, clean);
  if (process.env.NODE_ENV === "development") console.debug("[analytics]", event, clean);
}

/** Maps each form to its dedicated conversion event. */
export const formConversionEvent: Record<string, AnalyticsEvent> = {
  contact: "contact_submission",
  tour: "tour_request",
  admissions: "admissions_inquiry",
  referral: "referral_inquiry",
  careers: "employment_application",
};
