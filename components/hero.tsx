import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Check, ForwardArrow, Icon, Mail } from "@/components/ui/icons";
import { mailHref } from "@/config/company";
import { getLocalizedPath } from "@/lib/seo";

/** Light, layered hero. Server-rendered: it holds the LCP element. */
export default function Hero() {
  const locale = useLocale();
  const t = useTranslations();
  const badges = t.raw("hero.badges") as string[];
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b/srgb from-stone-50 via-white to-stone-100">
      <div className="bg-grid-dark absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute -top-40 -inset-e-40 -z-10 h-144 w-xl rounded-full bg-[radial-gradient(closest-side,rgba(143,15,44,0.10),transparent)]" aria-hidden="true" />

      <div className="container grid items-center gap-10 pb-28 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-36 lg:pt-16">
        <div className="lg:col-span-7">
          <p className="eyebrow flex">{t("hero.eyebrow")}</p>
          <h1 className="mt-4 text-[2.05rem] font-bold leading-[1.18] sm:text-5xl/none lg:text-[3.75rem]">
            {t("hero.titleA")}
            <span className="mt-2 block text-crimson-700">{t("hero.titleB")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg/7">{t("hero.text")}</p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link href={getLocalizedPath(locale, "contact")} className="btn btn-primary px-9! py-4! text-base">
              {t("ui.requestQuote")}
              <ForwardArrow className="h-4 w-4" />
            </Link>
            <a href={mailHref} className="btn btn-outline px-9! py-4! text-base">
              <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
              {t("ui.emailUs")}
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
          <div className="absolute inset-y-8 inset-e-6 w-[68%] skew-x-[-10deg] bg-linear-to-b/srgb from-crimson-700 to-crimson-900 shadow-lift" aria-hidden="true" />
          <div className="absolute inset-y-16 inset-s-8 w-[38%] skew-x-[-10deg] border border-ink-200 bg-white/70" aria-hidden="true" />
          <div className="relative z-10 aspect-4/5">
            <Image
              src="/images/hero-scaffolding.webp"
              alt={t("common.heroImageAlt")}
              fill
              priority
              sizes="(min-width:1024px) 480px, 92vw"
              className="object-contain drop-shadow-[0_24px_24px_rgba(10,10,12,0.28)]"
            />
          </div>

          <Link
            href={getLocalizedPath(locale, "about")}
            className="group absolute inset-s-0 top-6 z-20 flex items-center gap-3 border border-ink-100 bg-white/95 p-3 pe-5 shadow-lift backdrop-blur-sm transition-colors hover:border-crimson-700 sm:-inset-s-4"
          >
            <span className="flex h-10 w-10 items-center justify-center bg-crimson-700 text-white">
              <Icon name="users" className="h-5 w-5" />
            </span>
            <span className="font-bold text-ink-950">{t("aboutPage.title")}</span>
            <ForwardArrow className="h-4 w-4 text-crimson-700" />
          </Link>
          <Link
            href={getLocalizedPath(locale, "services")}
            className="group absolute bottom-8 inset-e-0 z-20 flex items-center gap-3 border border-ink-100 bg-white/95 p-3 pe-5 shadow-lift backdrop-blur-sm transition-colors hover:border-crimson-700 sm:-inset-e-3"
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
