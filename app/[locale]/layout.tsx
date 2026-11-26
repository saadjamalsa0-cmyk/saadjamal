import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type React from "react";
import { preload } from "react-dom";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Layout from "@/components/layout";
import { COMPANY } from "@/config/company";
import { type Locale, locales } from "@/config/i18n";
import { getScopedMessages } from "@/lib/i18n-messages";
import { SEO_CONFIG } from "@/lib/seo";
import "../globals.css";
import "../../styles/fonts.css";

const FONT_PRELOADS: Record<Locale, string[]> = {
  // Arabic also needs the latin file: digits and punctuation inside Arabic text.
  ar: ["/fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2", "/fonts/ibm-plex-sans-arabic-arabic-700-normal.woff2", "/fonts/ibm-plex-sans-arabic-latin-400-normal.woff2"],
  en: ["/fonts/plus-jakarta-sans-latin-wght-normal.woff2"],
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;
  const t = await getTranslations({ locale, namespace: "seo.home" });
  return {
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    title: t("title"),
    description: t("description"),
    applicationName: COMPANY.brand[l],
    authors: [{ name: COMPANY.legalName.en, url: SEO_CONFIG.siteUrl }],
    creator: COMPANY.legalName.en,
    publisher: COMPANY.legalName.en,
    category: "business",
    manifest: "/manifest.webmanifest",
    appleWebApp: { capable: true, title: COMPANY.name[l], statusBarStyle: "default" },
    formatDetection: { telephone: true, email: true, address: false },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    verification: {
      ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }),
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }),
    },
    other: { "geo.region": "SA", "geo.placename": "Dammam" },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const messages = await getScopedMessages(locale as Locale);
  const t = await getTranslations({ locale, namespace: "ui" });
  for (const href of FONT_PRELOADS[locale as Locale]) preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });

  return (
    <html lang={locale} dir={SEO_CONFIG.localeMetadata[locale as Locale].dir}>
      <body>
        <a href="#main" className="sr-only z-[60] bg-white px-4 py-2 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:start-4 focus:top-4">
          {t("skipToContent")}
        </a>
        <GoogleAnalytics />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Layout>{children}</Layout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
