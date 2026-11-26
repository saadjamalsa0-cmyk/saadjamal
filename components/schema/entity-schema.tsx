import { useTranslations } from "next-intl";
import { COMPANY, socialLinks } from "@/config/company";
import type { Locale } from "@/config/i18n";
import { services } from "@/content/services";
import { getLocalizedUrl, OFFICE_ID, ORG_ID, SEO_CONFIG, toAbsoluteUrl, websiteId } from "@/lib/seo";
import JsonLd from "./json-ld";

/**
 * The company entity graph: Organization, Dammam office (LocalBusiness) and WebSite, linked by @id.
 * Mount only on pages about the company itself (home, about, contact); others use orgRef().
 */
export default function EntitySchema({ locale }: { locale: string }) {
  const t = useTranslations();
  const l = locale as Locale;
  const a = COMPANY.address;
  const confirmed = COMPANY.contactConfirmed;
  const sameAs = socialLinks.map((s) => s.url);
  const name = COMPANY.legalName[l];
  const image = toAbsoluteUrl(SEO_CONFIG.defaultOgImage);
  const address = {
    "@type": "PostalAddress",
    streetAddress: a.streetText[l],
    addressLocality: a.cityText[l],
    addressRegion: a.regionText[l],
    postalCode: a.postalCode,
    addressCountry: a.country,
  };

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": ORG_ID,
            name,
            legalName: name,
            alternateName: [COMPANY.brand.ar, COMPANY.brand.en, COMPANY.legalName.ar, COMPANY.legalName.en].filter((n) => n !== name),
            url: SEO_CONFIG.siteUrl,
            logo: toAbsoluteUrl("/images/logo.png"),
            image,
            description: t("seo.home.description"),
            areaServed: { "@type": "Country", name: t("common.country") },
            knowsAbout: t.raw("common.knowsAbout"),
            ...(confirmed
              ? {
                  address,
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      telephone: COMPANY.phoneIntl,
                      email: COMPANY.email,
                      contactType: "sales",
                      areaServed: "SA",
                      availableLanguage: ["Arabic", "English"],
                    },
                  ],
                  department: [{ "@id": OFFICE_ID }],
                }
              : {}),
            ...(sameAs.length ? { sameAs } : {}),
            // No price properties: rates belong in the quotation, never in markup.
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: t("common.officeName"),
              itemListElement: services.map((s) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: s.name[l], url: getLocalizedUrl(l, `services/${s.slug}`) },
              })),
            },
          },
          ...(confirmed
            ? [
                {
                  "@type": "LocalBusiness",
                  "@id": OFFICE_ID,
                  name,
                  parentOrganization: { "@id": ORG_ID },
                  url: getLocalizedUrl(l, "contact"),
                  image,
                  telephone: COMPANY.phoneIntl,
                  email: COMPANY.email,
                  address,
                  openingHoursSpecification: [
                    { "@type": "OpeningHoursSpecification", dayOfWeek: [...COMPANY.hours.days], opens: COMPANY.hours.opens, closes: COMPANY.hours.closes },
                  ],
                  areaServed: { "@type": "Country", name: "Saudi Arabia" },
                },
              ]
            : []),
          {
            "@type": "WebSite",
            "@id": websiteId(l),
            url: getLocalizedUrl(l),
            name: COMPANY.brand[l],
            inLanguage: SEO_CONFIG.localeMetadata[l].hreflang,
            publisher: { "@id": ORG_ID },
          },
        ],
      }}
    />
  );
}
