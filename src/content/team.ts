/** Interdisciplinary team categories. Do not add names, credentials, or staffing ratios without verification. */
export type TeamIcon = "stethoscope" | "clipboard" | "activity" | "users" | "utensils" | "palette" | "shield";
export const teamDisciplines: { title: string; icon: TeamIcon; text: string }[] = [
  { title: "Nursing", icon: "stethoscope", text: "Licensed nurses and nursing assistants provide day-to-day clinical care, observation, and personal support." },
  { title: "Physicians", icon: "clipboard", text: "Attending physicians direct medical care and work with nursing to respond to changes in condition." },
  { title: "Therapy", icon: "activity", text: "Physical, occupational, and speech therapists support mobility, independence, and communication." },
  { title: "Social Services", icon: "users", text: "Social services staff help residents and families with adjustment, resources, and discharge planning." },
  { title: "Dietary Services", icon: "utensils", text: "Our dietary team prepares meals that meet medical needs and personal tastes." },
  { title: "Activities", icon: "palette", text: "Life enrichment staff create programs that bring purpose, joy, and connection." },
  { title: "Support Staff", icon: "shield", text: "Housekeeping, laundry, maintenance, and administrative staff keep everything running smoothly." },
];
