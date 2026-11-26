import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ForwardArrow, Icon, Mail } from "@/components/ui/icons";
import SectionHeading from "@/components/ui/section-heading";
import { COMPANY, mailHref } from "@/config/company";
import { getLocalizedPath } from "@/lib/seo";

/** Heading and direct-contact card beside the six reasons. */
export default function WhyChooseUs() {
  const locale = useLocale();
  const t = useTranslations();
  const items = t.raw("why.items") as { icon: string; title: string; text: string }[];
  return (
    <section className="bg-stone-50 py-24 md:py-32">
      <div className="container grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading eyebrow={t("why.eyebrow")} title={t("why.title")} />
            <div className="mt-8 border border-ink-200 bg-white p-7 shadow-card">
              <p className="font-bold text-ink-950">{t("common.talkTitle")}</p>
              <a href={mailHref} dir="ltr" className="mt-3 flex items-center gap-3 break-all text-xl font-bold text-crimson-700 rtl:justify-end">
                <Mail className="h-6 w-6 shrink-0" aria-hidden="true" />
                {COMPANY.email}
              </a>
              <Link href={getLocalizedPath(locale, "contact")} className="btn btn-primary mt-6 w-full">
                {t("ui.requestQuote")}
                <ForwardArrow className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="grid gap-px self-start border border-ink-200 bg-ink-200 sm:grid-cols-2 lg:col-span-8">
          {items.map((item) => (
            <div key={item.title} className="reveal group bg-white p-8 transition-colors hover:bg-crimson-50/40 md:p-10">
              <span className="icon-tile">
                <Icon name={item.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
