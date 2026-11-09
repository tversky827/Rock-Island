import type { Metadata } from "next";
import { Check, Phone } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Button, ArrowLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { LogoMark } from "@/components/brand/Logo";
import {
  TestimonialsSection, AdmissionsSteps, TeamSection, AmenitiesGrid, ReferralBand, CareersSection, ContactSection, FeatureList,
} from "@/components/sections/Shared";
import { publishedServices, homepageServiceSlugs } from "@/content/services";
import { routes } from "@/content/navigation";
import { site, telHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Skilled Nursing & Rehabilitation in Rock Island, IL",
    description:
      "Compassionate skilled nursing, short-term rehab, and long-term care in Rock Island, Illinois, serving families in Moline, Davenport, and the Quad Cities.",
    path: "/",
  }),
  title: { absolute: `${site.name} | Skilled Nursing & Rehab, Rock Island IL` },
};

const trust = ["Personalized Care", "Respect", "Dignity", "Compassion"];

export default function HomePage() {
  const homeServices = homepageServiceSlugs.map((s) => publishedServices.find((x) => x.slug === s)).filter((s) => !!s);

  return (
    <>
      {/* ── 2 · HERO ─────────────────────────────────────────────────────── */}
      <section className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 text-ivory">
        <Media image="heroHome" priority sizes="100vw" className="absolute inset-0 -z-20 h-full w-full" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(10,22,40,0.94)_0%,rgba(10,22,40,0.82)_38%,rgba(10,22,40,0.35)_75%,rgba(10,22,40,0.15)_100%)]" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-navy-950/80 to-transparent" aria-hidden />

        <div className="container-x flex flex-1 items-center pb-16 pt-36 md:pt-44">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow">Rock Island, Illinois · Skilled Nursing &amp; Rehabilitation</p>
            </Reveal>
            <h1 className="hero-rise mt-7 text-display text-ivory">
              Compassionate Care. <span className="italic text-champagne-300">Genuine Connections.</span> A Place to Call Home.
            </h1>
            <Reveal delay={0.2}>
              <p className="lede mt-8 max-w-2xl">
                At Rock Island Nursing Home, caring for people means more than providing healthcare. It means creating meaningful connections, supporting independence, and treating every resident like family.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-11 flex flex-col gap-4 sm:flex-row">
              <Button href={routes.tour} variant="gold" arrow location="hero">Schedule a Tour</Button>
              <Button href={routes.services} variant="outline-light" location="hero">Explore Our Services</Button>
            </Reveal>
          </div>
        </div>

        <div className="border-t border-ivory/10 bg-navy-950/40 backdrop-blur-sm">
          <div className="container-x flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 font-display text-lg text-ivory/90 md:text-xl" aria-label="Our values">
              {trust.map((t, i) => (
                <li key={t} className="flex items-center gap-5">{t}{i < trust.length - 1 && <span className="h-1 w-1 rotate-45 bg-champagne-400" aria-hidden />}</li>
              ))}
            </ul>
            <TrackedLink href={telHref(site.contact.admissionsPhone.e164)} location="hero-strip" className="group inline-flex items-center gap-3 text-sm text-ivory/80 hover:text-ivory">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-champagne-300/50 text-champagne-300 group-hover:bg-champagne-300 group-hover:text-navy-950"><Phone className="h-4 w-4" strokeWidth={1.6} aria-hidden /></span>
              Admissions questions? <span className="font-semibold text-ivory">{site.contact.admissionsPhone.display}</span>
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ── 3 · WELCOME ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ivory py-24 md:py-36" aria-labelledby="welcome-title">
        <LogoMark className="pointer-events-none absolute -left-24 top-10 h-[34rem] w-auto opacity-[0.035]" />
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-6">
            <div className="relative mr-10 sm:mr-24">
              <Media image="welcome" className="aspect-[4/5] w-full" rounded sizes="(min-width:1024px) 45vw, 90vw" />
            </div>
            <div className="absolute -bottom-10 right-0 w-[44%] border-[10px] border-ivory shadow-lift">
              <Media image="about" className="aspect-square w-full" showLabel={false} sizes="25vw" />
            </div>
          </Reveal>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <p className="eyebrow">Welcome</p>
              <h2 id="welcome-title" className="mt-5 text-h2">More Than a Nursing Home. <span className="italic text-champagne-700">A Community That Cares.</span></h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 space-y-5 text-stone-600">
              <p className="font-display text-2xl leading-snug text-navy-800">We believe exceptional care begins with genuine compassion.</p>
              <p>At Rock Island Nursing Home, our goal is to create an environment where residents feel comfortable, families feel supported, and every individual is treated with dignity and respect.</p>
              <p>From skilled nursing and rehabilitation to everyday moments of connection, we are committed to making each day meaningful.</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-6">
              <Button href={routes.about} variant="primary" arrow location="welcome">Get to Know Us</Button>
              <ArrowLink href={routes.amenities} location="welcome">Life at Rock Island</ArrowLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4 · SERVICES ─────────────────────────────────────────────────── */}
      <section className="bg-cream py-24 md:py-32" aria-labelledby="services-title">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <SectionHeading className="lg:col-span-7" eyebrow="Our services" title={<span id="services-title">Comprehensive Care. Personalized Attention.</span>} />
            <Reveal className="lg:col-span-5" delay={0.1}>
              <p className="lede">From the first days after a hospital stay to the comfort of long-term living, our care is shaped around each person — their health, their goals, and what matters most to them.</p>
            </Reveal>
          </div>
          <ul className="mt-16 grid gap-px border border-beige-300 bg-beige-300 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {homeServices.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 4) * 0.06}><ServiceCard service={s} /></Reveal>
            ))}
          </ul>
          <Reveal className="mt-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <p className="max-w-2xl text-sm text-stone-500">Service availability can vary based on individual needs and physician orders. Please contact our admissions team to discuss specific care requirements.</p>
            <Button href={routes.services} variant="outline" arrow location="services-grid">View All Services</Button>
          </Reveal>
        </div>
      </section>

      {/* ── 5 · REHABILITATION ───────────────────────────────────────────── */}
      <section className="on-dark relative overflow-hidden bg-navy-900 py-24 text-ivory md:py-32" aria-labelledby="rehab-title">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="order-2 lg:order-1 lg:col-span-6">
            <div className="grid grid-cols-5 gap-4">
              <Media image="rehab" className="col-span-3 aspect-[3/4]" sizes="(min-width:1024px) 28vw, 60vw" />
              <div className="col-span-2 flex flex-col gap-4 pt-16">
                <Media image="therapyOT" className="aspect-square" showLabel={false} sizes="20vw" />
                <Media image="therapyST" className="aspect-[3/4]" showLabel={false} sizes="20vw" />
              </div>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
            <Reveal>
              <p className="eyebrow">Short-term rehabilitation</p>
              <h2 id="rehab-title" className="mt-5 text-h2 text-ivory">Helping Residents Regain Strength, Confidence, and Independence.</h2>
              <p className="lede mt-6">Recovery is personal. Our therapists and nurses work alongside each guest to set goals that matter to them — and to support every step toward the next chapter, at home or wherever life leads.</p>
            </Reveal>
            <div className="mt-10">
              <FeatureList dark items={[
                { title: "Physical therapy", text: "Strength, balance, and mobility." },
                { title: "Occupational therapy", text: "Confidence with daily routines." },
                { title: "Speech therapy", text: "Communication and safe swallowing." },
                { title: "Individualized recovery goals", text: "Plans built around what you want to return to." },
                { title: "Interdisciplinary care", text: "Therapy, nursing, and social services in step." },
                { title: "A supportive environment", text: "Encouragement at every stage of recovery." },
              ]} />
            </div>
            <Reveal className="mt-10"><Button href={routes.rehab} variant="gold" arrow location="rehab-section">Explore Rehabilitation</Button></Reveal>
          </div>
        </div>
      </section>

      {/* ── 6 · SKILLED NURSING ──────────────────────────────────────────── */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="nursing-title">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">Skilled nursing</p>
              <h2 id="nursing-title" className="mt-5 text-h2">Professional Nursing Care. <span className="italic text-champagne-700">Delivered With Heart.</span></h2>
              <p className="lede mt-6 max-w-xl">Our licensed nurses bring clinical skill and genuine warmth to every shift — paying close attention, communicating clearly, and treating every resident as an individual.</p>
            </Reveal>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {["Individualized attention", "Around-the-clock nursing support", "Resident dignity, always", "Coordination with physicians and specialists", "Personalized care planning", "Ongoing family communication"].map((p, i) => (
                <Reveal as="li" key={p} delay={i * 0.05} className="flex items-center gap-3 border-b border-beige-300 pb-4 text-navy-900">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-champagne-200 text-champagne-700"><Check className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden /></span>{p}
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-10"><Button href={routes.skilledNursing} arrow location="nursing-section">Learn About Skilled Nursing</Button></Reveal>
          </div>
          <Reveal className="relative lg:col-span-5 lg:col-start-8" delay={0.1}>
            <Media image="nursing" className="aspect-[4/5] w-full" sizes="(min-width:1024px) 40vw, 100vw" />
            <div className="absolute -left-6 -top-6 -z-10 h-full w-full border border-champagne-400/60" aria-hidden />
          </Reveal>
        </div>
      </section>

      {/* ── 7 · LONG-TERM CARE ───────────────────────────────────────────── */}
      <section className="relative bg-beige-100" aria-labelledby="ltc-title">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="order-2 px-5 py-24 sm:px-10 md:py-32 lg:order-1 lg:px-16 xl:pl-[max(3rem,calc((100vw-84rem)/2+3rem))] xl:pr-20">
            <Reveal>
              <p className="eyebrow">Long-term care</p>
              <h2 id="ltc-title" className="mt-5 text-h2">A Place Where Comfort, Connection, and Care Come Together.</h2>
              <p className="lede mt-6">For residents who call Rock Island home, every day should feel familiar, comfortable, and full of meaning. We get to know each person — and build care around who they are.</p>
            </Reveal>
            <div className="mt-10">
              <FeatureList items={[
                { title: "Long-term resident support", text: "Consistent, caring help with daily needs." },
                { title: "Daily comfort", text: "Personal routines and preferences respected." },
                { title: "Personalized care", text: "Plans that evolve as needs change." },
                { title: "Social interaction", text: "Friendships, conversation, and community." },
                { title: "Meaningful activities", text: "Programs shaped around residents' interests." },
                { title: "Family involvement", text: "Families welcomed as partners in care." },
              ]} />
            </div>
            <Reveal className="mt-10 flex flex-wrap gap-6">
              <Button href={routes.longTerm} arrow location="ltc-section">Explore Long-Term Care</Button>
            </Reveal>
          </div>
          <Media image="longTerm" className="order-1 min-h-[24rem] lg:order-2 lg:min-h-full" sizes="(min-width:1024px) 50vw, 100vw" />
        </div>
      </section>

      {/* ── 8 · ONE TEAM ─────────────────────────────────────────────────── */}
      <TeamSection />

      {/* ── 9 · LIFE AT ROCK ISLAND ──────────────────────────────────────── */}
      <section className="on-dark bg-navy-950 py-24 text-ivory md:py-32" aria-labelledby="life-title">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow">Life at Rock Island</p>
              <h2 id="life-title" className="mt-5 text-h2 text-ivory">Life Is About More Than Care.</h2>
            </Reveal>
            <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
              <p className="lede">Laughter at the dinner table. A visit from the grandkids. Music on a Sunday afternoon. These are the moments that make a place feel like home — and we work to create them every day.</p>
              <ArrowLink href={routes.amenities} location="life-section" className="mt-6">Discover Life Here</ArrowLink>
            </Reveal>
          </div>
          <div className="mt-16 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] md:grid-cols-4 md:gap-4">
            {([
              ["lifeActivities", "col-span-2 row-span-2", "Activities"],
              ["lifeFamily", "", "Family visits"],
              ["lifeDining", "", "Dining"],
              ["therapyPT", "", "Therapy"],
              ["lifeLounge", "", "Comfortable spaces"],
              ["lifeGarden", "col-span-2", "Outdoors"],
              ["team", "col-span-2", "Staff & residents"],
            ] as const).map(([img, cls, label], i) => (
              <Reveal key={img} delay={(i % 4) * 0.06} className={`group relative overflow-hidden ${cls}`}>
                <Media image={img} className="h-full w-full transition-transform duration-[1.6s] ease-[var(--ease-elegant)] group-hover:scale-[1.04]" showLabel={false} sizes="(min-width:768px) 25vw, 50vw" />
                <span className="absolute bottom-0 left-0 bg-gradient-to-t from-navy-950/80 to-transparent px-4 pb-3 pt-10 font-display text-lg text-ivory">{label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10 · AMENITIES ───────────────────────────────────────────────── */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="amenities-title">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Amenities" title={<span id="amenities-title">Comfortable Living. Thoughtful Details.</span>} lede="The little things matter. Our amenities are designed to make daily life easier, more comfortable, and more enjoyable." />
          <div className="mt-16"><AmenitiesGrid /></div>
          <Reveal className="mt-12 text-center"><Button href={routes.amenities} variant="outline" arrow location="amenities-section">See Amenities &amp; Life</Button></Reveal>
        </div>
      </section>

      {/* ── 11 · TESTIMONIALS ────────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── 12 · ADMISSIONS ──────────────────────────────────────────────── */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="admissions-title">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow">Admissions</p>
                <h2 id="admissions-title" className="mt-5 text-h2">Finding the Right Care Starts With a Conversation.</h2>
              </Reveal>
            </div>
            <Reveal className="space-y-5 text-stone-600 lg:col-span-6 lg:col-start-7" delay={0.1}>
              <p className="lede">Choosing care for yourself or someone you love is a significant decision. Our admissions team is here to make it clearer and calmer — with honest answers, patient guidance, and no pressure.</p>
              <p>Families can call or send an inquiry at any time, and we&apos;re glad to arrange a tour. When a loved one is in the hospital, our team works directly with the hospital&apos;s discharge planner or case manager to review the referral and coordinate a smooth transition.</p>
            </Reveal>
          </div>
          <div className="mt-16"><AdmissionsSteps /></div>
          <Reveal className="mt-12 flex flex-col gap-6 border border-beige-300 bg-white p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="font-display text-2xl text-navy-900">Ready to talk? We&apos;re here to help.</p>
              <p className="mt-1 text-sm text-stone-500">Admission is based on care needs, availability, and payment source. We&apos;ll walk you through each step.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href={routes.admissions} arrow location="admissions-section">Contact Admissions</Button>
              <Button href={routes.tour} variant="outline" location="admissions-section">Arrange a Tour</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 13 · REFERRAL PARTNERS ───────────────────────────────────────── */}
      <ReferralBand />

      {/* ── 14 · CAREERS ─────────────────────────────────────────────────── */}
      <CareersSection />

      {/* ── 15 · CONTACT ─────────────────────────────────────────────────── */}
      <ContactSection />
    </>
  );
}
