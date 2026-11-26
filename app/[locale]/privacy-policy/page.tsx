import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/page-header";
import { type Locale, locales } from "@/config/i18n";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const t = await getTranslations({ locale, namespace: "seo.privacy" });
  return createPageMetadata({ locale, path: "privacy-policy", title: t("title"), description: t("description"), noindex: true });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <>
      <PageHeader title={t("title")} lead={t("updated")} crumbs={[{ name: t("title"), path: "privacy-policy" }]} />
      <section className="section">
        <div className="container max-w-3xl space-y-10">
          {(t.raw("sections") as { h: string; p: string }[]).map((s) => (
            <div key={s.h}>
              <h2 className="text-2xl font-bold">{s.h}</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-600">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
