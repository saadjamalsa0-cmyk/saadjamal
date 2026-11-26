import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import AboutUs from "@/components/about-us";
import QuickQuote from "@/components/conversion/quick-quote";
import Faq from "@/components/faq";
import Hero from "@/components/hero";
import HomeAudience from "@/components/home/home-audience";
import HomeProcess from "@/components/home/home-process";
import HomeTrust from "@/components/home/home-trust";
import EntitySchema from "@/components/schema/entity-schema";
import FaqSchema from "@/components/schema/faq-schema";
import WebPageSchema from "@/components/schema/webpage-schema";
import Services from "@/components/services";
import WhyChooseUs from "@/components/why-choose-us";
import { type Locale, locales } from "@/config/i18n";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const t = await getTranslations({ locale, namespace: "seo.home" });
  return createPageMetadata({ locale, path: "", title: t("title"), description: t("description") });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <Hero />
      <HomeTrust />
      <AboutUs />
      <Services />
      <HomeProcess />
      <WhyChooseUs />
      <HomeAudience />
      <Faq />
      <QuickQuote />

      <EntitySchema locale={locale} />
      <WebPageSchema locale={locale} name={t("seo.home.title")} description={t("seo.home.description")} />
      <FaqSchema questions={t.raw("faq.items")} />
    </>
  );
}
