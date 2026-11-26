"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Lead tracking, Gulf Orbit style: calls, WhatsApp, email and quote clicks are the conversions.
 * Nothing loads until NEXT_PUBLIC_GA_ID is set at build time.
 */
export function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const event = href.startsWith("tel:")
        ? "phone_click"
        : href.includes("wa.me/")
          ? "whatsapp_click"
          : href.startsWith("mailto:")
            ? "email_click"
            : /\/contact\/?(\?|$)|^#quote$/.test(href)
              ? "quote_cta_click"
              : null;
      if (event) (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.("event", event, { page_path: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      <Script id="ga4" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
