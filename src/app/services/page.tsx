import type { Metadata } from "next";
import { Compass, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button, ArrowLink } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { VerifyBadge } from "@/components/ui/VerifyBadge";
import { Media } from "@/components/ui/Media";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { publishedServices, serviceCategories, type ServiceCategory } from "@/content/services";
import { routes } from "@/content/navigation";
import { site, telHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Care Services in Rock Island, IL",
  description:
    "Skilled nursing, short-term rehabilitation, long-term care, therapy, and clinical services in Rock Island, Illinois, serving the Quad Cities.",
  path: routes.services,
});

const categoryIntro: Record<ServiceCategory, string> = {
  nursing: "Licensed nursing care and daily support for short stays and for residents who call Rock Island home.",
  rehabilitation: "Therapy-focused care that helps people work toward the goals that matter most to them.",
  clinical: "Clinical services delivered by our nursing team according to physician orders.",
  support: "Services that care for the whole person — and for the families who love them.",
};

const principles = [
  { title: "We start by listening", text: "Before anything else, we learn about the person: health needs, daily routines, preferences, and the people who matter most." },
  { title: "Plans are individual", text: "Care plans are built with the resident, family, and physician — and revisited whenever needs change." },
  { title: "Disciplines work together", text: "Nursing, therapy, social services, dietary, and activities share information so care feels connected, not fragmented." },
];

export default function ServicesPage() {
  const categories = Object.keys(serviceCategories) as ServiceCategory[];
  const anyUnverified = publishedServices.some((s) => !s.verified);

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={<>Care Shaped Around <span className="italic text-champagne-700">Each Person.</span></>}
        lede="From recovery after a hospital stay to the comfort of long-term living, our services come together around one goal: helping every resident feel well cared for, respected, and at home."
        image="nursing"
        crumbs={[{ name: "Services", path: routes.services }]}
        actions={
          <>
            <Button href={routes.admissions} arrow location="services-hero">Contact Admissions</Button>
            <Button href={routes.tour} variant="outline" location="services-hero">Schedule a Tour</Button>
          </>
        }
      />

      {/* How care is personalized */}
      <section className="bg-white py-24 md:py-28" aria-labelledby="approach-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Our approach</p>
            <h2 id="approach-title" className="mt-5 text-h2">Personalized from the first conversation</h2>
          </Reveal>
          <ul className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="border-t border-champagne-400/70 pt-6">
                <span className="font-display text-3xl text-champagne-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-[1.45rem] leading-tight">{p.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-stone-600">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Directory */}
      <section className="bg-cream py-24 md:py-28" aria-labelledby="directory-title">
        <div className="container-x">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Service directory</p>
              <h2 id="directory-title" className="mt-5 text-h2">Explore our care</h2>
            </div>
            {anyUnverified && <VerifyBadge verified={false} label="Service list pending facility verification" />}
          </Reveal>
          {/* Category jump links */}
          <nav aria-label="Service categories" className="mt-10">
            <ul className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <li key={c}>
                  <a href={`#${c}`} className="inline-block border border-beige-300 bg-white px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-navy-800 transition-colors hover:border-navy-900 hover:bg-navy-900 hover:text-ivory">
                    {serviceCategories[c]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-16 space-y-20">
            {categories.map((c) => {
              const list = publishedServices.filter((s) => s.category === c);
              if (!list.length) return null;
              return (
                <div key={c} id={c} className="scroll-mt-32">
                  <Reveal className="grid gap-4 border-b border-beige-300 pb-6 md:grid-cols-12 md:items-end">
                    <h3 className="text-h3 md:col-span-5">{serviceCategories[c]}</h3>
                    <p className="text-stone-600 md:col-span-7">{categoryIntro[c]}</p>
                  </Reveal>
                  <ul className="mt-8 grid pl-px pt-px sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {list.map((s, i) => (
                      <Reveal as="li" key={s.slug} delay={(i % 4) * 0.06} className="-ml-px -mt-px border border-beige-300"><ServiceCard service={s} /></Reveal>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <Reveal className="mt-14 max-w-3xl text-sm text-stone-500">
            Services are listed for general information. Availability depends on individual needs, physician orders, and current capacity, and our admissions team reviews every situation individually. Please contact us to confirm whether a specific service is available.
          </Reveal>
        </div>
      </section>

      {/* Guidance */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="guidance-title">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Media image="admissions" className="aspect-[4/5] w-full" rounded sizes="(min-width:1024px) 40vw, 100vw" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow">Not sure where to begin?</p>
              <h2 id="guidance-title" className="mt-5 text-h2">Not sure which care is right? You don&apos;t have to figure it out alone.</h2>
              <p className="lede mt-6">Short-term rehabilitation, skilled nursing, and long-term care can overlap — and needs often change over time. A conversation with our admissions team can help you understand the options and what may fit your situation best.</p>
            </Reveal>
            <ul className="mt-10 space-y-5">
              {[
                { icon: Phone, title: "Call and talk it through", text: "Speak with our admissions team about your questions and timing.", link: <TrackedLink href={telHref(site.contact.admissionsPhone.e164)} location="services-guidance" className="link-arrow">{site.contact.admissionsPhone.display}</TrackedLink> },
                { icon: MessageCircle, title: "Send an inquiry", text: "Share a few general details and we'll reach out at a time that works for you.", link: <ArrowLink href={routes.admissions} location="services-guidance">Admissions inquiry</ArrowLink> },
                { icon: Compass, title: "Have a general question?", text: "Not ready to talk admissions yet? Send us a message any time.", link: <ArrowLink href={routes.contact} location="services-guidance">Contact us</ArrowLink> },
              ].map((r, i) => (
                <Reveal as="li" key={r.title} delay={i * 0.06} className="flex gap-5 border-b border-beige-300 pb-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-champagne-400/60 text-navy-800"><r.icon className="h-5 w-5" strokeWidth={1.4} aria-hidden /></span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-navy-900">{r.title}</h3>
                    <p className="mt-1 text-[0.95rem] text-stone-600">{r.text}</p>
                    <div className="mt-3">{r.link}</div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand location="services-cta" />
    </>
  );
}
