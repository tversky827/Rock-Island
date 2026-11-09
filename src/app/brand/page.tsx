import type { Metadata } from "next";
import { ArrowRight, Download } from "lucide-react";
import { LogoHorizontal, LogoMark, LogoStacked, LogoWordmark } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Brand Guidelines", description: "Rock Island Nursing Home brand identity system.", path: "/brand", noindex: true });

const palette = [
  { name: "Deep Navy", token: "navy-900", hex: "#0F2138", use: "Primary brand color, headlines, primary buttons", cls: "bg-navy-900 text-ivory" },
  { name: "Midnight", token: "navy-950", hex: "#0A1628", use: "Footer, immersive sections", cls: "bg-navy-950 text-ivory" },
  { name: "Champagne Gold", token: "champagne-400", hex: "#D2B87F", use: "Accents, ornaments, CTA on dark", cls: "bg-champagne-400 text-navy-950" },
  { name: "Antique Gold", token: "champagne-700", hex: "#7D6436", use: "Small gold text on light (AA contrast)", cls: "bg-champagne-700 text-ivory" },
  { name: "Warm Beige", token: "beige-200", hex: "#E5D8C2", use: "Hairlines, supporting surfaces", cls: "bg-beige-200 text-navy-900" },
  { name: "Cream", token: "cream", hex: "#F5EFE4", use: "Alternating section backgrounds", cls: "bg-cream text-navy-900" },
  { name: "Soft Ivory", token: "ivory", hex: "#FBF8F2", use: "Primary page background", cls: "bg-ivory text-navy-900 border border-beige-200" },
  { name: "White", token: "white", hex: "#FFFFFF", use: "Cards, forms", cls: "bg-white text-navy-900 border border-beige-200" },
  { name: "Warm Gray", token: "stone-600", hex: "#5F574E", use: "Body copy", cls: "bg-stone-600 text-ivory" },
];

const files = [
  ["Primary logo (stacked)", "/brand/logo-primary.svg"],
  ["Primary logo — reversed", "/brand/logo-primary-light.svg"],
  ["Secondary logo (horizontal)", "/brand/logo-secondary-horizontal.svg"],
  ["Text-only wordmark", "/brand/logo-wordmark.svg"],
  ["Mark", "/brand/logo-mark.svg"],
  ["Mark — reversed", "/brand/logo-mark-light.svg"],
  ["Favicon", "/brand/favicon.svg"],
];

function Block({ title, children, note }: { title: string; children: React.ReactNode; note?: string }) {
  return (
    <section className="border-t border-beige-300 py-16">
      <h2 className="text-h2">{title}</h2>
      {note && <p className="mt-3 max-w-2xl text-stone-600">{note}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}

export default function BrandPage() {
  return (
    <div className="bg-ivory pb-24 pt-36 md:pt-44">
      <div className="container-x">
        <p className="eyebrow">Brand guidelines · Proposed identity</p>
        <h1 className="mt-6 text-h1">Rock Island Nursing Home</h1>
        <p className="lede mt-6 max-w-3xl">A loving and caring place where residents are treated with dignity, compassion, respect, and genuine personal attention. The identity pairs the warmth of hospitality with the steadiness of an established healthcare organization.</p>

        <Block title="The mark — “The Threshold”" note="A classical arch — home, shelter, stability — holding a second, inner arch: an embrace, care within care. A champagne keystone marks the heart of the structure, and a gentle river line grounds it, a nod to the Mississippi and the island community the facility is named for.">
          <div className="grid gap-px bg-beige-300 md:grid-cols-3">
            <div className="flex aspect-square items-center justify-center bg-white"><LogoMark className="h-40 w-auto" /></div>
            <div className="flex aspect-square items-center justify-center bg-navy-900"><LogoMark tone="light" className="h-40 w-auto" /></div>
            <div className="flex aspect-square items-center justify-center bg-cream"><LogoMark tone="mono" className="h-40 w-auto text-navy-900" /></div>
          </div>
        </Block>

        <Block title="Logo system">
          <div className="grid gap-px bg-beige-300 lg:grid-cols-2">
            <div className="flex flex-col items-center justify-center gap-4 bg-white p-14"><LogoStacked /><span className="mt-6 text-xs uppercase tracking-[0.2em] text-stone-500">Primary — stacked</span></div>
            <div className="flex flex-col items-center justify-center gap-4 bg-navy-950 p-14"><LogoStacked tone="light" /><span className="mt-6 text-xs uppercase tracking-[0.2em] text-ivory/60">Primary — reversed</span></div>
            <div className="flex flex-col items-center justify-center gap-4 bg-white p-14"><LogoHorizontal /><span className="mt-6 text-xs uppercase tracking-[0.2em] text-stone-500">Secondary — horizontal</span></div>
            <div className="flex flex-col items-center justify-center gap-4 bg-cream p-14"><LogoWordmark /><span className="mt-6 text-xs uppercase tracking-[0.2em] text-stone-500">Text-only wordmark</span></div>
          </div>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {files.map(([label, href]) => (
              <li key={href}><a href={href} download className="flex items-center justify-between border border-beige-300 bg-white px-4 py-3 text-sm text-navy-900 hover:border-champagne-500">{label}<Download className="h-4 w-4 text-champagne-600" aria-hidden /></a></li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-stone-500">Clear space: keep a margin equal to the keystone-to-arch distance on all sides. Minimum size: mark 24px tall on screen; horizontal lockup 160px wide. Before print production, a designer should convert logo text to outlines.</p>
        </Block>

        <Block title="Color palette" note="Navy anchors, champagne accents, and warm neutrals carry the space. Use navy sparingly on large areas to avoid a clinical feel.">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {palette.map((c) => (
              <li key={c.hex} className="overflow-hidden border border-beige-200 bg-white">
                <div className={`flex h-32 items-end p-5 ${c.cls}`}><span className="font-display text-2xl">{c.name}</span></div>
                <div className="p-5 text-sm"><p className="font-semibold text-navy-900">{c.hex} <span className="font-normal text-stone-500">· {c.token}</span></p><p className="mt-1 text-stone-600">{c.use}</p></div>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Typography">
          <div className="grid gap-px bg-beige-300 lg:grid-cols-2">
            <div className="bg-white p-10">
              <p className="eyebrow">Display — Cormorant Garamond</p>
              <p className="mt-6 text-display">Aa</p>
              <p className="mt-4 text-h2">Compassionate care, <span className="italic text-champagne-700">genuine connection.</span></p>
              <p className="mt-4 text-sm text-stone-500">Medium 500 / Semibold 600 / Italic. Headlines, pull quotes, numerals.</p>
            </div>
            <div className="bg-white p-10">
              <p className="eyebrow">Text — Manrope</p>
              <p className="mt-6 font-sans text-[5rem] font-medium leading-none text-navy-900">Aa</p>
              <p className="mt-4 text-lg text-stone-700">Manrope is a modern, highly legible sans-serif used for body copy, navigation, labels, and buttons.</p>
              <p className="mt-4 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-navy-900">Labels · Navigation · Buttons</p>
            </div>
          </div>
        </Block>

        <Block title="Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <span className="btn btn-primary">Primary <ArrowRight className="h-4 w-4" aria-hidden /></span>
            <span className="btn btn-outline">Secondary</span>
            <span className="btn btn-gold">Gold</span>
            <span className="link-arrow">Text link <ArrowRight className="h-4 w-4" aria-hidden /></span>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 bg-navy-900 p-8">
            <span className="btn btn-gold">Gold on navy</span>
            <span className="btn btn-outline-light">Outline light</span>
          </div>
        </Block>

        <Block title="Iconography" note="Lucide line icons at a 1.4px stroke, in champagne or navy. Always paired with a text label; never decorative-only cartoons.">
          <ul className="grid grid-cols-4 gap-px bg-beige-300 sm:grid-cols-8">
            {["stethoscope", "footprints", "home", "activity", "hand", "message", "bandage", "pill", "heart-pulse", "droplet", "utensils", "sun", "users", "church", "trees", "scissors"].map((n) => (
              <li key={n} className="flex aspect-square items-center justify-center bg-white text-navy-800"><Icon name={n} className="h-7 w-7" /></li>
            ))}
          </ul>
        </Block>

        <Block title="Voice" note="Warm, plain-spoken, and reassuring. Speak to families as a trusted neighbor would; speak to clinicians with clarity and precision. Never overpromise: describe what we do and how we do it, not outcomes we cannot guarantee." >
          <div className="grid gap-px bg-beige-300 md:grid-cols-2">
            <div className="bg-white p-8"><p className="eyebrow">We say</p><p className="mt-4 font-display text-2xl">&ldquo;We&apos;ll listen, answer your questions, and help you understand your options.&rdquo;</p></div>
            <div className="bg-white p-8"><p className="eyebrow">We avoid</p><p className="mt-4 font-display text-2xl text-stone-500">&ldquo;The best outcomes in the region — guaranteed.&rdquo;</p></div>
          </div>
        </Block>
      </div>
    </div>
  );
}
