import type { Metadata } from "next";
import { site, SITE_URL, fullAddress } from "@/content/site";
import { publishedServices } from "@/content/services";

export function pageMetadata({
  title, description, path, noindex = false, image,
}: { title: string; description: string; path: string; noindex?: boolean; image?: string }): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      locale: "en_US",
      images: [{ url: image ?? "/opengraph-image", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
    robots: noindex || process.env.NEXT_PUBLIC_NOINDEX === "true" ? { index: false, follow: !process.env.NEXT_PUBLIC_NOINDEX } : undefined,
  };
}

/**
 * Organization / local business structured data.
 * Unverified facts (address, phone) are intentionally omitted until verified,
 * so search engines are never given placeholder data.
 */
export function organizationJsonLd() {
  const sameAs = Object.values(site.social).filter(Boolean);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: site.name,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-primary.svg`,
    image: `${SITE_URL}/brand/logo-primary.svg`,
    description: site.brandStatement,
    additionalType: "https://en.wikipedia.org/wiki/Nursing_home",
    areaServed: ["Rock Island, IL", "Moline, IL", "East Moline, IL", "Milan, IL", "Silvis, IL", "Davenport, IA", "Bettendorf, IA", "Quad Cities"].map((name) => ({ "@type": "Place", name })),
    knowsAbout: publishedServices.filter((s) => s.verified).map((s) => s.title),
  };
  if (site.address.verified) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    };
    if (site.address.geo) data.geo = { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng };
    data.hasMap = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}`;
  }
  if (site.contact.phone.verified) data.telephone = site.contact.phone.e164;
  if (sameAs.length) data.sameAs = sameAs;
  return data;
}

export function websiteJsonLd() {
  return { "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: site.name, publisher: { "@id": `${SITE_URL}/#organization` } };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE_URL}${it.path === "/" ? "" : it.path}` })),
  };
}

export function serviceJsonLd(s: { title: string; summary: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    name: s.title,
    description: s.summary,
    url: `${SITE_URL}/services/${s.slug}`,
    provider: { "@id": `${SITE_URL}/#organization` },
  };
}
