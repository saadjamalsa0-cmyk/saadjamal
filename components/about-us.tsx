import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Check, ForwardArrow } from "@/components/ui/icons";
import { COMPANY } from "@/config/company";
import { getLocalizedPath } from "@/lib/seo";

/** About block on the home page. */
export default function AboutUs() {
  const locale = useLocale();
  const t = useTranslations();
  const paragraphs = t.raw("aboutHome.paragraphs") as string[];
  const points = t.raw("aboutHome.points") as string[];
  return (
    <section className="py-24 md:py-32">
      <div className="container grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="reveal relative mx-auto w-full max-w-xl pb-16 lg:col-span-6">
          <div className="absolute -start-4 -top-4 h-40 w-40 border-s-4 border-t-4 border-crimson-700" aria-hidden="true" />
          <div className="relative aspect-[4/5] w-[86%] overflow-hidden bg-stone-100 shadow-lift">
            <Image src="/images/about-1.jpg" alt={t("aboutHome.imageAlt")} fill sizes="(min-width:1024px) 500px, 80vw" className="object-cover" />
          </div>
          <div className="absolute bottom-0 end-0 w-[56%] border-8 border-white bg-stone-100 shadow-lift">
            <div className="relative aspect-[4/3]">
              <Image src="/images/about-2.jpg" alt={t("aboutHome.imageAlt2")} fill sizes="320px" className="object-cover" />
            </div>
          </div>
          <div className="absolute end-0 top-10 -skew-x-[8deg] bg-crimson-700 px-6 py-5 text-white shadow-lift">
            <div className="skew-x-[8deg]">
              <p className="text-xs font-semibold text-white/85">{t("common.crShort")}</p>
              <p dir="ltr" className="mt-1 text-2xl font-bold tracking-wide">
                {COMPANY.cr}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <span className="eyebrow">{t("aboutHome.eyebrow")}</span>
          <h2 className="section-title mt-4">{t("aboutHome.title")}</h2>
          <div className="mt-6 space-y-4 text-base leading-loose text-ink-600 md:text-lg">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 divide-y divide-ink-100 border-y border-ink-100">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-4 py-4 font-bold text-ink-900">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-crimson-700 text-white">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Link href={getLocalizedPath(locale, "about")} className="btn btn-outline mt-10">
            {t("ui.learnMore")}
            <ForwardArrow className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
