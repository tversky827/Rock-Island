/**
 * TESTIMONIALS
 * ────────────────────────────────────────────────────────────────────────────
 * Only testimonials with `approved: true` are displayed publicly.
 *
 * Before approving a testimonial, confirm:
 *   • It is a genuine statement from a real resident/family member/partner.
 *   • Written permission to publish (and to use their name/initials) is on file.
 *   • It contains no protected health information.
 *   • It makes no claim about clinical outcomes that could mislead.
 *
 * The SAMPLE entries below are layout placeholders. They are clearly labeled
 * on screen as samples, and they are hidden automatically when
 * NEXT_PUBLIC_SHOW_VERIFICATION_FLAGS=false.
 */
export interface Testimonial {
  quote: string;
  attribution: string;
  relation?: string;
  approved: boolean;
  sample?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Sample testimonial placeholder. Replace with an approved quote from a family member describing their experience with the care team.",
    attribution: "Family Member",
    relation: "Sample placeholder",
    approved: false,
    sample: true,
  },
  {
    quote: "Sample testimonial placeholder. Replace with an approved quote from a rehabilitation guest about their therapy experience.",
    attribution: "Rehabilitation Guest",
    relation: "Sample placeholder",
    approved: false,
    sample: true,
  },
  {
    quote: "Sample testimonial placeholder. Replace with an approved quote from a referral partner about communication and care transitions.",
    attribution: "Referral Partner",
    relation: "Sample placeholder",
    approved: false,
    sample: true,
  },
];
