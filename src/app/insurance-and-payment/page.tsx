import type { Metadata } from "next";
import { Info, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VerifyBadge } from "@/components/ui/VerifyBadge";
import { FaqList } from "@/components/ui/Faq";
import { CtaBand } from "@/components/ui/CtaBand";
import { paymentOptions, insuranceDisclaimer } from "@/content/insurance";
import { insuranceFaqs } from "@/content/faqs";
import { routes } from "@/content/navigation";
import { site, telHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insurance & Payment Options",
  description:
    "How Medicare, Illinois Medicaid, managed care, commercial insurance, and private pay may apply to skilled nursing and long-term care. Verify coverage with us.",
  path: routes.insurance,
});

const verifySteps = [
  { title: "Gather your information", text: "Have insurance cards and plan names on hand. Please share policy details by phone rather than through online forms." },
  { title: "Call our admissions team", text: "We'll check current plan participation and, where possible, verify benefits and authorization requirements." },
  { title: "Review what to expect", text: "We'll explain likely coverage and any out-of-pocket responsibilities so you can plan with confidence." },
];

export default function InsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="Insurance & payment"
        title={<>Clear answers about <span className="italic text-champagne-700">coverage and costs.</span></>}
        lede="Understanding how care is paid for can feel complicated. We're here to explain your options in plain language and help you verify coverage before decisions are made."
        image="insurance"
        crumbs={[{ name: "Admissions", path: routes.admissions }, { name: "Insurance & Payment", path: routes.insurance }]}
        actions={<>
          <Button href={telHref(site.contact.admissionsPhone.e164)} arrow location="insurance-hero" icon={<Phone className="h-4 w-4" aria-hidden />}>Verify Coverage</Button>
          <Button href={routes.admissions} variant="outline" location="insurance-hero">Admissions Process</Button>
        </>}
      />

      {/* Disclaimer */}
      <section className="bg-ivory pb-4">
        <div className="container-x">
          <Reveal className="flex gap-4 border-l-2 border-champagne-500 bg-cream p-6 md:p-8">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-champagne-700" strokeWidth={1.5} aria-hidden />
            <p className="text-[0.95rem] leading-relaxed text-stone-700"><strong className="text-navy-900">Please note:</strong> {insuranceDisclaimer}</p>
          </Reveal>
        </div>
      </section>

      {/* Options */}
      <section className="bg-ivory py-20 md:py-28" aria-labelledby="options-title">
        <div className="container-x">
          <SectionHeading eyebrow="Payment sources" title={<span id="options-title">Common ways families pay for care.</span>} lede="Most residents use one or a combination of the following. Eligibility and benefits depend on the individual and the plan." />
          <div className="mt-16 space-y-px bg-beige-300">
            {paymentOptions.map((o, i) => (
              <Reveal key={o.id} delay={0.04 * i} className="grid gap-8 bg-white p-8 md:grid-cols-12 md:p-12">
                <div className="md:col-span-4">
                  <span className="font-display text-lg text-champagne-700">{String(i + 1).padStart(2, "0")}</span>
                  <h3 id={o.id} className="mt-2 scroll-mt-32 text-h3">{o.title}</h3>
                  <VerifyBadge verified={o.verified} label="Participation to be confirmed" className="mt-4" />
                </div>
                <div className="md:col-span-8">
                  <p className="font-display text-xl leading-snug text-navy-800 md:text-2xl">{o.summary}</p>
                  <ul className="mt-6 space-y-3">
                    {o.details.map((d) => (
                      <li key={d} className="flex gap-3 text-stone-600"><span className="mt-3 h-px w-4 shrink-0 bg-champagne-500" aria-hidden />{d}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Verify steps */}
      <section className="on-dark bg-navy-900 py-24 text-ivory md:py-32" aria-labelledby="verify-title">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Before admission</p>
            <h2 id="verify-title" className="mt-5 text-h2 text-ivory">Let us help verify your benefits.</h2>
          </Reveal>
          <ol className="mt-14 grid gap-px bg-ivory/10 md:grid-cols-3">
            {verifySteps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08} className="bg-navy-900 p-8 md:p-10">
                <span className="font-display text-5xl text-champagne-300/80">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 font-display text-2xl text-ivory">{s.title}</h3>
                <p className="mt-3 text-ivory/70">{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-12 flex flex-wrap gap-4">
            <Button href={telHref(site.contact.admissionsPhone.e164)} variant="gold" location="insurance-verify" icon={<Phone className="h-4 w-4" aria-hidden />}>Call {site.contact.admissionsPhone.display}</Button>
            <Button href={`${routes.admissions}#inquiry`} variant="outline-light" location="insurance-verify">Request a Callback</Button>
          </Reveal>
        </div>
      </section>

      {/* Resources */}
      <section className="bg-cream py-24 md:py-28" aria-labelledby="resources-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-5" eyebrow="Helpful resources" title={<span id="resources-title">Learn more from official sources.</span>} lede="These public resources explain coverage rules in detail. Our team is happy to help you interpret how they apply." />
          <ul className="grid gap-px bg-beige-300 sm:grid-cols-2 lg:col-span-7">
            {[
              { label: "Medicare.gov — Skilled nursing facility care", href: "https://www.medicare.gov/coverage/skilled-nursing-facility-care" },
              { label: "Medicare Care Compare", href: "https://www.medicare.gov/care-compare/" },
              { label: "Illinois Department of Healthcare and Family Services", href: "https://hfs.illinois.gov/" },
              { label: "Illinois ABE — Apply for benefits", href: "https://abe.illinois.gov/" },
              { label: "U.S. Department of Veterans Affairs — Long-term care", href: "https://www.va.gov/health-care/about-va-health-benefits/long-term-care/" },
              { label: "Illinois Senior Health Insurance Program (SHIP)", href: "https://ilaging.illinois.gov/ship.html" },
            ].map((r) => (
              <li key={r.href} className="bg-cream">
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="group flex h-full items-start justify-between gap-4 bg-ivory p-6 transition-colors hover:bg-white">
                  <span className="text-navy-900 group-hover:text-champagne-700">{r.label}</span>
                  <span className="text-champagne-600" aria-hidden>↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="ins-faq-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-4" eyebrow="Questions" title={<span id="ins-faq-title">Coverage FAQ</span>} />
          <div className="lg:col-span-8"><FaqList faqs={insuranceFaqs} /></div>
        </div>
      </section>

      <CtaBand title="Questions about coverage? Let's talk." text="Our admissions and business office team can walk you through your options and help you understand what to expect." location="insurance-cta" />
    </>
  );
}
