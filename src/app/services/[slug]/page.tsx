import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { getService, publishedServices } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedServices.filter((s) => !s.flagship).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service || service.flagship) return {};
  return pageMetadata({ title: service.seo.title, description: service.seo.description, path: `/services/${slug}` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service || service.flagship) notFound();
  return <ServiceDetail service={service} />;
}
