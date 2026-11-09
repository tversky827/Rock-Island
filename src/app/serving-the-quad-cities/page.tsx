import type { Metadata } from "next";
import { MapPin, Navigation } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button, ArrowLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/ui/CtaBand";
import { MapEmbed } from "@/components/sections/Shared";
import { communities } from "@/content/communities";
import { routes } from "@/content/navigation";
import { site, fullAddress, mapsDirectionsUrl } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nursing Home Serving the Quad Cities",
  description:
    "From one location in Rock Island, IL, we welcome families from Moline, East Moline, Milan, Silvis, Davenport, Bettendorf, and across the Quad Cities.",
  path: routes.community,
});

export default function CommunityPage() {
  return (
    <>
      <PageHero
        variant="immersive"
        eyebrow="Our community"
        title={<>Rooted in Rock Island. <span className="italic text-champagne-300">Caring for the Quad Cities.</span></>}
        lede="The Quad Cities is a region connected by the Mississippi River, by family, and by neighbors who look out for one another. We're proud to be part of it."
        image="community"
        crumbs={[{ name: "Serving the Quad Cities", path: routes.community }]}
        actions={<>
          <Button href={routes.tour} variant="gold" arrow location="community-hero">Schedule a Tour</Button>
          <Button href={mapsDirectionsUrl} variant="outline-light" location="community-hero" icon={<Navigation className="h-4 w-4" aria-hidden />}>Get Directions</Button>
        </>}
      />

      <section className="bg-ivory py-24 md:py-32" aria-labelledby="one-location-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="One location, one community" title={<span id="one-location-title">Close to home, wherever home is in the region.</span>} />
            <Reveal className="mt-8 space-y-5 text-stone-600" delay={0.1}>
              <p>Rock Island Nursing Home is a single skilled nursing and rehabilitation facility located in Rock Island, Illinois. Families from both sides of the river choose us because staying close matters — close enough for a lunchtime visit, a Sunday afternoon together, or a quick stop on the way home from work.</p>
              <p>Many of the people we care for come to us after a stay at one of the area&apos;s hospitals. Our admissions team works with discharge planners and case managers throughout the region to coordinate each transition, so that the move from hospital to our care feels organized and unhurried.</p>
              <p>Whether you live in Rock Island or across the river in Iowa, you&apos;re welcome to call, visit, and get to know us.</p>
            </Reveal>
            <Reveal className="mt-8 flex items-start gap-3 border-l-2 border-champagne-500 bg-cream p-5 text-sm text-stone-700" delay={0.15}>
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne-700" aria-hidden />
              <span><strong className="text-navy-900">Our only location:</strong> {fullAddress}</span>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6" delay={0.1}>
            <MapEmbed className="aspect-[4/3] w-full lg:aspect-[5/6]" />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32" aria-labelledby="communities-title">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Communities we serve" title={<span id="communities-title">Welcoming families from across the region.</span>} lede="We do not have offices or facilities in these communities — we simply welcome residents and families from them at our Rock Island location." />
          <ul className="mt-16 grid gap-px bg-beige-300 sm:grid-cols-2 lg:grid-cols-4">
            {communities.map((c, i) => (
              <Reveal as="li" key={c.name} delay={(i % 4) * 0.06} className="bg-ivory p-8">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-champagne-700">{c.state === "IL" ? "Illinois" : "Iowa"}</p>
                <h3 className="mt-3 font-display text-[1.8rem] leading-tight">{c.name}</h3>
                <p className="mt-3 text-[0.95rem] text-stone-600">{c.text}</p>
              </Reveal>
            ))}
            <Reveal as="li" delay={0.2} className="on-dark flex flex-col justify-between bg-navy-900 p-8 text-ivory">
              <p className="font-display text-2xl leading-snug">And the greater Quad Cities region.</p>
              <ArrowLink href={routes.contact} location="communities-grid" className="mt-6">Contact us</ArrowLink>
            </Reveal>
          </ul>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32" aria-labelledby="search-title">
        <div className="container-x grid gap-14 lg:grid-cols-3">
          {[
            { title: "Skilled nursing near Moline & Davenport", text: "For families looking for skilled nursing close to Moline, East Moline, or Davenport, our Rock Island location offers licensed nursing care with individualized care planning and family communication.", href: routes.skilledNursing, cta: "Skilled nursing" },
            { title: "Short-term rehab in the Quad Cities", text: "After surgery or a hospital stay, short-term rehabilitation brings physical, occupational, and speech therapy together with nursing support — a short drive from anywhere in the Quad Cities.", href: routes.rehab, cta: "Rehabilitation" },
            { title: "Long-term care in Rock Island County", text: "For loved ones who need ongoing daily support, long-term care in Rock Island means familiar surroundings, meaningful days, and a team that gets to know the whole person.", href: routes.longTerm, cta: "Long-term care" },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08} className="border-t border-champagne-500 pt-8">
              <h2 className="text-h3">{b.title}</h2>
              <p className="mt-4 text-stone-600">{b.text}</p>
              <ArrowLink href={b.href} location="community-services" className="mt-6">{b.cta}</ArrowLink>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title={`Visit ${site.name}.`} text="We'd be glad to show you around, introduce you to our team, and answer your questions in person." location="community-cta" />
    </>
  );
}
