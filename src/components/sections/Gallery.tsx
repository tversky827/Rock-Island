"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

/**
 * Accessible gallery with lightbox.
 * Tiles are rendered server-side and passed in as `tiles` (Media elements),
 * so the client bundle stays small. Keyboard: ←/→ to navigate, Esc to close.
 */
export function Gallery({ tiles, full, captions, layout }: { tiles: ReactNode[]; full?: ReactNode[]; captions: string[]; layout: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = tiles.length;

  const close = useCallback(() => {
    setOpen((cur) => { if (cur !== null) setTimeout(() => triggerRefs.current[cur]?.focus(), 0); return null; });
  }, []);
  const go = useCallback((d: number) => setOpen((cur) => (cur === null ? cur : (cur + d + n) % n)), [n]);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        const f = document.querySelectorAll<HTMLElement>("#gallery-lightbox button");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, close, go]);

  return (
    <>
      <ul className="grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] md:grid-cols-4 md:gap-4">
        {tiles.map((tile, i) => (
          <li key={i} className={layout[i] ?? ""}>
            <button ref={(el) => { triggerRefs.current[i] = el; }} type="button" onClick={() => setOpen(i)}
              className="group relative block h-full w-full overflow-hidden text-left" aria-label={`Open image: ${captions[i]}`}>
              <div className="h-full w-full transition-transform duration-[1.6s] ease-[var(--ease-elegant)] group-hover:scale-[1.04]">{tile}</div>
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-navy-950/75 to-transparent px-4 pb-3 pt-10">
                <span className="font-display text-lg text-ivory">{captions[i]}</span>
                <Expand className="h-4 w-4 text-champagne-200 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div id="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`Gallery image ${open + 1} of ${n}: ${captions[open]}`}
          className="on-dark fixed inset-0 z-[60] flex flex-col bg-navy-950/95 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="container-x flex h-20 shrink-0 items-center justify-between text-ivory">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-champagne-300">{open + 1} / {n} · {captions[open]}</p>
            <button ref={closeRef} type="button" onClick={close} className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 hover:border-champagne-300" aria-label="Close gallery">
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <div className="container-x flex flex-1 items-center gap-4 pb-10" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
            <button type="button" onClick={() => go(-1)} className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/25 text-ivory hover:border-champagne-300 sm:flex" aria-label="Previous image">
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <div className="relative mx-auto aspect-[4/3] max-h-[75vh] w-full max-w-5xl overflow-hidden">{(full ?? tiles)[open]}</div>
            <button type="button" onClick={() => go(1)} className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/25 text-ivory hover:border-champagne-300 sm:flex" aria-label="Next image">
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <div className="flex justify-center gap-4 pb-8 sm:hidden">
            <button type="button" onClick={() => go(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory" aria-label="Previous image"><ChevronLeft className="h-5 w-5" aria-hidden /></button>
            <button type="button" onClick={() => go(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory" aria-label="Next image"><ChevronRight className="h-5 w-5" aria-hidden /></button>
          </div>
        </div>
      )}
    </>
  );
}
