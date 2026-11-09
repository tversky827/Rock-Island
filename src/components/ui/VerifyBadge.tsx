import { site } from "@/content/site";

/** Discreet marker shown on unverified facility content while verification flags are enabled. */
export function VerifyBadge({ verified, label = "Pending facility verification", className = "" }: { verified: boolean; label?: string; className?: string }) {
  if (verified || !site.showVerificationFlags) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 border border-dashed border-champagne-500/70 bg-champagne-200/40 px-2 py-0.5 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-champagne-700 ${className}`}
      title="This content must be confirmed by the facility before launch."
    >
      <span className="h-1.5 w-1.5 rounded-full bg-champagne-500" aria-hidden />
      {label}
    </span>
  );
}
