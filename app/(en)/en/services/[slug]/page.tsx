import { notFound } from "next/navigation";
import { ServiceDetailPage, serviceDetailMetadata } from "@/components/pages";
import { getService, services } from "@/content/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return serviceDetailMetadata("en", slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServiceDetailPage locale="en" service={service} />;
}
