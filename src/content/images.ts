/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CENTRAL IMAGE REGISTRY
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every photograph on the site is referenced by key from this file.
 *
 *  TO ADD REAL PHOTOGRAPHY:
 *    1. Place the optimized file in /public/images/ (JPG/WEBP, ≥2400px wide for heroes).
 *    2. Set `src: "/images/your-file.jpg"` on the matching entry below.
 *    3. Update `alt` so it accurately describes the new photo.
 *    4. If the photo shows the actual facility/staff/residents, set `depictsFacility: true`
 *       (and confirm written photo releases are on file).
 *
 *  While `src` is empty, the site renders an art-directed placeholder that is
 *  clearly labeled as a placeholder, so no temporary image can be mistaken for
 *  the real Rock Island Nursing Home building, staff, or residents.
 *
 *  If licensed stock photography is used temporarily, set `stock: true`; a
 *  discreet "Representative image" label is shown on it.
 */

export type ImageTone = "ivory" | "sand" | "navy" | "champagne" | "sage";
export type ImageMotif = "arch" | "window" | "garden" | "hands" | "table" | "path" | "river" | "lounge";

export interface SiteImage {
  src?: string;
  alt: string;
  /** Art direction for the photographer / stock selection. */
  brief: string;
  tone: ImageTone;
  motif: ImageMotif;
  stock?: boolean;
  depictsFacility?: boolean;
  /** Focal point for object-position, e.g. "50% 30%". */
  focal?: string;
}

const img = <T extends Record<string, SiteImage>>(x: T) => x;

export const images = img({
  heroHome: {
    alt: "A caregiver and an older resident sharing a warm conversation in a sunlit sitting room",
    brief: "Hero — caregiver & resident in genuine conversation, soft window light",
    tone: "sand",
    motif: "window",
  },
  welcome: {
    alt: "A daughter visiting her mother, holding hands in a comfortable common area",
    brief: "Family visit — adult child and parent, relaxed and connected",
    tone: "ivory",
    motif: "hands",
  },
  rehab: {
    alt: "A physical therapist guiding an older adult through a balance exercise",
    brief: "Therapy gym — therapist supporting a balance or gait exercise",
    tone: "champagne",
    motif: "path",
  },
  nursing: {
    alt: "A nurse reviewing a care plan with a resident at the bedside",
    brief: "Skilled nursing — nurse attentive at bedside, calm and reassuring",
    tone: "navy",
    motif: "arch",
  },
  longTerm: {
    alt: "Residents enjoying an afternoon together in a bright, comfortable lounge",
    brief: "Long-term living — residents socializing in a warm common space",
    tone: "sand",
    motif: "lounge",
  },
  team: {
    alt: "Members of an interdisciplinary care team meeting together",
    brief: "Care team huddle — nurses, therapist, and social worker collaborating",
    tone: "navy",
    motif: "table",
  },
  lifeActivities: {
    alt: "Residents taking part in a group activity",
    brief: "Life enrichment — group activity, music, crafts, or games",
    tone: "champagne",
    motif: "table",
  },
  lifeDining: {
    alt: "A table set for a shared meal in a welcoming dining room",
    brief: "Dining — beautifully set table, natural light, inviting",
    tone: "ivory",
    motif: "table",
  },
  lifeGarden: {
    alt: "A peaceful outdoor seating area with greenery",
    brief: "Outdoor space — garden path, benches, greenery",
    tone: "sage",
    motif: "garden",
  },
  lifeFamily: {
    alt: "A grandparent and grandchild sharing a moment together",
    brief: "Family connection — multigenerational visit",
    tone: "sand",
    motif: "hands",
  },
  lifeLounge: {
    alt: "A comfortable, light-filled common area with soft seating",
    brief: "Common area — interior, lived-in, soft furnishings",
    tone: "ivory",
    motif: "lounge",
  },
  lifeSpiritual: {
    alt: "A quiet, reflective space with soft light",
    brief: "Spiritual life — quiet reflection space or chapel corner",
    tone: "champagne",
    motif: "window",
  },
  lifeSalon: {
    alt: "A resident enjoying a hair appointment",
    brief: "Salon & barber — resident being pampered, smiling",
    tone: "sand",
    motif: "arch",
  },
  admissions: {
    alt: "An admissions coordinator welcoming a family for a conversation",
    brief: "Admissions — friendly conversation with a family across a table",
    tone: "ivory",
    motif: "table",
  },
  referrals: {
    alt: "A healthcare professional coordinating a care transition by phone",
    brief: "Referral partners — clinician on the phone with a chart/tablet",
    tone: "navy",
    motif: "path",
  },
  careers: {
    alt: "A caregiver smiling while assisting a resident",
    brief: "Careers — caregiver at work, proud and engaged",
    tone: "champagne",
    motif: "hands",
  },
  contact: {
    alt: "A welcoming entrance with warm light",
    brief: "Building exterior / entry — welcoming, golden hour (REAL FACILITY PHOTO NEEDED)",
    tone: "navy",
    motif: "arch",
  },
  about: {
    alt: "Two hands clasped together in a gesture of reassurance",
    brief: "About — intimate detail, hands of caregiver & resident",
    tone: "sand",
    motif: "hands",
  },
  community: {
    alt: "The Mississippi River at golden hour",
    brief: "Quad Cities — Mississippi riverfront, landmark-free or local scenery",
    tone: "navy",
    motif: "river",
  },
  insurance: {
    alt: "A family reviewing information together at a table",
    brief: "Insurance — calm, organized conversation; paperwork without stress",
    tone: "ivory",
    motif: "table",
  },
  therapyPT: {
    alt: "A therapist supporting an older adult using parallel bars",
    brief: "Physical therapy — parallel bars or stair practice",
    tone: "champagne",
    motif: "path",
  },
  therapyOT: {
    alt: "An occupational therapist practicing a daily-living task with a resident",
    brief: "Occupational therapy — kitchen or dressing task practice",
    tone: "sand",
    motif: "table",
  },
  therapyST: {
    alt: "A speech therapist working one-on-one with a resident",
    brief: "Speech therapy — one-on-one session, engaged conversation",
    tone: "ivory",
    motif: "window",
  },
  clinical: {
    alt: "A nurse preparing supplies in a clean, organized clinical setting",
    brief: "Clinical detail — organized supplies, gloved hands, professional",
    tone: "navy",
    motif: "window",
  },
});

export type ImageKey = keyof typeof images;
