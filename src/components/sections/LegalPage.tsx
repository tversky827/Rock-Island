import type { ReactNode } from "react";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import { VerifyBadge } from "../ui/VerifyBadge";

export function LegalPage({ title, path, updated, children, intro }: { title: string; path: string; updated: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <>
      <section className="bg-cream pb-16 pt-36 md:pt-44">
        <div className="container-x max-w-4xl">
          <Breadcrumbs items={[{ name: title, path }]} />
          <h1 className="mt-10 text-h1">{title}</h1>
          <p className="mt-5 text-sm text-stone-500">Last updated: {updated}</p>
          <VerifyBadge verified={false} label="Draft — requires legal review before launch" className="mt-4" />
          {intro && <div className="lede mt-8">{intro}</div>}
        </div>
      </section>
      <section className="bg-ivory py-16 md:py-24">
        <div className="container-x max-w-4xl"><div className="prose-rin">{children}</div></div>
      </section>
    </>
  );
}
