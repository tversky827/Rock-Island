import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { Icon } from "./Icon";
import { VerifyBadge } from "./VerifyBadge";

export function ServiceCard({ service, index }: { service: Service; index?: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col bg-white p-8 transition-all duration-700 ease-[var(--ease-elegant)] hover:-translate-y-1 hover:shadow-lift"
    >
      <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-champagne-500 transition-transform duration-700 ease-[var(--ease-elegant)] group-hover:scale-x-100" aria-hidden />
      <div className="flex items-start justify-between">
        <span className="flex h-14 w-14 items-center justify-center border border-champagne-400/50 text-navy-800 transition-colors duration-500 group-hover:bg-navy-900 group-hover:text-champagne-300">
          <Icon name={service.icon} />
        </span>
        {index !== undefined && <span className="font-display text-lg text-stone-500">{String(index + 1).padStart(2, "0")}</span>}
      </div>
      <h3 className="mt-7 text-h3">{service.title}</h3>
      <p className="mt-3 flex-1 text-[0.97rem] leading-relaxed text-stone-600">{service.summary}</p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <span className="link-arrow">Learn More <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden /><span className="sr-only"> about {service.title}</span></span>
        <VerifyBadge verified={service.verified} label="Verify" />
      </div>
    </Link>
  );
}
