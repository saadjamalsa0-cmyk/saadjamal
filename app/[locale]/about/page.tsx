import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import CoreValues from "@/components/about/core-values";
import MissionVision from "@/components/about/mission-vision";
import OurStory from "@/components/about/our-story";
import Registration from "@/components/about/registration";
import CallToAction from "@/components/call-to-action";
import HomeProcess from "@/components/home/home-process";
import EntitySchema from "@/components/schema/entity-schema";
import WebPageSchema from "@/components/schema/webpage-schema";
import PageHeader from "@/components/ui/page-header";
import { type Locale, locales } from "@/config/i18n";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const t = await getTranslations({ locale, namespace: "seo.about" });
  return createPageMetadata({ locale, path: "about", title: t("title"), description: t("description") });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <PageHeader title={t("aboutPage.title")} lead={t("aboutPage.lead")} crumbs={[{ name: t("aboutPage.title"), path: "about" }]} />
      <OurStory />
      <MissionVision />
      <CoreValues />
      <Registration />
      <HomeProcess />
      <CallToAction />

      <EntitySchema locale={locale} />
      <WebPageSchema locale={locale} path="about" type="AboutPage" name={t("seo.about.title")} description={t("seo.about.description")} />
    </>
  );
}
