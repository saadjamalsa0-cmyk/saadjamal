import Link from "next/link";
import { mailHref, telHref } from "@/config/company";
import { useLocale, useTranslations } from "next-intl";
import { getLocalizedPath } from "@/lib/seo";
import { FileText, Mail, Phone } from "@/components/ui/icons";

/**
 * Sticky bottom action bar for phones (hidden from `lg` up), modelled on Gulf Orbit's:
 * every slot is a way to reach sales, not a copy of the menu. The quote button is the raised, accent action.
 * Pure server markup (no JS) so it is there from first paint.
 */
export default function MobileNav() {
  const locale = useLocale();
  const t = useTranslations("common");
  const item = "flex min-h-[58px] flex-col items-center justify-center gap-1 px-1 text-ink-600 transition-colors active:text-crimson-700";
  const label = "text-[11px] font-semibold leading-none";
  return (
    <nav
      aria-label={t("quickActions")}
      className="fixed inset-x-3 bottom-3 z-40 border border-ink-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_10px_40px_-8px_rgba(10,10,12,0.35)] backdrop-blur-lg lg:hidden"
    >
      <div className="grid grid-cols-3">
        <a href={telHref} className={item}>
          <Phone className="h-5 w-5" aria-hidden="true" />
          <span className={label}>{t("call")}</span>
        </a>
        <Link href={getLocalizedPath(locale, "contact")} className={item}>
          <span className="-mt-7 flex h-12 w-12 items-center justify-center rounded-full bg-crimson-700 text-white shadow-lg shadow-crimson-900/30 ring-4 ring-white">
            <FileText className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className={`${label} text-crimson-700`}>{t("getQuote")}</span>
        </Link>
        <a href={mailHref} className={item}>
          <Mail className="h-5 w-5" aria-hidden="true" />
          <span className={label}>{t("emailShort")}</span>
        </a>
      </div>
    </nav>
  );
}
