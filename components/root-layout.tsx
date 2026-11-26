import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { COMPANY } from "@/config/company";
import { ui } from "@/content/site";
import { arabicFont, englishFont } from "@/lib/fonts";
import { type Locale, localeMeta, tr } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Analytics } from "@/components/analytics";
import { MobileBar } from "@/components/mobile-bar";
import { TopBar } from "@/components/top-bar";
import "@/app/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

/** Site-wide metadata. Each page overrides title/description/canonical in its own generateMetadata. */
export function baseMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: tr(COMPANY.brand, locale),
    authors: [{ name: COMPANY.legalName.en, url: SITE_URL }],
    creator: COMPANY.legalName.en,
    publisher: COMPANY.legalName.en,
    category: "construction",
    manifest: "/manifest.webmanifest",
    appleWebApp: { capable: true, title: tr(COMPANY.name, locale), statusBarStyle: "default" },
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
    // Set these in your host's environment when you verify the site in Search Console / Bing Webmaster Tools.
    verification: {
      ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }),
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }),
    },
    other: { "geo.region": "SA", "geo.placename": "Saudi Arabia" },
  };
}

export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const meta = localeMeta[locale];
  const font = locale === "ar" ? arabicFont : englishFont;
  return (
    <html lang={locale} dir={meta.dir} className={font.variable}>
      <body>
        <a
          href="#main"
          className="sr-only z-[60] bg-white px-4 py-2 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {tr(ui.skipToContent, locale)}
        </a>
        <TopBar locale={locale} />
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <MobileBar locale={locale} />
        <Analytics />
      </body>
    </html>
  );
}
