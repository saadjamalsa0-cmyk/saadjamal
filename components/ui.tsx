import Link from "next/link";
import { whatsAppHref } from "@/config/company";
import { contactPage, cta, ui } from "@/content/site";
import { ContactForm } from "@/components/contact-form";
import { type Locale, type Bi, localePath, tr } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ForwardArrow, Plus, WhatsAppIcon } from "@/components/icons";
import { Swoosh } from "@/components/swoosh";
import { breadcrumbSchema, type Crumb } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

/* ---------- Section heading: eyebrow + title + optional text ---------- */
export function SectionHeading({
  eyebrow,
  title,
  text,
  center,
  className,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title mt-4">{title}</h2>
      {text && <p className="mt-5 text-lg leading-relaxed text-ink-600">{text}</p>}
    </div>
  );
}

/* ---------- Inner-page header band with breadcrumbs (light) ---------- */
export function PageHeader({
  locale,
  title,
  lead,
  crumbs,
  updated,
}: {
  locale: Locale;
  title: string;
  lead?: string;
  /** Breadcrumb trail after "Home". Last item is the current page. */
  crumbs: Crumb[];
  /** ISO date of the last content change, shown as a freshness line. */
  updated?: string;
}) {
  const trail: Crumb[] = [{ name: tr(ui.home, locale), path: "/" }, ...crumbs];
  return (
    <section className="relative isolate overflow-hidden border-b border-ink-200 bg-stone-50 py-12 md:py-20">
      <div className="bg-grid-dark absolute inset-0 -z-10" aria-hidden="true" />
      <Swoosh className="-top-16 end-[-10rem] -z-10 w-[640px] md:w-[820px]" />
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-500">
            {trail.map((c, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={c.path} className="flex items-center gap-2">
                  {last ? (
                    <span aria-current="page" className="font-semibold text-ink-950">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={localePath(locale, c.path)} className="transition-colors hover:text-crimson-700">
                      {c.name}
                    </Link>
                  )}
                  {!last && (
                    <span aria-hidden="true" className="text-ink-300 rtl:-scale-x-100">
                      /
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{title}</h1>
        <div className="mt-6 h-1 w-20 -skew-x-[30deg] bg-crimson-700" aria-hidden="true" />
        {lead && <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-700 md:text-lg">{lead}</p>}
        {updated && (
          <p className="mt-5 text-sm text-ink-500">
            {locale === "ar" ? "آخر تحديث: " : "Updated: "}
            <time dateTime={updated}>
              {new Intl.DateTimeFormat(locale === "ar" ? "ar-SA-u-ca-gregory-nu-latn" : "en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(updated))}
            </time>
          </p>
        )}
      </div>
      <JsonLd data={breadcrumbSchema(locale, trail)} />
    </section>
  );
}

/* ---------- FAQ accordion (native <details>: works without JS, crawlable) ---------- */
export function FaqList({ items, locale }: { items: { q: string; a: string }[]; locale: Locale }) {
  void locale;
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.q} className="faq group border border-ink-200 bg-white transition-colors">
          <summary className="flex items-center justify-between gap-6 px-5 py-5 text-start text-ink-950 sm:px-6">
            <h3 className="text-base font-bold leading-snug md:text-lg">{item.q}</h3>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-crimson-50 text-crimson-700 transition-colors group-open:bg-crimson-700 group-open:text-white">
              <Plus className="faq-icon h-4 w-4 transition-transform duration-200" aria-hidden="true" />
            </span>
          </summary>
          <p className="px-5 pb-6 leading-relaxed text-ink-600 sm:px-6">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ---------- Quote form at the foot of the home and service pages (the primary action) ---------- */
export function QuickQuote({ locale, service }: { locale: Locale; service?: string }) {
  return (
    <section id="quote" className="section scroll-mt-20 border-t border-ink-200 bg-white">
      <div className="container grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <span className="eyebrow">{tr(ui.requestQuote, locale)}</span>
          <h2 className="section-title mt-4">{tr(cta.title, locale)}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-600">{tr(contactPage.formText, locale)}</p>
        </div>
        <div className="card card-active p-6 shadow-lift md:p-10 lg:col-span-8">
          <ContactForm locale={locale} defaultService={service} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Closing call-to-action band (the one saturated brand band) ---------- */
export function CtaBand({ locale, title, text }: { locale: Locale; title?: Bi; text?: Bi }) {
  return (
    <section className="relative isolate overflow-hidden bg-crimson-700 py-16 text-white md:py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-crimson-600 via-crimson-700 to-crimson-900" aria-hidden="true" />
      <Swoosh tone="crimson" className="-bottom-32 end-[-10rem] -z-10 w-[700px]" />
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center lg:gap-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">{tr(title ?? cta.title, locale)}</h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">{tr(text ?? cta.text, locale)}</p>
          </div>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link href={localePath(locale, "/contact/")} className="btn btn-light">
              {tr(ui.requestQuote, locale)}
              <ForwardArrow className="h-4 w-4" />
            </Link>
            <a
              href={whatsAppHref(tr({ ar: "السلام عليكم، أرغب بطلب عرض سعر.", en: "Hello, I'd like to request a quotation." }, locale))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {tr(ui.whatsapp, locale)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
