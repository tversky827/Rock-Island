import type { Metadata } from "next";
import { ClipboardCheck, FileText, HeartHandshake, Hospital, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button, ArrowLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Media } from "@/components/ui/Media";
import { FaqList } from "@/components/ui/Faq";
import { CtaBand } from "@/components/ui/CtaBand";
import { AdmissionsSteps } from "@/components/sections/Shared";
import { AdmissionsForm } from "@/components/forms/Forms";
import { CallInstead } from "@/components/forms/FormKit";
import { admissionsFaqs } from "@/content/faqs";
import { routes } from "@/content/navigation";
import { site, telHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Admissions Process",
  description:
    "How admissions work at Rock Island Nursing Home, from your first call or tour to hospital referrals and admission day. Serving families across the Quad Cities.",
  path: routes.admissions,
});

const expectations = [
  { icon: HeartHandshake, title: "A real conversation", text: "We start by listening. Tell us about your loved one, what has changed, and what you hope care will look like." },
  { icon: ClipboardCheck, title: "A clinical review", text: "Our team reviews care needs — usually with information from the hospital or physician — to confirm we can meet them well." },
  { icon: ShieldCheck, title: "Clarity on coverage", text: "We'll explain how Medicare, Medicaid, insurance, or private pay may apply, and what you can expect to be responsible for." },
  { icon: FileText, title: "Simple paperwork", text: "We walk through admission documents with you and answer questions so nothing feels rushed or confusing." },
];

const bring = [
  "Photo identification and insurance cards (Medicare, Medicaid, and/or supplemental)",
  "Power of attorney or guardianship documents, if applicable",
  "A current list of medications (the hospital typically provides discharge orders)",
  "Comfortable, washable clothing and non-slip footwear, labeled with the resident's name",
  "Eyeglasses, hearing aids, dentures, and mobility aids",
  "A few personal touches — photographs, a favorite blanket, or a cherished keepsake",
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title={<>Finding the right care starts with <span className="italic text-champagne-700">a conversation.</span></>}
        lede="Whether you're planning ahead, comparing options, or preparing for a hospital discharge, our admissions team will guide you through each step with patience and clear answers."
        image="admissions"
        crumbs={[{ name: "Admissions", path: routes.admissions }]}
        actions={<>
          <Button href="#inquiry" arrow location="admissions-hero">Contact Admissions</Button>
          <Button href={telHref(site.contact.admissionsPhone.e164)} variant="outline" location="admissions-hero" icon={<Phone className="h-4 w-4" aria-hidden />}>{site.contact.admissionsPhone.display}</Button>
        </>}
      />

      {/* Process */}
      <section className="bg-cream py-24 md:py-32" aria-labelledby="process-title">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title={<span id="process-title">Three simple steps to begin.</span>} lede="Every situation is different, but the path to admission generally follows the same calm, coordinated rhythm." />
          <div className="mt-16"><AdmissionsSteps /></div>
          <Reveal className="mt-8 text-sm text-stone-500">Admission is based on an assessment of individual care needs, bed availability, and payment source. We&apos;ll always be clear about where things stand.</Reveal>
        </div>
      </section>

      {/* Two pathways */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="pathways-title">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Two ways to begin" title={<span id="pathways-title">From home, or from the hospital.</span>} />
          <div className="mt-16 grid gap-px bg-beige-300 md:grid-cols-2">
            <Reveal className="bg-white p-10 md:p-14">
              <HeartHandshake className="h-8 w-8 text-champagne-600" strokeWidth={1.3} aria-hidden />
              <h3 className="mt-6 text-h3">For families planning ahead</h3>
              <p className="mt-4 text-stone-600">If you&apos;re exploring long-term care, respite, or a future rehabilitation stay, start with a call or a tour. We&apos;ll answer questions about daily life, care, and costs, and help you understand when and how to move forward — on your timeline.</p>
              <div className="mt-8 flex flex-wrap gap-5">
                <Button href={routes.tour} size="sm" location="pathway-family">Schedule a Tour</Button>
                <ArrowLink href={routes.insurance} location="pathway-family">Insurance &amp; payment</ArrowLink>
              </div>
            </Reveal>
            <Reveal className="bg-white p-10 md:p-14" delay={0.1}>
              <Hospital className="h-8 w-8 text-champagne-600" strokeWidth={1.3} aria-hidden />
              <h3 className="mt-6 text-h3">When a loved one is in the hospital</h3>
              <p className="mt-4 text-stone-600">Let the hospital&apos;s discharge planner or case manager know you&apos;d like Rock Island Nursing Home considered. They&apos;ll send the referral to our admissions team through a secure channel, and we&apos;ll coordinate directly with them — and keep you informed — as we review it.</p>
              <div className="mt-8 flex flex-wrap gap-5">
                <Button href={routes.referrals} size="sm" location="pathway-hospital">Referral Information</Button>
                <ArrowLink href={telHref(site.contact.admissionsPhone.e164)} location="pathway-hospital">Call admissions</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="on-dark bg-navy-900 py-24 text-ivory md:py-32" aria-labelledby="expect-title">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">What families can expect</p>
            <h2 id="expect-title" className="mt-5 text-h2 text-ivory">Guidance, not pressure.</h2>
            <p className="lede mt-6">Our role is to help you make an informed decision — even if that decision is that another setting is a better fit.</p>
          </Reveal>
          <ul className="grid gap-px bg-ivory/10 sm:grid-cols-2 lg:col-span-8">
            {expectations.map((e, i) => (
              <Reveal as="li" key={e.title} delay={i * 0.06} className="bg-navy-900 p-8">
                <e.icon className="h-7 w-7 text-champagne-300" strokeWidth={1.3} aria-hidden />
                <h3 className="mt-5 font-display text-2xl text-ivory">{e.title}</h3>
                <p className="mt-3 text-ivory/70">{e.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* What to bring */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="bring-title">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Media image="lifeLounge" className="aspect-[4/5] w-full" rounded sizes="(min-width:1024px) 40vw, 100vw" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow="Preparing for admission day" title={<span id="bring-title">What to bring.</span>} lede="Our team will share a complete checklist before arrival. In general, families find it helpful to gather the following:" />
            <ul className="mt-10 divide-y divide-beige-300 border-y border-beige-300">
              {bring.map((b, i) => (
                <Reveal as="li" key={b} delay={i * 0.04} className="flex gap-5 py-4">
                  <span className="font-display text-xl text-champagne-700">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-stone-700">{b}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section id="inquiry" className="scroll-mt-28 bg-cream py-24 md:py-32" aria-labelledby="inquiry-title">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Request information" title={<span id="inquiry-title">Contact our admissions team.</span>} lede="Share a few details and we'll reach out to talk through your questions. There's no obligation." />
            <div className="mt-10 space-y-4">
              <CallInstead label="Call admissions" />
              <p className="text-sm text-stone-500">{site.hours.admissions}</p>
            </div>
          </div>
          <Reveal className="bg-white p-7 shadow-soft sm:p-10 md:p-12 lg:col-span-8">
            <AdmissionsForm />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="faq-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-4" eyebrow="Questions" title={<span id="faq-title">Admissions FAQ</span>} />
          <div className="lg:col-span-8"><FaqList faqs={admissionsFaqs} /></div>
        </div>
      </section>

      <CtaBand title="Seeing is believing." text="The best way to know if a place feels right is to visit. Come meet our team, see our community, and ask anything you'd like." location="admissions-cta" />
    </>
  );
}
