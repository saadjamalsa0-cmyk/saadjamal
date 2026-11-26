import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Check, ForwardArrow, Icon, MapPin, WhatsAppIcon } from "@/components/ui/icons";
import { COMPANY, whatsAppHref } from "@/config/company";
import type { Locale } from "@/config/i18n";
import { getLocalizedPath } from "@/lib/seo";

/** Light, layered hero. Server-rendered: it holds the LCP element. */
export default function Hero() {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const badges = t.raw("hero.badges") as string[];
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-100">
      <div className="bg-grid-dark absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute -top-40 end-[-10rem] -z-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(143,15,44,0.10),transparent)]" aria-hidden="true" />

      <div className="container grid items-center gap-10 pb-28 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-36 lg:pt-16">
        <div className="lg:col-span-7">
          <p className="inline-flex flex-wrap items-center gap-3 border border-ink-200 bg-white py-1.5 pe-4 ps-1.5 text-xs font-semibold text-ink-700 shadow-sm sm:text-sm">
            <span className="bg-crimson-700 px-2.5 py-1 text-white">{t("common.crActive")}</span>
            <span dir="ltr" className="tracking-wide">
              {COMPANY.cr}
            </span>
          </p>
          <p className="eyebrow mt-7 flex">{t("hero.eyebrow")}</p>
          <h1 className="mt-4 text-[2.05rem] font-bold leading-[1.18] sm:text-5xl lg:text-[3.75rem]">
            {t("hero.titleA")}
            <span className="mt-2 block text-crimson-700">{t("hero.titleB")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg">{t("hero.text")}</p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link href={getLocalizedPath(locale, "contact")} className="btn btn-primary !px-9 !py-4 text-base">
              {t("ui.requestQuote")}
              <ForwardArrow className="h-4 w-4" />
            </Link>
            <a href={whatsAppHref(t("common.greeting"))} target="_blank" rel="noopener noreferrer" className="btn btn-outline !px-9 !py-4 text-base">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              {t("ui.whatsapp")}
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-ink-700">
            {badges.map((badge) => (
              <li key={badge} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-crimson-50 text-crimson-700">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {badge}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:col-span-5">
          {/* Slanted brand slabs behind the scaffold, echoing the italic cut of the logo */}
          <div className="absolute inset-y-8 end-6 w-[68%] -skew-x-[10deg] bg-gradient-to-b from-crimson-700 to-crimson-900 shadow-lift" aria-hidden="true" />
          <div className="absolute inset-y-16 start-8 w-[38%] -skew-x-[10deg] border border-ink-200 bg-white/70" aria-hidden="true" />
          <div className="relative z-10 aspect-[4/5]">
            <Image
              src="/images/hero-scaffolding.webp"
              alt={t("common.heroImageAlt")}
              fill
              priority
              sizes="(min-width:1024px) 480px, 92vw"
              className="object-contain drop-shadow-[0_24px_24px_rgba(10,10,12,0.28)]"
            />
          </div>

          <div className="absolute start-0 top-6 z-20 flex items-center gap-3 border border-ink-100 bg-white/95 p-3 pe-5 shadow-lift backdrop-blur sm:-start-4">
            <span className="flex h-10 w-10 items-center justify-center bg-crimson-50 text-crimson-700">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-semibold text-ink-500">{t("common.office")}</span>
              <span className="block font-bold text-ink-950">{COMPANY.address.cityText[locale]}</span>
            </span>
          </div>
          <Link
            href={getLocalizedPath(locale, "services")}
            className="group absolute bottom-8 end-0 z-20 flex items-center gap-3 border border-ink-100 bg-white/95 p-3 pe-5 shadow-lift backdrop-blur transition-colors hover:border-crimson-700 sm:-end-3"
          >
            <span className="flex h-10 w-10 items-center justify-center bg-crimson-700 text-white">
              <Icon name="scaffold" className="h-5 w-5" />
            </span>
            <span className="font-bold text-ink-950">{t("servicesSection.eyebrow")}</span>
            <ForwardArrow className="h-4 w-4 text-crimson-700" />
          </Link>
        </div>
      </div>
    </section>
  );
}
