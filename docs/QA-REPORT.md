# Final QA report

**Build tested:** production build (`next build && next start`), Next.js 16.4, Node 22.
**Date:** November 2026 (pre-launch; facility content still placeholder).

## Summary

| Area | Result |
|---|---|
| Production build | ✅ Passes. 37 routes, every page statically prerendered |
| TypeScript (strict) and ESLint | ✅ 0 errors, 0 warnings |
| Broken links | ✅ 0 broken across 28 crawled pages, 1,229 internal links, all in-page anchors (`npm run check:links`) |
| Accessibility (axe-core, WCAG 2.0/2.1/2.2 A & AA rules) | ✅ 0 violations on 19 pages |
| Responsive layout | ✅ No horizontal overflow and no JS errors on 21 routes at 360, 390, 768, 1024, 1280, 1920 px |
| SEO structure | ✅ All 28 sitemap URLs have a unique title (≤ 65 chars), a unique meta description (≤ 160), exactly one H1, a canonical URL, OG image, and JSON-LD |
| Lighthouse (mobile, simulated slow 4G) | Performance 90–96 · Accessibility 100 · Best Practices 100 · SEO 100 |
| Security headers | ✅ HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy |

### Lighthouse detail (mobile emulation)
| Page | Perf | LCP | TBT | CLS |
|---|---|---|---|---|
| `/` | 90–94 | 3.1–3.7 s | 50 ms | 0 |
| `/admissions` | 92 | 3.3 s | 50 ms | 0 |
| `/services/skilled-nursing` | 96 | 2.7 s | 40 ms | 0.04 |
| `/careers` | 92 | 3.4 s | 50 ms | 0.01 |

Under Lighthouse's throttled mobile profile, the largest element is the headline, and its timing depends on the brand display font loading. Measured locally, server response was about 450 ms. A CDN deployment (Vercel edge) should lower that, so re-measure on the live domain with PageSpeed Insights. If LCP must be lower still, `display: "optional"` in `src/app/fonts.ts` removes the font swap, at the cost of first-time visitors on slow networks sometimes seeing the fallback serif.

## Forms

All forms were tested through a real browser (Playwright), not only through the API.

| Form | Empty submit shows errors | Valid submit → API | Success panel | Reached delivery layer |
|---|---|---|---|---|
| Contact | ✅ 6 errors | 200 | ✅ | ✅ |
| Schedule a Tour | ✅ 7 | 200 | ✅ | ✅ |
| Admissions | ✅ 7 | 200 | ✅ | ✅ |
| Referral callback | ✅ 8 (incl. no-PHI attestation) | 200 | ✅ | ✅ |
| Careers (+ PDF resume) | ✅ 5 | 200 | ✅ | ✅ (attachment included) |

These runs were in development mode, where delivery is console logging.

Additional server checks: invalid fields return 422 with messages; a filled honeypot is silently discarded; submissions that are too fast or have no timestamp are rejected with a visible retry message; a fake `.pdf` without a PDF signature is rejected; cross-origin posts return 403; unknown form types return 404; the rate limit returns 429 after 5 per 10 minutes.

**In production with no provider configured, forms return 503 and show "Online submissions are temporarily unavailable… call (phone)".** They never show a false success.

> ⚠️ **Not yet tested:** real email/webhook delivery. No Resend key or webhook exists yet, so forms cannot be called operational until a provider is configured and each form is tested on the live deployment (see `docs/FORMS.md`).

### Defect found and fixed during QA
The minimum-fill-time timestamp was stored in a hidden input that React reset on re-render. As a result, **every real browser submission was treated as a bot and silently dropped**. API-level tests had not caught this. It is now attached from a ref at submit time, and timing failures return a visible error instead of a silent success. Verified fixed in the browser.

## Interaction checks
- Desktop dropdowns open on hover, click, and keyboard; Esc and outside-click close them; menus close on navigation
- Exactly one top-level nav item is active per page (e.g., rehab pages highlight "Rehabilitation", not "Services")
- The mobile menu opens, navigates, closes on navigation, locks body scroll, and closes on Esc
- The persistent mobile CTA bar (Call Our Team / Schedule a Tour) appears on every page below 1024 px
- The skip link is the first focusable element
- The testimonial carousel has pause/resume, 24 px+ targets, and respects reduced motion
- The amenities gallery lightbox supports keyboard (arrows, Esc), traps focus, and restores focus on close
- Every `tel:` link uses a configured number; every CTA goes to a real route or anchor

## Known limitations / items to verify after deployment
1. **Google Maps embed** could not load in the sandboxed test environment (no external network). It uses a keyless embed URL and should render on the live site. Until the address is verified it shows the city.
2. **Reference site** (goldwatercare.com) and stock photo sources were unreachable from the build environment. The architecture follows established skilled-nursing website patterns, and all imagery uses labeled, art-directed placeholders.
3. **External links** (Medicare.gov, Illinois HFS, ABE, SHIP, VA, W3C) could not be fetched here. Click through them once before launch.
4. The in-memory rate limiter should move to a shared store on multi-instance or serverless hosting (`docs/FORMS.md`).
5. Legal pages are drafts that need legal review.
6. All facility facts are placeholders until supplied (`docs/CONTENT-NEEDED.md`).

## How to re-run QA
```bash
npm run lint && npm run typecheck && npm run build
npm start &
BASE_URL=http://localhost:3000 npm run check:links
npx lighthouse http://localhost:3000 --view
```
