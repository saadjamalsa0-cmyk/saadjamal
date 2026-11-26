import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "@/config/i18n";

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Arabic lives at the site root, English under /en.
  localePrefix: "as-needed",
  // lib/seo emits hreflang in the <head>.
  alternateLinks: false,
  // Locale comes from the URL only.
  localeDetection: false,
  localeCookie: false,
});

export const { Link, usePathname } = createNavigation(routing);
