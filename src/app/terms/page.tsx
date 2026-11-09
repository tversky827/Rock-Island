import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { routes } from "@/content/navigation";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Website Terms of Use", description: `Terms governing use of the ${site.name} website, including information on medical advice, online forms, admissions, and third-party links.`, path: routes.terms });

export default function TermsPage() {
  return (
    <LegalPage title="Website Terms of Use" path={routes.terms} updated="To be set at launch">
      <h2>Acceptance of terms</h2>
      <p>By using this website, you agree to these Terms of Use. If you do not agree, please do not use the website.</p>

      <h2>Informational purposes only — not medical advice</h2>
      <p>Content on this website is provided for general information. It is not medical, legal, or financial advice and is not a substitute for consultation with qualified professionals. <strong>If you are experiencing a medical emergency, call 911.</strong></p>

      <h2>No guarantee of admission, services, or coverage</h2>
      <p>Descriptions of services, amenities, and payment options are general and may change. Admission depends on an individual assessment of care needs, availability, and payment source. Insurance participation and coverage must be verified with our admissions team.</p>

      <h2>Online forms</h2>
      <p>Website forms are for general inquiries only and are not monitored continuously. Do not submit protected health information or time-sensitive medical requests through this website. Submitting a form does not create a resident, patient, or employment relationship.</p>

      <h2>Images</h2>
      <p>Some images on this website may be representative or illustrative and may not depict actual residents, staff, or facility spaces.</p>

      <h2>Intellectual property</h2>
      <p>The {site.name} name, logo, website design, and original content are protected by applicable intellectual property laws and may not be reproduced without permission.</p>

      <h2>Third-party links</h2>
      <p>This website may link to third-party websites, such as government resources. We are not responsible for the content or practices of those sites.</p>

      <h2>Limitation of liability</h2>
      <p>To the fullest extent permitted by law, {site.name} is not liable for damages arising from use of, or inability to use, this website. The website is provided &ldquo;as is&rdquo; without warranties of any kind.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of Illinois, without regard to conflict-of-law principles.</p>

      <h2>Changes</h2>
      <p>We may update these terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised terms.</p>

      <h2>Contact</h2>
      <p>Questions about these terms may be directed to {site.contact.email.general}. See also our <Link href={routes.privacy}>Privacy Policy</Link>.</p>
    </LegalPage>
  );
}
