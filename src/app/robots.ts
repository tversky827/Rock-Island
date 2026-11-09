import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Set NEXT_PUBLIC_NOINDEX=true on staging/preview deployments.
  if (process.env.NEXT_PUBLIC_NOINDEX === "true") return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
