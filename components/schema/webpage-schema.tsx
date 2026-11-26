import { contentDate } from "@/lib/content-dates";
import { getLocalizedUrl, orgRef, SEO_CONFIG, websiteId } from "@/lib/seo";
import type { Locale } from "@/config/i18n";
import JsonLd from "./json-ld";

type Props = { locale: string; path?: string; name: string; description: string; type?: "WebPage" | "AboutPage" | "ContactPage" };

export default function WebPageSchema({ locale, path = "", name, description, type = "WebPage" }: Props) {
  const url = getLocalizedUrl(locale, path);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: SEO_CONFIG.localeMetadata[locale as Locale].hreflang,
        dateModified: contentDate(path),
        isPartOf: { "@id": websiteId(locale) },
        about: orgRef(locale),
      }}
    />
  );
}
