import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FileText, Mail } from "@/components/ui/icons";
import { mailHref } from "@/config/company";
import { getLocalizedPath } from "@/lib/seo";

/**
 * Sticky bottom action bar for phones (hidden from `lg` up): request a quote, or email.
 * Pure server markup (no JS) so it is there from first paint.
 */
export default function MobileNav() {
  const locale = useLocale();
  const t = useTranslations("common");
  const item = "flex min-h-12 items-center justify-center gap-2 text-sm font-bold transition-colors";
  return (
    <nav
      aria-label={t("quickActions")}
      className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 border border-ink-200 bg-white/95 p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_10px_40px_-8px_rgba(10,10,12,0.35)] backdrop-blur-lg lg:hidden"
    >
      <Link href={getLocalizedPath(locale, "contact")} className={`${item} bg-crimson-700 text-white active:bg-crimson-800`}>
        <FileText className="h-5 w-5" aria-hidden="true" />
        {t("getQuote")}
      </Link>
      <a href={mailHref} className={`${item} border border-ink-200 text-ink-900 active:text-crimson-700`}>
        <Mail className="h-5 w-5" aria-hidden="true" />
        {t("emailShort")}
      </a>
    </nav>
  );
}
