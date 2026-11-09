import localFont from "next/font/local";

/** Self-hosted brand fonts (SIL Open Font License — see src/fonts/LICENSE-*.txt). */
export const display = localFont({
  src: [
    { path: "../fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const sans = localFont({
  src: [{ path: "../fonts/manrope-latin-wght-normal.woff2", weight: "200 800", style: "normal" }],
  variable: "--font-manrope",
  display: "swap",
  // Not preloaded: body text paints immediately in the metric-matched fallback,
  // leaving bandwidth for the display face used by the LCP headline.
  preload: false,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
});
