import Image from "next/image";
import Link from "next/link";
import { COMPANY, whatsAppHref } from "@/config/company";
import { services } from "@/content/services";
import { aboutHome, audience, faq, hero, process, servicesSection, trust, ui, why } from "@/content/site";
import { type Locale, localePath, tr } from "@/lib/i18n";
import { Check, ForwardArrow, Icon, WhatsAppIcon } from "@/components/icons";
import { Swoosh } from "@/components/swoosh";
import { FaqList, SectionHeading } from "@/components/ui";

/* Section rhythm on the home page: white / stone / white / stone … so every block reads as its own chapter. */

/* ───────────────────────── Hero (light, split layout) ───────────────────────── */
export function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="bg-grid-dark absolute inset-0 -z-10" aria-hidden="true" />
      <Swoosh className="-top-20 start-[-14rem] -z-10 hidden w-[760px] lg:block" />

      <div className="container grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="animate-fade-up lg:col-span-7">
          <span className="eyebrow">{tr(hero.eyebrow, locale)}</span>
          <h1 className="mt-5 text-[1.95rem] font-bold leading-[1.2] sm:text-5xl lg:text-[3.4rem]">
            {tr(hero.titleA, locale)}
            <span className="mt-2 block text-crimson-700">{tr(hero.titleB, locale)}</span>
          </h1>
          <div className="mt-7 h-1 w-24 -skew-x-[30deg] bg-crimson-700" aria-hidden="true" />
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">{tr(hero.text, locale)}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href={localePath(locale, "/contact/")} className="btn btn-primary">
              {tr(ui.requestQuote, locale)}
              <ForwardArrow className="h-4 w-4" />
            </Link>
            <a
              href={whatsAppHref(tr({ ar: "السلام عليكم، أرغب بالاستفسار عن خدماتكم.", en: "Hello, I'd like to ask about your services." }, locale))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              {tr(ui.whatsapp, locale)}
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-ink-700">
            {hero.badges.map((b) => (
              <li key={b.en} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center bg-crimson-700 text-white">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {tr(b, locale)}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] pb-8 lg:col-span-5 lg:pb-12">
          <div className="absolute inset-x-6 bottom-16 top-12 rounded-full bg-crimson-50/70" aria-hidden="true" />
          <div className="relative z-10 aspect-[4/5]">
            <Image
              src="/images/hero-scaffolding.webp"
              alt={tr(
                {
                  ar: "برج سقالات معدنية بمنصات عمل ودرابزين حماية وسلالم وصول",
                  en: "Steel scaffolding tower with working platforms, safety guardrails and access stairs",
                },
                locale,
              )}
              fill
              priority
              sizes="(min-width:1024px) 480px, 92vw"
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-0 end-0 z-20 border-s-4 border-crimson-700 bg-white px-5 py-4 shadow-lift sm:end-6">
            <p className="text-xs font-semibold text-ink-500">{tr({ ar: "سجل تجاري نشط", en: "Active commercial registration" }, locale)}</p>
            <p dir="ltr" className="mt-1 text-lg font-bold tracking-wide text-ink-950">
              {COMPANY.cr}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Trust strip ───────────────────────── */
export function TrustStrip({ locale }: { locale: Locale }) {
  return (
    <section aria-label={tr({ ar: "لماذا تثق بنا", en: "Why trust us" }, locale)} className="border-y border-ink-200 bg-stone-50">
      <div className="container">
       <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-ink-200 rtl:lg:divide-x-reverse">
        {trust.items.map((item) => (
          <div key={item.title.en} className="flex items-start gap-4 px-2 py-5 sm:px-6 lg:py-8">
            <span className="icon-tile icon-tile-sm">
              <Icon name={item.icon} className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-bold text-ink-950">{tr(item.title, locale)}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">{tr(item.text, locale)}</p>
            </div>
          </div>
        ))}
       </div>
      </div>
    </section>
  );
}

/* ───────────────────────── About (home) ───────────────────────── */
export function AboutSection({ locale }: { locale: Locale }) {
  return (
    <section className="section">
      <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-xl pb-14 lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
            <Image src="/images/about-1.jpg" alt={tr(aboutHome.imageAlt, locale)} fill sizes="(min-width:1024px) 560px, 90vw" className="object-cover" />
          </div>
          <div className="absolute bottom-0 end-[-0.5rem] w-[50%] border-[6px] border-white bg-stone-100 shadow-lift sm:end-[-2rem]">
            <div className="relative aspect-[4/3]">
              <Image src="/images/about-2.jpg" alt={tr(aboutHome.imageAlt2, locale)} fill sizes="300px" className="object-cover" />
            </div>
          </div>
          <div className="absolute start-[-0.5rem] top-8 -skew-x-[8deg] bg-crimson-700 px-5 py-4 text-white shadow-lift sm:start-[-1.5rem]">
            <div className="skew-x-[8deg]">
              <p className="text-xs font-semibold text-white/85">{tr({ ar: "سجل تجاري نشط", en: "Active CR" }, locale)}</p>
              <p dir="ltr" className="mt-1 text-xl font-bold tracking-wide">
                {COMPANY.cr}
              </p>
            </div>
          </div>
        </div>

        <div>
          <span className="eyebrow">{tr(aboutHome.eyebrow, locale)}</span>
          <h2 className="section-title mt-4">{tr(aboutHome.title, locale)}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-600 md:text-lg">
            {tr(aboutHome.paragraphs, locale).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 space-y-3">
            {tr(aboutHome.points, locale).map((p) => (
              <li key={p} className="flex items-start gap-3 font-semibold text-ink-900">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center bg-crimson-700 text-white">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Link href={localePath(locale, "/about/")} className="btn btn-outline mt-10">
            {tr(ui.learnMore, locale)}
            <ForwardArrow className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Services grid ───────────────────────── */
export function ServicesGrid({ locale, detailed = false }: { locale: Locale; detailed?: boolean }) {
  return (
    <div className={detailed ? "grid gap-6 md:grid-cols-2 lg:gap-8" : "grid gap-6 sm:grid-cols-2 xl:grid-cols-4"}>
      {services.map((s) => (
        <Link key={s.slug} href={localePath(locale, `/services/${s.slug}/`)} className="card card-hover group flex flex-col">
          <div className={`relative overflow-hidden bg-stone-100 ${detailed ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
            <Image
              src={s.image}
              alt={tr(s.name, locale)}
              fill
              sizes="(min-width:1280px) 300px, (min-width:640px) 45vw, 92vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="relative flex flex-1 flex-col p-6 pt-10">
            <span className="icon-tile absolute -top-7 start-6 shadow-card ring-4 ring-white">
              <Icon name={s.icon} className="h-7 w-7" />
            </span>
            <h3 className="text-xl font-bold leading-snug">{tr(s.name, locale)}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-ink-600">{tr(s.short, locale)}</p>
            {detailed && (
              <ul className="mt-5 space-y-2 border-t border-ink-100 pt-5 text-sm text-ink-700">
                {tr(s.includes, locale)
                  .slice(0, 4)
                  .map((x) => (
                    <li key={x} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-crimson-700" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
              </ul>
            )}
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-crimson-700">
              {tr(ui.readMore, locale)}
              <ForwardArrow className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ServicesSection({ locale }: { locale: Locale }) {
  return (
    <section className="section bg-stone-50">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={tr(servicesSection.eyebrow, locale)} title={tr(servicesSection.title, locale)} text={tr(servicesSection.text, locale)} />
          <Link href={localePath(locale, "/services/")} className="btn btn-outline shrink-0">
            {tr(ui.viewAllServices, locale)}
            <ForwardArrow className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-16">
          <ServicesGrid locale={locale} />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Process ───────────────────────── */
export function ProcessSection({ locale, tone = "white" }: { locale: Locale; tone?: "white" | "stone" }) {
  return (
    <section className={`section ${tone === "stone" ? "bg-stone-50" : "bg-white"}`}>
      <div className="container">
        <SectionHeading eyebrow={tr(process.eyebrow, locale)} title={tr(process.title, locale)} />
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {process.steps.map((step, i) => (
            <li key={step.title.en} className="relative">
              <div className="flex items-center gap-4">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-crimson-700 bg-white text-lg font-bold text-crimson-700"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < process.steps.length - 1 && (
                  <span className="hidden h-px flex-1 bg-gradient-to-r from-crimson-700/50 to-ink-200 rtl:bg-gradient-to-l lg:block" aria-hidden="true" />
                )}
              </div>
              <h3 className="mt-5 text-lg font-bold">{tr(step.title, locale)}</h3>
              <p className="mt-2 leading-relaxed text-ink-600">{tr(step.text, locale)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── Why choose us ───────────────────────── */
export function WhySection({ locale }: { locale: Locale }) {
  return (
    <section className="section bg-stone-50">
      <div className="container">
        <SectionHeading eyebrow={tr(why.eyebrow, locale)} title={tr(why.title, locale)} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {why.items.map((item) => (
            <div key={item.title.en} className="card card-hover p-7 md:p-8">
              <span className="icon-tile">
                <Icon name={item.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-xl font-bold">{tr(item.title, locale)}</h3>
              <p className="mt-3 leading-relaxed text-ink-600">{tr(item.text, locale)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Who we work with ───────────────────────── */
export function AudienceSection({ locale }: { locale: Locale }) {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow={tr(audience.eyebrow, locale)} title={tr(audience.title, locale)} center />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audience.items.map((item) => (
            <div key={item.title.en} className="card card-hover p-7">
              <span className="icon-tile icon-tile-sm">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{tr(item.title, locale)}</h3>
              <p className="mt-2 leading-relaxed text-ink-600">{tr(item.text, locale)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */
export function FaqSection({ locale, items }: { locale: Locale; items?: { q: string; a: string }[] }) {
  const list = items ?? faq.items.map((i) => ({ q: tr(i.q, locale), a: tr(i.a, locale) }));
  return (
    <section className="section bg-stone-50">
      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={tr(faq.eyebrow, locale)} title={tr(faq.title, locale)} />
          <Link href={localePath(locale, "/contact/")} className="btn btn-primary mt-8">
            {tr(ui.requestQuote, locale)}
            <ForwardArrow className="h-4 w-4" />
          </Link>
        </div>
        <div className="lg:col-span-8">
          <FaqList items={list} locale={locale} />
        </div>
      </div>
    </section>
  );
}
