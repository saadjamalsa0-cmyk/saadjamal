"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { getLocalizedPath } from "@/lib/seo/urls";

/** Link to the same page in the other language. */
export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("ui");
  const other = locale === "ar" ? "en" : "ar";
  return (
    <Link
      href={getLocalizedPath(other, pathname)}
      hrefLang={other}
      lang={other}
      aria-label={t("switchLanguageLabel")}
      className="flex min-h-11 items-center px-3 text-sm font-semibold text-ink-800 transition-colors hover:text-crimson-700"
    >
      {t("switchLanguage")}
    </Link>
  );
}
