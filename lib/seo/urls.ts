import { SEO_CONFIG } from "./config";

/** Strips query, hash, slashes and any locale prefix. */
export function cleanPath(path = ""): string {
  if (!path) return "";
  const bare = (path.split("#")[0] || "").split("?")[0] || "";
  return bare.replace(/^\/?(ar|en)(\/|$)/, "").replace(/^\/+/, "").replace(/\/+$/, "");
}

/** Arabic is the default locale at the root (/about); English is prefixed (/en/about). No trailing slashes. */
export function getLocalizedPath(locale: string, path = ""): string {
  const cleaned = cleanPath(path);
  const normalized = cleaned ? `/${cleaned}` : "";
  return locale === "ar" ? normalized || "/" : `/en${normalized}`;
}

/** Absolute canonical URL for a locale and path. */
export function getLocalizedUrl(locale: string, path = ""): string {
  const localized = getLocalizedPath(locale, path);
  return localized === "/" ? SEO_CONFIG.siteUrl : `${SEO_CONFIG.siteUrl}${localized}`;
}

export function toAbsoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SEO_CONFIG.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
