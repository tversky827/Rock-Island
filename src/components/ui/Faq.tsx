import { Plus } from "lucide-react";
import type { Faq } from "@/content/faqs";
import { JsonLd } from "./JsonLd";

/** Accessible FAQ list using native <details>; emits FAQPage structured data. */
export function FaqList({ faqs, schema = true }: { faqs: Faq[]; schema?: boolean }) {
  return (
    <div className="divide-y divide-beige-300 border-y border-beige-300">
      {faqs.map((f) => (
        <details key={f.q} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-xl text-navy-900 md:text-2xl">
            {f.q}
            <Plus className="mt-1.5 h-5 w-5 shrink-0 text-champagne-600 transition-transform duration-500 group-open:rotate-45" strokeWidth={1.4} aria-hidden />
          </summary>
          <p className="mt-4 max-w-3xl text-stone-600">{f.a}</p>
        </details>
      ))}
      {schema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      )}
    </div>
  );
}
