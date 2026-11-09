"use client";

import { FormShell, Field, SelectField, RadioGroup, TextareaField, FileField, Checkbox, PrivacyConsent, NoPhiNotice, Row } from "./FormKit";
import { contactReasons, tourTimes, relationships, careTypes, referrerRoles } from "@/lib/forms/schemas";
import { positionOptions } from "@/content/careers";

const methods = ["Email", "Phone", "Either"] as const;

export function ContactForm() {
  return (
    <FormShell type="contact" submitLabel="Send Message" successTitle="Thank you for reaching out."
      successText={<p>Your message has been received. A member of our team will follow up using your preferred contact method.</p>}>
      <Row>
        <Field name="name" label="Full name" required autoComplete="name" />
        <Field name="email" label="Email" type="email" required autoComplete="email" inputMode="email" />
      </Row>
      <Row>
        <Field name="phone" label="Phone" type="tel" autoComplete="tel" inputMode="tel" />
        <SelectField name="reason" label="Reason for contact" options={contactReasons} required />
      </Row>
      <TextareaField name="message" label="Message" required maxLength={2000} />
      <RadioGroup name="preferredContact" label="Preferred contact method" options={methods} required />
      <NoPhiNotice />
      <PrivacyConsent />
    </FormShell>
  );
}

export function TourForm() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <FormShell type="tour" submitLabel="Request My Tour" successTitle="Your tour request has been received."
      successText={<p>Thank you. Our team will contact you to confirm a tour time. Requested times are not confirmed until you hear from us.</p>}>
      <Row>
        <Field name="name" label="Full name" required autoComplete="name" />
        <Field name="phone" label="Phone" type="tel" required autoComplete="tel" inputMode="tel" />
      </Row>
      <Field name="email" label="Email" type="email" required autoComplete="email" inputMode="email" />
      <Row>
        <Field name="preferredDate" label="Preferred date" type="date" required min={today} />
        <SelectField name="preferredTime" label="Preferred time" options={tourTimes} required />
      </Row>
      <Field name="visitors" label="Number of visitors" type="number" required min="1" max="8" inputMode="numeric" hint="Including yourself." />
      <TextareaField name="comments" label="Additional comments" rows={4} maxLength={1000} hint="Accessibility needs, questions you'd like answered, or anything that would help us prepare." />
      <NoPhiNotice />
      <PrivacyConsent />
    </FormShell>
  );
}

export function AdmissionsForm() {
  return (
    <FormShell type="admissions" submitLabel="Contact Admissions" successTitle="Thank you — we'll be in touch."
      successText={<p>Our admissions team has received your inquiry and will reach out to talk through your questions and next steps. Submitting this form does not reserve a bed or guarantee admission.</p>}>
      <Row>
        <Field name="name" label="Your full name" required autoComplete="name" />
        <SelectField name="relationship" label="Relationship to prospective resident" options={relationships} required />
      </Row>
      <Row>
        <Field name="email" label="Email" type="email" required autoComplete="email" inputMode="email" />
        <Field name="phone" label="Phone" type="tel" required autoComplete="tel" inputMode="tel" />
      </Row>
      <SelectField name="careType" label="Type of care being explored" options={careTypes} required />
      <RadioGroup name="preferredContact" label="Preferred contact method" options={methods} required />
      <TextareaField name="message" label="General message" rows={4} maxLength={1500} hint="General questions or timing only — please don't include medical details." />
      <NoPhiNotice />
      <PrivacyConsent />
    </FormShell>
  );
}

/**
 * Referral partner callback request. Collects ONLY the referring
 * professional's details — never patient information. Clinical referral
 * packets must go through the secure portal or secure fax.
 */
export function ReferralCallbackForm() {
  return (
    <FormShell type="referral" submitLabel="Request a Callback" successTitle="Callback requested."
      successText={<p>Our admissions team will contact you to coordinate the referral through a secure channel. For time-sensitive placements, please call our admissions line directly.</p>}>
      <NoPhiNotice>
        <strong>Do not enter any patient information</strong> — including names, initials, dates of birth, diagnoses, or medical record numbers. This form collects only <em>your</em> professional contact details so our admissions team can call you back and receive the referral securely.
      </NoPhiNotice>
      <Row>
        <Field name="name" label="Your name" required autoComplete="name" />
        <Field name="organization" label="Organization / hospital" required autoComplete="organization" />
      </Row>
      <Row>
        <SelectField name="role" label="Your role" options={referrerRoles} required />
        <SelectField name="callback" label="Callback preference" options={["As soon as possible", "Within a few hours", "Next business day"]} required />
      </Row>
      <Row>
        <Field name="phone" label="Direct phone" type="tel" required autoComplete="tel" inputMode="tel" />
        <Field name="email" label="Work email" type="email" required autoComplete="email" inputMode="email" />
      </Row>
      <TextareaField name="note" label="Note for our team" rows={3} maxLength={400} hint="Logistics only (e.g., best time to reach you). No patient details." />
      <Checkbox name="noPhiAttestation">I confirm this request contains <strong>no patient-identifying or health information</strong>.</Checkbox>
      <PrivacyConsent />
    </FormShell>
  );
}

export function CareersForm() {
  return (
    <FormShell type="careers" submitLabel="Submit Application" successTitle="Thank you for your interest."
      successText={<p>Your application has been received. If your experience matches a current or upcoming opening, a member of our team will contact you.</p>}>
      <Row>
        <Field name="name" label="Full name" required autoComplete="name" />
        <Field name="email" label="Email" type="email" required autoComplete="email" inputMode="email" />
      </Row>
      <Row>
        <Field name="phone" label="Phone" type="tel" required autoComplete="tel" inputMode="tel" />
        <SelectField name="position" label="Position of interest" options={positionOptions} required />
      </Row>
      <FileField name="resume" label="Resume" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" hint="PDF or Word document, up to 5 MB." />
      <TextareaField name="additional" label="Additional information" rows={4} maxLength={2000} hint="Licenses or certifications, availability, or anything you'd like us to know. Please do not include your Social Security number or date of birth." />
      <PrivacyConsent />
    </FormShell>
  );
}
