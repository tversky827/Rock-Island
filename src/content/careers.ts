/**
 * CAREERS
 * ────────────────────────────────────────────────────────────────────────────
 * `openPositions` is intentionally empty. Add real, approved openings only.
 * If an applicant tracking system is used, set NEXT_PUBLIC_ATS_URL and the
 * "View Open Positions" / "Apply Now" buttons will link to it.
 */
export type CareerIcon = "stethoscope" | "heart" | "activity" | "utensils" | "sparkle" | "palette" | "briefcase";

export const careerDepartments: { id: string; title: string; icon: CareerIcon; text: string }[] = [
  { id: "nursing", title: "Nursing (RN & LPN)", icon: "stethoscope", text: "Lead clinical care, coordinate with physicians, and guide the care team at the bedside." },
  { id: "cna", title: "Certified Nursing Assistants", icon: "heart", text: "Provide the daily, hands-on care and companionship residents rely on most." },
  { id: "therapy", title: "Therapy", icon: "activity", text: "Help residents rebuild strength, independence, and communication." },
  { id: "dietary", title: "Dietary", icon: "utensils", text: "Prepare and serve meals that nourish and bring residents together." },
  { id: "housekeeping", title: "Housekeeping & Laundry", icon: "sparkle", text: "Keep our community clean, safe, comfortable, and welcoming." },
  { id: "activities", title: "Activities", icon: "palette", text: "Create joyful, meaningful moments through programs and events." },
  { id: "administration", title: "Administration", icon: "briefcase", text: "Support admissions, business office, social services, and operations." },
];

export interface OpenPosition {
  id: string;
  title: string;
  department: string;
  schedule: string;
  summary: string;
  applyUrl?: string;
}

/** Add verified openings here. Leave empty to show the general application message. */
export const openPositions: OpenPosition[] = [];

/** Workplace values (not benefits). Benefits must be supplied and verified by HR before being listed. */
export const workplaceValues = [
  { title: "Purpose you can feel", text: "Every shift is a chance to make someone's day better — and to see that difference firsthand." },
  { title: "Respect for every role", text: "From the front desk to the bedside, every person on the team contributes to a resident's experience." },
  { title: "Teamwork", text: "Our work is interdisciplinary by nature. We rely on each other and communicate openly." },
  { title: "Room to grow", text: "We value people who want to learn, develop their skills, and take on more over time." },
];

export const positionOptions = [
  "Registered Nurse (RN)", "Licensed Practical Nurse (LPN)", "Certified Nursing Assistant (CNA)",
  "Therapy (PT / OT / SLP / Assistant)", "Dietary", "Housekeeping / Laundry", "Activities",
  "Administration / Business Office", "Social Services", "Maintenance", "Other / General Application",
];
