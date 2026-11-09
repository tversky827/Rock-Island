/**
 * ROCK ISLAND NURSING HOME — "The Threshold" mark
 * A classical arch (home, shelter, stability) holding a second, inner arch
 * (an embrace — care within care). A champagne keystone marks the heart of the
 * structure, and a gentle river line grounds it — a nod to the Mississippi
 * and the island community the facility is named for.
 */

type Tone = "default" | "light" | "mono";

const palette = (tone: Tone) =>
  tone === "light"
    ? { primary: "#FBF8F2", accent: "#E3CF9F", text: "#FBF8F2", sub: "#E3CF9F" }
    : tone === "mono"
      ? { primary: "currentColor", accent: "currentColor", text: "currentColor", sub: "currentColor" }
      : { primary: "#0F2138", accent: "#BF9F62", text: "#0F2138", sub: "#7D6436" };

export function LogoMark({ tone = "default", className = "h-10 w-auto", title }: { tone?: Tone; className?: string; title?: string }) {
  const c = palette(tone);
  return (
    <svg viewBox="0 0 48 56" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d="M7 47V25a17 17 0 0 1 34 0v22" fill="none" stroke={c.primary} strokeWidth="2.4" strokeLinecap="square" />
      <path d="M15 47V27.5a9 9 0 0 1 18 0V47" fill="none" stroke={c.accent} strokeWidth="1.8" strokeLinecap="square" />
      <path d="M24 9.6l2.6 2.6-2.6 2.6-2.6-2.6z" fill={c.accent} />
      <path d="M3 51.5c4.2-2.3 8.4-2.3 12.6 0s8.4 2.3 12.6 0 8.4-2.3 12.6 0 4.2 1.2 4.2 1.2" fill="none" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Horizontal (secondary) lockup — used in the header. */
export function LogoHorizontal({ tone = "default", className = "" }: { tone?: Tone; className?: string }) {
  const c = palette(tone);
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark tone={tone} className="h-11 w-auto shrink-0 sm:h-12" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.45rem] font-semibold uppercase tracking-[0.12em] sm:text-[1.6rem]" style={{ color: c.text }}>
          Rock Island
        </span>
        <span className="mt-1 flex items-center gap-2 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.36em] sm:text-[0.62rem]" style={{ color: c.sub }}>
          Nursing Home
        </span>
      </span>
    </span>
  );
}

/** Stacked (primary) lockup — used in the footer and brand applications. */
export function LogoStacked({ tone = "default", className = "" }: { tone?: Tone; className?: string }) {
  const c = palette(tone);
  return (
    <span className={`inline-flex flex-col items-center text-center ${className}`}>
      <LogoMark tone={tone} className="h-16 w-auto" />
      <span className="mt-4 font-display text-[1.9rem] font-semibold uppercase leading-none tracking-[0.14em]" style={{ color: c.text }}>
        Rock Island
      </span>
      <span className="mt-2 flex items-center gap-3 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.4em]" style={{ color: c.sub }}>
        <span className="h-px w-6" style={{ background: c.sub }} />
        Nursing Home
        <span className="h-px w-6" style={{ background: c.sub }} />
      </span>
    </span>
  );
}

/** Text-only wordmark. */
export function LogoWordmark({ tone = "default", className = "" }: { tone?: Tone; className?: string }) {
  const c = palette(tone);
  return (
    <span className={`inline-flex items-baseline gap-2 font-display ${className}`} style={{ color: c.text }}>
      <span className="text-2xl font-semibold tracking-[0.04em]">Rock Island</span>
      <span className="text-2xl italic" style={{ color: c.sub }}>Nursing Home</span>
    </span>
  );
}
