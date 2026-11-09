# Information and photographs still needed

Everything below is currently a **placeholder** in the site. Enter each item in the file listed and set its `verified` flag to `true`.

## 1. Facility facts (`src/content/site.ts`)
- [ ] Main phone number (currently fictional `(309) 555-0100`)
- [ ] Admissions direct line (`555-0101`)
- [ ] **Secure referral fax** (`555-0102`)
- [ ] Careers/HR phone (`555-0103`)
- [ ] General, admissions, and careers email addresses (confirm the mailboxes exist)
- [ ] Street address and ZIP; optional GPS coordinates
- [ ] Visiting hours, admissions office hours, tour availability
- [ ] Parking and entrance directions; accessibility accommodations for visitors
- [ ] Social media profile URLs (Facebook, Instagram, LinkedIn, YouTube), or leave blank

## 2. Clinical services (`src/content/services.ts`)
Confirm with the Administrator/DON which services are actually offered. For each one, mark `verified: true` or set `published: false`:
- [ ] Skilled nursing · Short-term rehab · Long-term care · Therapy services (umbrella)
- [ ] Physical therapy · Occupational therapy · Speech therapy (in-house or contracted? hours/days?)
- [ ] Wound care · Medication management · Pain management · Post-surgical recovery
- [ ] **IV therapy** (which types are supported?)
- [ ] Respite care · Nutrition/dietitian services
- [ ] Any additional specialties to add (e.g., memory care, cardiac or pulmonary programs, hospice coordination, dialysis coordination). **Only verified ones.**
- [ ] Referral response-time commitment (referral FAQ)

## 3. Amenities (`src/content/amenities.ts`)
- [ ] Confirm each of the 10 amenities (dining, housekeeping, laundry, activities, social events, common areas, outdoor spaces, family visiting, spiritual support, salon/barber)
- [ ] Private/semi-private rooms, Wi-Fi, TV/cable, phones, transportation, chapel, therapy gym details, if desired

## 4. Insurance & payment (`src/content/insurance.ts`)
- [ ] Medicare certification status
- [ ] Illinois Medicaid participation
- [ ] Medicare Advantage / managed care plans currently contracted (only list confirmed contracts)
- [ ] Commercial insurance and VA participation
- [ ] Private pay policy

## 5. Testimonials (`src/content/testimonials.ts`)
- [ ] 3–8 genuine testimonials (families, rehab guests, referral partners), each with **written permission** and no PHI. Set `approved: true` and remove the samples.

## 6. Careers (`src/content/careers.ts`)
- [ ] Current open positions (title, department, schedule, summary, apply link)
- [ ] Applicant tracking system URL, if any (`NEXT_PUBLIC_ATS_URL`)
- [ ] Benefits (**only HR-verified benefits** may be listed)
- [ ] EEO statement language from HR

## 7. Branding
- [ ] Approve the proposed logo (see `/brand`) or supply official logo files (SVG preferred)
- [ ] Have a designer convert logo text to outlines for print use

## 8. Photography (`src/content/images.ts`, files in `public/images/`)
Each placeholder shows its art-direction brief on screen. Priority shot list:
1. **Building exterior and entrance** (golden hour): `contact`
2. Hero: caregiver and resident in warm conversation, natural light: `heroHome`
3. Nurse with resident at bedside: `nursing`
4. Therapy gym, with PT, OT, and speech sessions: `rehab`, `therapyPT`, `therapyOT`, `therapyST`
5. Common areas, dining room, resident rooms, outdoor spaces: `lifeLounge`, `lifeDining`, `lifeGarden`, `longTerm`
6. Activities, family visits, salon, spiritual space: `lifeActivities`, `lifeFamily`, `lifeSalon`, `lifeSpiritual`
7. Team photos (with releases): `team`, `careers`, `admissions`, `referrals`
8. Quad Cities / riverfront scenery: `community`

Requirements: professional photographer recommended; signed releases for every identifiable person; heroes ≥ 2400 px wide. Any temporary stock photography must be properly licensed and flagged `stock: true`.

## 9. Legal & compliance
- [ ] Legal review of `/privacy-policy`, `/terms`, `/accessibility` (currently drafts)
- [ ] Notice of Privacy Practices (to link from the Privacy Policy)
- [ ] Approved vendor list for form delivery / BAA decisions (see `docs/FORMS.md`)
- [ ] Confirm no marketing claims beyond what is verified (no star ratings, inspection results, awards, staffing ratios, or capacity unless verified and approved)

## 10. Accounts & integrations
- [ ] Domain registrar access for `rockislandnursinghome.com`
- [ ] Hosting (Vercel) account
- [ ] Resend account (or CRM webhook) and recipient inboxes
- [ ] Google Tag Manager / GA4, Search Console, Google Business Profile
- [ ] Cloudflare Turnstile keys
- [ ] Secure e-referral platform URL, if used; online tour scheduler, if used
