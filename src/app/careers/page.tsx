import type { Metadata } from "next";
import { Briefcase, Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Button, ArrowLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { CareersForm } from "@/components/forms/Forms";
import { careerDepartments, openPositions, workplaceValues } from "@/content/careers";
import { routes } from "@/content/navigation";
import { site, telHref, mailHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nursing & CNA Careers in Rock Island",
  description:
    "Build a meaningful healthcare career at Rock Island Nursing Home: nursing, CNA, therapy, dietary, housekeeping, activities, and administration roles.",
  path: routes.careers,
});

export default function CareersPage() {
  const ats = site.integrations.applicantTrackingUrl;
  return (
    <>
      <PageHero
        eyebrow="Careers at Rock Island"
        title={<>Bring Your Skill. <span className="italic text-champagne-700">Bring Your Heart.</span></>}
        lede="The work we do changes lives — residents', families', and often our own. We're looking for compassionate people who want their work to matter every single day."
        image="careers"
        crumbs={[{ name: "Careers", path: routes.careers }]}
        actions={<>
          <Button href={ats || "#open-positions"} arrow location="careers-hero">View Open Positions</Button>
          <Button href={ats || "#apply"} variant="outline" location="careers-hero">Apply Now</Button>
        </>}
      />

      {/* Why work with us */}
      <section className="on-dark bg-navy-900 py-24 text-ivory md:py-32" aria-labelledby="why-title">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow">Why work with us</p>
              <h2 id="why-title" className="mt-5 text-h2 text-ivory">Work That Means Something.</h2>
            </Reveal>
            <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
              <p className="lede">Caring for others is demanding work. It&apos;s also some of the most rewarding work there is — and it&apos;s best done alongside people who share your values.</p>
            </Reveal>
          </div>
          <ul className="mt-16 grid gap-px bg-ivory/10 md:grid-cols-2 lg:grid-cols-4">
            {workplaceValues.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.08} className="bg-navy-900 p-8 md:p-10">
                <span className="font-display text-5xl leading-none text-champagne-300/80">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-h3 text-ivory">{v.title}</h3>
                <p className="mt-3 text-ivory/70">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Departments */}
      <section className="bg-ivory py-24 md:py-32" aria-labelledby="departments-title">
        <div className="container-x">
          <SectionHeading eyebrow="Career categories" title={<span id="departments-title">Many Roles. One Purpose.</span>}
            lede="Every department contributes to the experience of the people we care for. Explore the areas where you might fit." />
          <ul className="mt-16 grid gap-px border border-beige-300 bg-beige-300 sm:grid-cols-2 lg:grid-cols-4">
            {careerDepartments.map((d, i) => (
              <Reveal as="li" key={d.id} delay={(i % 4) * 0.06} className="group bg-white p-8 transition-colors duration-500 hover:bg-cream">
                <span className="flex h-14 w-14 items-center justify-center border border-champagne-400/50 text-navy-800 transition-colors duration-500 group-hover:bg-navy-900 group-hover:text-champagne-300">
                  <Icon name={d.icon} />
                </span>
                <h3 className="mt-7 font-display text-[1.5rem] leading-tight">{d.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-stone-600">{d.text}</p>
              </Reveal>
            ))}
            <Reveal as="li" delay={0.2} className="on-dark flex flex-col justify-between bg-navy-900 p-8 text-ivory">
              <p className="font-display text-2xl leading-snug">Don&apos;t see your role listed? We&apos;d still like to hear from you.</p>
              <ArrowLink href="#apply" location="careers-departments" className="mt-8">General application</ArrowLink>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* Culture */}
      <section className="bg-cream py-24 md:py-32" aria-labelledby="culture-title">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Media image="team" className="aspect-[4/5] w-full" rounded sizes="(min-width:1024px) 40vw, 100vw" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow">Workplace culture</p>
              <h2 id="culture-title" className="mt-5 text-h2">How We Work Together.</h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 space-y-5 text-stone-600">
              <p className="font-display text-2xl leading-snug text-navy-800">The way we treat each other shows up in the way we treat residents.</p>
              <p>We aim to be a workplace where questions are welcome, good work is noticed, and teammates step in for one another. Nurses, aides, therapists, dietary and housekeeping staff, and administrators share responsibility for the resident experience — and share in the satisfaction of doing it well.</p>
              <p>If you are dependable, kind, and willing to learn, there is a place for you here.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section id="open-positions" className="scroll-mt-28 bg-ivory py-24 md:py-32" aria-labelledby="positions-title">
        <div className="container-x">
          <SectionHeading eyebrow="Open positions" title={<span id="positions-title">Current Opportunities.</span>} />
          {openPositions.length ? (
            <ul className="mt-12 divide-y divide-beige-300 border-y border-beige-300">
              {openPositions.map((p) => (
                <li key={p.id} className="grid gap-4 py-8 md:grid-cols-12 md:items-center">
                  <div className="md:col-span-7">
                    <h3 className="text-h3">{p.title}</h3>
                    <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-champagne-700">{p.department} · {p.schedule}</p>
                    <p className="mt-3 text-stone-600">{p.summary}</p>
                  </div>
                  <div className="md:col-span-5 md:text-right">
                    <Button href={p.applyUrl || ats || "#apply"} size="sm" arrow location="careers-position">Apply</Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal className="mt-12 flex flex-col items-start gap-8 border border-beige-300 bg-white p-8 md:flex-row md:items-center md:justify-between md:p-12">
              <div className="flex gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-champagne-200 text-champagne-700"><Briefcase className="h-6 w-6" strokeWidth={1.4} aria-hidden /></span>
                <div>
                  <p className="font-display text-2xl text-navy-900">No openings are listed online right now.</p>
                  <p className="mt-2 max-w-xl text-stone-600">Positions open throughout the year. Submit a general application and our team will reach out when a role matches your experience{ats ? ", or browse our careers portal" : ""}.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="#apply" arrow location="careers-no-openings">Submit an Application</Button>
                {ats && <Button href={ats} variant="outline" location="careers-no-openings">Careers Portal</Button>}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="scroll-mt-28 bg-cream py-24 md:py-32" aria-labelledby="apply-title">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Apply" title={<span id="apply-title">Start Your Application.</span>}
              lede="Tell us a little about yourself and the kind of role you're looking for. It only takes a few minutes." />
            <Reveal delay={0.1} className="mt-10 space-y-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-stone-500">Contact careers</p>
              <TrackedLink href={mailHref(site.contact.email.careers)} location="careers-apply" className="flex items-center gap-3 text-navy-900 hover:text-champagne-700">
                <Mail className="h-4 w-4 text-champagne-600" aria-hidden /><span className="link-underline break-all">{site.contact.email.careers}</span>
              </TrackedLink>
              <TrackedLink href={telHref(site.contact.careersPhone.e164)} location="careers-apply" className="flex items-center gap-3 text-navy-900 hover:text-champagne-700">
                <Phone className="h-4 w-4 text-champagne-600" aria-hidden /><span className="link-underline">{site.contact.careersPhone.display}</span>
              </TrackedLink>
              {ats && <div className="pt-4"><Button href={ats} variant="outline" size="sm" location="careers-apply">Apply Through Our Careers Portal</Button></div>}
            </Reveal>
          </div>
          <Reveal className="bg-white p-7 shadow-soft sm:p-10 md:p-12 lg:col-span-8">
            <h3 className="text-h3">Employment application</h3>
            <p className="mt-2 text-sm text-stone-500">Rock Island Nursing Home is committed to equal employment opportunity.</p>
            <div className="mt-8"><CareersForm /></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
