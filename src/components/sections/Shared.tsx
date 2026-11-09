import { Check, Mail, MapPin, Navigation, Phone, Printer, Clock } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Button, ArrowLink } from "../ui/Button";
import { Media } from "../ui/Media";
import { Icon } from "../ui/Icon";
import { VerifyBadge } from "../ui/VerifyBadge";
import { TrackedLink } from "../ui/TrackedLink";
import { TestimonialCarousel } from "./Testimonials";
import { ContactForm } from "../forms/Forms";
import { testimonials } from "@/content/testimonials";
import { teamDisciplines } from "@/content/team";
import { publishedAmenities } from "@/content/amenities";
import { careerDepartments } from "@/content/careers";
import { routes } from "@/content/navigation";
import { site, fullAddress, telHref, mailHref, mapsEmbedUrl, mapsDirectionsUrl } from "@/content/site";

/* ── Testimonials ─────────────────────────────────────────────────────────── */
export function TestimonialsSection() {
  const approved = testimonials.filter((t) => t.approved);
  const items = approved.length ? approved : site.showVerificationFlags ? testimonials.filter((t) => t.sample) : [];
  if (!items.length) return null;
  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32" aria-labelledby="testimonials-title">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="eyebrow justify-center">In their words</p>
          <h2 id="testimonials-title" className="mt-5 text-h2">Real Relationships. Meaningful Experiences.</h2>
          {!approved.length && (
            <p className="mx-auto mt-5 max-w-xl text-sm text-champagne-700">Layout preview only — sample placeholders will be replaced with approved testimonials from real residents, families, and partners.</p>
          )}
        </Reveal>
        <Reveal className="mt-14" delay={0.1}><TestimonialCarousel items={items} /></Reveal>
      </div>
    </section>
  );
}

/* ── Admissions steps ─────────────────────────────────────────────────────── */
export const admissionSteps = [
  { title: "Contact our team", text: "Call us or send an inquiry. We'll listen, answer your questions, and learn a little about your situation." },
  { title: "Discuss care needs and availability", text: "We'll talk through the type of care being considered, current availability, and how coverage may apply." },
  { title: "Coordinate the next steps", text: "If Rock Island Nursing Home is a good fit, we'll coordinate with you, the hospital, and physicians to plan the transition." },
];

export function AdmissionsSteps({ dark = false }: { dark?: boolean }) {
  return (
    <ol className={`grid gap-px md:grid-cols-3 ${dark ? "bg-ivory/10" : "bg-beige-300"}`}>
      {admissionSteps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.1} className={`relative p-8 md:p-10 ${dark ? "bg-navy-900" : "bg-ivory"}`}>
          <span className={`font-display text-6xl leading-none ${dark ? "text-champagne-300/80" : "text-champagne-600"}`}>{String(i + 1).padStart(2, "0")}</span>
          <h3 className={`mt-6 text-h3 ${dark ? "text-ivory" : ""}`}>{s.title}</h3>
          <p className={`mt-3 ${dark ? "text-ivory/70" : "text-stone-600"}`}>{s.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/* ── One Team ─────────────────────────────────────────────────────────────── */
export function TeamSection({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="bg-ivory py-24 md:py-32" aria-labelledby="team-title">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Interdisciplinary care</p>
              <h2 id="team-title" className="mt-5 text-h2">One Team. A Shared Commitment to Caring.</h2>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="lede">Good care is a team effort. Nurses, physicians, therapists, social services, dietary, activities, and support staff share what they learn so that each resident&apos;s plan reflects the whole person — and changes are noticed and acted on together.</p>
          </Reveal>
        </div>
        <ul className="mt-16 grid gap-px bg-beige-300 sm:grid-cols-2 lg:grid-cols-4">
          {teamDisciplines.map((d, i) => (
            <Reveal as="li" key={d.title} delay={i * 0.05} className="group bg-ivory p-8 transition-colors duration-500 hover:bg-white">
              <Icon name={d.icon} className="h-7 w-7 text-champagne-600" />
              <h3 className="mt-6 font-sans text-base font-semibold uppercase tracking-[0.12em] text-navy-900">{d.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-stone-600">{d.text}</p>
            </Reveal>
          ))}
          <Reveal as="li" delay={0.4} className="on-dark flex flex-col justify-between bg-navy-900 p-8 text-ivory">
            <p className="font-display text-2xl leading-snug">At the center of every plan: the resident and the people who love them.</p>
            {showLink ? <ArrowLink href={routes.about} location="team-section" className="mt-8">Our approach</ArrowLink> : <ArrowLink href={routes.admissions} location="team-section" className="mt-8">Begin a conversation</ArrowLink>}
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

/* ── Amenities ────────────────────────────────────────────────────────────── */
export function AmenitiesGrid() {
  const anyUnverified = publishedAmenities.some((a) => !a.verified);
  return (
    <ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-5">
      {publishedAmenities.map((a, i) => (
        <Reveal as="li" key={a.id} delay={(i % 5) * 0.06} className="group border-t border-beige-300 py-7">
          <Icon name={a.icon} className="h-6 w-6 text-champagne-600 transition-transform duration-500 group-hover:-translate-y-0.5" />
          <h3 className="mt-4 font-display text-[1.45rem] leading-tight">{a.title}</h3>
          <p className="mt-2 text-[0.93rem] leading-relaxed text-stone-600">{a.text}</p>
        </Reveal>
      ))}
      {anyUnverified && site.showVerificationFlags && <li className="sm:col-span-2 lg:col-span-5"><VerifyBadge verified={false} label="Amenities pending facility confirmation" /></li>}
    </ul>
  );
}

/* ── Referral partners band ───────────────────────────────────────────────── */
export function ReferralBand() {
  const points = ["Responsive admissions communication", "Secure, HIPAA-conscious referral channels", "Coordinated transitions from hospital to our care", "Clear updates to referring teams, as appropriate"];
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-950 text-ivory" aria-labelledby="referral-title">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Media image="referrals" className="min-h-[22rem] lg:min-h-full" sizes="(min-width:1024px) 50vw, 100vw" />
        <div className="px-5 py-20 sm:px-10 md:py-28 lg:px-16 xl:px-24">
          <Reveal>
            <p className="eyebrow">For hospitals &amp; physicians</p>
            <h2 id="referral-title" className="mt-5 text-h2 text-ivory">Your Trusted Partner in the Continuum of Care.</h2>
            <p className="lede mt-6">For discharge planners, physicians, case managers, and social workers, we aim to make every transition smooth — with prompt communication, careful review of each referral, and coordination from first call to arrival.</p>
          </Reveal>
          <ul className="mt-10 space-y-4">
            {points.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 0.06} className="flex items-start gap-4 border-b border-ivory/10 pb-4">
                <Check className="mt-1 h-4 w-4 shrink-0 text-champagne-300" aria-hidden /><span className="text-ivory/85">{p}</span>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={routes.referrals} variant="gold" arrow location="referral-band">Submit a Referral</Button>
            <Button href={telHref(site.contact.admissionsPhone.e164)} variant="outline-light" location="referral-band" icon={<Phone className="h-4 w-4" aria-hidden />}>{site.contact.admissionsPhone.display}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Careers teaser ───────────────────────────────────────────────────────── */
export function CareersSection() {
  const ats = site.integrations.applicantTrackingUrl;
  return (
    <section className="bg-ivory py-24 md:py-32" aria-labelledby="careers-title">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-5">
          <Media image="careers" className="aspect-[4/5] w-full" rounded sizes="(min-width:1024px) 40vw, 100vw" />
          <div className="absolute -right-4 bottom-10 hidden bg-navy-900 px-7 py-6 text-ivory shadow-lift md:block">
            <p className="font-display text-3xl leading-none">Compassion</p>
            <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-champagne-300">is the job description</p>
          </div>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading eyebrow="Careers" title="Make a Difference Every Day." lede="The people who thrive here are the ones who notice the small things — a favorite song, a warm blanket, a few extra minutes of conversation. If that sounds like you, we'd love to meet you." />
          <ul className="mt-10 flex flex-wrap gap-2">
            {careerDepartments.map((d) => (
              <li key={d.id} className="border border-beige-300 bg-white px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-navy-800">{d.title}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={ats || `${routes.careers}#open-positions`} arrow location="careers-section">View Open Positions</Button>
            <Button href={ats || `${routes.careers}#apply`} variant="outline" location="careers-section">Apply Now</Button>
            <ArrowLink href={mailHref(site.contact.email.careers)} location="careers-section">Contact Careers</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Map ──────────────────────────────────────────────────────────────────── */
export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-beige-100 ${className}`}>
      <iframe title={`Map showing ${site.address.verified ? site.name : `${site.address.city}, ${site.address.regionName}`}`} src={mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full grayscale-[35%] sepia-[15%]" />
      {!site.address.verified && site.showVerificationFlags && (
        <span className="absolute left-3 top-3 bg-ivory/90 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-champagne-700">Map shows city area until address is confirmed</span>
      )}
    </div>
  );
}

/* ── Contact info list ────────────────────────────────────────────────────── */
export function ContactDetails({ location = "contact-details" }: { location?: string }) {
  const rows = [
    { icon: MapPin, label: "Visit", value: fullAddress, href: mapsDirectionsUrl, event: "directions_click" as const },
    { icon: Phone, label: "Main line", value: site.contact.phone.display, href: telHref(site.contact.phone.e164) },
    { icon: Phone, label: "Admissions", value: site.contact.admissionsPhone.display, href: telHref(site.contact.admissionsPhone.e164) },
    { icon: Printer, label: "Secure referral fax", value: site.contact.referralFax.display },
    { icon: Mail, label: "Email", value: site.contact.email.general, href: mailHref(site.contact.email.general) },
    { icon: Clock, label: "Visiting", value: site.hours.visiting },
  ];
  return (
    <>
    <dl className="divide-y divide-beige-300 border-y border-beige-300">
      {rows.map((r) => (
        <div key={r.label} className="relative py-5 pl-10">
          <r.icon className="absolute left-0 top-6 h-5 w-5 text-champagne-600" strokeWidth={1.4} aria-hidden />
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone-500">{r.label}</dt>
          <dd className="mt-1 break-words text-navy-900">
            {r.href ? <TrackedLink href={r.href} location={location} event={r.event} className="link-underline hover:text-champagne-700">{r.value}</TrackedLink> : r.value}
          </dd>
        </div>
      ))}
    </dl>
    {site.showVerificationFlags && <div className="py-3"><VerifyBadge verified={site.contact.phone.verified && site.address.verified} label="Contact details are placeholders" /></div>}
    </>
  );
}

/* ── Contact section (homepage) ───────────────────────────────────────────── */
export function ContactSection() {
  return (
    <section id="contact" className="bg-cream py-24 md:py-32" aria-labelledby="contact-title">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Contact" title={<span id="contact-title">We&apos;d Love to Hear From You.</span>} lede="Whether you're planning ahead or need answers today, our team is ready to help. Reach out by phone, send a message, or come see us in person." />
          <div className="mt-10"><ContactDetails location="home-contact" /></div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={routes.tour} arrow location="home-contact">Schedule a Tour</Button>
            <Button href={mapsDirectionsUrl} variant="outline" location="home-contact" icon={<Navigation className="h-4 w-4" aria-hidden />}>Get Directions</Button>
          </div>
        </div>
        <div className="lg:col-span-7">
          <Reveal className="bg-white p-7 shadow-soft sm:p-10 md:p-12">
            <h3 className="text-h3">Send us a message</h3>
            <p className="mt-2 text-sm text-stone-500">We typically respond during business hours.</p>
            <div className="mt-8"><ContactForm /></div>
          </Reveal>
          <MapEmbed className="mt-6 aspect-[16/8] w-full" />
        </div>
      </div>
    </section>
  );
}

/* ── Feature list ─────────────────────────────────────────────────────────── */
export function FeatureList({ items, dark = false, columns = 2 }: { items: { title: string; text: string }[]; dark?: boolean; columns?: 1 | 2 }) {
  return (
    <ul className={`grid gap-x-10 gap-y-8 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((it, i) => (
        <Reveal as="li" key={it.title} delay={i * 0.06} className="flex gap-4">
          <span className={`mt-2 h-px w-6 shrink-0 ${dark ? "bg-champagne-300" : "bg-champagne-500"}`} aria-hidden />
          <div>
            <h3 className={`font-sans text-[0.95rem] font-semibold ${dark ? "text-ivory" : "text-navy-900"}`}>{it.title}</h3>
            <p className={`mt-1.5 text-[0.95rem] leading-relaxed ${dark ? "text-ivory/70" : "text-stone-600"}`}>{it.text}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

