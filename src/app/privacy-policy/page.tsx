import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { routes } from "@/content/navigation";
import { site, fullAddress } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Privacy Policy", description: `How ${site.name} collects, uses, and protects information submitted through this website.`, path: routes.privacy });

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path={routes.privacy} updated="To be set at launch"
      intro={<>This Website Privacy Policy explains how {site.name} handles information collected through this website. It does not replace our <strong>Notice of Privacy Practices</strong>, which describes how we use and protect residents&apos; protected health information under HIPAA.</>}>
      <h2>Website privacy vs. health information</h2>
      <p>This website is designed for general information and initial contact. Our online forms are <strong>not</strong> intended to collect protected health information (PHI) such as diagnoses, medications, medical history, or insurance member numbers. Please do not submit health information through this website. Our team will discuss care needs with you by phone or through appropriate secure channels.</p>
      <p>Residents and their representatives may request a copy of our Notice of Privacy Practices from our admissions or business office.</p>

      <h2>Information we collect</h2>
      <h3>Information you provide</h3>
      <ul>
        <li><strong>Contact, tour, and admissions inquiries:</strong> name, email address, phone number, preferred contact method, relationship to a prospective resident, type of care being explored, preferred tour date/time, and any message you choose to include.</li>
        <li><strong>Referral callback requests:</strong> the referring professional&apos;s name, organization, role, and contact details. Patient information must not be submitted.</li>
        <li><strong>Employment applications:</strong> name, contact details, position of interest, resume, and any additional information you provide.</li>
      </ul>
      <h3>Information collected automatically</h3>
      <p>Like most websites, we may collect technical information such as browser type, device type, pages visited, and approximate location derived from IP address. If analytics tools are enabled, they are configured to avoid collecting form contents or other personally identifying information in event data.</p>

      <h2>How we use information</h2>
      <ul>
        <li>To respond to your inquiry, schedule tours, and discuss admissions.</li>
        <li>To coordinate with referring healthcare professionals.</li>
        <li>To evaluate employment applications.</li>
        <li>To maintain, secure, and improve this website.</li>
        <li>To comply with legal obligations.</li>
      </ul>
      <p>We do not sell personal information submitted through this website.</p>

      <h2>Cookies and analytics</h2>
      <p>This website may use cookies and similar technologies, including Google Analytics and/or Google Tag Manager, to understand how visitors use the site. These tools are configured without advertising personalization, and we design our tracking to exclude names, contact details, message content, and health information. You can control cookies through your browser settings.</p>

      <h2>How information is shared</h2>
      <p>We share information only with service providers that help us operate this website and deliver form submissions (for example, web hosting and email delivery services), and only as needed to provide those services, or as required by law.</p>

      <h2>Security</h2>
      <p>This website uses encrypted connections (HTTPS). Form submissions are validated, protected against automated spam, and delivered to authorized staff. No method of transmission over the internet is completely secure, which is one reason we ask that health information not be sent through website forms.</p>

      <h2>Retention</h2>
      <p>We retain website inquiries and applications only as long as needed for the purposes described above or as required by law. [Retention periods to be defined by the facility.]</p>

      <h2>Your choices</h2>
      <p>You may ask us to update or delete information you submitted through this website by contacting us using the details below. Illinois residents and others may have additional rights under applicable law.</p>

      <h2>Children</h2>
      <p>This website is not directed to children under 13, and we do not knowingly collect information from them.</p>

      <h2>Contact us</h2>
      <p>{site.name}<br />{fullAddress}<br />Phone: {site.contact.phone.display}<br />Email: {site.contact.email.general}</p>
      <p>See also our <Link href={routes.accessibility}>Accessibility Statement</Link> and <Link href={routes.terms}>Website Terms</Link>.</p>
    </LegalPage>
  );
}
