import { Phone } from "lucide-react";
import { site, telHref } from "@/content/site";
import { routes } from "@/content/navigation";
import { Button } from "./Button";
import { TrackedLink } from "./TrackedLink";
import { Reveal } from "./Reveal";
import { LogoMark } from "../brand/Logo";

export function CtaBand({
  title = "Finding the right care starts with a conversation.",
  text = "Our admissions team is here to listen, answer your questions, and help you understand your options — without pressure.",
  location = "cta-band",
}: { title?: string; text?: string; location?: string }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-900 text-ivory">
      <LogoMark tone="light" className="pointer-events-none absolute -right-16 -top-10 -z-10 h-[130%] w-auto opacity-[0.05]" />
      <div className="container-x grid items-center gap-10 py-20 md:py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">We&apos;re here to help</p>
          <h2 className="mt-5 text-h2 text-ivory">{title}</h2>
          <p className="lede mt-6 max-w-2xl">{text}</p>
        </Reveal>
        <Reveal className="flex flex-col gap-4 sm:flex-row lg:col-span-5 lg:flex-col lg:items-end" delay={0.1}>
          <Button href={routes.tour} variant="gold" location={location} arrow>Schedule a Tour</Button>
          <Button href={routes.admissions} variant="outline-light" location={location}>Contact Admissions</Button>
          <TrackedLink href={telHref(site.contact.phone.e164)} location={location} className="inline-flex items-center gap-2 pt-1 text-sm text-ivory/80 hover:text-champagne-300">
            <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden /> Call our team: <span className="font-semibold text-ivory">{site.contact.phone.display}</span>
          </TrackedLink>
        </Reveal>
      </div>
    </section>
  );
}
