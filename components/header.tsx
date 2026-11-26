"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { COMPANY, telHref } from "@/config/company";
import { nav, ui } from "@/content/site";
import { type Locale, localePath, parsePathname, switchLocalePath, tr } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Menu, Phone, X } from "@/components/icons";

/** Sticky white header. Sits in the normal flow, so pages never need a top offset. */
export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const current = parsePathname(pathname).path;
  const other = switchLocalePath(pathname);
  const isActive = (href: string) => (href === "/" ? current === "/" : current.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300",
        scrolled || open ? "border-ink-200 shadow-[0_6px_24px_-12px_rgba(10,10,12,0.18)]" : "border-ink-100",
      )}
    >
      <div className="container flex h-[68px] items-center justify-between gap-6 lg:h-20">
        <Link href={localePath(locale, "/")} className="flex items-center gap-3" aria-label={tr(COMPANY.brand, locale)}>
          <Image src="/images/logo.png" alt="" width={48} height={48} priority className="h-11 w-11 object-contain lg:h-12 lg:w-12" />
          <span className="leading-tight">
            <span className="block text-lg font-bold text-ink-950">{tr(COMPANY.name, locale)}</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-crimson-700 rtl:tracking-normal">
              {locale === "ar" ? "للمقاولات" : "Contracting"}
            </span>
          </span>
        </Link>

        <nav aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"} className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative px-4 py-2 text-[0.95rem] font-semibold transition-colors",
                "after:absolute after:inset-x-4 after:-bottom-1 after:h-[3px] after:origin-center after:scale-x-0 after:bg-crimson-700 after:transition-transform",
                "hover:text-crimson-700 hover:after:scale-x-100",
                isActive(item.href) ? "text-crimson-700 after:scale-x-100" : "text-ink-800",
              )}
            >
              {tr(item.label, locale)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            href={other.href}
            hrefLang={other.locale}
            lang={other.locale}
            aria-label={tr(ui.switchLanguageLabel, locale)}
            className="flex min-h-11 items-center px-3 text-sm font-semibold text-ink-800 transition-colors hover:text-crimson-700"
          >
            {tr(ui.switchLanguage, locale)}
          </Link>
          <Link href={localePath(locale, "/contact/")} className="btn btn-primary hidden !py-2.5 sm:inline-flex">
            {tr(ui.requestQuote, locale)}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? tr(ui.close, locale) : tr(ui.menu, locale)}
            className="flex h-11 w-11 items-center justify-center text-ink-950 lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" hidden={!open} className="fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto bg-white lg:hidden">
        <div className="container flex min-h-full flex-col pb-28 pt-4">
          <nav className="flex flex-col" aria-label={locale === "ar" ? "القائمة" : "Menu"}>
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={localePath(locale, item.href)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex items-baseline gap-4 border-b border-ink-100 py-5 text-2xl font-bold",
                  isActive(item.href) ? "text-crimson-700" : "text-ink-950",
                )}
              >
                <span className="text-sm font-semibold text-ink-300" aria-hidden="true">
                  0{i + 1}
                </span>
                {tr(item.label, locale)}
              </Link>
            ))}
          </nav>
          <div className="mt-8 space-y-4">
            <Link href={localePath(locale, "/contact/")} className="btn btn-primary w-full">
              {tr(ui.requestQuote, locale)}
            </Link>
            <a href={telHref} className="btn btn-outline w-full">
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span dir="ltr">{COMPANY.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
