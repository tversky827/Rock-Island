"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { Testimonial } from "@/content/testimonials";

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    if (paused || n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), 8000);
    return () => clearInterval(t);
  }, [paused, go, n]);

  const t = items[i];
  return (
    <div className="relative" aria-roledescription="carousel" aria-label="Testimonials" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)}>
      <svg viewBox="0 0 64 48" className="mx-auto h-12 w-16 text-champagne-500" aria-hidden><path fill="currentColor" d="M0 48V28C0 12 8 3 24 0l3 6c-9 3-13 9-13 18h12v24H0zm37 0V28C37 12 45 3 61 0l3 6c-9 3-13 9-13 18h12v24H37z" opacity=".55" /></svg>
      <div className="relative mt-8 min-h-[15rem] md:min-h-[12rem]" aria-live={paused ? "polite" : "off"}>
        <AnimatePresence mode="wait">
          <motion.figure key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${n}`} className="text-center">
            <blockquote className="mx-auto max-w-3xl font-display text-[1.65rem] italic leading-snug text-navy-900 md:text-[2.1rem]">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-8">
              <span className="block text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-navy-800">{t.attribution}</span>
              {t.relation && <span className={`mt-1 block text-sm ${t.sample ? "font-semibold text-champagne-700" : "text-stone-500"}`}>{t.relation}</span>}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      {n > 1 && (
        <div className="mt-10 flex items-center justify-center gap-5">
          <button type="button" onClick={() => go(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/20 text-navy-900 transition-colors hover:bg-navy-900 hover:text-ivory" aria-label="Previous testimonial"><ChevronLeft className="h-4 w-4" aria-hidden /></button>
          <div className="flex gap-1">
            {items.map((_, k) => (
              <button key={k} type="button" onClick={() => setI(k)} aria-label={`Show testimonial ${k + 1}`} aria-current={k === i} className="group flex h-6 min-w-6 items-center justify-center">
                <span className={`block h-1.5 transition-all duration-500 ${k === i ? "w-8 bg-champagne-500" : "w-3 bg-beige-300 group-hover:bg-champagne-300"}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/20 text-navy-900 transition-colors hover:bg-navy-900 hover:text-ivory" aria-label="Next testimonial"><ChevronRight className="h-4 w-4" aria-hidden /></button>
          <button type="button" onClick={() => setPaused((p) => !p)} className="ml-2 flex h-9 w-9 items-center justify-center text-stone-500 hover:text-navy-900" aria-label={paused ? "Resume auto-rotation" : "Pause auto-rotation"}>
            {paused ? <Play className="h-3.5 w-3.5" aria-hidden /> : <Pause className="h-3.5 w-3.5" aria-hidden />}
          </button>
        </div>
      )}
    </div>
  );
}
