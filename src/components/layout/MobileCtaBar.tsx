import { CalendarCheck, Phone } from "lucide-react";
import { TrackedLink } from "../ui/TrackedLink";
import { routes } from "@/content/navigation";
import { site, telHref } from "@/content/site";

/** Persistent mobile contact bar (hidden ≥ lg). */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-beige-300 bg-ivory/95 shadow-[0_-8px_24px_-12px_rgb(15_33_56/0.25)] backdrop-blur-md lg:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <TrackedLink href={telHref(site.contact.phone.e164)} location="mobile-sticky-bar" className="flex h-14 items-center justify-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-navy-900">
        <Phone className="h-4 w-4" strokeWidth={1.6} aria-hidden /> Call Our Team
      </TrackedLink>
      <TrackedLink href={routes.tour} location="mobile-sticky-bar" className="flex h-14 items-center justify-center gap-2 bg-navy-900 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ivory">
        <CalendarCheck className="h-4 w-4" strokeWidth={1.6} aria-hidden /> Schedule a Tour
      </TrackedLink>
    </div>
  );
}
