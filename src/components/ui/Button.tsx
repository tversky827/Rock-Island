import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { TrackedLink } from "./TrackedLink";

type Variant = "primary" | "gold" | "outline" | "outline-light";

export function Button({
  href, children, variant = "primary", size, location, arrow = false, className = "", icon,
}: {
  href: string; children: ReactNode; variant?: Variant; size?: "sm"; location?: string; arrow?: boolean; className?: string; icon?: ReactNode;
}) {
  return (
    <TrackedLink href={href} location={location} className={`btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} group ${className}`}>
      {icon}
      <span>{children}</span>
      {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.6} aria-hidden />}
    </TrackedLink>
  );
}

export function ArrowLink({ href, children, location, className = "" }: { href: string; children: ReactNode; location?: string; className?: string }) {
  return (
    <TrackedLink href={href} location={location} className={`link-arrow ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden />
    </TrackedLink>
  );
}
