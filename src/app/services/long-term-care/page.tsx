import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { FeatureList } from "@/components/sections/Shared";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { ArrowLink } from "@/components/ui/Button";
import { getService, type Service } from "@/content/services";
import { routes } from "@/content/navigation";
import { pageMetadata } from "@/lib/seo";

const service = getService("long-term-care") as Service;

export const metadata: Metadata = pageMetadata({ title: service.seo.title, description: service.seo.description, path: `/services/${service.slug}` });

const rhythm = [
  { time: "Morning", title: "A gentle start", text: "Help with getting ready at a pace that suits each person, followed by breakfast and morning medications." },
  { time: "Midday", title: "Connection & nourishment", text: "Activities, conversation, and a shared meal — with room for quiet time for those who prefer it." },
  { time: "Afternoon", title: "Purpose & enjoyment", text: "Programs shaped around residents' interests, therapy when ordered, visits, and time outdoors in good weather." },
  { time: "Evening", title: "Comfort & rest", text: "Dinner, familiar routines, and attentive nursing care through the night." },
];

export default function LongTermCarePage() {
  return (
    <ServiceDetail service={service} secondaryImage="lifeFamily">
      <section className="bg-cream py-24 md:py-32" aria-labelledby="rhythm-title">
        <div className="container-x">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="eyebrow">The rhythm of the day</p>
              <h2 id="rhythm-title" className="mt-5 text-h2">Days that feel familiar — and full</h2>
            </div>
            <p className="lede lg:col-span-5 lg:col-start-8">Routines bring comfort. We work to honor each resident&apos;s preferences while offering opportunities for connection and enjoyment throughout the day.</p>
          </Reveal>
          <ol className="mt-16 grid gap-px border border-beige-300 bg-beige-300 sm:grid-cols-2 lg:grid-cols-4">
            {rhythm.map((r, i) => (
              <Reveal as="li" key={r.time} delay={i * 0.08} className="bg-ivory p-8">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-champagne-700">{r.time}</span>
                <h3 className="mt-4 font-display text-[1.5rem] leading-tight">{r.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-stone-600">{r.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-6 text-sm text-stone-500">Illustrative only — daily schedules are individualized and activity calendars are set by the facility.</Reveal>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32" aria-labelledby="family-title">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">Families &amp; comfort</p>
              <h2 id="family-title" className="mt-5 text-h2">Home is where your people are</h2>
              <p className="lede mt-6">Moving into long-term care is a big change for the whole family. We aim to make it feel less like a move away, and more like a new chapter together.</p>
            </Reveal>
            <div className="mt-10">
              <FeatureList items={[
                { title: "Family involvement", text: "Visits are encouraged, and families are invited to care conferences and celebrations." },
                { title: "Personal touches", text: "Photos, keepsakes, and favorite things help a room feel like one's own." },
                { title: "Comfort first", text: "Attention to rest, pain, nutrition, and the small comforts that make a difference." },
                { title: "Meaningful activities", text: "Music, games, faith, crafts, and conversation — chosen around residents' interests." },
              ]} />
            </div>
            <Reveal className="mt-10"><ArrowLink href={routes.amenities} location="ltc-family">See amenities &amp; life here</ArrowLink></Reveal>
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <Media image="lifeActivities" className="col-span-2 aspect-[16/10]" sizes="(min-width:1024px) 40vw, 100vw" />
              <Media image="lifeDining" className="aspect-square" showLabel={false} sizes="20vw" />
              <Media image="lifeGarden" className="aspect-square" showLabel={false} sizes="20vw" />
            </div>
          </Reveal>
        </div>
      </section>
    </ServiceDetail>
  );
}
