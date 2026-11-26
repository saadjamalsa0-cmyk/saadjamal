import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import CallToAction from "@/components/call-to-action";
import HomeProcess from "@/components/home/home-process";
import ItemListSchema from "@/components/schema/item-list-schema";
import WebPageSchema from "@/components/schema/webpage-schema";
import ServicesGrid from "@/components/services/services-grid";
import { ForwardArrow } from "@/components/ui/icons";
import PageHeader from "@/components/ui/page-header";
import { type Locale, locales } from "@/config/i18n";
import { services } from "@/content/services";
import { tr } from "@/lib/i18n";
import { createPageMetadata, getLocalizedPath } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const t = await getTranslations({ locale, namespace: "seo.services" });
  return createPageMetadata({ locale, path: "services", title: t("title"), description: t("description") });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <PageHeader title={t("servicesPage.title")} lead={t("servicesPage.lead")} crumbs={[{ name: t("servicesPage.title"), path: "services" }]} />
      <section className="section">
        <div className="container">
          <ServicesGrid detailed />
        </div>
      </section>
      <section className="bg-stone-50 py-16">
        <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">{t("servicesPage.helpTitle")}</h2>
            <p className="mt-2 max-w-xl text-lg text-ink-500">{t("servicesPage.helpText")}</p>
          </div>
          <Link href={getLocalizedPath(locale, "contact")} className="btn btn-primary shrink-0">
            {t("ui.requestQuote")}
            <ForwardArrow className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <HomeProcess />
      <CallToAction />

      <WebPageSchema locale={locale} path="services" name={t("seo.services.title")} description={t("seo.services.description")} />
      <ItemListSchema locale={locale} items={services.map((s) => ({ name: tr(s.name, locale), path: `services/${s.slug}` }))} />
    </>
  );
}
