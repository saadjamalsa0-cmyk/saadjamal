import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ForwardArrow, WhatsAppIcon } from "@/components/ui/icons";
import { Swoosh } from "@/components/ui/swoosh";
import { whatsAppHref } from "@/config/company";
import { getLocalizedPath } from "@/lib/seo";

/** Closing call-to-action band, the one saturated brand band. */
export default function CallToAction() {
  const locale = useLocale();
  const t = useTranslations();
  return (
    <section className="relative isolate overflow-hidden bg-crimson-700 py-16 text-white md:py-20">
      <div className="absolute inset-0 -z-10 bg-linear-to-br/srgb from-crimson-600 via-crimson-700 to-crimson-900" aria-hidden="true" />
      <Swoosh tone="crimson" className="-bottom-32 -inset-e-40 -z-10 w-[700px]" />
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center lg:gap-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl/9 md:text-4xl/10">{t("cta.title")}</h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg/7">{t("cta.text")}</p>
          </div>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link href={getLocalizedPath(locale, "contact")} className="btn btn-light">
              {t("ui.requestQuote")}
              <ForwardArrow className="h-4 w-4" />
            </Link>
            <a href={whatsAppHref(t("common.quoteGreeting"))} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
              <WhatsAppIcon className="h-4 w-4" />
              {t("ui.whatsapp")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
