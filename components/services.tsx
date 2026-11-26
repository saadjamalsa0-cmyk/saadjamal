import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Check, ForwardArrow, Icon } from "@/components/ui/icons";
import SectionHeading from "@/components/ui/section-heading";
import { services } from "@/content/services";
import { tr } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/seo";

/** Home showcase: three tall photo cards, numbered. */
export default function Services() {
  const locale = useLocale();
  const t = useTranslations();
  return (
    <section className="relative isolate bg-stone-100 py-24 md:py-32">
      <div className="bg-grid-dark absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={t("servicesSection.eyebrow")} title={t("servicesSection.title")} text={t("servicesSection.text")} />
          <Link href={getLocalizedPath(locale, "services")} className="btn btn-outline shrink-0">
            {t("ui.viewAllServices")}
            <ForwardArrow className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {services.map((s, i) => (
            <Link key={s.slug} href={getLocalizedPath(locale, `services/${s.slug}`)} className="reveal card card-hover group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <Image src={s.image} alt={tr(s.name, locale)} fill sizes="(min-width:1024px) 400px, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute end-0 top-0 bg-white px-4 py-2 text-xl font-bold text-crimson-700" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <div className="relative flex flex-1 flex-col p-7">
                <span className="icon-tile absolute -top-7 start-7 shadow-card ring-4 ring-white">
                  <Icon name={s.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-7 text-2xl font-bold leading-snug">{tr(s.name, locale)}</h3>
                <p className="mt-3 leading-relaxed text-ink-600">{tr(s.short, locale)}</p>
                <ul className="mt-5 flex-1 space-y-2.5 border-t border-ink-100 pt-5 text-sm font-medium text-ink-700">
                  {tr(s.includes, locale)
                    .slice(0, 3)
                    .map((x) => (
                      <li key={x} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-crimson-700" aria-hidden="true" />
                        {x}
                      </li>
                    ))}
                </ul>
                <span className="mt-7 flex items-center justify-between font-bold text-crimson-700">
                  {t("ui.readMore")}
                  <span className="flex h-11 w-11 items-center justify-center bg-crimson-50 transition-colors group-hover:bg-crimson-700 group-hover:text-white">
                    <ForwardArrow className="h-5 w-5" />
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
