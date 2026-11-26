import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import FaqList from "@/components/ui/faq-list";
import { ForwardArrow } from "@/components/ui/icons";
import SectionHeading from "@/components/ui/section-heading";
import { getLocalizedPath } from "@/lib/seo";

export default function Faq() {
  const locale = useLocale();
  const t = useTranslations();
  return (
    <section className="section bg-stone-50">
      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
          <Link href={getLocalizedPath(locale, "contact")} className="btn btn-primary mt-8">
            {t("ui.requestQuote")}
            <ForwardArrow className="h-4 w-4" />
          </Link>
        </div>
        <div className="lg:col-span-8">
          <FaqList items={t.raw("faq.items")} />
        </div>
      </div>
    </section>
  );
}
