import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { FeatureList } from "@/components/sections/Shared";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import { ArrowLink } from "@/components/ui/Button";
import { VerifyBadge } from "@/components/ui/VerifyBadge";
import { getService, type Service } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

const service = getService("short-term-rehabilitation") as Service;

export const metadata: Metadata = pageMetadata({ title: service.seo.title, description: service.seo.description, path: `/services/${service.slug}` });

const journey = [
  { title: "Evaluation", text: "Soon after arrival, therapists and nurses complete their assessments to understand strengths, needs, and safety considerations." },
  { title: "Goal setting", text: "Together with the guest and family, we define goals in everyday terms — the activities they want to return to." },
  { title: "Therapy & nursing", text: "Therapy sessions and nursing care work in step, so skills practiced in therapy are reinforced throughout the day." },
  { title: "Progress reviews", text: "The interdisciplinary team meets regularly to review progress and adjust the plan as needs change." },
  { title: "Discharge planning", text: "Planning for the next step begins early, with caregiver education, equipment recommendations, and coordinated follow-up." },
];

const disciplines = ["physical-therapy", "occupational-therapy", "speech-therapy"].map((s) => getService(s)).filter((s): s is Service => !!s);

export default function RehabPage() {
  return (
    <ServiceDetail service={service} secondaryImage="therapyOT">
      {/* Recovery journey */}
      <section className="on-dark bg-navy-900 py-24 text-ivory md:py-32" aria-labelledby="journey-title">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">The recovery journey</p>
            <h2 id="journey-title" className="mt-5 text-h2 text-ivory">A clear path from hospital to home</h2>
            <p className="lede mt-6">Every recovery is different, but each stay follows a thoughtful structure — so guests and families always know where they are and what comes next.</p>
          </Reveal>
          <ol className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
            <span className="absolute left-0 right-0 top-[1.4rem] hidden h-px bg-gradient-to-r from-champagne-400/70 via-champagne-400/40 to-transparent md:block" aria-hidden />
            {journey.map((j, i) => (
              <Reveal as="li" key={j.title} delay={i * 0.08} className="relative">
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-champagne-300/70 bg-navy-900 font-display text-lg text-champagne-300">{i + 1}</span>
                <h3 className="mt-6 font-display text-[1.5rem] leading-tight text-ivory">{j.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ivory/70">{j.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Therapy disciplines */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="disciplines-title">
        <div className="container-x">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="eyebrow">Therapy, where offered</p>
              <h2 id="disciplines-title" className="mt-5 text-h2">Three disciplines. One coordinated plan.</h2>
            </div>
            <VerifyBadge verified={disciplines.every((d) => d.verified)} label="Therapy disciplines pending verification" />
          </Reveal>
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {disciplines.map((d, i) => (
              <Reveal as="li" key={d.slug} delay={i * 0.08} className="group flex flex-col bg-white shadow-soft">
                <Media image={d.image} className="aspect-[4/3] w-full" showLabel={false} sizes="(min-width:768px) 30vw, 100vw" />
                <div className="flex flex-1 flex-col p-8">
                  <Icon name={d.icon} className="h-6 w-6 text-champagne-600" />
                  <h3 className="mt-4 text-h3">{d.title}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-stone-600">{d.summary}</p>
                  <ArrowLink href={`/services/${d.slug}`} location="rehab-disciplines" className="mt-6">Learn more<span className="sr-only"> about {d.title}</span></ArrowLink>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Environment, personalization, team, family */}
      <section className="bg-beige-100 py-24 md:py-32" aria-labelledby="environment-title">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">Inside rehabilitation</p>
              <h2 id="environment-title" className="mt-5 text-h2">Encouragement at every step</h2>
              <p className="lede mt-6">Recovery takes effort, patience, and a team that believes in you. Here is what guests and families can expect during a rehabilitation stay.</p>
            </Reveal>
            <div className="mt-10">
              <FeatureList items={[
                { title: "A supportive therapy environment", text: "Space and equipment for practicing real-life movements, with therapists close at hand." },
                { title: "Personalized treatment", text: "Sessions adapted to each person's energy, comfort, and progress from day to day." },
                { title: "An interdisciplinary approach", text: "Therapists, nurses, physicians, and social services share observations and plan together." },
                { title: "Family communication", text: "Care conferences and updates keep families informed and ready to help." },
              ]} />
            </div>
          </div>
          <Reveal className="relative lg:col-span-5 lg:col-start-8" delay={0.1}>
            <Media image="therapyPT" className="aspect-[4/5] w-full" rounded sizes="(min-width:1024px) 40vw, 100vw" />
            <div className="absolute -bottom-5 -right-5 -z-0 hidden h-28 w-28 border border-champagne-500/60 lg:block" aria-hidden />
          </Reveal>
        </div>
      </section>
    </ServiceDetail>
  );
}
