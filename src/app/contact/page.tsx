import type { Metadata } from "next";
import { ArrowRight, Briefcase, CalendarCheck, Car, Mail, Navigation, Phone, Stethoscope, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { VerifyBadge } from "@/components/ui/VerifyBadge";
import { ContactDetails, MapEmbed } from "@/components/sections/Shared";
import { ContactForm } from "@/components/forms/Forms";
import { routes } from "@/content/navigation";
import { site, fullAddress, telHref, mailHref, mapsDirectionsUrl } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Rock Island Nursing Home in Rock Island, Illinois. Call our team, reach admissions, schedule a tour, send a referral, or get directions.",
  path: routes.contact,
});

const options: { icon: LucideIcon; title: string; text: string; label: string; href: string }[] = [
  { icon: Phone, title: "Call our team", text: "General questions, family updates, and directions.", label: site.contact.phone.display, href: telHref(site.contact.phone.e164) },
  { icon: Phone, title: "Call admissions", text: "Questions about care, availability, and coverage.", label: site.contact.admissionsPhone.display, href: telHref(site.contact.admissionsPhone.e164) },
  { icon: Mail, title: "Email us", text: "Non-urgent questions — please no medical details.", label: site.contact.email.general, href: mailHref(site.contact.email.general) },
  { icon: CalendarCheck, title: "Schedule a tour", text: "Visit, meet our team, and see our community.", label: "Request a tour", href: routes.tour },
  { icon: Stethoscope, title: "Submit a referral", text: "For discharge planners, physicians, and case managers.", label: "Referral information", href: routes.referrals },
  { icon: Briefcase, title: "Careers", text: "Explore roles and submit an application.", label: "View careers", href: routes.careers },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={<>Every Conversation Starts With <span className="italic text-champagne-700">Hello.</span></>}
        lede="Have a question about care, a loved one, or a visit? Reach out the way that's easiest for you — our team is glad to help."
        image="contact"
        crumbs={[{ name: "Contact Us", path: routes.contact }]}
        actions={<>
          <Button href={telHref(site.contact.phone.e164)} arrow location="contact-hero" icon={<Phone className="h-4 w-4" aria-hidden />}>{site.contact.phone.display}</Button>
          <Button href="#message" variant="outline" location="contact-hero">Send a Message</Button>
        </>}
      />

      {/* Options */}
      <section className="bg-cream py-24 md:py-28" aria-labelledby="options-title">
        <div className="container-x">
          <SectionHeading eyebrow="Ways to reach us" title={<span id="options-title">How Can We Help?</span>} />
          <ul className="mt-14 grid gap-px border border-beige-300 bg-beige-300 sm:grid-cols-2 lg:grid-cols-3">
            {options.map((o, i) => (
              <Reveal as="li" key={o.title} delay={(i % 3) * 0.06}>
                <TrackedLink href={o.href} location="contact-options" className="group relative flex h-full flex-col bg-white p-8 transition-all duration-700 ease-[var(--ease-elegant)] hover:-translate-y-1 hover:shadow-lift">
                  <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-champagne-500 transition-transform duration-700 group-hover:scale-x-100" aria-hidden />
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne-400/60 text-navy-800 transition-colors duration-500 group-hover:bg-navy-900 group-hover:text-champagne-300">
                    <o.icon className="h-5 w-5" strokeWidth={1.4} aria-hidden />
                  </span>
                  <h3 className="mt-6 text-h3">{o.title}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] text-stone-600">{o.text}</p>
                  <span className="link-arrow mt-6 break-all normal-case tracking-normal">
                    <span className="text-[0.95rem] font-semibold">{o.label}</span>
                    <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.6} aria-hidden />
                  </span>
                </TrackedLink>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-sm text-stone-500">In a medical emergency, please call 911.</p>
        </div>
      </section>

      {/* Form + details */}
      <section id="message" className="scroll-mt-28 bg-ivory py-24 md:py-32" aria-labelledby="message-title">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Reveal className="bg-white p-7 shadow-soft sm:p-10 md:p-12 lg:col-span-7">
            <p className="eyebrow">Send a message</p>
            <h2 id="message-title" className="mt-5 text-h2">We&apos;ll Get Back to You.</h2>
            <p className="mt-3 text-stone-500">Fill out the form below and a member of our team will follow up during business hours.</p>
            <div className="mt-10"><ContactForm /></div>
          </Reveal>
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-champagne-700">Contact details</h2>
              <div className="mt-6"><ContactDetails location="contact-page" /></div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map + directions */}
      <section className="bg-beige-100" aria-labelledby="directions-title">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <MapEmbed className="min-h-[24rem] lg:col-span-7 lg:min-h-[34rem]" />
          <div className="px-5 py-20 sm:px-10 lg:col-span-5 lg:px-14 xl:pr-[max(3rem,calc((100vw-84rem)/2+3rem))]">
            <Reveal>
              <p className="eyebrow">Directions</p>
              <h2 id="directions-title" className="mt-5 text-h2">Finding Your Way to Us.</h2>
              <p className="lede mt-6">We&apos;re located in Rock Island, Illinois, convenient to families throughout the Illinois and Iowa Quad Cities.</p>
              <address className="mt-8 not-italic text-navy-900">{fullAddress}</address>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 flex gap-4 border-l-2 border-champagne-500 bg-white/70 px-5 py-4">
              <Car className="mt-0.5 h-5 w-5 shrink-0 text-champagne-700" strokeWidth={1.4} aria-hidden />
              <div className="text-sm text-stone-700">
                <p className="font-semibold text-navy-900">Parking &amp; entrance</p>
                <p className="mt-1">Visitor parking and main entrance details will be provided by the facility.</p>
                <VerifyBadge verified={site.address.verified} label="Parking & entrance details pending" className="mt-3" />
              </div>
            </Reveal>
            <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-4">
              <Button href={mapsDirectionsUrl} arrow location="contact-directions" icon={<Navigation className="h-4 w-4" aria-hidden />}>Get Turn-by-Turn Directions</Button>
              <Button href={routes.tour} variant="outline" location="contact-directions">Schedule a Tour</Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
