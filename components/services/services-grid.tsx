import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Check, ForwardArrow, Icon } from "@/components/ui/icons";
import { services } from "@/content/services";
import { tr } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/seo";

export default function ServicesGrid({ detailed = false }: { detailed?: boolean }) {
  const locale = useLocale();
  const t = useTranslations("ui");
  return (
    <div className={detailed ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8" : "grid gap-6 md:grid-cols-3"}>
      {services.map((s) => (
        <Link key={s.slug} href={getLocalizedPath(locale, `services/${s.slug}`)} className="card card-hover group flex flex-col">
          <div className={`relative overflow-hidden bg-stone-100 ${detailed ? "aspect-video" : "aspect-4/3"}`}>
            <Image
              src={s.image}
              alt={tr(s.name, locale)}
              fill
              sizes="(min-width:1280px) 300px, (min-width:640px) 45vw, 92vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="relative flex flex-1 flex-col p-6 pt-10">
            <span className="icon-tile absolute -top-7 inset-s-6 shadow-card ring-4 ring-white">
              <Icon name={s.icon} className="h-7 w-7" />
            </span>
            <h3 className="text-xl font-bold leading-snug">{tr(s.name, locale)}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-ink-600">{tr(s.short, locale)}</p>
            {detailed && (
              <ul className="mt-5 space-y-2 border-t border-ink-100 pt-5 text-sm text-ink-700">
                {tr(s.includes, locale)
                  .slice(0, 4)
                  .map((x) => (
                    <li key={x} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-crimson-700" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
              </ul>
            )}
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-crimson-700">
              {t("readMore")}
              <ForwardArrow className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:rtl:-translate-x-1" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
