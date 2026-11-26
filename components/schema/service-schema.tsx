import type { Locale } from "@/config/i18n";
import { getLocalizedUrl, orgRef, SEO_CONFIG } from "@/lib/seo";
import JsonLd from "./json-ld";

type Props = { locale: string; slug: string; name: string; serviceType: string; description: string };

export default function ServiceSchema({ locale, slug, name, serviceType, description }: Props) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: getLocalizedUrl(locale, `services/${slug}`),
        serviceType,
        provider: orgRef(locale),
        areaServed: { "@type": "Country", name: "Saudi Arabia" },
        inLanguage: SEO_CONFIG.localeMetadata[locale as Locale].hreflang,
      }}
    />
  );
}
