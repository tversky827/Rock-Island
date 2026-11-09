import { publishedServices } from "./services";

export interface NavLink { label: string; href: string; description?: string }
export interface NavItem extends NavLink { children?: NavLink[] }

export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  skilledNursing: "/services/skilled-nursing",
  rehab: "/services/short-term-rehabilitation",
  longTerm: "/services/long-term-care",
  therapy: "/services/therapy-services",
  amenities: "/amenities",
  admissions: "/admissions",
  insurance: "/insurance-and-payment",
  careers: "/careers",
  contact: "/contact",
  tour: "/schedule-a-tour",
  referrals: "/referrals",
  community: "/serving-the-quad-cities",
  privacy: "/privacy-policy",
  accessibility: "/accessibility",
  terms: "/terms",
} as const;

export const mainNav: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "About", href: routes.about },
  {
    label: "Services",
    href: routes.services,
    children: [
      { label: "All Services", href: routes.services, description: "Our complete directory of care" },
      { label: "Skilled Nursing", href: routes.skilledNursing, description: "Licensed nursing care, delivered with heart" },
      { label: "Long-Term Care", href: routes.longTerm, description: "Comfort, connection, and daily support" },
      { label: "Therapy Services", href: routes.therapy, description: "Physical, occupational & speech therapy" },
    ],
  },
  {
    label: "Rehabilitation",
    href: routes.rehab,
    children: [
      { label: "Short-Term Rehabilitation", href: routes.rehab, description: "From hospital to home" },
      ...publishedServices
        .filter((s) => ["physical-therapy", "occupational-therapy", "speech-therapy", "post-surgical-recovery"].includes(s.slug))
        .map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    ],
  },
  { label: "Amenities", href: routes.amenities },
  {
    label: "Admissions",
    href: routes.admissions,
    children: [
      { label: "Admissions Process", href: routes.admissions, description: "How to begin, step by step" },
      { label: "Insurance & Payment", href: routes.insurance, description: "Medicare, Medicaid & more" },
      { label: "Schedule a Tour", href: routes.tour, description: "Visit and meet our team" },
      { label: "Hospital & Physician Referrals", href: routes.referrals, description: "For discharge planners & clinicians" },
    ],
  },
  { label: "Careers", href: routes.careers },
  { label: "Contact", href: routes.contact },
];

export const footerNav = {
  explore: [
    { label: "About Us", href: routes.about },
    { label: "Amenities & Life", href: routes.amenities },
    { label: "Serving the Quad Cities", href: routes.community },
    { label: "Careers", href: routes.careers },
    { label: "Contact Us", href: routes.contact },
  ],
  services: [
    { label: "Skilled Nursing", href: routes.skilledNursing },
    { label: "Short-Term Rehabilitation", href: routes.rehab },
    { label: "Long-Term Care", href: routes.longTerm },
    { label: "Therapy Services", href: routes.therapy },
    { label: "All Services", href: routes.services },
  ],
  admissions: [
    { label: "Admissions Process", href: routes.admissions },
    { label: "Insurance & Payment", href: routes.insurance },
    { label: "Schedule a Tour", href: routes.tour },
    { label: "Submit a Referral", href: routes.referrals },
  ],
  legal: [
    { label: "Privacy Policy", href: routes.privacy },
    { label: "Accessibility Statement", href: routes.accessibility },
    { label: "Website Terms", href: routes.terms },
  ],
};
