"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Subtle fade-and-rise on scroll.
 * - Content is fully visible without JavaScript (the hidden state only applies
 *   when <html> has the `js` class, set by an inline script in the layout).
 * - One shared IntersectionObserver for the whole page.
 * - Respects prefers-reduced-motion via CSS.
 */
let observer: IntersectionObserver | null = null;
function getObserver() {
  if (observer || typeof window === "undefined" || !("IntersectionObserver" in window)) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-visible"); observer!.unobserve(e.target); }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  return observer;
}

export function Reveal({ children, delay = 0, className = "", as = "div" }: { children: ReactNode; delay?: number; className?: string; y?: number; as?: "div" | "li" | "section" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    if (!io) { el.classList.add("is-visible"); return; }
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  const Tag = as as "div";
  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={`reveal ${className}`} style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}
