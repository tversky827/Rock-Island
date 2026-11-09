import Link from "next/link";
import { Mail, MapPin, Phone, Printer } from "lucide-react";
import { LogoStacked } from "../brand/Logo";
import { TrackedLink } from "../ui/TrackedLink";
import { SocialIcons } from "./SocialIcons";
import { footerNav, routes } from "@/content/navigation";
import { site, fullAddress, telHref, mailHref, mapsDirectionsUrl } from "@/content/site";

function Col({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-champagne-300">{title}</h2>
      <ul className="mt-6 space-y-3">
        {links.map((l) => (
          <li key={l.href + l.label}><Link href={l.href} className="link-underline text-[0.95rem] text-ivory/75 hover:text-ivory">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark relative bg-navy-950 text-ivory">
      <div className="h-px bg-gradient-to-r from-transparent via-champagne-500/60 to-transparent" aria-hidden />
      <div className="container-x grid gap-14 py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-block"><LogoStacked tone="light" /></Link>
          <p className="mt-8 max-w-sm text-[0.95rem] leading-relaxed text-ivory/70">{site.brandStatement}</p>
          <SocialIcons className="mt-8" />
        </div>
        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
          <Col title="Explore" links={footerNav.explore} />
          <Col title="Services" links={footerNav.services} />
          <Col title="Admissions" links={footerNav.admissions} />
        </div>
        <div className="lg:col-span-3">
          <h2 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-champagne-300">Contact</h2>
          <address className="mt-6 space-y-4 not-italic text-[0.95rem] text-ivory/75">
            <TrackedLink href={mapsDirectionsUrl} location="footer" event="directions_click" className="flex gap-3 hover:text-ivory">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-champagne-300" aria-hidden /><span>{fullAddress}</span>
            </TrackedLink>
            <TrackedLink href={telHref(site.contact.phone.e164)} location="footer" className="flex gap-3 hover:text-ivory">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-champagne-300" aria-hidden /><span>Main: {site.contact.phone.display}</span>
            </TrackedLink>
            <TrackedLink href={telHref(site.contact.admissionsPhone.e164)} location="footer" className="flex gap-3 hover:text-ivory">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-champagne-300" aria-hidden /><span>Admissions: {site.contact.admissionsPhone.display}</span>
            </TrackedLink>
            <p className="flex gap-3"><Printer className="mt-1 h-4 w-4 shrink-0 text-champagne-300" aria-hidden /><span>Referral fax: {site.contact.referralFax.display}</span></p>
            <TrackedLink href={mailHref(site.contact.email.general)} location="footer" className="flex gap-3 break-all hover:text-ivory">
              <Mail className="mt-1 h-4 w-4 shrink-0 text-champagne-300" aria-hidden /><span>{site.contact.email.general}</span>
            </TrackedLink>
          </address>
          <TrackedLink href={routes.tour} location="footer" className="btn btn-gold btn-sm mt-8">Schedule a Tour</TrackedLink>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col gap-4 py-7 text-[0.8rem] text-ivory/70 md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.legal.map((l) => (<li key={l.href}><Link href={l.href} className="link-underline hover:text-ivory">{l.label}</Link></li>))}
          </ul>
        </div>
        <p className="container-x pb-8 text-[0.72rem] leading-relaxed text-ivory/65">
          The information on this website is for general informational purposes and is not medical advice. Admission is based on an assessment of individual care needs, availability, and payment source. In a medical emergency, call 911.
        </p>
      </div>
    </footer>
  );
}
