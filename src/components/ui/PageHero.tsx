import type { ReactNode } from "react";
import type { ImageKey } from "@/content/images";
import { Media } from "./Media";
import { Breadcrumbs } from "./Breadcrumbs";

/**
 * Interior page hero. Two compositions:
 *  - "split": text on ivory beside an arched photograph (default)
 *  - "immersive": full-bleed photograph with navy overlay
 */
export function PageHero({
  eyebrow, title, lede, image, crumbs, actions, variant = "split", children,
}: {
  eyebrow: string; title: ReactNode; lede?: ReactNode; image: ImageKey; crumbs: { name: string; path: string }[];
  actions?: ReactNode; variant?: "split" | "immersive"; children?: ReactNode;
}) {
  if (variant === "immersive") {
    return (
      <section className="on-dark relative isolate overflow-hidden bg-navy-950 text-ivory">
        <Media image={image} priority sizes="100vw" className="absolute inset-0 -z-10 h-full w-full opacity-60" showLabel={false} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/30" aria-hidden />
        <div className="container-x pb-20 pt-36 md:pb-28 md:pt-48">
          <Breadcrumbs items={crumbs} dark />
          <div className="hero-rise mt-10 max-w-3xl">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-6 text-h1 text-ivory">{title}</h1>
            {lede && <p className="lede mt-7 max-w-2xl">{lede}</p>}
            {actions && <div className="mt-10 flex flex-wrap gap-4">{actions}</div>}
          </div>
          {children}
        </div>
      </section>
    );
  }
  return (
    <section className="relative overflow-hidden bg-ivory">
      <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-cream lg:block" aria-hidden />
      <div className="container-x relative grid items-center gap-12 pb-16 pt-32 md:pt-40 lg:grid-cols-12 lg:gap-16 lg:pb-24">
        <div className="lg:col-span-6 xl:col-span-6">
          <Breadcrumbs items={crumbs} />
          <div className="hero-rise mt-10">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-6 text-h1">{title}</h1>
            {lede && <p className="lede mt-7 max-w-xl">{lede}</p>}
            {actions && <div className="mt-10 flex flex-wrap gap-4">{actions}</div>}
            {children}
          </div>
        </div>
        <div className="hero-rise lg:col-span-6 lg:col-start-7">
          <div className="relative isolate mx-auto max-w-xl">
            <Media image={image} priority sizes="(min-width:1024px) 45vw, 100vw" className="aspect-[4/5] w-full" rounded />
            <div className="absolute -right-5 -top-5 -z-10 hidden h-28 w-28 border border-champagne-500/60 lg:block" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
