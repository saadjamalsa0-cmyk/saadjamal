import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { contentDate, languageAlternates, pageUrl } from "@/lib/seo";
import { staticRoutes } from "@/lib/i18n";

export const dynamic = "force-static";

/**
 * Every page in both languages with hreflang alternates and a real <lastmod> from git history.
 * The privacy page is deliberately left out.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: string[] = [...staticRoutes, ...services.map((s) => `/services/${s.slug}/`)];
  return paths.flatMap((path) =>
    (["ar", "en"] as const).map((locale) => ({
      url: pageUrl(locale, path),
      lastModified: contentDate(path),
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path === "/about/" ? 0.8 : 0.9,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
