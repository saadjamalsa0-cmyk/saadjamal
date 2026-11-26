import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { COMPANY, mailHref, telHref, whatsAppHref } from "@/config/company";
import { getService, services, type Service } from "@/content/services";
import { aboutPage, contactPage, faq, privacy, servicesPage, ui } from "@/content/site";
import { type Locale, localePath, tr } from "@/lib/i18n";
import {
  contentDate,
  entityGraph,
  faqSchema,
  itemListSchema,
  metaText,
  pageMetadata,
  serviceHeading,
  serviceMeta,
  serviceOg,
  serviceSchema,
  webPageSchema,
} from "@/lib/seo";
import { serviceDetails } from "@/content/service-details";
import { Check, Clock, ForwardArrow, Icon, Mail, MapPin, Phone, WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { ContactForm } from "@/components/contact-form";
import { Swoosh } from "@/components/swoosh";
import {
  AboutSection,
  AudienceSection,
  FaqSection,
  Hero,
  ProcessSection,
  ServicesGrid,
  ServicesSection,
  TrustStrip,
  WhySection,
} from "@/components/sections";
import { CtaBand, FaqList, PageHeader, QuickQuote, SectionHeading } from "@/components/ui";
import { tradeGroups } from "@/content/trades";

/* ───────────────────────── Home ───────────────────────── */
export function homeMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, path: "/", title: tr(metaText.home.title, locale), description: tr(metaText.home.description, locale) });
}

export function HomePage({ locale }: { locale: Locale }) {
  const faqItems = faq.items.map((i) => ({ q: tr(i.q, locale), a: tr(i.a, locale) }));
  return (
    <>
      <Hero locale={locale} />
      <TrustStrip locale={locale} />
      <AboutSection locale={locale} />
      <ServicesSection locale={locale} />
      <ProcessSection locale={locale} />
      <WhySection locale={locale} />
      <AudienceSection locale={locale} />
      <FaqSection locale={locale} items={faqItems} />
      <QuickQuote locale={locale} />
      <JsonLd
        data={[
          entityGraph(locale),
          webPageSchema(locale, "/", tr(metaText.home.title, locale), tr(metaText.home.description, locale)),
          faqSchema(faqItems),
        ]}
      />
    </>
  );
}

/* ───────────────────────── About ───────────────────────── */
export function aboutMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, path: "/about/", title: tr(metaText.about.title, locale), description: tr(metaText.about.description, locale) });
}

export function AboutPage({ locale }: { locale: Locale }) {
  const a = aboutPage;
  const regValues = [
    tr(COMPANY.legalName, locale),
    COMPANY.cr,
    tr(COMPANY.crIssueDateDisplay, locale),
    tr(COMPANY.entityType, locale),
    tr(a.statusActive, locale),
  ];
  return (
    <>
      <PageHeader locale={locale} title={tr(a.title, locale)} lead={tr(a.lead, locale)} crumbs={[{ name: tr(a.title, locale), path: "/about/" }]} />

      <section className="section">
        <div className="container grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <span className="eyebrow">{tr(a.title, locale)}</span>
            <h2 className="section-title mt-4">{tr(a.storyTitle, locale)}</h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-600">
              {tr(a.story, locale).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-100">
              <Image
                src="/images/about-1.jpg"
                alt={tr({ ar: "فريق مشرف على موقع بناء", en: "Supervision team on a building site" }, locale)}
                fill
                sizes="(min-width:1024px) 480px, 92vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 start-[-1rem] h-24 w-24 -skew-x-[12deg] bg-crimson-700 sm:start-[-1.5rem]" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="section bg-stone-50">
        <div className="container grid gap-6 md:grid-cols-2 lg:gap-8">
          {[
            { t: a.missionTitle, p: a.mission, icon: "target" },
            { t: a.visionTitle, p: a.vision, icon: "gem" },
          ].map((x) => (
            <div key={x.t.en} className="card card-active p-7 md:p-10">
              <span className="icon-tile bg-crimson-700 text-white">
                <Icon name={x.icon} className="h-7 w-7" />
              </span>
              <h2 className="mt-6 text-2xl font-bold md:text-3xl">{tr(x.t, locale)}</h2>
              <p className="mt-4 leading-relaxed text-ink-600 md:text-lg">{tr(x.p, locale)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={tr(a.valuesTitle, locale)} title={tr(a.valuesTitle, locale)} center />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {a.values.map((v) => (
              <div key={v.title.en} className="card card-hover p-7 md:p-8">
                <span className="icon-tile">
                  <Icon name={v.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-xl font-bold">{tr(v.title, locale)}</h3>
                <p className="mt-3 leading-relaxed text-ink-500">{tr(v.text, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration details */}
      <section className="section bg-stone-50">
        <div className="container grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={tr(a.regTitle, locale)} title={tr(a.regTitle, locale)} text={tr(a.regText, locale)} />
            <p className="mt-6 border-s-4 border-crimson-700 bg-white p-4 leading-relaxed text-ink-700">
              {locale === "ar"
                ? `${COMPANY.legalName.ar}، سجل تجاري ${COMPANY.cr}. الموقع ${COMPANY.domain} هو موقع هذه المنشأة.`
                : `${COMPANY.legalName.en}, Commercial Registration ${COMPANY.cr}. ${COMPANY.domain} is this establishment's website.`}
            </p>
            <a
              href={COMPANY.crVerifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-crimson-700 hover:underline"
            >
              {tr(a.verify, locale)}
              <ForwardArrow className="h-4 w-4" />
            </a>
          </div>
          <dl className="card lg:col-span-7">
            {a.regRows.map((row, i) => (
              <div key={row.label.en} className="flex flex-col gap-1 border-b border-ink-100 px-7 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <dt className="text-sm font-medium text-ink-500">{tr(row.label, locale)}</dt>
                <dd className="flex items-center gap-2 font-bold text-ink-950 sm:text-end">
                  {i === 4 && <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden="true" />}
                  <span dir={i === 1 ? "ltr" : undefined}>{regValues[i]}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ProcessSection locale={locale} />
      <CtaBand locale={locale} />
      <JsonLd data={[entityGraph(locale), webPageSchema(locale, "/about/", tr(metaText.about.title, locale), tr(metaText.about.description, locale), "AboutPage")]} />
    </>
  );
}

/* ───────────────────────── Services index ───────────────────────── */
export function servicesMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, path: "/services/", title: tr(metaText.services.title, locale), description: tr(metaText.services.description, locale) });
}

export function ServicesPage({ locale }: { locale: Locale }) {
  const s = servicesPage;
  return (
    <>
      <PageHeader locale={locale} title={tr(s.title, locale)} lead={tr(s.lead, locale)} crumbs={[{ name: tr(s.title, locale), path: "/services/" }]} />
      <section className="section">
        <div className="container">
          <ServicesGrid locale={locale} detailed />
        </div>
      </section>
      <section className="bg-stone-50 py-16">
        <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">{tr(s.helpTitle, locale)}</h2>
            <p className="mt-2 max-w-xl text-lg text-ink-500">{tr(s.helpText, locale)}</p>
          </div>
          <Link href={localePath(locale, "/contact/")} className="btn btn-primary shrink-0">
            {tr(ui.requestQuote, locale)}
            <ForwardArrow className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <ProcessSection locale={locale} />
      <CtaBand locale={locale} />
      <JsonLd
        data={[
          webPageSchema(locale, "/services/", tr(metaText.services.title, locale), tr(metaText.services.description, locale)),
          itemListSchema(locale),
        ]}
      />
    </>
  );
}

/* ───────────────────────── Service detail ───────────────────────── */
export function serviceDetailMetadata(locale: Locale, slug: string): Metadata {
  const service = getService(slug);
  if (!service) return {};
  const { title, description } = serviceMeta(service, locale);
  return pageMetadata({ locale, path: `/services/${slug}/`, title, description, image: serviceOg(slug) });
}

export function ServiceDetailPage({ locale, service }: { locale: Locale; service: Service }) {
  const name = tr(service.name, locale);
  const path = `/services/${service.slug}/`;
  const detail = serviceDetails[service.slug][locale];
  const faqItems = [...tr(service.faqs, locale), ...detail.faqs];
  const others = services.filter((s) => s.slug !== service.slug);
  const t = (ar: string, en: string) => (locale === "ar" ? ar : en);
  const meta = serviceMeta(service, locale);
  return (
    <>
      <PageHeader
        locale={locale}
        title={serviceHeading(service, locale)}
        lead={detail.answer}
        updated={contentDate(path)}
        crumbs={[
          { name: tr(servicesPage.title, locale), path: "/services/" },
          { name, path },
        ]}
      />

      <section className="section">
        <div className="container grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
              <Image src={service.image} alt={name} fill priority sizes="(min-width:1024px) 720px, 92vw" className="object-cover" />
            </div>

            <p className="mt-8 text-lg leading-relaxed text-ink-700">{tr(service.intro, locale)}</p>

            <h2 className="section-title mt-14">{t("معلومات سريعة", "Facts at a glance")}</h2>
            <dl className="card mt-8">
              {detail.facts.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1 border-b border-ink-100 px-5 py-4 last:border-b-0 sm:flex-row sm:justify-between sm:gap-6">
                  <dt className="text-sm font-semibold text-ink-500 sm:w-2/5">{label}</dt>
                  <dd className="font-semibold text-ink-900 sm:w-3/5">{value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="section-title mt-14">{tr(service.includesTitle ?? ui.whatsIncluded, locale)}</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {tr(service.includes, locale).map((item) => (
                <li key={item} className="card flex items-start gap-3 p-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-crimson-700 text-white">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-medium text-ink-900">{item}</span>
                </li>
              ))}
            </ul>

            {detail.sections.map((section) => (
              <div key={section.h} className="mt-14">
                <h2 className="text-2xl font-bold md:text-3xl">{section.h}</h2>
                {section.p.map((p) => (
                  <p key={p.slice(0, 30)} className="mt-4 leading-relaxed text-ink-700 md:text-lg">
                    {p}
                  </p>
                ))}
              </div>
            ))}

            <div className="mt-14">
              <h2 className="text-2xl font-bold md:text-3xl">{detail.table.caption}</h2>
              <div className="card mt-6 overflow-x-auto">
                <table className="w-full text-start text-sm md:text-base">
                  <thead className="bg-stone-100">
                    <tr>
                      {detail.table.head.map((h) => (
                        <th key={h} scope="col" className="px-4 py-3 text-start font-bold text-ink-950">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {detail.table.rows.map(([a, b]) => (
                      <tr key={a} className="border-t border-ink-100">
                        <th scope="row" className="px-4 py-3 text-start font-semibold text-ink-900">
                          {a}
                        </th>
                        <td className="px-4 py-3 text-ink-700">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {service.slug === "manpower-supply" && (
              <div className="mt-14">
                <h2 className="text-2xl font-bold md:text-3xl">{t("المهن التي يمكنك طلبها", "Trades you can ask for")}</h2>
                <p className="mt-3 leading-relaxed text-ink-600">
                  {t("اذكر المهنة والعدد في طلبك، ونؤكد التوفر في عرض السعر.", "State the trade and number in your request; availability is confirmed in the quotation.")}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {tradeGroups.map((group) => (
                    <div key={group.name.en} className="card p-5">
                      <h3 className="text-lg font-bold">{tr(group.name, locale)}</h3>
                      <ul className="mt-3 space-y-1.5 text-ink-700">
                        {group.trades.map((trade) => (
                          <li key={trade.en} className="flex items-start gap-2">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-crimson-700" aria-hidden="true" />
                            {tr(trade, locale)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {[
              { h: t("ماذا تكتب في طلبك", "What to put in your request"), items: detail.request },
              { h: t("ما تتحقق منه عند الوصول", "What to check on arrival"), items: detail.checks },
            ].map((block) => (
              <div key={block.h} className="mt-14">
                <h2 className="text-2xl font-bold md:text-3xl">{block.h}</h2>
                <ul className="mt-6 space-y-3">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-ink-800">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-crimson-700" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mt-16">
              <SectionHeading eyebrow={tr(faq.eyebrow, locale)} title={tr(ui.faqTitle, locale)} />
              <div className="mt-8">
                <FaqList items={faqItems} locale={locale} />
              </div>
            </div>
          </div>

          {/* Sticky enquiry card */}
          <aside className="lg:sticky lg:top-28 lg:col-span-5">
            <div className="card card-active p-7 shadow-lift md:p-8">
              <span className="icon-tile bg-crimson-700 text-white">
                <Icon name={service.icon} className="h-7 w-7" />
              </span>
              <h2 className="mt-6 text-2xl font-bold">{tr(ui.requestQuote, locale)}</h2>
              <p className="mt-3 leading-relaxed text-ink-600">{tr(servicesPage.helpText, locale)}</p>
              <div className="mt-8 space-y-3">
                <Link href="#quote" className="btn btn-primary w-full">
                  {tr(ui.requestQuote, locale)}
                  <ForwardArrow className="h-4 w-4" />
                </Link>
                <a
                  href={whatsAppHref(tr({ ar: `السلام عليكم، أرغب بالاستفسار عن: ${name}`, en: `Hello, I'd like to ask about: ${name}` }, locale))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline w-full"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                  {tr(ui.whatsapp, locale)}
                </a>
                <a href={telHref} className="btn btn-outline w-full">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span dir="ltr">{COMPANY.phone}</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-stone-50">
        <div className="container">
          <h2 className="section-title">{tr(ui.relatedServices, locale)}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={localePath(locale, `/services/${s.slug}/`)}
                className="card card-hover group flex items-start gap-5 p-6"
              >
                <span className="icon-tile">
                  <Icon name={s.icon} className="h-7 w-7" />
                </span>
                <span>
                  <span className="block text-lg font-bold text-ink-950">{tr(s.name, locale)}</span>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-crimson-700">
                    {tr(ui.readMore, locale)}
                    <ForwardArrow className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuickQuote locale={locale} service={service.slug} />
      <JsonLd data={[serviceSchema(service, locale), faqSchema(faqItems), webPageSchema(locale, path, meta.title, meta.description)]} />
    </>
  );
}

/* ───────────────────────── Contact ───────────────────────── */
export function contactMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, path: "/contact/", title: tr(metaText.contact.title, locale), description: tr(metaText.contact.description, locale) });
}

export function ContactPage({ locale }: { locale: Locale }) {
  const c = contactPage;
  const cards = [
    {
      icon: <Phone className="h-6 w-6" aria-hidden="true" />,
      label: c.phone,
      node: (
        <a href={telHref} dir="ltr" className="font-bold text-ink-950 hover:text-crimson-700 rtl:block rtl:text-end">
          {COMPANY.phone}
        </a>
      ),
    },
    {
      icon: <WhatsAppIcon className="h-6 w-6" />,
      label: c.whatsapp,
      node: (
        <a href={whatsAppHref()} target="_blank" rel="noopener noreferrer" dir="ltr" className="font-bold text-ink-950 hover:text-crimson-700 rtl:block rtl:text-end">
          {COMPANY.phone}
        </a>
      ),
    },
    {
      icon: <Mail className="h-6 w-6" aria-hidden="true" />,
      label: c.email,
      node: (
        <a href={mailHref} className="break-all font-bold text-ink-950 hover:text-crimson-700">
          {COMPANY.email}
        </a>
      ),
    },
    {
      icon: <Clock className="h-6 w-6" aria-hidden="true" />,
      label: c.hours,
      node: <span className="font-bold text-ink-950">{tr(COMPANY.hours.display, locale)}</span>,
    },
    {
      icon: <MapPin className="h-6 w-6" aria-hidden="true" />,
      label: c.address,
      node: (
        <span className="font-bold text-ink-950">
          {tr(COMPANY.address.display, locale)}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader locale={locale} title={tr(c.title, locale)} lead={tr(c.lead, locale)} crumbs={[{ name: tr(c.title, locale), path: "/contact/" }]} />
      <section className="section">
        <div className="container grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold md:text-3xl">{tr(c.cardsTitle, locale)}</h2>
            <ul className="card mt-8 divide-y divide-ink-100">
              {cards.map((card) => (
                <li key={card.label.en} className="flex items-start gap-5 p-6">
                  <span className="icon-tile icon-tile-sm">{card.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink-500">{tr(card.label, locale)}</p>
                    <div className="mt-1">{card.node}</div>
                  </div>
                </li>
              ))}
              <li className="flex items-start gap-5 bg-stone-50 p-6">
                <span className="icon-tile icon-tile-sm">
                  <Icon name="badge" className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink-500">{tr(c.cr, locale)}</p>
                  <p dir="ltr" className="mt-1 font-bold text-ink-950 rtl:text-end">
                    {COMPANY.cr}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="card card-active p-7 shadow-lift md:p-10 lg:col-span-7">
            <h2 className="text-2xl font-bold md:text-3xl">{tr(c.formTitle, locale)}</h2>
            <p className="mb-8 mt-3 text-ink-500">{tr(c.formText, locale)}</p>
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>
      <JsonLd data={[entityGraph(locale), webPageSchema(locale, "/contact/", tr(metaText.contact.title, locale), tr(metaText.contact.description, locale), "ContactPage")]} />
    </>
  );
}

/* ───────────────────────── Privacy ───────────────────────── */
export function privacyMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, path: "/privacy-policy/", title: tr(metaText.privacy.title, locale), description: tr(metaText.privacy.description, locale), noindex: true });
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHeader locale={locale} title={tr(privacy.title, locale)} lead={tr(privacy.updated, locale)} crumbs={[{ name: tr(privacy.title, locale), path: "/privacy-policy/" }]} />
      <section className="section">
        <div className="container max-w-3xl space-y-10">
          {privacy.sections.map((s) => (
            <div key={s.h.en}>
              <h2 className="text-2xl font-bold">{tr(s.h, locale)}</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-600">{tr(s.p, locale)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
