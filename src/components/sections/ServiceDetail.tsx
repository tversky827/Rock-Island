import type { ReactNode } from "react";
import { Check, Phone } from "lucide-react";
import { PageHero } from "../ui/PageHero";
import { Media } from "../ui/Media";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { ServiceCard } from "../ui/ServiceCard";
import { VerifyBadge } from "../ui/VerifyBadge";
import { CtaBand } from "../ui/CtaBand";
import { JsonLd } from "../ui/JsonLd";
import { TrackedLink } from "../ui/TrackedLink";
import { getService, serviceCategories, type Service } from "@/content/services";
import { routes } from "@/content/navigation";
import { site, telHref } from "@/content/site";
import { serviceJsonLd } from "@/lib/seo";
import type { ImageKey } from "@/content/images";

/** Reusable page template for any service. Flagship pages inject bespoke sections via `children`. */
export function ServiceDetail({ service, children, secondaryImage = "about" }: { service: Service; children?: ReactNode; secondaryImage?: ImageKey }) {
  const related = service.related.map((s) => getService(s)).filter((s): s is Service => !!s);
  const loc = `service-${service.slug}`;
  const label = /^[A-Z]{2}/.test(service.title) ? service.title : service.title.toLowerCase();

  return (
    <>
      <PageHero
        eyebrow={serviceCategories[service.category]}
        title={service.headline}
        lede={service.intro}
        image={service.image}
        crumbs={[{ name: "Services", path: routes.services }, { name: service.title, path: `/services/${service.slug}` }]}
        actions={
          <>
            <Button href={routes.admissions} arrow location={`${loc}-hero`}>Contact Admissions</Button>
            <Button href={routes.tour} variant="outline" location={`${loc}-hero`}>Schedule a Tour</Button>
          </>
        }
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-navy-800">{service.title}</span>
          <VerifyBadge verified={service.verified} />
        </div>
      </PageHero>

      {/* Overview */}
      <section className="bg-white py-24 md:py-28" aria-labelledby="overview-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Overview</p>
            <h2 id="overview-title" className="mt-5 text-h2">About {label}</h2>
            <div className="rule-gold mt-8" aria-hidden />
          </Reveal>
          <Reveal className="space-y-6 text-[1.08rem] leading-relaxed text-stone-700 lg:col-span-7 lg:col-start-6" delay={0.1}>
            {service.body.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
          </Reveal>
        </div>
      </section>

      {/* Purpose & benefits */}
      <section className="bg-cream py-24 md:py-28" aria-labelledby="purpose-title">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Purpose &amp; benefits</p>
            <h2 id="purpose-title" className="mt-5 text-h2">What this care focuses on</h2>
          </Reveal>
          <ul className="mt-14 grid gap-px border border-beige-300 bg-beige-300 sm:grid-cols-2 lg:grid-cols-4">
            {service.purpose.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.06} className="bg-ivory p-8">
                <span className="font-display text-4xl leading-none text-champagne-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-[1.45rem] leading-tight">{p.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-stone-600">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Who it helps + image composition */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="who-title">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-6">
            <div className="mr-12 sm:mr-24">
              <Media image={service.image} className="aspect-[4/3] w-full" sizes="(min-width:1024px) 45vw, 90vw" />
            </div>
            <div className="absolute -bottom-10 right-0 w-[40%] border-[10px] border-ivory shadow-lift">
              <Media image={secondaryImage} className="aspect-square w-full" showLabel={false} sizes="20vw" />
            </div>
          </Reveal>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <p className="eyebrow">Who this care may help</p>
              <h2 id="who-title" className="mt-5 text-h2">Is {label} the right fit?</h2>
            </Reveal>
            <ul className="mt-10 space-y-4">
              {service.whoItHelps.map((w, i) => (
                <Reveal as="li" key={w} delay={i * 0.06} className="flex gap-4 border-b border-beige-300 pb-4 text-stone-700">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-champagne-200 text-champagne-700"><Check className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden /></span>
                  {w}
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-8 text-sm text-stone-500">Every situation is different. Whether this care is appropriate depends on individual needs, physician orders, and availability — our admissions team is glad to talk it through with you.</Reveal>
          </div>
        </div>
      </section>

      {children}

      {/* Inline contact CTA */}
      <section className="bg-ivory pb-24 pt-4 md:pb-28" aria-label="Talk with our team">
        <div className="container-x">
          <Reveal className="flex flex-col gap-8 border border-beige-300 bg-white p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-xl">
              <p className="font-display text-[1.9rem] leading-tight text-navy-900">Questions about {label}?</p>
              <p className="mt-2 text-stone-600">Our team can explain how this care works, what to expect, and how to get started.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <TrackedLink href={telHref(site.contact.admissionsPhone.e164)} location={`${loc}-inline`} className="btn btn-outline">
                <Phone className="h-4 w-4" aria-hidden /> {site.contact.admissionsPhone.display}
              </TrackedLink>
              <Button href={routes.admissions} arrow location={`${loc}-inline`}>Contact Admissions</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="bg-cream py-24 md:py-28" aria-labelledby="related-title">
          <div className="container-x">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <Reveal>
                <p className="eyebrow">Related services</p>
                <h2 id="related-title" className="mt-5 text-h2">Care that works together</h2>
              </Reveal>
              <Button href={routes.services} variant="outline" arrow location={`${loc}-related`}>All Services</Button>
            </div>
            <ul className="mt-14 grid pl-px pt-px sm:grid-cols-2 lg:grid-cols-4">
              {related.map((s, i) => (
                <Reveal as="li" key={s.slug} delay={i * 0.06} className="-ml-px -mt-px border border-beige-300"><ServiceCard service={s} /></Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand location={`${loc}-cta`} />
      <JsonLd data={serviceJsonLd(service)} />
    </>
  );
}
