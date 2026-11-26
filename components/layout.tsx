import { useLocale } from "next-intl";
import type React from "react";
import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import TopBar from "@/components/top-bar";
import { services } from "@/content/services";
import { tr } from "@/lib/i18n";

/** Site chrome around every page. */
export default function Layout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  // Only names and slugs reach the browser, not the service content.
  const serviceLinks = services.map((s) => ({ slug: s.slug, name: tr(s.name, locale) }));
  return (
    <>
      <TopBar />
      <Navbar services={serviceLinks} />
      <main id="main">{children}</main>
      <Footer />
      <MobileNav />
    </>
  );
}
