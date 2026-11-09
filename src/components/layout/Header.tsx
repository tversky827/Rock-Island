"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock, MapPin, Menu, Phone, X } from "lucide-react";
import { LogoHorizontal } from "../brand/Logo";
import { TrackedLink } from "../ui/TrackedLink";
import { mainNav, routes, type NavItem } from "@/content/navigation";
import { site, telHref } from "@/content/site";

/** Exactly one top-level item is active: an exact child match wins, then the longest prefix match. */
function activeLabel(pathname: string): string | null {
  for (const item of mainNav) if (item.href === pathname && item.href !== "/" && !item.children) return item.label;
  for (const item of mainNav) if (item.children?.some((c) => c.href === pathname) && item.href !== "/services") return item.label;
  for (const item of mainNav) if (item.children?.some((c) => c.href === pathname)) return item.label;
  let best: NavItem | null = null;
  for (const item of mainNav) {
    if (item.href === "/") { if (pathname === "/") return item.label; continue; }
    if ((pathname === item.href || pathname.startsWith(item.href + "/")) && (!best || item.href.length > best.href.length)) best = item;
  }
  return best?.label ?? null;
}
function isActive(pathname: string, item: NavItem) {
  return activeLabel(pathname) === item.label;
}

function Dropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  // Menu state is keyed to the current path, so it closes automatically on navigation.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) => setOpenFor((cur) => ((typeof v === "function" ? v(cur === pathname) : v) ? pathname : null));
  const ref = useRef<HTMLLIElement>(null);
  const active = isActive(pathname, item);
  const id = `menu-${item.label.toLowerCase().replace(/\W+/g, "-")}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenFor(null);
    const onClick = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpenFor(null);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [open]);

  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onBlur={(e) => { if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <div className="flex items-center">
        <Link href={item.href} aria-current={active ? "page" : undefined}
          className={`link-underline inline-flex items-center py-2 text-[0.8rem] font-semibold uppercase leading-none tracking-[0.14em] transition-colors ${active ? "text-navy-900" : "text-stone-600 hover:text-navy-900"}`}>
          {item.label}
        </Link>
        <button type="button" aria-expanded={open} aria-controls={id} aria-label={`Show ${item.label} menu`} onClick={(e) => (e.detail === 0 ? setOpen((o) => !o) : setOpen(true))}
          className="ml-0.5 p-1 text-stone-500 hover:text-navy-900">
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} strokeWidth={2} aria-hidden />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div id={id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-4">
            <ul className="border-t-2 border-champagne-500 bg-white p-3 shadow-lift">
              {item.children!.map((c) => (
                <li key={c.href + c.label}>
                  <Link href={c.href} aria-current={pathname === c.href ? "page" : undefined}
                    className="group block px-4 py-3 transition-colors hover:bg-cream">
                    <span className="block font-display text-lg leading-tight text-navy-900 group-hover:text-champagne-700">{c.label}</span>
                    {c.description && <span className="mt-0.5 block text-[0.82rem] leading-snug text-stone-500">{c.description}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileFor, setMobileFor] = useState<string | null>(null);
  const mobileOpen = mobileFor === pathname;
  const setMobileOpen = (v: boolean) => setMobileFor(v ? pathname : null);
  const [expandedState, setExpandedState] = useState<{ path: string; label: string | null }>({ path: "", label: null });
  const expanded = expandedState.path === pathname ? expandedState.label : null;
  const setExpanded = (fn: (e: string | null) => string | null) => setExpandedState({ path: pathname, label: fn(expanded) });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileFor(null);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const phone = site.contact.phone;

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      {/* Utility bar */}
      <div className={`on-dark hidden overflow-hidden bg-navy-950 text-ivory/80 transition-[max-height] duration-500 md:block ${scrolled ? "max-h-0" : "max-h-10"}`}>
        <div className="container-x flex h-9 items-center justify-between text-[0.72rem] tracking-[0.06em]">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-champagne-300" aria-hidden />{site.address.city}, {site.address.regionName} · Serving the Quad Cities</span>
            <span className="hidden items-center gap-2 lg:inline-flex"><Clock className="h-3.5 w-3.5 text-champagne-300" aria-hidden />{site.hours.tours}</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href={routes.referrals} className="link-underline hover:text-ivory">Hospital &amp; Physician Referrals</Link>
            <Link href={routes.careers} className="link-underline hover:text-ivory">Careers</Link>
            <TrackedLink href={telHref(site.contact.admissionsPhone.e164)} location="utility-bar" className="link-underline hover:text-ivory">
              Admissions: <span className="font-semibold text-ivory">{site.contact.admissionsPhone.display}</span>
            </TrackedLink>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className={`border-b transition-all duration-500 ${scrolled ? "border-beige-200 bg-ivory/95 shadow-soft backdrop-blur-md" : "border-transparent bg-ivory/90 backdrop-blur-sm"}`}>
        <div className={`container-x flex items-center justify-between gap-6 transition-[height] duration-500 ${scrolled ? "h-[4.5rem]" : "h-20 lg:h-[5.5rem]"}`}>
          <Link href="/" className="shrink-0">
            <LogoHorizontal />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-5 2xl:gap-7">
              {mainNav.map((item) =>
                item.children ? (
                  <Dropdown key={item.label} item={item} pathname={pathname} />
                ) : (
                  <li key={item.label} className={item.href === "/" ? "hidden items-center 2xl:flex" : "flex items-center"}>
                    <Link href={item.href} aria-current={isActive(pathname, item) ? "page" : undefined}
                      className={`link-underline inline-flex items-center py-2 text-[0.8rem] font-semibold uppercase leading-none tracking-[0.14em] transition-colors ${isActive(pathname, item) ? "text-navy-900" : "text-stone-600 hover:text-navy-900"}`}>
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <TrackedLink href={telHref(phone.e164)} location="header" className="hidden items-center gap-2.5 text-navy-900 hover:text-champagne-700 lg:inline-flex" aria-label={`Call ${site.name} at ${phone.display}`}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne-400/70"><Phone className="h-4 w-4" strokeWidth={1.6} aria-hidden /></span>
              <span className="hidden flex-col leading-tight 2xl:flex">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-stone-500">Call us</span>
                <span className="text-[0.95rem] font-semibold">{phone.display}</span>
              </span>
            </TrackedLink>
            <TrackedLink href={routes.tour} location="header" className="btn btn-primary btn-sm hidden sm:inline-flex">Schedule a Tour</TrackedLink>
            <button type="button" className="flex h-11 w-11 items-center justify-center text-navy-900 xl:hidden" aria-expanded={mobileOpen} aria-controls="mobile-menu" onClick={() => setMobileOpen(true)}>
              <Menu className="h-6 w-6" strokeWidth={1.5} aria-hidden /><span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ivory xl:hidden">
            <div className="container-x flex h-20 shrink-0 items-center justify-between border-b border-beige-200">
              <Link href="/"><LogoHorizontal /></Link>
              <button type="button" className="flex h-11 w-11 items-center justify-center text-navy-900" onClick={() => setMobileOpen(false)} autoFocus>
                <X className="h-6 w-6" strokeWidth={1.5} aria-hidden /><span className="sr-only">Close menu</span>
              </button>
            </div>
            <nav aria-label="Mobile" className="container-x flex-1 py-6">
              <ul className="divide-y divide-beige-200">
                {mainNav.map((item, i) => (
                  <motion.li key={item.label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i, duration: 0.4 }}>
                    <div className="flex items-center justify-between">
                      <Link href={item.href} className="block flex-1 py-4 font-display text-[1.7rem] text-navy-900" aria-current={isActive(pathname, item) ? "page" : undefined}>{item.label}</Link>
                      {item.children && (
                        <button type="button" className="p-3 text-stone-500" aria-expanded={expanded === item.label} aria-label={`Show ${item.label} pages`}
                          onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}>
                          <ChevronDown className={`h-5 w-5 transition-transform ${expanded === item.label ? "rotate-180" : ""}`} aria-hidden />
                        </button>
                      )}
                    </div>
                    {item.children && expanded === item.label && (
                      <ul className="mb-4 space-y-1 border-l border-champagne-400 pl-5">
                        {item.children.map((c) => (
                          <li key={c.href + c.label}><Link href={c.href} className="block py-2 text-stone-600 hover:text-navy-900">{c.label}</Link></li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
                <li><Link href={routes.referrals} className="block py-4 font-display text-[1.7rem] text-navy-900">Referrals</Link></li>
              </ul>
            </nav>
            <div className="container-x grid shrink-0 gap-3 border-t border-beige-200 py-6 sm:grid-cols-2">
              <TrackedLink href={routes.tour} location="mobile-menu" className="btn btn-primary">Schedule a Tour</TrackedLink>
              <TrackedLink href={telHref(phone.e164)} location="mobile-menu" className="btn btn-outline"><Phone className="h-4 w-4" aria-hidden /> {phone.display}</TrackedLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
