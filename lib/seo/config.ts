import { COMPANY } from "@/config/company";
import { defaultLocale, locales } from "@/config/i18n";

export const SEO_CONFIG = {
  siteUrl: COMPANY.siteUrl,
  defaultLocale,
  locales,
  defaultOgImage: "/images/og-image.jpg",
  localeMetadata: {
    ar: { hreflang: "ar-SA", ogLocale: "ar_SA", dir: "rtl" as const },
    en: { hreflang: "en-SA", ogLocale: "en_US", dir: "ltr" as const },
  },
} as const;
