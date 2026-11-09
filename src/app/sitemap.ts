import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { routes } from "@/content/navigation";
import { publishedServices } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const main: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    [routes.home, 1, "weekly"],
    [routes.services, 0.9, "monthly"],
    [routes.admissions, 0.9, "monthly"],
    [routes.tour, 0.8, "monthly"],
    [routes.referrals, 0.8, "monthly"],
    [routes.insurance, 0.8, "monthly"],
    [routes.about, 0.7, "monthly"],
    [routes.amenities, 0.7, "monthly"],
    [routes.careers, 0.7, "weekly"],
    [routes.contact, 0.7, "monthly"],
    [routes.community, 0.6, "monthly"],
    [routes.privacy, 0.2, "yearly"],
    [routes.accessibility, 0.2, "yearly"],
    [routes.terms, 0.2, "yearly"],
  ];
  return [
    ...main.map(([path, priority, changeFrequency]) => ({ url: `${SITE_URL}${path === "/" ? "" : path}`, lastModified: now, changeFrequency, priority })),
    ...publishedServices.map((s) => ({ url: `${SITE_URL}/services/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: s.flagship ? 0.9 : 0.7 })),
  ];
}
