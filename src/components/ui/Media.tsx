import Image from "next/image";
import { images, type ImageKey, type ImageMotif, type ImageTone } from "@/content/images";
import { site } from "@/content/site";

/**
 * Renders a photograph from the central image registry.
 * When no real photograph has been supplied, an art-directed placeholder is
 * rendered instead — warm, on-brand, and clearly labeled so that nothing on
 * the site can be mistaken for actual facility photography.
 */

const tones: Record<ImageTone, { from: string; via: string; to: string; line: string; glow: string }> = {
  ivory: { from: "#f7f1e6", via: "#efe4d1", to: "#e2d2b8", line: "#b99a62", glow: "#fffaf0" },
  sand: { from: "#efe3cf", via: "#e2cfb0", to: "#cdb48c", line: "#8a6f40", glow: "#fff4df" },
  champagne: { from: "#f1e4c6", via: "#e0c896", to: "#c7a76b", line: "#7d6436", glow: "#fff6de" },
  navy: { from: "#2a4466", via: "#1a3050", to: "#0f2138", line: "#d2b87f", glow: "#4a6890" },
  sage: { from: "#e6e7dc", via: "#cfd3c1", to: "#a9b29a", line: "#5f6b53", glow: "#f7f7ee" },
};

function Motif({ motif, color }: { motif: ImageMotif; color: string }) {
  const s = { fill: "none", stroke: color, strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" as const };
  switch (motif) {
    case "arch":
      return (
        <g {...s} opacity="0.55">
          <path d="M300 520V250a100 100 0 0 1 200 0v270" />
          <path d="M335 520V262a65 65 0 0 1 130 0v258" opacity="0.6" />
          <path d="M200 520h400" opacity="0.5" />
          <path d="M400 128l7 7-7 7-7-7z" fill={color} />
        </g>
      );
    case "window":
      return (
        <g {...s} opacity="0.5">
          <rect x="430" y="90" width="230" height="330" />
          <path d="M545 90v330M430 255h230" />
          <path d="M430 420L230 600M660 420L700 600" opacity="0.35" />
          <circle cx="250" cy="330" r="60" opacity="0.5" />
        </g>
      );
    case "garden":
      return (
        <g {...s} opacity="0.5">
          <path d="M0 470c120-40 260-40 400 0s280 40 400 0" />
          <path d="M140 470c0-80 30-150 60-190M200 280c-30 10-60 40-70 70M200 280c25 20 40 50 40 90" />
          <path d="M560 470c0-100 20-170 50-220M610 250c-30 15-50 45-55 80M610 250c30 20 45 55 45 95" />
          <circle cx="400" cy="200" r="70" opacity="0.6" />
        </g>
      );
    case "hands":
      return (
        <g {...s} opacity="0.5">
          <path d="M180 420c80-70 170-90 240-60s110 30 200-20" />
          <path d="M200 470c90-60 190-70 250-40s110 20 170-30" opacity="0.6" />
          <circle cx="400" cy="230" r="90" opacity="0.5" />
          <circle cx="400" cy="230" r="130" opacity="0.25" />
        </g>
      );
    case "table":
      return (
        <g {...s} opacity="0.5">
          <ellipse cx="400" cy="420" rx="260" ry="50" />
          <circle cx="300" cy="410" r="24" opacity="0.7" />
          <circle cx="400" cy="425" r="24" opacity="0.7" />
          <circle cx="500" cy="410" r="24" opacity="0.7" />
          <path d="M260 220h280M300 160h200" opacity="0.4" />
        </g>
      );
    case "path":
      return (
        <g {...s} opacity="0.5">
          <path d="M330 600C360 470 420 380 520 300s150-160 160-220" />
          <path d="M470 600c20-110 70-190 150-260s110-130 120-200" opacity="0.6" />
          <circle cx="210" cy="190" r="56" opacity="0.5" />
        </g>
      );
    case "river":
      return (
        <g {...s} opacity="0.55">
          <path d="M0 380c100-26 200-26 300 0s200 26 300 0 150-20 200-14" />
          <path d="M0 430c100-22 200-22 300 0s200 22 300 0 150-18 200-12" opacity="0.7" />
          <path d="M0 480c100-18 200-18 300 0s200 18 300 0 150-14 200-10" opacity="0.45" />
          <circle cx="560" cy="210" r="64" opacity="0.6" />
        </g>
      );
    case "lounge":
    default:
      return (
        <g {...s} opacity="0.5">
          <path d="M210 440v-90c0-20 16-36 36-36h308c20 0 36 16 36 36v90" />
          <path d="M180 440h440M250 440v40M550 440v40" />
          <path d="M520 110v150M480 260h80" opacity="0.6" />
          <circle cx="520" cy="96" r="24" opacity="0.6" />
        </g>
      );
  }
}

export function Media({
  image,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  showLabel = true,
  rounded = false,
}: {
  image: ImageKey;
  className?: string;
  priority?: boolean;
  sizes?: string;
  showLabel?: boolean;
  rounded?: boolean;
}) {
  const data = images[image] as (typeof images)[ImageKey] & { src?: string; stock?: boolean; focal?: string };
  const radius = rounded ? "rounded-t-[999px]" : "";
  const pos = /(^|\s)absolute(\s|$)/.test(className) ? "" : "relative";

  if (data.src) {
    return (
      <div className={`${pos} overflow-hidden bg-beige-100 ${radius} ${className}`}>
        <Image src={data.src} alt={data.alt} fill priority={priority} sizes={sizes} className="object-cover" style={{ objectPosition: data.focal ?? "50% 50%" }} />
        {data.stock && (
          <span className="absolute bottom-3 right-3 bg-navy-950/55 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-ivory/90 backdrop-blur-sm">
            Representative image
          </span>
        )}
      </div>
    );
  }

  const t = tones[data.tone];
  const id = `g-${image}`;
  const dark = data.tone === "navy";
  return (
    <div className={`grain ${pos} overflow-hidden ${radius} ${className}`} role="img" aria-label={`Photography placeholder: ${data.alt}`}>
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={t.from} />
            <stop offset="0.55" stopColor={t.via} />
            <stop offset="1" stopColor={t.to} />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="0.72" cy="0.22" r="0.7">
            <stop offset="0" stopColor={t.glow} stopOpacity="0.9" />
            <stop offset="1" stopColor={t.glow} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="600" fill={`url(#${id}-bg)`} />
        <rect width="800" height="600" fill={`url(#${id}-glow)`} />
        <Motif motif={data.motif} color={t.line} />
      </svg>
      {showLabel && site.showVerificationFlags && (
        <span
          className={`absolute bottom-3 left-3 right-3 flex max-w-max items-center gap-2 px-2.5 py-1 text-[0.6rem] font-semibold uppercase leading-snug tracking-[0.14em] backdrop-blur-sm sm:right-auto ${
            dark ? "bg-navy-950/40 text-champagne-200" : "bg-ivory/60 text-stone-600"
          }`}
        >
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dark ? "bg-champagne-300" : "bg-champagne-600"}`} aria-hidden />
          Photo placeholder · {data.brief}
        </span>
      )}
    </div>
  );
}
