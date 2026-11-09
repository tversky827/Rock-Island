import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { routes } from "@/content/navigation";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Accessibility Statement", description: `${site.name} is committed to making this website accessible to everyone, including people with disabilities.`, path: routes.accessibility });

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility Statement" path={routes.accessibility} updated="To be set at launch"
      intro={<>{site.name} is committed to ensuring that this website is accessible to everyone — including older adults and people with disabilities who use assistive technologies.</>}>
      <h2>Our goal</h2>
      <p>We aim to conform to the <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer">Web Content Accessibility Guidelines (WCAG) 2.2, Level AA</a>. These guidelines explain how to make web content more accessible for people with a wide range of disabilities.</p>

      <h2>Measures we have taken</h2>
      <ul>
        <li>Semantic HTML structure with a logical heading order and labeled page regions.</li>
        <li>A &ldquo;Skip to main content&rdquo; link and full keyboard navigation, including menus and dropdowns.</li>
        <li>Visible focus indicators on interactive elements.</li>
        <li>Text and color combinations chosen to meet contrast requirements, with comfortable, readable type sizes.</li>
        <li>Descriptive text alternatives for images.</li>
        <li>Form fields with visible labels, clear error messages, and status announcements for assistive technology.</li>
        <li>Support for the &ldquo;reduce motion&rdquo; setting; animations are subtle and can be paused where they repeat.</li>
        <li>Responsive layouts that work with browser zoom and on phones and tablets.</li>
      </ul>

      <h2>Ongoing effort</h2>
      <p>Accessibility is an ongoing commitment. We review the site as content changes and welcome feedback. Some third-party content, such as embedded maps, may not be fully within our control; we will provide the same information in an alternative format on request.</p>

      <h2>Feedback and assistance</h2>
      <p>If you encounter a barrier on this website, or need information in a different format, please contact us. We will do our best to respond promptly and provide the information you need.</p>
      <p>Phone: {site.contact.phone.display}<br />Email: {site.contact.email.general}</p>

      <h2>Accessibility at our facility</h2>
      <p>If you or a visitor has accessibility needs for a tour or visit, please let us know in advance so we can help make your visit comfortable. [Facility accessibility details — parking, entrances, and accommodations — to be confirmed.]</p>
    </LegalPage>
  );
}
