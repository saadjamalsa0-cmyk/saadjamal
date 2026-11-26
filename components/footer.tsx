import Image from "next/image";
import Link from "next/link";
import { COMPANY, mailHref, telHref, whatsAppHref } from "@/config/company";
import { services } from "@/content/services";
import { useLocale, useTranslations } from "next-intl";
import { tr } from "@/lib/i18n";
import type { Locale } from "@/config/i18n";
import { getLocalizedPath } from "@/lib/seo";
import { Clock, Mail, MapPin, Phone, WhatsAppIcon } from "@/components/ui/icons";

const heading = "mb-5 text-sm font-bold uppercase tracking-widest text-ink-950 rtl:tracking-normal";
const link = "inline-block py-2 text-ink-600 transition-colors hover:text-crimson-700";

export default function Footer() {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const nav = t.raw("nav") as { href: string; label: string }[];
  const href = (path: string) => getLocalizedPath(locale, path);
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t-4 border-crimson-700 bg-stone-100 text-ink-600">
      <div className="container pb-28 pt-16 lg:pb-8">
        <div className="grid gap-12 border-b border-ink-200 pb-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href={href("/")} className="inline-flex items-center gap-3" aria-label={COMPANY.brand[locale]}>
              <Image src="/images/logo.png" alt="" width={56} height={56} className="h-14 w-14 object-contain" />
              <span className="leading-tight">
                <span className="block text-xl font-bold text-ink-950">{COMPANY.name[locale]}</span>
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-crimson-700 rtl:tracking-normal">
                  {t("common.brandSuffix")}
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed">{t("footer.about")}</p>
          </div>

          <div className="lg:col-span-2">
            <h2 className={heading}>{t("footer.quickLinks")}</h2>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={href(item.href)} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={href("privacy-policy")} className={link}>
                  {t("ui.privacy")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className={heading}>{t("footer.services")}</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={href(`services/${s.slug}`)} className={link}>
                    {tr(s.name, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className={heading}>{t("footer.contact")}</h2>
            <ul className="space-y-1">
              <li className="flex items-start gap-3">
                <Phone className="mt-3 h-4 w-4 shrink-0 text-crimson-700" aria-hidden="true" />
                <a href={telHref} dir="ltr" className={`${link} py-2.5 rtl:text-end`}>
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <WhatsAppIcon className="mt-3 h-4 w-4 shrink-0 text-crimson-700" />
                <a href={whatsAppHref()} target="_blank" rel="noopener noreferrer" className={`${link} py-2.5`}>
                  {t("ui.whatsapp")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-3 h-4 w-4 shrink-0 text-crimson-700" aria-hidden="true" />
                <a href={mailHref} className={`${link} break-all py-2.5`}>
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-3 py-2">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-crimson-700" aria-hidden="true" />
                <span>{COMPANY.hours.display[locale]}</span>
              </li>
              <li className="flex items-start gap-3 py-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-crimson-700" aria-hidden="true" />
                <span>{COMPANY.address.display[locale]}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-8 text-sm text-ink-500 sm:flex-row">
          <p className="text-center sm:text-start">
            © {year} {COMPANY.legalName[locale]}. {t("ui.allRightsReserved")}.
          </p>
          <p dir="ltr">{COMPANY.domain}</p>
        </div>
      </div>
    </footer>
  );
}
