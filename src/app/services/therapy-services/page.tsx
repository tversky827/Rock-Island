import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { VerifyBadge } from "@/components/ui/VerifyBadge";
import { getService, type Service } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

const service = getService("therapy-services") as Service;

export const metadata: Metadata = pageMetadata({ title: service.seo.title, description: service.seo.description, path: `/services/${service.slug}` });

const focus: Record<string, string[]> = {
  "physical-therapy": ["Strength and endurance", "Balance and safe walking", "Transfers and stairs", "Mobility aid training"],
  "occupational-therapy": ["Dressing and grooming", "Bathing and toileting", "Meal preparation", "Adaptive equipment"],
  "speech-therapy": ["Speech and language", "Memory and thinking skills", "Swallowing support", "Communication strategies"],
};

export default function TherapyServicesPage() {
  const disciplines = Object.keys(focus).map((s) => getService(s)).filter((s): s is Service => !!s);
  return (
    <ServiceDetail service={service} secondaryImage="therapyST">
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="disciplines-title">
        <div className="container-x">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="eyebrow">Our therapy disciplines</p>
              <h2 id="disciplines-title" className="mt-5 text-h2">Specialized therapy for movement, independence, and communication</h2>
            </div>
            <VerifyBadge verified={disciplines.every((d) => d.verified)} label="Therapy availability pending verification" />
          </Reveal>
          <div className="mt-16 space-y-6">
            {disciplines.map((d, i) => (
              <Reveal key={d.slug} delay={0.05} className={`grid overflow-hidden bg-white shadow-soft lg:grid-cols-12 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Media image={d.image} className="min-h-[18rem] lg:col-span-5" sizes="(min-width:1024px) 40vw, 100vw" />
                <div className="p-8 md:p-12 lg:col-span-7">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center border border-champagne-400/60 text-navy-800"><Icon name={d.icon} /></span>
                    <span className="font-display text-lg text-stone-500">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 text-h3">{d.title}</h3>
                  <p className="mt-3 max-w-xl text-stone-600">{d.intro}</p>
                  <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {focus[d.slug].map((f) => (
                      <li key={f} className="flex items-center gap-3 text-[0.95rem] text-navy-900"><span className="h-px w-5 bg-champagne-500" aria-hidden />{f}</li>
                    ))}
                  </ul>
                  <Button href={`/services/${d.slug}`} variant="outline" size="sm" arrow location="therapy-disciplines" className="mt-8">Explore {d.title}</Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark bg-navy-900 py-24 text-ivory md:py-28" aria-labelledby="who-therapy-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">For every stage</p>
            <h2 id="who-therapy-title" className="mt-5 text-h2 text-ivory">Therapy isn&apos;t only for short stays</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-ivory/75 lg:col-span-6 lg:col-start-7">
            <p>For rehabilitation guests, therapy is often the center of the stay — working toward the skills needed for the next step. For long-term residents, therapy can help maintain mobility, comfort, safe swallowing, and participation in daily life.</p>
            <p>Therapy is provided when ordered by a physician and based on each person&apos;s evaluation. Our team can explain how therapy may fit into a care plan and how coverage typically applies.</p>
          </Reveal>
        </div>
      </section>
    </ServiceDetail>
  );
}
