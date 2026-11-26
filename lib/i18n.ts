export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

/** A bilingual value. Every piece of site copy is authored as {ar, en} so the two languages can't drift apart. */
export type Bi<T = string> = { ar: T; en: T };

export const tr = <T,>(value: Bi<T>, locale: Locale): T => value[locale];

export const localeMeta = {
  ar: { dir: "rtl", hreflang: "ar-SA", ogLocale: "ar_SA", label: "العربية", short: "AR" },
  en: { dir: "ltr", hreflang: "en-SA", ogLocale: "en_US", label: "English", short: "EN" },
} as const;

/** Every indexable route, without locale prefix. Dynamic service pages are added in sitemap/static params. */
export const staticRoutes = ["/", "/about/", "/services/", "/contact/"] as const;

/**
 * Internal URL for a route in a locale.
 * Arabic (default) lives at the root, English under /en.
 *   localePath("ar", "/about/") -> "/about/"
 *   localePath("en", "/about/") -> "/en/about/"
 */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "ar") return clean;
  return clean === "/" ? "/en/" : `/en${clean}`;
}

/** Strip the locale prefix from a pathname and report which locale it belongs to. */
export function parsePathname(pathname: string): { locale: Locale; path: string } {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname.slice(3) || "/";
    return { locale: "en", path: rest.startsWith("/") ? rest : `/${rest}` };
  }
  return { locale: "ar", path: pathname || "/" };
}

/** The same page in the other language, for the language switcher. */
export function switchLocalePath(pathname: string): { locale: Locale; href: string } {
  const { locale, path } = parsePathname(pathname);
  const target: Locale = locale === "ar" ? "en" : "ar";
  return { locale: target, href: localePath(target, path) };
}
