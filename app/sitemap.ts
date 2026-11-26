import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { contentDate } from "@/lib/content-dates";
import { getLanguageAlternates, getLocalizedUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** Every page in both languages with hreflang alternates and a real <lastmod>. Privacy is left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1, frequency: "weekly" as const },
    { path: "services", priority: 0.9, frequency: "monthly" as const },
    { path: "about", priority: 0.8, frequency: "monthly" as const },
    { path: "contact", priority: 0.9, frequency: "monthly" as const },
    ...services.map((s) => ({ path: `services/${s.slug}`, priority: 0.9, frequency: "monthly" as const })),
  ];
  return pages.flatMap((page) =>
    (["ar", "en"] as const).map((locale) => ({
      url: getLocalizedUrl(locale, page.path),
      lastModified: contentDate(page.path),
      changeFrequency: page.frequency,
      priority: page.priority,
      alternates: { languages: getLanguageAlternates(page.path) },
    })),
  );
}
