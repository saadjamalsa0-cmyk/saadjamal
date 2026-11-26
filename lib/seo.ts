import type { Metadata } from "next";
import { COMPANY, socialLinks } from "@/config/company";
import { type Locale, localeMeta, localePath, tr } from "@/lib/i18n";
import { services, type Service } from "@/content/services";
import { serviceDetails } from "@/content/service-details";
import contentDates from "@/lib/content-dates.json";

export const SITE_URL = COMPANY.siteUrl;
export const DEFAULT_OG = "/images/og-image.jpg";

/** Absolute URL for a locale + route. Root of the default locale has no trailing path. */
export function pageUrl(locale: Locale, path = "/"): string {
  const p = localePath(locale, path);
  return p === "/" ? SITE_URL : `${SITE_URL}${p}`;
}

/** Reciprocal hreflang: language-only and language-region for both, plus x-default (Arabic). */
export function languageAlternates(path = "/") {
  return {
    ar: pageUrl("ar", path),
    "ar-SA": pageUrl("ar", path),
    en: pageUrl("en", path),
    "en-SA": pageUrl("en", path),
    "x-default": pageUrl("ar", path),
  };
}

/** Date a route's content last changed (written by `pnpm seo:dates` from git history). */
export function contentDate(path: string): string {
  return (contentDates as Record<string, string>)[path] ?? COMPANY.crIssueDate;
}

type PageMetaInput = {
  locale: Locale;
  /** Route without locale prefix, e.g. "/about/". */
  path: string;
  /** Full <title>, ≤ 60 characters. */
  title: string;
  /** 120–155 characters. */
  description: string;
  image?: string;
  noindex?: boolean;
};

export function pageMetadata({ locale, path, title, description, image = DEFAULT_OG, noindex }: PageMetaInput): Metadata {
  const url = pageUrl(locale, path);
  const other: Locale = locale === "ar" ? "en" : "ar";
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: tr(COMPANY.brand, locale),
      locale: localeMeta[locale].ogLocale,
      alternateLocale: [localeMeta[other].ogLocale],
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/* ---------------- Page titles & descriptions (hand-written; lengths checked by `pnpm seo:crawl`) ---------------- */

export const metaText = {
  home: {
    title: {
      ar: "سعد جمال للمقاولات: توريد عمال السقالات والعمالة بالسعودية",
      en: "Saad Jamal Contracting: Scaffolders & Manpower, Saudi Arabia",
    },
    description: {
      ar: "مؤسسة سعد جمال للمقاولات بالدمام: توريد عمال السقالات واللحامين والعمالة العامة والمتخصصة وتأجير المعدات في السعودية. اطلب عرض سعر مكتوب.",
      en: "Dammam-based Saad Jamal Contracting supplies scaffolders, welders and manpower and rents equipment across Saudi Arabia. Request a written quotation.",
    },
  },
  about: {
    title: { ar: "من نحن | مؤسسة سعد جمال للمقاولات", en: "About Us | Saad Jamal Contracting, Dammam" },
    description: {
      ar: "تعرف على مؤسسة سعد جمال الاسمري للمقاولات بالدمام، سجل تجاري 7055602549: توريد عمال السقالات والعمالة المتخصصة وتأجير المعدات في السعودية.",
      en: "About Saad Jamal Al-Asmari Contracting Establishment, CR 7055602549, in Dammam: scaffolder and manpower supply and equipment rental in Saudi Arabia.",
    },
  },
  services: {
    title: { ar: "خدماتنا: سقالات ولحامون وعمالة ومعدات | سعد جمال", en: "Scaffolders, Welders, Manpower & Equipment | Saad Jamal" },
    description: {
      ar: "خدمات سعد جمال للمقاولات: توريد عمال السقالات واللحامين والعمالة العامة والمتخصصة وتأجير المعدات لمشاريع البناء والصيانة والصناعة في السعودية.",
      en: "Four services: scaffolder supply, welder supply, skilled and general manpower, and equipment rental for construction and industry in Saudi Arabia.",
    },
  },
  contact: {
    title: { ar: "اتصل بنا واطلب عرض سعر | سعد جمال للمقاولات", en: "Contact Us & Request a Quote | Saad Jamal Contracting" },
    description: {
      ar: "تواصل مع سعد جمال للمقاولات في الدمام على 966558315359+ أو واتساب أو البريد، واطلب عرض سعر مكتوبًا للعمالة أو عمال السقالات أو المعدات.",
      en: "Call or WhatsApp +966 55 831 5359, or email Saad Jamal Contracting in Dammam, for a written quotation on manpower, scaffolders or equipment.",
    },
  },
  privacy: {
    title: { ar: "سياسة الخصوصية | سعد جمال للمقاولات", en: "Privacy Policy | Saad Jamal Contracting" },
    description: {
      ar: "سياسة الخصوصية لموقع مؤسسة سعد جمال الاسمري للمقاولات: ما نجمعه من بيانات وكيف نستخدمها وحقوقك.",
      en: "Privacy policy of Saad Jamal Al-Asmari Contracting Establishment: what data we receive, how we use it and your rights.",
    },
  },
};

const serviceTitles: Record<string, { ar: string; en: string }> = {
  "scaffolders-supply": { ar: "توريد عمال السقالات في السعودية | سعد جمال", en: "Scaffolder Supply in Saudi Arabia | Saad Jamal" },
  "welder-supply": { ar: "توريد اللحامين في السعودية | سعد جمال", en: "Welder Supply in Saudi Arabia | Saad Jamal" },
  "manpower-supply": { ar: "توريد العمالة في السعودية | سعد جمال للمقاولات", en: "Manpower Supply in Saudi Arabia | Saad Jamal" },
  "equipment-rental": { ar: "تأجير معدات البناء في السعودية | سعد جمال", en: "Equipment Rental in Saudi Arabia | Saad Jamal" },
};

const serviceDescriptions: Record<string, { ar: string; en: string }> = {
  "scaffolders-supply": {
    ar: "توريد عمال سقالات لتركيب وتعديل وفك السقالات في مشاريع السعودية: كابلوك ورينج لوك وأنبوب ووصلة. أرسل متطلباتك لعرض سعر مكتوب.",
    en: "Scaffolders to erect, alter and dismantle cuplock, ringlock and tube-and-fitting scaffolds in Saudi Arabia. Send your scope for a written quotation.",
  },
  "welder-supply": {
    ar: "توريد لحامين للأعمال الإنشائية والأنابيب والصيانة والورش في السعودية. حدّد العملية والمعدن والأوضاع واحصل على عرض سعر مكتوب من سعد جمال.",
    en: "Welders for structural, pipe, maintenance and workshop work in Saudi Arabia. State process, material and positions to get a written quotation.",
  },
  "manpower-supply": {
    ar: "توريد عمالة ماهرة ونصف ماهرة وعامة لمشاريع البناء والصيانة والصناعة في السعودية، مؤقتًا أو بحسب مدة المشروع. اطلب عرض سعر مكتوب.",
    en: "Skilled, semi-skilled and general workers for construction, maintenance and industry in Saudi Arabia, temporary or project-length. Request a quote.",
  },
  "equipment-rental": {
    ar: "تأجير معدات وأدوات البناء والأعمال الصناعية في السعودية يوميًا أو أسبوعيًا أو شهريًا، ومع مشغل عند الطلب. نؤكد التوفر في عرض السعر.",
    en: "Construction and industrial equipment rental in Saudi Arabia, daily, weekly or monthly, with operators on request. Availability confirmed per quote.",
  },
};

export function serviceMeta(service: Service, locale: Locale) {
  return { title: tr(serviceTitles[service.slug], locale), description: tr(serviceDescriptions[service.slug], locale) };
}

/** H1 for a service page: plain name plus the market. */
export function serviceHeading(service: Service, locale: Locale) {
  const name = tr(service.name, locale);
  return locale === "ar" ? `${name} في السعودية` : `${name} in Saudi Arabia`;
}

export const serviceOg = (slug: string) => `/og/${slug}.jpg`;

/* ---------------- Structured data: one entity, referenced everywhere ---------------- */

export const ORG_ID = `${SITE_URL}/#organization`;
export const OFFICE_ID = `${SITE_URL}/#dammam-office`;
export const websiteId = (locale: Locale) => (locale === "ar" ? `${SITE_URL}/#website` : `${SITE_URL}/en/#website`);

/** Minimal node used wherever another schema needs to point at the company. */
export function orgRef(locale: Locale) {
  return { "@type": "Organization", "@id": ORG_ID, name: tr(COMPANY.legalName, locale), url: SITE_URL };
}

function postalAddress(locale: Locale) {
  const a = COMPANY.address;
  return {
    "@type": "PostalAddress",
    streetAddress: tr(a.streetText, locale),
    addressLocality: tr(a.cityText, locale),
    addressRegion: tr(a.regionText, locale),
    postalCode: a.postalCode,
    addressCountry: a.country,
  };
}

const openingHours = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: [...COMPANY.hours.days], opens: COMPANY.hours.opens, closes: COMPANY.hours.closes },
];

/**
 * Organization + Dammam office (LocalBusiness) + WebSite, linked by @id.
 * Mounted only on pages about the company itself (home, about, contact);
 * every other page refers to it with orgRef().
 */
export function entityGraph(locale: Locale) {
  const confirmed = COMPANY.contactConfirmed;
  const sameAs = socialLinks.map((s) => s.url);
  const identifier = {
    "@type": "PropertyValue",
    name: locale === "ar" ? "السجل التجاري" : "Commercial Registration",
    value: COMPANY.cr,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: tr(COMPANY.legalName, locale),
        legalName: tr(COMPANY.legalName, locale),
        alternateName: [COMPANY.brand.ar, COMPANY.brand.en, COMPANY.legalName.ar, COMPANY.legalName.en].filter(
          (n) => n !== tr(COMPANY.legalName, locale),
        ),
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        image: `${SITE_URL}${DEFAULT_OG}`,
        description: tr(metaText.home.description, locale),
        foundingDate: COMPANY.crIssueDate,
        identifier,
        areaServed: { "@type": "Country", name: locale === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia" },
        knowsAbout:
          locale === "ar"
            ? ["توريد عمال السقالات", "توريد اللحامين", "توريد العمالة", "تأجير المعدات"]
            : ["Scaffolder supply", "Welder supply", "Manpower supply", "Equipment rental"],
        ...(confirmed
          ? {
              address: postalAddress(locale),
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: COMPANY.phoneIntl,
                  email: COMPANY.email,
                  contactType: "sales",
                  areaServed: "SA",
                  availableLanguage: ["Arabic", "English"],
                },
              ],
              department: [{ "@id": OFFICE_ID }],
            }
          : {}),
        ...(sameAs.length ? { sameAs } : {}),
        // Services without price properties: rates belong in the quotation, never in markup.
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: locale === "ar" ? "خدمات سعد جمال" : "Saad Jamal services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: tr(s.name, locale), url: pageUrl(locale, `/services/${s.slug}/`) },
          })),
        },
      },
      ...(confirmed
        ? [
            {
              "@type": "LocalBusiness",
              "@id": OFFICE_ID,
              name: tr(COMPANY.legalName, locale),
              parentOrganization: { "@id": ORG_ID },
              url: pageUrl(locale, "/contact/"),
              image: `${SITE_URL}${DEFAULT_OG}`,
              telephone: COMPANY.phoneIntl,
              email: COMPANY.email,
              address: postalAddress(locale),
              openingHoursSpecification: openingHours,
              areaServed: { "@type": "Country", name: "Saudi Arabia" },
            },
          ]
        : []),
      {
        "@type": "WebSite",
        "@id": websiteId(locale),
        url: pageUrl(locale, "/"),
        name: tr(COMPANY.brand, locale),
        inLanguage: localeMeta[locale].hreflang,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(locale: Locale, crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: pageUrl(locale, c.path) })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

export function serviceSchema(service: Service, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceHeading(service, locale),
    description: serviceDetails[service.slug][locale].answer,
    url: pageUrl(locale, `/services/${service.slug}/`),
    serviceType: tr(service.name, locale),
    provider: orgRef(locale),
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    inLanguage: localeMeta[locale].hreflang,
  };
}

export function itemListSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tr(s.name, locale),
      url: pageUrl(locale, `/services/${s.slug}/`),
    })),
  };
}

export function webPageSchema(locale: Locale, path: string, name: string, description: string, type: "WebPage" | "AboutPage" | "ContactPage" = "WebPage") {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${pageUrl(locale, path)}#webpage`,
    url: pageUrl(locale, path),
    name,
    description,
    inLanguage: localeMeta[locale].hreflang,
    dateModified: contentDate(path),
    isPartOf: { "@id": websiteId(locale) },
    about: orgRef(locale),
  };
}
