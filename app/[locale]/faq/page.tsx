import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import QuickQuote from "@/components/conversion/quick-quote";
import FaqSchema from "@/components/schema/faq-schema";
import WebPageSchema from "@/components/schema/webpage-schema";
import FaqList from "@/components/ui/faq-list";
import PageHeader from "@/components/ui/page-header";
import { type Locale, locales } from "@/config/i18n";
import { contentDate } from "@/lib/content-dates";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };
type Group = { h: string; items: { q: string; a: string }[] };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const t = await getTranslations({ locale, namespace: "seo.faq" });
  return createPageMetadata({ locale, path: "faq", title: t("title"), description: t("description") });
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const groups = t.raw("faqPage.groups") as Group[];

  return (
    <>
      <PageHeader title={t("faqPage.title")} lead={t("faqPage.lead")} updated={contentDate("faq")} crumbs={[{ name: t("faqPage.link"), path: "faq" }]} />
      <section className="section">
        <div className="container max-w-4xl space-y-14">
          {groups.map((group) => (
            <div key={group.h}>
              <h2 className="text-2xl font-bold md:text-3xl">{group.h}</h2>
              <div className="mt-6">
                <FaqList items={group.items} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <QuickQuote />

      <FaqSchema questions={groups.flatMap((g) => g.items)} />
      <WebPageSchema locale={locale} path="faq" name={t("seo.faq.title")} description={t("seo.faq.description")} />
    </>
  );
}
