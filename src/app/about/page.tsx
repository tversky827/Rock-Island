import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Button, ArrowLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/ui/CtaBand";
import { LogoMark } from "@/components/brand/Logo";
import { TeamSection, FeatureList } from "@/components/sections/Shared";
import { routes } from "@/content/navigation";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Our Nursing Home in Rock Island",
  description:
    "Our philosophy: dignity, compassion, respect, and personal attention for every resident, with families as partners in care across the Quad Cities.",
  path: routes.about,
});

const commitments = [
  { word: "Dignity", text: "We will protect each resident's privacy, choices, and sense of self in every interaction — from personal care to everyday conversation." },
  { word: "Compassion", text: "We will meet people with patience and warmth, especially on the hard days, and remember that kindness is part of clinical care." },
  { word: "Respect", text: "We will honor each person's history, culture, faith, and preferences, and involve residents in decisions about their own care." },
  { word: "Personal attention", text: "We will take the time to know each resident as an individual — their routines, their stories, and what makes a day feel like their own." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Rock Island Nursing Home"
        title={<>Care That Begins With <span className="italic text-champagne-700">Knowing the Person.</span></>}
        lede="We are a skilled nursing and rehabilitation community in Rock Island, Illinois, built on a simple conviction: people heal, live, and thrive best when they feel genuinely cared for."
        image="about"
        crumbs={[{ name: "About Us", path: routes.about }]}
        actions={<>
          <Button href={routes.tour} arrow location="about-hero">Schedule a Tour</Button>
          <Button href={routes.services} variant="outline" location="about-hero">Our Services</Button>
        </>}
      />

      {/* Philosophy */}
      <section className="relative overflow-hidden bg-navy-900 py-24 text-ivory on-dark md:py-32" aria-labelledby="philosophy-title">
        <LogoMark tone="light" className="pointer-events-none absolute -left-20 top-1/2 h-[120%] w-auto -translate-y-1/2 opacity-[0.04]" />
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Our philosophy</p>
            <h2 id="philosophy-title" className="mt-5 text-h2 text-ivory">Exceptional care starts with genuine compassion.</h2>
          </Reveal>
          <Reveal className="space-y-6 text-lg leading-relaxed text-ivory/80 lg:col-span-7 lg:col-start-6" delay={0.1}>
            <p className="font-display text-[1.7rem] leading-snug text-champagne-200 md:text-[2rem]">
              Every resident deserves to feel valued, respected, supported, and at home.
            </p>
            <p>Clinical excellence and human kindness are not separate goals. A nurse who notices that a resident seems quieter than usual, a therapist who connects an exercise to a grandchild&apos;s upcoming visit, an aide who remembers exactly how someone takes their coffee — these are the moments where good care becomes great care.</p>
            <p>We ask everyone on our team to bring both: the skill to deliver care safely and well, and the heart to deliver it in a way that makes people feel seen.</p>
          </Reveal>
        </div>
      </section>

      {/* Commitments */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="commitments-title">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Our commitment to residents" title={<span id="commitments-title">Four Promises We Work to Keep Every Day.</span>}
            lede="These aren't slogans on a wall. They're the standards we hold ourselves to, and the ones we invite families to hold us to as well." />
          <ol className="mt-16 grid gap-px bg-beige-300 md:grid-cols-2 lg:grid-cols-4">
            {commitments.map((c, i) => (
              <Reveal as="li" key={c.word} delay={i * 0.08} className="group bg-ivory p-9 transition-colors duration-500 hover:bg-white">
                <span className="font-display text-lg text-stone-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-[2rem] leading-tight text-navy-900">{c.word}</h3>
                <span className="mt-5 block h-px w-10 bg-champagne-500 transition-all duration-700 group-hover:w-20" aria-hidden />
                <p className="mt-5 text-[0.97rem] leading-relaxed text-stone-600">{c.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Compassionate care + dignity */}
      <section className="bg-cream py-24 md:py-32" aria-labelledby="compassion-title">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-5">
            <Media image="nursing" className="aspect-[4/5] w-full" sizes="(min-width:1024px) 40vw, 100vw" />
            <div className="absolute -bottom-6 -right-6 -z-10 hidden h-full w-full border border-champagne-400/60 lg:block" aria-hidden />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow">Compassionate care</p>
              <h2 id="compassion-title" className="mt-5 text-h2">Clinical Skill, Delivered With Warmth.</h2>
              <p className="lede mt-6">Whether someone is with us for a few weeks of rehabilitation or for many years, our approach is the same: understand the whole person, plan care around them, and keep communication open.</p>
            </Reveal>
            <div className="mt-10">
              <FeatureList items={[
                { title: "Individualized care plans", text: "Built from physician orders, personal history, and each resident's own goals." },
                { title: "Coordinated teams", text: "Nursing, therapy, social services, and dietary staff working from a shared plan." },
                { title: "Attentive observation", text: "Small changes noticed early and communicated to physicians and families." },
                { title: "Comfort as a priority", text: "Pain, rest, and emotional well-being treated as essential parts of care." },
              ]} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32" aria-labelledby="dignity-title">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Reveal>
              <p className="eyebrow">Resident dignity</p>
              <h2 id="dignity-title" className="mt-5 text-h2">The Right to Be <span className="italic text-champagne-700">Yourself</span>, Always.</h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 space-y-5 text-stone-600">
              <p>Needing help with daily life does not change who a person is. Residents here are encouraged to make choices about their day — when to wake, what to wear, which activities to join, and how they want their care delivered.</p>
              <p>We knock before entering. We explain before we help. We speak to residents, not about them. And we treat personal care as the private, respectful moment it should be.</p>
            </Reveal>
          </div>
          <Reveal className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8" delay={0.1}>
            <Media image="lifeLounge" className="aspect-[4/5] w-full" rounded sizes="(min-width:1024px) 40vw, 100vw" />
          </Reveal>
        </div>
      </section>

      {/* Family involvement */}
      <section className="bg-beige-100" aria-labelledby="family-title">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Media image="lifeFamily" className="min-h-[22rem] lg:min-h-full" sizes="(min-width:1024px) 50vw, 100vw" />
          <div className="px-5 py-24 sm:px-10 md:py-32 lg:px-16 xl:pr-[max(3rem,calc((100vw-84rem)/2+3rem))]">
            <Reveal>
              <p className="eyebrow">Family involvement</p>
              <h2 id="family-title" className="mt-5 text-h2">Families Are Partners, Not Visitors.</h2>
              <p className="lede mt-6">You know your loved one better than anyone. We want that knowledge — and we want you to feel informed, welcome, and heard.</p>
            </Reveal>
            <ul className="mt-10 space-y-5">
              {[
                ["Care conferences", "Opportunities to review the care plan with the interdisciplinary team and share what matters most."],
                ["Open communication", "A clear point of contact for questions, and timely updates when something changes."],
                ["A welcoming door", "Visits, shared meals, and celebrations are encouraged as part of everyday life."],
                ["Support for you, too", "Social services can help families navigate transitions, resources, and decisions."],
              ].map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 0.06} className="border-b border-beige-300 pb-5">
                  <h3 className="font-sans text-[0.95rem] font-semibold text-navy-900">{t}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-stone-600">{d}</p>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-10"><Button href={routes.admissions} arrow location="about-family">Talk With Our Team</Button></Reveal>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="community-title">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Community connection" title={<span id="community-title">Rooted in Rock Island. Caring for the Quad Cities.</span>}
              lede="Our residents are neighbors — people who raised families, built careers, and made lives along the Mississippi. Staying connected to that community matters." />
            <Reveal delay={0.1} className="mt-6 space-y-5 text-stone-600">
              <p>We serve families from Rock Island, Moline, East Moline, Milan, Silvis, and across the river in Davenport and Bettendorf, and we value working alongside the area&apos;s hospitals, physicians, and community organizations.</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8"><ArrowLink href={routes.community} location="about-community">Serving the Quad Cities</ArrowLink></Reveal>
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <Media image="community" className="aspect-[5/4] w-full" sizes="(min-width:1024px) 40vw, 100vw" />
          </Reveal>
        </div>
      </section>

      <TeamSection showLink={false} />

      <CtaBand title="The best way to know us is to visit." text="Walk our halls, meet our team, and ask every question on your mind. We'd be glad to show you around." location="about-cta" />
    </>
  );
}
