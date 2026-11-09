import { z } from "zod";

/**
 * Shared validation schemas — used by both the browser (instant feedback)
 * and the API route (authoritative validation).
 *
 * HIPAA-CONSCIOUS DESIGN: no form collects diagnoses, medical history,
 * medications, insurance member IDs, dates of birth, or patient identifiers.
 * The referral form collects ONLY the referring professional's contact details.
 */

const name = z.string({ error: "Please enter your full name." }).trim().min(2, "Please enter your full name.").max(100, "Please shorten this entry.");
const email = z.string({ error: "Please enter your email address." }).trim().min(1, "Please enter your email address.").pipe(z.email("Please enter a valid email address.")).pipe(z.string().max(160));
const phone = z.string({ error: "Please enter your phone number." }).trim().regex(/^[+()\-.\s\d]{10,20}$/, "Please enter a valid phone number, including area code.");
const optionalPhone = z.union([z.literal(""), phone]).optional();
const message = (max = 2000) => z.string({ error: "Please enter a message." }).trim().max(max, `Please keep this under ${max} characters.`);
const consent = z.literal("on", { error: "Please confirm you have read the privacy notice." });
const contactMethod = z.enum(["Email", "Phone", "Either"], { error: "Please choose a contact method." });

export const contactReasons = ["General question", "Admissions information", "Schedule a tour", "Billing or business office", "Family member question", "Feedback", "Vendor or community partnership", "Other"] as const;
export const tourTimes = ["Morning (9 am – 12 pm)", "Midday (12 pm – 2 pm)", "Afternoon (2 pm – 5 pm)", "Flexible"] as const;
export const relationships = ["Myself", "Spouse or partner", "Adult child", "Other family member", "Friend", "Healthcare professional", "Other"] as const;
export const careTypes = ["Short-term rehabilitation", "Skilled nursing", "Long-term care", "Respite care", "Not sure yet"] as const;
export const referrerRoles = ["Hospital discharge planner", "Case manager", "Social worker", "Physician", "Nurse practitioner / Physician assistant", "Other healthcare professional"] as const;

export const schemas = {
  contact: z.object({
    name, email, phone: optionalPhone,
    reason: z.enum(contactReasons, { error: "Please choose a reason for contacting us." }),
    message: message().min(10, "Please include a short message (at least 10 characters)."),
    preferredContact: contactMethod,
    consent,
  }),
  tour: z.object({
    name, phone, email,
    preferredDate: z.string({ error: "Please choose a preferred date." }).regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a preferred date.").refine((d) => {
      const day = new Date(d + "T12:00:00");
      const today = new Date(); today.setHours(0, 0, 0, 0);
      return !Number.isNaN(day.getTime()) && day >= today;
    }, "Please choose a date today or later."),
    preferredTime: z.enum(tourTimes, { error: "Please choose a preferred time." }),
    visitors: z.coerce.number({ error: "Please enter the number of visitors." }).int().min(1, "At least 1 visitor.").max(8, "For groups larger than 8, please call us."),
    comments: message(1000).optional(),
    consent,
  }),
  admissions: z.object({
    name, email, phone,
    relationship: z.enum(relationships, { error: "Please choose your relationship." }),
    careType: z.enum(careTypes, { error: "Please choose the type of care being explored." }),
    preferredContact: contactMethod,
    message: message(1500).optional(),
    consent,
  }),
  referral: z.object({
    name,
    organization: z.string({ error: "Please enter your organization." }).trim().min(2, "Please enter your organization.").max(140),
    role: z.enum(referrerRoles, { error: "Please choose your role." }),
    phone, email,
    callback: z.enum(["As soon as possible", "Within a few hours", "Next business day"], { error: "Please choose a callback preference." }),
    note: message(400).optional(),
    noPhiAttestation: z.literal("on", { error: "Please confirm that this request contains no patient information." }),
    consent,
  }),
  careers: z.object({
    name, email, phone,
    position: z.string({ error: "Please choose a position of interest." }).trim().min(2, "Please choose a position of interest.").max(80),
    additional: message(2000).optional(),
    consent,
  }),
} as const;

export type FormType = keyof typeof schemas;
export const formTypes = Object.keys(schemas) as FormType[];

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;
export const RESUME_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

export const formLabels: Record<FormType, string> = {
  contact: "General Contact",
  tour: "Tour Request",
  admissions: "Admissions Inquiry",
  referral: "Referral Partner Callback Request",
  careers: "Employment Application",
};

/** Field labels used when formatting notification emails. */
export const fieldLabels: Record<string, string> = {
  name: "Name", email: "Email", phone: "Phone", reason: "Reason for contact", message: "Message",
  preferredContact: "Preferred contact method", preferredDate: "Preferred date", preferredTime: "Preferred time",
  visitors: "Number of visitors", comments: "Additional comments", relationship: "Relationship to prospective resident",
  careType: "Type of care being explored", organization: "Organization", role: "Role", callback: "Callback preference",
  note: "Note", position: "Position of interest", additional: "Additional information",
};
