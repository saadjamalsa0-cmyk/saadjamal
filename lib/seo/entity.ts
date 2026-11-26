import { COMPANY } from "@/config/company";
import { type Locale } from "@/config/i18n";
import { SEO_CONFIG } from "./config";

/** Stable schema.org identifiers: one entity, referenced everywhere by @id. */
export const ORG_ID = `${SEO_CONFIG.siteUrl}/#organization`;
export const OFFICE_ID = `${SEO_CONFIG.siteUrl}/#dammam-office`;

export function websiteId(locale: string) {
  return locale === "ar" ? `${SEO_CONFIG.siteUrl}/#website` : `${SEO_CONFIG.siteUrl}/en/#website`;
}

export function orgRef(locale: string) {
  return { "@type": "Organization", "@id": ORG_ID, name: COMPANY.legalName[locale as Locale], url: SEO_CONFIG.siteUrl };
}
