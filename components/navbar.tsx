"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useMessages, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/language-switcher";
import { Mail, Menu, X } from "@/components/ui/icons";
import { COMPANY, mailHref } from "@/config/company";
import type { Locale } from "@/config/i18n";
import { usePathname } from "@/i18n/routing";
import { cleanPath, getLocalizedPath } from "@/lib/seo/urls";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string };

/** Sticky white header. It sits in the normal flow, so pages never need a top offset. */
export default function Navbar({ services }: { services: { slug: string; name: string }[] }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations();
  const nav = useMessages().nav as unknown as NavItem[];
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

  const current = cleanPath(pathname);
  const isActive = (href: string) => (cleanPath(href) === "" ? current === "" : current.startsWith(cleanPath(href)));
  const href = (path: string) => getLocalizedPath(locale, path);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300",
        scrolled || open ? "border-ink-200 shadow-[0_6px_24px_-12px_rgba(10,10,12,0.18)]" : "border-ink-100",
      )}
    >
      <div className="container flex h-[68px] items-center justify-between gap-6 lg:h-20">
        <Link href={href("/")} className="flex items-center gap-3" aria-label={COMPANY.brand[locale]}>
          <Image src="/images/logo.png" alt="" width={48} height={48} priority className="h-11 w-11 object-contain lg:h-12 lg:w-12" />
          <span className="leading-tight">
            <span className="block text-lg font-bold text-ink-950">{COMPANY.name[locale]}</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-crimson-700 rtl:tracking-normal">{t("common.brandSuffix")}</span>
          </span>
        </Link>

        <nav aria-label={t("common.navLabel")} className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={href(item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative px-4 py-2 text-[0.95rem] font-semibold transition-colors",
                "after:absolute after:inset-x-4 after:-bottom-1 after:h-[3px] after:origin-center after:scale-x-0 after:bg-crimson-700 after:transition-transform",
                "hover:text-crimson-700 hover:after:scale-x-100",
                isActive(item.href) ? "text-crimson-700 after:scale-x-100" : "text-ink-800",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <LanguageSwitcher />
          <Link href={href("contact")} className="btn btn-primary hidden py-2.5! sm:inline-flex">
            {t("ui.requestQuote")}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("ui.close") : t("ui.menu")}
            className="flex h-11 w-11 items-center justify-center text-ink-950 lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" hidden={!open} className="absolute inset-x-0 top-full h-[calc(100dvh-68px)] overflow-y-auto bg-white lg:hidden">
        <div className="container flex min-h-full flex-col pb-28 pt-4">
          <nav className="flex flex-col" aria-label={t("common.menuLabel")}>
            {nav.map((item, i) => (
              <div key={item.href} className="border-b border-ink-100">
                <Link
                  href={href(item.href)}
                  onClick={() => setOpen(false)}
                  aria-current={cleanPath(item.href) === current ? "page" : undefined}
                  className={cn("flex items-baseline gap-4 py-4 text-xl font-bold", isActive(item.href) ? "text-crimson-700" : "text-ink-950")}
                >
                  <span className="text-sm font-semibold text-ink-300" aria-hidden="true">
                    0{i + 1}
                  </span>
                  {item.label}
                </Link>
                {/* The service pages sit under "Services". */}
                {cleanPath(item.href) === "services" && (
                  <ul className="mb-3 ms-9 border-s-2 border-crimson-100">
                    {services.map((s) => {
                      const active = current === `services/${s.slug}`;
                      return (
                        <li key={s.slug}>
                          <Link
                            href={href(`services/${s.slug}`)}
                            onClick={() => setOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className={cn("flex min-h-11 items-center ps-4 font-semibold", active ? "text-crimson-700" : "text-ink-700")}
                          >
                            {s.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
            <Link
              href={href("privacy-policy")}
              onClick={() => setOpen(false)}
              aria-current={current === "privacy-policy" ? "page" : undefined}
              className={cn("flex min-h-11 items-center pt-2 text-sm font-semibold", current === "privacy-policy" ? "text-crimson-700" : "text-ink-500")}
            >
              {t("ui.privacy")}
            </Link>
          </nav>
          <div className="mt-8 space-y-4">
            <Link href={href("contact")} className="btn btn-primary w-full">
              {t("ui.requestQuote")}
            </Link>
            <a href={mailHref} className="btn btn-outline w-full">
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span dir="ltr">{COMPANY.email}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
