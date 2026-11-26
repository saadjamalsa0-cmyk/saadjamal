import type { Metadata } from "next";
import { COMPANY } from "@/config/company";
import { type Locale } from "@/config/i18n";
import { getLanguageAlternates } from "./alternates";
import { SEO_CONFIG } from "./config";
import { getLocalizedUrl } from "./urls";

export interface PageMetadataOptions {
  locale: string;
  path?: string;
  /** Full <title>, ≤ 60 characters. */
  title: string;
  /** 120–155 characters. */
  description: string;
  image?: string;
  noindex?: boolean;
}

/** Canonical, reciprocal hreflang, Open Graph, Twitter and robots for one page. */
export function createPageMetadata({ locale, path = "", title, description, image = SEO_CONFIG.defaultOgImage, noindex = false }: PageMetadataOptions): Metadata {
  const url = getLocalizedUrl(locale, path);
  const current = locale as Locale;
  const other: Locale = current === "ar" ? "en" : "ar";
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: getLanguageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: COMPANY.brand[current],
      locale: SEO_CONFIG.localeMetadata[current].ogLocale,
      alternateLocale: [SEO_CONFIG.localeMetadata[other].ogLocale],
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
