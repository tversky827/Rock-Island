# Rock Island Nursing Home — Website

Website for **Rock Island Nursing Home**, a skilled nursing and rehabilitation facility in Rock Island, Illinois, serving the Quad Cities.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lucide · Framer Motion · Zod**.

> **Status: ready for facility content.** All pages, forms, SEO, and analytics hooks are built and tested. Facility-specific details are **placeholders**. They are marked on-screen with "Pending verification" badges and must be confirmed before launch. See [`docs/CONTENT-NEEDED.md`](docs/CONTENT-NEEDED.md).

---

## Quick start

```bash
npm install
cp .env.example .env.local     # optional for local work
npm run dev                    # http://localhost:3000
```

| Command | Purpose |
|---|---|
| `npm run dev` | Local development (form submissions are logged to the console) |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` · `npm run typecheck` | Code quality |
| `npm run check:links` | Crawl a running site and verify every internal link and anchor (`BASE_URL=...`) |

Requires Node.js 20 or newer.

---

## Site map (28 public pages)

| Page | Route |
|---|---|
| Home | `/` |
| About Us | `/about` |
| Our Services (directory) | `/services` |
| Skilled Nursing | `/services/skilled-nursing` |
| Short-Term Rehabilitation | `/services/short-term-rehabilitation` |
| Long-Term Care | `/services/long-term-care` |
| Therapy Services | `/services/therapy-services` |
| Physical / Occupational / Speech Therapy, Wound Care, Medication Management, Pain Management, Post-Surgical Recovery, IV Therapy, Respite Care, Nutrition & Dietary | `/services/<slug>` (generated from data) |
| Amenities & Life at Rock Island | `/amenities` |
| Admissions | `/admissions` |
| Insurance & Payment Options | `/insurance-and-payment` |
| Careers | `/careers` |
| Contact Us | `/contact` |
| Schedule a Tour | `/schedule-a-tour` |
| Hospital & Physician Referrals | `/referrals` |
| Serving the Quad Cities (regional content, one location) | `/serving-the-quad-cities` |
| Privacy Policy · Accessibility Statement · Website Terms | `/privacy-policy` · `/accessibility` · `/terms` |
| Brand guidelines (internal, `noindex`) | `/brand` |

Also generated: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`, `/icon.svg`, `/apple-icon`, and a custom 404 page.

---

## Editing content — no page rewrites needed

All facility information lives in **`src/content/`**:

| File | What it controls |
|---|---|
| `site.ts` | **Name, phone numbers, fax, emails, address, hours, social links, integration URLs.** Start here. |
| `services.ts` | Every service: copy, icon, image, related services, SEO title/description. Set `published: false` to hide one or `verified: true` once confirmed. Adding an entry automatically creates its page, card, and sitemap entry. |
| `amenities.ts` | Amenities, amenity groups, gallery |
| `testimonials.ts` | Testimonials. Only `approved: true` entries are shown publicly. |
| `careers.ts` | Departments, workplace values, **open positions** (currently empty) |
| `insurance.ts` | Payment-source descriptions and disclaimer |
| `faqs.ts` | Admissions, insurance, and referral FAQs (also emitted as FAQ structured data) |
| `team.ts` | Interdisciplinary team categories |
| `communities.ts` | Quad Cities communities served |
| `navigation.ts` | Header, dropdown, and footer navigation |
| `images.ts` | **Central image registry.** See `public/images/README.md`. |

**Verification workflow.** Each fact has a `verified` flag. While `NEXT_PUBLIC_SHOW_VERIFICATION_FLAGS` is `true` (the default), unverified items show a discreet badge, image placeholders are labeled, sample testimonials are visible and labeled, and a dismissible "Pre-launch preview" notice appears. Structured data (JSON-LD) **never** includes the address or phone until they are marked `verified: true`.

**Logo.** The proposed logo is code (`src/components/brand/Logo.tsx`) plus files in `public/brand/`. To use an official logo, replace those components and files. Brand guidelines are at `/brand` and in [`docs/BRAND.md`](docs/BRAND.md).

---

## Deployment (Vercel recommended)

1. Push this repository to GitHub. *(Done: `tversky827/Rock-Island`.)*
2. In [Vercel](https://vercel.com/new), choose **Import Git Repository** and select the repo. The framework is detected as Next.js, so no build settings are needed.
3. Under **Settings → Environment Variables**, add the values from `.env.example`. At minimum:
   - `NEXT_PUBLIC_SITE_URL=https://rockislandnursinghome.com`
   - a form provider (`RESEND_API_KEY` + `FORMS_FROM_EMAIL` + `FORMS_TO_*`, **or** `FORMS_WEBHOOK_URL`)
   - On preview/staging: `NEXT_PUBLIC_NOINDEX=true`
4. Deploy, then **submit a test entry through every form** and confirm it arrives (see [`docs/FORMS.md`](docs/FORMS.md)).

Without a configured provider, forms in production show an error with the phone number. They **never** report a false success.

Other hosts: any Node 20+ host works (`npm run build && npm start`), as do Netlify and AWS Amplify. The form API needs a Node runtime, so a static export is not suitable.

## Connecting the domain `rockislandnursinghome.com`

1. In Vercel, go to **Project → Settings → Domains**, add `rockislandnursinghome.com` and `www.rockislandnursinghome.com`, and set the apex as primary (www redirects to it).
2. At your domain registrar, create the DNS records Vercel shows. Typically these are:
   - `A` record, host `@`, value `76.76.21.21`
   - `CNAME` record, host `www`, value `cname.vercel-dns.com`

   Always use the exact values shown in your Vercel dashboard.
3. Wait for DNS to propagate (minutes to 48 hours). Vercel issues the HTTPS certificate automatically.
4. Confirm `NEXT_PUBLIC_SITE_URL` matches the primary domain, then redeploy.
5. **Email:** if using Resend, add the SPF/DKIM DNS records Resend provides so form notification emails are delivered reliably. Do not change existing MX records used for staff email.
6. **Google Search Console:** add the domain property (DNS TXT verification, or set `NEXT_PUBLIC_GSC_VERIFICATION`), then submit `https://rockislandnursinghome.com/sitemap.xml`.
7. **Google Business Profile:** claim or update the facility's profile with the same name, address, and phone as `site.ts` (NAP consistency matters for local SEO).

## Launch checklist

- [ ] All items in `docs/CONTENT-NEEDED.md` supplied and entered; `verified: true` set
- [ ] Legal review of Privacy Policy, Terms, and Accessibility Statement; Notice of Privacy Practices available
- [ ] Form provider configured; every form tested end-to-end in production
- [ ] Analytics configured (GTM/GA4). Confirm no PII or PHI appears in events.
- [ ] `NEXT_PUBLIC_SHOW_VERIFICATION_FLAGS=false`, `NEXT_PUBLIC_NOINDEX=false` in production
- [ ] Domain connected, HTTPS active, sitemap submitted to Search Console

---

## Architecture notes

```
src/
  app/                  Routes (App Router). Each page exports unique SEO metadata.
    api/forms/[form]/   Secure form endpoint (validation, spam checks, delivery)
  components/
    brand/              Logo system
    layout/             Header (sticky, dropdowns, mobile menu), Footer, mobile CTA bar, analytics
    sections/           Reusable page sections (service template, testimonials, team, contact…)
    forms/              Form kit + the five forms
    ui/                 Primitives: Button, Media (image/placeholder), Reveal, PageHero, FAQ, etc.
  content/              ← All editable facility content
  lib/                  SEO helpers, analytics, form schemas/spam/delivery
docs/                   Brand, forms, content-needed list, QA report
```

- **Rendering.** Every page is statically prerendered (fast, CDN-cacheable). Only `/api/forms/*` runs on the server.
- **Performance.** Self-hosted fonts (no third-party font requests), no blocking scripts, a single shared IntersectionObserver for scroll reveals, and a transform-only hero animation so LCP is never delayed. `next/image` handles real photos (AVIF/WebP).
- **Accessibility.** Skip link, landmarks, keyboard-operable menus (Esc to close), visible focus, labeled form fields with announced errors and status, reduced-motion support, and AA contrast. Automated axe checks against WCAG 2.2 AA rules found 0 violations across 19 pages.
- **Security.** Security headers (HSTS, nosniff, frame and referrer policies), same-origin checks on form posts, honeypot and timing checks, optional Cloudflare Turnstile, per-IP rate limiting, a 5 MB resume limit with file-signature checks, and HTML-escaped notification emails.
