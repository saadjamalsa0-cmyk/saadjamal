import { createBreadcrumbSchema, type BreadcrumbItem } from "@/lib/seo";
import JsonLd from "./json-ld";

export default function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  return <JsonLd data={createBreadcrumbSchema(items)} />;
}
