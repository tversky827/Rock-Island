/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  FACILITY CONFIGURATION — the single source of truth for facility details.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every value marked `PLACEHOLDER` must be confirmed by the facility before
 *  launch. Components read from here; do not hardcode these values elsewhere.
 *
 *  `verified: false` values are still rendered (so the site is reviewable),
 *  but they are excluded from structured data (JSON-LD) so search engines are
 *  never fed unconfirmed facts.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://rockislandnursinghome.com").replace(/\/$/, "");

export const site = {
  name: "Rock Island Nursing Home",
  shortName: "Rock Island",
  tagline: "Skilled Nursing & Rehabilitation",
  url: SITE_URL,
  brandStatement:
    "Exceptional care starts with genuine compassion. At Rock Island Nursing Home, we believe every resident deserves to feel valued, respected, supported, and at home.",

  contact: {
    /** PLACEHOLDER — 555-01xx numbers are reserved as fictional. Replace before launch. */
    phone: { display: "(309) 555-0100", e164: "+13095550100", verified: false },
    admissionsPhone: { display: "(309) 555-0101", e164: "+13095550101", verified: false },
    /** PLACEHOLDER — secure referral fax is common for hospital discharge planners. */
    referralFax: { display: "(309) 555-0102", verified: false },
    careersPhone: { display: "(309) 555-0103", e164: "+13095550103", verified: false },
    email: { general: "info@rockislandnursinghome.com", admissions: "admissions@rockislandnursinghome.com", careers: "careers@rockislandnursinghome.com", verified: false },
  },

  address: {
    /** PLACEHOLDER street address. City/state/ZIP area are real-world context only. */
    street: "Street Address to Be Confirmed",
    city: "Rock Island",
    region: "IL",
    regionName: "Illinois",
    postalCode: "61201",
    country: "US",
    verified: false,
    /** Optional: precise coordinates once the address is confirmed. */
    geo: null as null | { lat: number; lng: number },
  },

  hours: {
    /** PLACEHOLDER — confirm visiting hours, admissions office hours, and tour availability. */
    visiting: "Visiting hours to be confirmed by the facility",
    admissions: "Admissions office hours to be confirmed",
    tours: "Tours by appointment — please call or request a time online",
    verified: false,
  },

  social: {
    /** Leave empty strings for networks the facility does not use; they will be hidden. */
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },

  integrations: {
    /** Secure referral portal (e.g., an e-referral platform). Empty = show phone/fax workflow. */
    secureReferralUrl: process.env.NEXT_PUBLIC_SECURE_REFERRAL_URL || "",
    /** Applicant tracking system careers page. Empty = use on-site application form. */
    applicantTrackingUrl: process.env.NEXT_PUBLIC_ATS_URL || "",
    /** Online tour scheduler (e.g., Calendly). Empty = use on-site tour request form. */
    tourSchedulerUrl: process.env.NEXT_PUBLIC_TOUR_SCHEDULER_URL || "",
  },

  /**
   * Show "Pending verification" markers and the preview banner.
   * Set NEXT_PUBLIC_SHOW_VERIFICATION_FLAGS=false at launch, AFTER content is verified.
   */
  showVerificationFlags: process.env.NEXT_PUBLIC_SHOW_VERIFICATION_FLAGS !== "false",
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
export const cityState = `${site.address.city}, ${site.address.regionName}`;
export const telHref = (e164: string) => `tel:${e164}`;
export const mailHref = (email: string) => `mailto:${email}`;
export const mapsQuery = encodeURIComponent(
  site.address.verified ? fullAddress : `${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
);
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
