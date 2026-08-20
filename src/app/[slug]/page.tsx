import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageLayout from "@/components/sections/ServicePageLayout";
import {
  getServicePage,
  serviceSlugs,
} from "@/data/services/registry";
import { site } from "@/data/site";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getServicePage(slug);

  if (!content) {
    return { title: `Services | ${site.name}` };
  }

  return {
    title: `${content.name} Services | ${site.name}`,
    description: content.metaDescription,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const content = getServicePage(slug);

  if (!content) notFound();

  return <ServicePageLayout content={content} />;
}
