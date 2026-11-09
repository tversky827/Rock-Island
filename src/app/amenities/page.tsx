import type { Metadata } from "next";
import { Clock, Users } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/ui/CtaBand";
import { VerifyBadge } from "@/components/ui/VerifyBadge";
import { AmenitiesGrid, TestimonialsSection } from "@/components/sections/Shared";
import { Gallery } from "@/components/sections/Gallery";
import { amenityGroups, galleryImages } from "@/content/amenities";
import { routes } from "@/content/navigation";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Amenities & Life at Rock Island",
  description:
    "Daily life at Rock Island Nursing Home in Rock Island, IL: dining, comfortable living spaces, activities, outdoor areas, spiritual support, and family visits.",
  path: routes.amenities,
});

const rhythm = [
  { time: "Morning", title: "A gentle start", text: "Residents wake on their own schedule where possible, with help getting ready and a warm breakfast to begin the day." },
  { time: "Midday", title: "Therapy & connection", text: "Therapy sessions, a shared lunch, and time for conversation with friends and neighbors." },
  { time: "Afternoon", title: "Purpose & enjoyment", text: "Group programs, music, games, creative projects, quiet reading, or time outdoors in good weather." },
  { time: "Evening", title: "Rest & comfort", text: "Dinner, family visits, a favorite show, and a calm, unhurried transition to rest." },
];

const galleryLayout = ["col-span-2 row-span-2", "", "", "", "", "col-span-2", "", ""];

export default function AmenitiesPage() {
  return (
    <>
      <PageHero
        variant="immersive"
        eyebrow="Amenities & Life at Rock Island"
        title={<>Where Every Day Holds <span className="italic text-champagne-300">Something to Look Forward To.</span></>}
        lede="Good care meets the body's needs. A good home meets everything else — the meals, the friendships, the familiar routines, and the small pleasures that make life feel full."
        image="lifeActivities"
        crumbs={[{ name: "Amenities & Life", path: routes.amenities }]}
        actions={<>
          <Button href={routes.tour} variant="gold" arrow location="amenities-hero">See It in Person</Button>
          <Button href="#gallery" variant="outline-light" location="amenities-hero">View the Gallery</Button>
        </>}
      />

      {/* Groups */}
      <section className="bg-ivory py-24 md:py-32" aria-label="Life at Rock Island">
        <div className="container-x space-y-24 md:space-y-32">
          {amenityGroups.map((g, i) => (
            <div key={g.id} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className={`lg:col-span-6 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`}>
                <div className="relative">
                  <Media image={g.image} className="aspect-[5/4] w-full" rounded={i % 2 === 1} sizes="(min-width:1024px) 50vw, 100vw" />
                  <span className={`absolute -bottom-5 hidden h-24 w-24 border border-champagne-500/60 lg:block ${i % 2 ? "-right-5" : "-left-5"}`} aria-hidden />
                </div>
              </Reveal>
              <Reveal delay={0.1} className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : "lg:col-start-8"}`}>
                <span className="font-display text-xl text-stone-500">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-4 text-h2">{g.title}</h2>
                <p className="lede mt-6">{g.text}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities grid */}
      <section className="bg-cream py-24 md:py-32" aria-labelledby="amenities-list-title">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Amenities" title={<span id="amenities-list-title">The Comforts That Make a Difference.</span>}
            lede="Thoughtful services that take care of the details, so residents can focus on resting, recovering, and enjoying their day." />
          <div className="mt-16"><AmenitiesGrid /></div>
        </div>
      </section>

      {/* Day rhythm */}
      <section className="on-dark bg-navy-900 py-24 text-ivory md:py-32" aria-labelledby="rhythm-title">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow">The rhythm of a day</p>
              <h2 id="rhythm-title" className="mt-5 text-h2 text-ivory">A Day at Rock Island.</h2>
            </Reveal>
            <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
              <p className="lede">Every resident&apos;s day is their own. This is simply a sense of the rhythm many residents enjoy — shaped around personal preferences and care needs.</p>
            </Reveal>
          </div>
          <ol className="mt-16 grid gap-px bg-ivory/10 md:grid-cols-2 lg:grid-cols-4">
            {rhythm.map((r, i) => (
              <Reveal as="li" key={r.time} delay={i * 0.08} className="bg-navy-900 p-8 md:p-10">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-champagne-300">{r.time}</p>
                <h3 className="mt-5 text-h3 text-ivory">{r.title}</h3>
                <p className="mt-3 text-ivory/70">{r.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-ivory py-24 md:py-32" aria-labelledby="gallery-title">
        <div className="container-x">
          <SectionHeading eyebrow="Gallery" title={<span id="gallery-title">Moments Worth Sharing.</span>}
            lede="A glimpse of the spaces and moments that make up life here. Select any image to view it larger." />
          <div className="mt-14">
            <Gallery
              tiles={galleryImages.map((g) => <Media key={g.image} image={g.image} className="h-full w-full" showLabel={false} sizes="(min-width:768px) 50vw, 100vw" />)}
              full={galleryImages.map((g) => <Media key={g.image} image={g.image} className="h-full w-full" sizes="90vw" />)}
              captions={galleryImages.map((g) => g.caption)}
              layout={galleryLayout}
            />
          </div>
          {site.showVerificationFlags && (
            <p className="mt-6 text-sm text-stone-500">Gallery images are placeholders and will be replaced with photography of Rock Island Nursing Home.</p>
          )}
        </div>
      </section>

      {/* Family visiting */}
      <section className="bg-beige-100 py-24 md:py-28" aria-labelledby="visiting-title">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow">Family visiting</p>
            <h2 id="visiting-title" className="mt-5 text-h2">Come Often. Stay Awhile.</h2>
            <p className="lede mt-6">Visits from family and friends are one of the brightest parts of a resident&apos;s week. Join a meal, bring the grandkids, celebrate a birthday, or simply sit together for an afternoon.</p>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <div className="bg-white p-8 shadow-soft md:p-10">
              <dl className="space-y-6">
                <div className="relative pl-9">
                  <Clock className="absolute left-0 top-1 h-5 w-5 text-champagne-600" strokeWidth={1.4} aria-hidden />
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone-500">Visiting hours</dt><dd className="mt-1 text-navy-900">{site.hours.visiting}</dd>
                </div>
                <div className="relative pl-9">
                  <Users className="absolute left-0 top-1 h-5 w-5 text-champagne-600" strokeWidth={1.4} aria-hidden />
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone-500">Planning a special occasion?</dt><dd className="mt-1 text-navy-900">Contact our team ahead of time and we&apos;ll help you plan.</dd>
                </div>
              </dl>
              <VerifyBadge verified={site.hours.verified} label="Visiting details pending confirmation" className="mt-6" />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={routes.contact} size="sm" location="amenities-visiting">Contact Us</Button>
                <Button href={routes.tour} size="sm" variant="outline" location="amenities-visiting">Schedule a Tour</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <TestimonialsSection />

      <CtaBand title="Life here is best experienced in person." text="Schedule a visit to see our spaces, share a conversation with our team, and get a feel for daily life at Rock Island." location="amenities-cta" />
    </>
  );
}
