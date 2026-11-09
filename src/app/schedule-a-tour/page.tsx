import type { Metadata } from "next";
import { CalendarCheck, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button, ArrowLink } from "@/components/ui/Button";
import { TourForm } from "@/components/forms/Forms";
import { CallInstead } from "@/components/forms/FormKit";
import { routes } from "@/content/navigation";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Schedule a Tour in Rock Island, IL",
  description:
    "Request a personal tour of Rock Island Nursing Home. Meet our team and ask about skilled nursing, rehabilitation, and long-term care in the Quad Cities.",
  path: routes.tour,
});

const expect = [
  { title: "A warm welcome", text: "A member of our team will greet you and make time for your questions — there's no rush." },
  { title: "A look around", text: "See common areas, dining, therapy spaces, and a resident room, as availability allows." },
  { title: "Conversation, not a sales pitch", text: "Talk about your loved one's needs, what matters most to your family, and how care is coordinated." },
  { title: "Clear next steps", text: "Leave with information on admissions, coverage questions, and how to reach us afterward." },
];

export default function TourPage() {
  const scheduler = site.integrations.tourSchedulerUrl;
  return (
    <>
      <PageHero
        eyebrow="Schedule a tour"
        title={<>Come See What <span className="italic text-champagne-700">Care Feels Like</span> Here.</>}
        lede="A visit is the best way to get to know a community. Tell us when you'd like to come, and we'll reach out to confirm a time that works for you."
        image="lifeLounge"
        crumbs={[{ name: "Admissions", path: routes.admissions }, { name: "Schedule a Tour", path: routes.tour }]}
        actions={<>
          <Button href="#tour-form" arrow location="tour-hero">Request a Tour</Button>
          {scheduler && <Button href={scheduler} variant="outline" location="tour-hero" icon={<ExternalLink className="h-4 w-4" aria-hidden />}>Book Online</Button>}
        </>}
      />

      <section id="tour-form" className="scroll-mt-28 bg-cream py-24 md:py-32" aria-labelledby="tour-form-title">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Reveal className="bg-white p-7 shadow-soft sm:p-10 md:p-12 lg:col-span-7">
            <p className="eyebrow">Tour request</p>
            <h2 id="tour-form-title" className="mt-5 text-h2">Request Your Visit.</h2>
            <p className="mt-3 text-stone-500">Requested dates and times are not confirmed until a member of our team contacts you.</p>
            {scheduler && (
              <div className="mt-6 flex flex-wrap items-center gap-4 border border-beige-300 bg-cream px-5 py-4 text-sm text-stone-700">
                <CalendarCheck className="h-5 w-5 text-champagne-700" aria-hidden />
                <span>Prefer to pick a time yourself?</span>
                <ArrowLink href={scheduler} location="tour-form">Book online</ArrowLink>
              </div>
            )}
            <div className="mt-10"><TourForm /></div>
          </Reveal>

          <aside className="space-y-10 lg:col-span-5" aria-label="About your tour">
            <Reveal>
              <h2 className="font-display text-[2rem] leading-tight text-navy-900">What to expect on your tour</h2>
              <ol className="mt-8 space-y-6">
                {expect.map((e, i) => (
                  <li key={e.title} className="flex gap-5 border-b border-beige-300 pb-6">
                    <span className="font-display text-3xl leading-none text-champagne-600">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-sans text-[0.95rem] font-semibold text-navy-900">{e.title}</h3>
                      <p className="mt-1.5 text-[0.95rem] text-stone-600">{e.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.1}>
              <CallInstead label="Prefer to schedule by phone?" />
              <p className="mt-4 text-sm text-stone-500">{site.hours.tours}</p>
            </Reveal>
            <Reveal delay={0.15} className="on-dark bg-navy-900 p-8 text-ivory">
              <p className="font-display text-2xl leading-snug">Planning a hospital discharge?</p>
              <p className="mt-3 text-sm text-ivory/70">If your loved one is currently in the hospital, our admissions team can work directly with the discharge planner — a tour isn&apos;t required to begin.</p>
              <div className="mt-6 flex flex-wrap gap-5">
                <ArrowLink href={routes.admissions} location="tour-sidebar">Admissions process</ArrowLink>
                <ArrowLink href={routes.referrals} location="tour-sidebar">Referrals</ArrowLink>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
