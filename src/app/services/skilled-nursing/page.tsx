import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { getService, type Service } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

const service = getService("skilled-nursing") as Service;

export const metadata: Metadata = pageMetadata({ title: service.seo.title, description: service.seo.description, path: `/services/${service.slug}` });

const pillars = [
  { title: "Individualized attention", text: "Nurses come to know each resident's baseline — how they usually feel, move, eat, and rest — so subtle changes are noticed early." },
  { title: "Thoughtful care planning", text: "Each care plan brings together physician orders, nursing assessments, and what the resident and family tell us matters most." },
  { title: "Physician coordination", text: "Our nurses keep attending physicians informed and follow through on orders, tests, and specialist recommendations." },
  { title: "Family communication", text: "We share updates, invite questions, and welcome families to care conferences as true partners." },
];

export default function SkilledNursingPage() {
  return (
    <ServiceDetail service={service} secondaryImage="clinical">
      <section className="on-dark bg-navy-900 py-24 text-ivory md:py-32" aria-labelledby="pillars-title">
        <div className="container-x">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="eyebrow">How we deliver nursing care</p>
              <h2 id="pillars-title" className="mt-5 text-h2 text-ivory">Clinical skill, paired with genuine attentiveness</h2>
            </div>
            <p className="lede lg:col-span-5 lg:col-start-8">Skilled nursing is defined by what licensed nurses do. It is experienced through how they do it — with patience, clear explanations, and respect.</p>
          </Reveal>
          <ul className="mt-16 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="bg-navy-900 p-8">
                <span className="font-display text-4xl text-champagne-300/80">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-[1.5rem] leading-tight text-ivory">{p.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ivory/70">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32" aria-labelledby="dignity-title">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Media image="about" className="aspect-[4/5] w-full" rounded sizes="(min-width:1024px) 40vw, 100vw" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow">Dignity in every moment</p>
              <h2 id="dignity-title" className="mt-5 text-h2">The details that make care feel personal</h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 space-y-5 text-stone-700">
              <p>Knocking before entering. Asking before helping. Explaining a new medication in plain language. Remembering how someone takes their coffee. These are small acts, but together they shape how a resident experiences every day.</p>
              <p>We ask everyone on our nursing team to protect privacy, honor personal choices whenever possible, and treat each resident the way they would want their own family treated.</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 border-l-2 border-champagne-500 pl-6">
              <p className="font-display text-2xl italic leading-snug text-navy-800">&ldquo;Skilled care and kind care should never be two different things.&rdquo;</p>
              <p className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-stone-500">Our nursing philosophy</p>
            </Reveal>
          </div>
        </div>
      </section>
    </ServiceDetail>
  );
}
