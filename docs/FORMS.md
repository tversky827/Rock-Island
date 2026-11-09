# Forms: architecture, integration, and HIPAA-conscious design

## The five forms

| Form | Page(s) | Endpoint | Conversion event |
|---|---|---|---|
| General Contact | `/contact`, homepage | `POST /api/forms/contact` | `contact_submission` |
| Schedule a Tour | `/schedule-a-tour` | `POST /api/forms/tour` | `tour_request` |
| Admissions Inquiry | `/admissions#inquiry` | `POST /api/forms/admissions` | `admissions_inquiry` |
| Referral Partner Callback | `/referrals#callback` | `POST /api/forms/referral` | `referral_inquiry` |
| Employment Application (with resume) | `/careers#apply` | `POST /api/forms/careers` | `employment_application` |

Field definitions and validation rules live in `src/lib/forms/schemas.ts`. The same Zod schemas run in the browser (instant feedback) and on the server (authoritative).

## Request pipeline (`src/app/api/forms/[form]/route.ts`)

1. Unknown form, cross-origin `Origin` header, or body larger than 5.5 MB: rejected
2. Per-IP rate limit: 5 submissions per 10 minutes per form
3. Spam checks:
   - **Honeypot** field filled: accepted silently and *not delivered*
   - **Timing** (submitted < 2.5 s after the form loaded, or no timestamp): visible "please try again" error, so a real person is never silently lost
   - **Cloudflare Turnstile**: verified server-side when `TURNSTILE_SECRET_KEY` is set
4. Zod validation: `422` with per-field messages
5. Resume (careers only): ≤ 5 MB, PDF/DOC/DOCX verified by **file signature**, renamed safely
6. Delivery (`src/lib/forms/deliver.ts`):
   - **Resend email** if `RESEND_API_KEY` + `FORMS_FROM_EMAIL` + recipients are set (resume attached)
   - else **webhook** if `FORMS_WEBHOOK_URL` is set (JSON; optional `X-Webhook-Secret` header)
   - else **development**: logged to the server console; **production**: `503`, and the UI shows an error with the phone number

The success message appears **only** after the provider confirms delivery.

## HIPAA-conscious design

- **No form asks for PHI.** There are no fields for diagnoses, medications, history, DOB, insurance IDs, or patient names.
- Every form carries a visible notice not to include medical information, plus a consent checkbox linking to the Privacy Policy.
- The **referral form collects only the referring professional's contact details.** It requires an attestation that no patient information is included. Clinical packets go through the **secure portal** (`NEXT_PUBLIC_SECURE_REFERRAL_URL`, e.g. an e-referral platform) or **secure fax**.
- Analytics events carry only the form type and page location. `src/lib/analytics.ts` enforces an allow-list of parameter keys.
- Because free-text fields could still receive PHI despite the warnings, choose a delivery provider and staff mailbox your compliance officer approves. Where required, use vendors that will sign a **Business Associate Agreement (BAA)**, or route submissions to a HIPAA-eligible CRM via webhook.

## Production recommendations

- Enable **Cloudflare Turnstile** (free): set both Turnstile env vars.
- The rate limiter is in-memory, which is adequate for one instance. On serverless or multi-instance hosting, swap `rateLimited()` in `src/lib/forms/spam.ts` for a shared store (e.g., Upstash Redis). The limiter keys on `x-forwarded-for`, which Vercel sets reliably; on other hosts, ensure the proxy overwrites that header.
- Set up a monitored shared inbox for each form type (`FORMS_TO_*`).

## Testing after deployment

For each form, submit a test entry and confirm:
1. The success message appears.
2. The notification arrives at the correct inbox (and the resume attachment opens, for careers).
3. In GA4 DebugView / GTM preview, the conversion event fires **without** any personal data.
