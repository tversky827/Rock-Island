"use client";
import { useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { site } from "@/content/site";

const KEY = "rin-preview-dismissed";
const subscribe = () => () => {};

/** Dismissible pre-launch notice shown while verification flags are enabled. */
export function PreviewBanner() {
  const storedDismissed = useSyncExternalStore(subscribe, () => sessionStorage.getItem(KEY) === "1", () => true);
  const [dismissed, setDismissed] = useState(false);
  if (!site.showVerificationFlags || storedDismissed || dismissed) return null;
  return (
    <div role="note" className="fixed bottom-16 left-3 right-3 z-[35] flex items-start gap-3 border border-champagne-400/60 bg-champagne-200/95 px-4 py-3 text-[0.75rem] leading-snug text-navy-900 shadow-lift backdrop-blur-sm lg:bottom-5 lg:left-auto lg:right-5 lg:max-w-sm">
      <p><strong className="font-semibold">Pre-launch preview.</strong> Contact details, services, amenities, testimonials, and imagery are placeholders pending facility verification.</p>
      <button type="button" aria-label="Dismiss preview notice" className="-m-1 p-1 text-navy-900/70 hover:text-navy-900" onClick={() => { sessionStorage.setItem(KEY, "1"); setDismissed(true); }}>
        <X className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
