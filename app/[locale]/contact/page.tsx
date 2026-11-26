import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactCards from "@/components/contact/contact-cards";
import ContactForm from "@/components/contact/contact-form";
import EntitySchema from "@/components/schema/entity-schema";
import WebPageSchema from "@/components/schema/webpage-schema";
import PageHeader from "@/components/ui/page-header";
import { type Locale, locales } from "@/config/i18n";
import { services } from "@/content/services";
import { tr } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const t = await getTranslations({ locale, namespace: "seo.contact" });
  return createPageMetadata({ locale, path: "contact", title: t("title"), description: t("description") });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <PageHeader title={t("contactPage.title")} lead={t("contactPage.lead")} crumbs={[{ name: t("contactPage.title"), path: "contact" }]} />
      <section className="section">
        <div className="container grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold md:text-3xl">{t("contactPage.cardsTitle")}</h2>
            <ContactCards />
          </div>
          <div className="card card-active p-7 shadow-lift md:p-10 lg:col-span-7">
            <h2 className="text-2xl font-bold md:text-3xl">{t("contactPage.formTitle")}</h2>
            <p className="mb-8 mt-3 text-ink-500">{t("contactPage.formText")}</p>
            <ContactForm services={services.map((s) => ({ slug: s.slug, name: tr(s.name, locale) }))} />
          </div>
        </div>
      </section>

      <EntitySchema locale={locale} />
      <WebPageSchema locale={locale} path="contact" type="ContactPage" name={t("seo.contact.title")} description={t("seo.contact.description")} />
    </>
  );
}
