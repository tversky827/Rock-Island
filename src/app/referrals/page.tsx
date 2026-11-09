import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Lock, Phone, Printer, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { VerifyBadge } from "@/components/ui/VerifyBadge";
import { FaqList } from "@/components/ui/Faq";
import { ReferralCallbackForm } from "@/components/forms/Forms";
import { referralFaqs } from "@/content/faqs";
import { publishedServices } from "@/content/services";
import { routes } from "@/content/navigation";
import { site, telHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Hospital & Physician Referrals",
  description:
    "For discharge planners, case managers, and physicians: secure referral channels and coordinated transitions to skilled nursing and rehab in Rock Island, IL.",
  path: routes.referrals,
});

const steps = [
  { title: "Contact admissions", text: "Call our admissions line or request a callback. Let us know the level of care needed and the anticipated discharge timing — no patient details through the website." },
  { title: "Send clinical information securely", text: "Share the referral packet through our secure referral platform or secure fax, as arranged with our team." },
  { title: "Clinical & financial review", text: "Our team reviews care needs, orders, and payer information to confirm we can appropriately support the patient." },
  { title: "Decision & coordination", text: "We communicate our decision to you promptly and coordinate transport timing, orders, medications, and any equipment needs." },
  { title: "Transition & follow-through", text: "We welcome the patient, connect with the family, and keep referring teams updated as appropriate and permitted." },
];

const packet = [
  "Face sheet / demographic & payer information",
  "History & physical and recent progress notes",
  "Current medication list and orders",
  "Therapy evaluations and notes, if applicable",
  "Wound, IV, or special treatment orders, if applicable",
  "Recent labs, imaging, and isolation status, as relevant",
];

export default function ReferralsPage() {
  const portal = site.integrations.secureReferralUrl;
  const clinicalServices = publishedServices.filter((s) => ["nursing", "rehabilitation", "clinical"].includes(s.category));
  return (
    <>
      <PageHero
        variant="immersive"
        eyebrow="Hospital & physician referrals"
        title={<>Your trusted partner in the <span className="italic text-champagne-300">continuum of care.</span></>}
        lede="For discharge planners, case managers, social workers, physicians, and healthcare organizations: responsive communication, careful review, and coordinated transitions."
        image="referrals"
        crumbs={[{ name: "Referrals", path: routes.referrals }]}
        actions={<>
          <Button href={portal || "#refer"} variant="gold" arrow location="referrals-hero">Submit a Referral</Button>
          <Button href={telHref(site.contact.admissionsPhone.e164)} variant="outline-light" location="referrals-hero" icon={<Phone className="h-4 w-4" aria-hidden />}>{site.contact.admissionsPhone.display}</Button>
        </>}
      />

      {/* Secure channels */}
      <section id="refer" className="scroll-mt-28 bg-ivory py-24 md:py-32" aria-labelledby="channels-title">
        <div className="container-x">
          <SectionHeading eyebrow="Make a referral" title={<span id="channels-title">Secure ways to refer.</span>} lede="To protect patient privacy, clinical information is never collected through ordinary website forms. Please use one of these channels." />
          <div className="mt-14 grid gap-px bg-beige-300 md:grid-cols-3">
            <Reveal className="flex flex-col bg-white p-8 md:p-10">
              <Phone className="h-7 w-7 text-champagne-600" strokeWidth={1.3} aria-hidden />
              <h3 className="mt-5 text-h3">Call admissions</h3>
              <p className="mt-3 flex-1 text-stone-600">The fastest route for time-sensitive placements. Speak directly with our admissions team.</p>
              <TrackedLink href={telHref(site.contact.admissionsPhone.e164)} location="referral-channels" className="mt-6 font-display text-2xl text-navy-900 hover:text-champagne-700">{site.contact.admissionsPhone.display}</TrackedLink>
              <VerifyBadge verified={site.contact.admissionsPhone.verified} label="Number pending" className="mt-3 self-start" />
            </Reveal>
            <Reveal className="flex flex-col bg-white p-8 md:p-10" delay={0.08}>
              <ShieldCheck className="h-7 w-7 text-champagne-600" strokeWidth={1.3} aria-hidden />
              <h3 className="mt-5 text-h3">Secure referral portal</h3>
              {portal ? (
                <>
                  <p className="mt-3 flex-1 text-stone-600">Send referral packets through our secure electronic referral platform.</p>
                  <Button href={portal} size="sm" className="mt-6 self-start" location="referral-channels" icon={<ExternalLink className="h-4 w-4" aria-hidden />}>Open Secure Portal</Button>
                </>
              ) : (
                <>
                  <p className="mt-3 flex-1 text-stone-600">An electronic referral integration will be available here. Until then, please call or use secure fax.</p>
                  <VerifyBadge verified={false} label="Integration placeholder" className="mt-6 self-start" />
                </>
              )}
            </Reveal>
            <Reveal className="flex flex-col bg-white p-8 md:p-10" delay={0.16}>
              <Printer className="h-7 w-7 text-champagne-600" strokeWidth={1.3} aria-hidden />
              <h3 className="mt-5 text-h3">Secure fax</h3>
              <p className="mt-3 flex-1 text-stone-600">Fax referral packets to our admissions office. Please call to confirm receipt for urgent referrals.</p>
              <p className="mt-6 font-display text-2xl text-navy-900">{site.contact.referralFax.display}</p>
              <VerifyBadge verified={site.contact.referralFax.verified} label="Number pending" className="mt-3 self-start" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-cream py-24 md:py-32" aria-labelledby="ref-process-title">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Referral process" title={<span id="ref-process-title">From first call to arrival.</span>} lede="A clear, predictable process — so you can plan discharges with confidence." />
          </div>
          <ol className="relative lg:col-span-8">
            <span className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-champagne-400/60" aria-hidden />
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="relative flex gap-8 pb-10 last:pb-0">
                <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-champagne-500 bg-cream font-display text-lg text-navy-900">{i + 1}</span>
                <div className="pt-1.5">
                  <h3 className="font-display text-2xl text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-stone-600">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Packet + services */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="packet-title">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Referral packet</p>
            <h2 id="packet-title" className="mt-5 text-h2">Information typically requested.</h2>
            <p className="mt-5 text-stone-600">Send only through secure channels. Our team will let you know if anything additional is needed.</p>
            <ul className="mt-8 divide-y divide-beige-300 border-y border-beige-300">
              {packet.map((p) => (<li key={p} className="flex items-center gap-4 py-4 text-stone-700"><Lock className="h-4 w-4 shrink-0 text-champagne-600" aria-hidden />{p}</li>))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Services we review for</p>
            <h2 className="mt-5 text-h2">Clinical capabilities.</h2>
            <p className="mt-5 text-stone-600">Each referral is reviewed individually. Listed services are pending facility verification; please call to confirm specific clinical needs.</p>
            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {clinicalServices.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`} className="flex items-center justify-between border border-beige-300 bg-white px-4 py-3 text-navy-900 transition-colors hover:border-champagne-500 hover:text-champagne-700">{s.title}<span aria-hidden className="text-champagne-600">→</span></Link></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Callback form */}
      <section id="callback" className="scroll-mt-28 bg-navy-950 py-24 text-ivory md:py-32" aria-labelledby="callback-title">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Reveal className="on-dark lg:col-span-4">
            <p className="eyebrow">Request a callback</p>
            <h2 id="callback-title" className="mt-5 text-h2 text-ivory">We&apos;ll call you back.</h2>
            <p className="lede mt-6">Leave your professional contact details and our admissions team will reach out to receive the referral through a secure channel.</p>
            <p className="mt-6 text-sm text-ivory/60">This form collects only your information as the referring professional. It is not designed to receive protected health information.</p>
          </Reveal>
          <Reveal className="bg-ivory p-7 text-ink sm:p-10 md:p-12 lg:col-span-8" delay={0.1}>
            <ReferralCallbackForm />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="ref-faq-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-4" eyebrow="For referral partners" title={<span id="ref-faq-title">Common questions</span>} />
          <div className="lg:col-span-8"><FaqList faqs={referralFaqs} /></div>
        </div>
      </section>
    </>
  );
}
