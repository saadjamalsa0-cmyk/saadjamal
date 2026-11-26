import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import FaqList from "@/components/ui/faq-list";
import { Check, ForwardArrow, Icon, Mail } from "@/components/ui/icons";
import SectionHeading from "@/components/ui/section-heading";
import { mailHref } from "@/config/company";
import type { ServiceDetail } from "@/content/service-details";
import { services, type Service } from "@/content/services";
import { tradeGroups } from "@/content/trades";
import { tr } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/seo";

/** Body of a service page: content column, sticky enquiry card and related services. */
export default function ServiceBody({ service, detail, faqs }: { service: Service; detail: ServiceDetail; faqs: { q: string; a: string }[] }) {
  const locale = useLocale();
  const t = useTranslations();
  const name = tr(service.name, locale);
  return (
    <>
      <section className="section">
        <div className="container grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="relative aspect-16/10 overflow-hidden bg-ink-100">
              <Image src={service.image} alt={name} fill priority sizes="(min-width:1024px) 720px, 92vw" className="object-cover" />
            </div>
            <p className="mt-8 text-lg leading-relaxed text-ink-700">{tr(service.intro, locale)}</p>

            <h2 className="section-title mt-14">{t("common.facts")}</h2>
            <dl className="card mt-8">
              {detail.facts.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1 border-b border-ink-100 px-5 py-4 last:border-b-0 sm:flex-row sm:justify-between sm:gap-6">
                  <dt className="text-sm font-semibold text-ink-500 sm:w-2/5">{label}</dt>
                  <dd className="font-semibold text-ink-900 sm:w-3/5">{value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="section-title mt-14">{service.includesTitle ? tr(service.includesTitle, locale) : t("ui.whatsIncluded")}</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {tr(service.includes, locale).map((item) => (
                <li key={item} className="card flex items-start gap-3 p-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-crimson-700 text-white">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-medium text-ink-900">{item}</span>
                </li>
              ))}
            </ul>

            {detail.sections.map((section) => (
              <div key={section.h} className="mt-14">
                <h2 className="text-2xl font-bold md:text-3xl">{section.h}</h2>
                {section.p.map((p) => (
                  <p key={p.slice(0, 30)} className="mt-4 leading-relaxed text-ink-700 md:text-lg/7">
                    {p}
                  </p>
                ))}
              </div>
            ))}

            <div className="mt-14">
              <h2 className="text-2xl font-bold md:text-3xl">{detail.table.caption}</h2>
              <div className="card mt-6 overflow-x-auto">
                <table className="w-full text-start text-sm md:text-base">
                  <thead className="bg-stone-100">
                    <tr>
                      {detail.table.head.map((h) => (
                        <th key={h} scope="col" className="px-4 py-3 text-start font-bold text-ink-950">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {detail.table.rows.map(([a, b]) => (
                      <tr key={a} className="border-t border-ink-100">
                        <th scope="row" className="px-4 py-3 text-start font-semibold text-ink-900">
                          {a}
                        </th>
                        <td className="px-4 py-3 text-ink-700">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {service.slug === "manpower-supply" && (
              <div className="mt-14">
                <h2 className="text-2xl font-bold md:text-3xl">{t("common.tradesTitle")}</h2>
                <p className="mt-3 leading-relaxed text-ink-600">{t("common.tradesNote")}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {tradeGroups.map((group) => (
                    <div key={group.name.en} className="card p-5">
                      <h3 className="text-lg font-bold">{tr(group.name, locale)}</h3>
                      <ul className="mt-3 space-y-1.5 text-ink-700">
                        {group.trades.map((trade) => (
                          <li key={trade.en} className="flex items-start gap-2">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-crimson-700" aria-hidden="true" />
                            {tr(trade, locale)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {[
              { h: t("common.requestChecklist"), items: detail.request },
              { h: t("common.arrivalChecks"), items: detail.checks },
            ].map((block) => (
              <div key={block.h} className="mt-14">
                <h2 className="text-2xl font-bold md:text-3xl">{block.h}</h2>
                <ul className="mt-6 space-y-3">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-ink-800">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-crimson-700" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mt-16">
              <SectionHeading eyebrow={t("faq.eyebrow")} title={t("ui.faqTitle")} />
              <div className="mt-8">
                <FaqList items={faqs} />
              </div>
            </div>
          </div>

          {/* Sticky enquiry card */}
          <aside className="lg:sticky lg:top-28 lg:col-span-5">
            <div className="card card-active p-7 shadow-lift md:p-8">
              <span className="icon-tile bg-crimson-700 text-white">
                <Icon name={service.icon} className="h-7 w-7" />
              </span>
              <h2 className="mt-6 text-2xl font-bold">{t("ui.requestQuote")}</h2>
              <p className="mt-3 leading-relaxed text-ink-600">{t("servicesPage.helpText")}</p>
              <div className="mt-8 space-y-3">
                <Link href="#quote" className="btn btn-primary w-full">
                  {t("ui.requestQuote")}
                  <ForwardArrow className="h-4 w-4" />
                </Link>
                <a href={`${mailHref}?subject=${encodeURIComponent(name)}`} className="btn btn-outline w-full">
                  <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
                  {t("ui.emailUs")}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-stone-50">
        <div className="container">
          <h2 className="section-title">{t("ui.relatedServices")}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Link key={s.slug} href={getLocalizedPath(locale, `services/${s.slug}`)} className="card card-hover group flex items-start gap-5 p-6">
                  <span className="icon-tile">
                    <Icon name={s.icon} className="h-7 w-7" />
                  </span>
                  <span>
                    <span className="block text-lg font-bold text-ink-950">{tr(s.name, locale)}</span>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-crimson-700">
                      {t("ui.readMore")}
                      <ForwardArrow className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:rtl:-translate-x-1" />
                    </span>
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
