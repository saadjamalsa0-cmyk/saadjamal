import { getLocalizedUrl } from "@/lib/seo";
import JsonLd from "./json-ld";

export default function ItemListSchema({ locale, items }: { locale: string; items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, url: getLocalizedUrl(locale, item.path) })),
      }}
    />
  );
}
