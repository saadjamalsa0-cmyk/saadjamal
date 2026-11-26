import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import QuickQuote from "@/components/conversion/quick-quote";
import FaqSchema from "@/components/schema/faq-schema";
import ServiceSchema from "@/components/schema/service-schema";
import WebPageSchema from "@/components/schema/webpage-schema";
import ServiceBody from "@/components/services/service-detail";
import PageHeader from "@/components/ui/page-header";
import { type Locale, locales } from "@/config/i18n";
import { serviceDetails } from "@/content/service-details";
import { getService, services } from "@/content/services";
import { contentDate } from "@/lib/content-dates";
import { tr } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale) || !getService(slug)) notFound();
  const t = await getTranslations({ locale, namespace: `seo.serviceDetail.${slug}` });
  return createPageMetadata({ locale, path: `services/${slug}`, title: t("title"), description: t("description"), image: `/og/${slug}.jpg` });
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!locales.includes(locale as Locale) || !service) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale });
  const path = `services/${slug}`;
  const name = tr(service.name, locale);
  const heading = t("common.serviceHeading", { service: name });
  const detail = serviceDetails[slug][locale as Locale];
  const faqs = [...tr(service.faqs, locale), ...detail.faqs];

  return (
    <>
      <PageHeader
        title={heading}
        lead={detail.answer}
        updated={contentDate(path)}
        crumbs={[
          { name: t("servicesPage.title"), path: "services" },
          { name, path },
        ]}
      />
      <ServiceBody service={service} detail={detail} faqs={faqs} />
      <QuickQuote service={slug} />

      <ServiceSchema locale={locale} slug={slug} name={heading} serviceType={name} description={detail.answer} />
      <FaqSchema questions={faqs} />
      <WebPageSchema locale={locale} path={path} name={t(`seo.serviceDetail.${slug}.title`)} description={t(`seo.serviceDetail.${slug}.description`)} />
    </>
  );
}
