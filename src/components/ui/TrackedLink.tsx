"use client";
import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  /** Where on the page this link lives, e.g. "header", "hero", "footer". Non-identifying. */
  location?: string;
  event?: AnalyticsEvent;
};

/** Link that records a privacy-safe analytics event. Auto-detects tel:/mailto: links. */
export function TrackedLink({ href, children, location = "unspecified", event, onClick, ...rest }: Props) {
  const isTel = href.startsWith("tel:");
  const isMail = href.startsWith("mailto:");
  const isExternal = /^https?:\/\//.test(href);
  const ev: AnalyticsEvent = event ?? (isTel ? "phone_click" : isMail ? "email_click" : "cta_click");
  const handle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    track(ev, { cta_location: location, link_type: isTel ? "phone" : isMail ? "email" : isExternal ? "external" : "internal", destination: isTel || isMail ? undefined : href });
    onClick?.(e);
  };
  if (isTel || isMail || isExternal) {
    return (
      <a href={href} onClick={handle} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
