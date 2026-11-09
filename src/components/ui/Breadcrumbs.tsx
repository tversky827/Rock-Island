import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export function Breadcrumbs({ items, dark = false }: { items: { name: string; path: string }[]; dark?: boolean }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="text-[0.7rem] font-semibold uppercase tracking-[0.18em]">
      <ol className="flex flex-wrap items-center gap-2">
        {all.map((it, i) => {
          const last = i === all.length - 1;
          return (
            <li key={it.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={dark ? "text-champagne-300" : "text-champagne-700"}>{it.name}</span>
              ) : (
                <Link href={it.path} className={`link-underline ${dark ? "text-ivory/70 hover:text-ivory" : "text-stone-500 hover:text-navy-900"}`}>{it.name}</Link>
              )}
              {!last && <ChevronRight className={`h-3 w-3 ${dark ? "text-ivory/40" : "text-stone-500"}`} aria-hidden />}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </nav>
  );
}
