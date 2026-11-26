import { toAbsoluteUrl } from "./urls";

export interface BreadcrumbItem {
  name: string;
  /** Localized path, e.g. /en/about */
  url: string;
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url === "/" ? toAbsoluteUrl("").replace(/\/$/, "") : toAbsoluteUrl(item.url),
    })),
  };
}
