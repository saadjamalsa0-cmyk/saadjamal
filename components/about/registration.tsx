import { useLocale, useTranslations } from "next-intl";
import { ForwardArrow } from "@/components/ui/icons";
import SectionHeading from "@/components/ui/section-heading";
import { COMPANY } from "@/config/company";
import type { Locale } from "@/config/i18n";

/** Registration details and the identity note (which entity and which website this is). */
export default function Registration() {
  const locale = useLocale() as Locale;
  const t = useTranslations("aboutPage");
  const common = useTranslations("common");
  const rows = t.raw("regRows") as { label: string }[];
  const values = [COMPANY.legalName[locale], COMPANY.cr, COMPANY.crIssueDateDisplay[locale], COMPANY.entityType[locale], t("statusActive")];
  return (
    <section className="section bg-stone-50">
      <div className="container grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={t("regTitle")} title={t("regTitle")} text={t("regText")} />
          <p className="mt-6 border-s-4 border-crimson-700 bg-white p-4 leading-relaxed text-ink-700">
            {common("identityNote", { name: COMPANY.legalName[locale], cr: COMPANY.cr, domain: COMPANY.domain })}
          </p>
          <a href={COMPANY.crVerifyUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 font-semibold text-crimson-700 hover:underline">
            {t("verify")}
            <ForwardArrow className="h-4 w-4" />
          </a>
        </div>
        <dl className="card lg:col-span-7">
          {rows.map((row, i) => (
            <div key={row.label} className="flex flex-col gap-1 border-b border-ink-100 px-7 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <dt className="text-sm font-medium text-ink-500">{row.label}</dt>
              <dd className="flex items-center gap-2 font-bold text-ink-950 sm:text-end">
                {i === 4 && <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden="true" />}
                <span dir={i === 1 ? "ltr" : undefined}>{values[i]}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
