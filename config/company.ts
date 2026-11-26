import type { Bi } from "@/lib/i18n";

/**
 * Single source of truth for company identity and contact details (NAP).
 * Every page, the footer, the contact form and the structured data read from here,
 * so a detail only ever has to be changed in this one file.
 *
 * ──────────────────────────────────────────────────────────────────────────
 *  TODO BEFORE LAUNCH — fill in the values marked "PLACEHOLDER" below, then
 *  set `contactConfirmed: true`. While it is false, the phone / email / hours
 *  are NOT published in the Google structured data (so a placeholder can never
 *  reach search results). They are still shown on the page so you can see the layout.
 * ──────────────────────────────────────────────────────────────────────────
 */
export const COMPANY = {
  /** Short brand used in navigation and headings. */
  name: { ar: "سعد جمال", en: "Saad Jamal" } as Bi,
  /** Brand with the trade, used in titles. */
  brand: { ar: "سعد جمال للمقاولات", en: "Saad Jamal Contracting" } as Bi,
  /** Name exactly as it appears on the Commercial Registration certificate. */
  legalName: {
    ar: "مؤسسة سعد جمال الاسمري للمقاولات",
    en: "Saad Jamal Al-Asmari Contracting Establishment",
  } as Bi,

  siteUrl: "https://www.saadjamal.sa",
  domain: "saadjamal.sa",

  /** Commercial Registration / Unified National Number (from the CR certificate). */
  cr: "7055602549",
  /** CR issue date, ISO. Used as `foundingDate` — the only date that is documented. */
  crIssueDate: "2026-11-19",
  crIssueDateDisplay: { ar: "19 نوفمبر 2026م", en: "19 November 2026" } as Bi,
  entityType: { ar: "مؤسسة", en: "Establishment" } as Bi,
  crVerifyUrl: "https://mc.gov.sa",

  // ───────────── Contact details (confirmed by the owner, 25 Nov 2026) ─────────────
  contactConfirmed: true,
  /** Display format. */
  phone: "+966 55 831 5359",
  /** E.164 — used for tel: links. */
  phoneIntl: "+966558315359",
  /** Digits only — used for wa.me links. */
  whatsapp: "966558315359",
  email: "info@saadjamal.sa",
  hours: {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "08:00",
    closes: "17:00",
    display: { ar: "الأحد – الخميس، 8:00 ص – 5:00 م", en: "Sunday – Thursday, 8:00 AM – 5:00 PM" } as Bi,
  },
  /**
   * Physical address. Leave `street` empty until the real address is known —
   * the contact page and structured data only show it once it's filled in.
   */
  address: {
    street: "Zuhair Bin Qais Street, Taybah",
    city: "Dammam",
    region: "Eastern Province",
    postalCode: "34271",
    country: "SA",
    /** Per-language parts for the schema.org PostalAddress. */
    streetText: { ar: "شارع زهير بن قيس، طيبة", en: "Zuhair Bin Qais Street, Taybah" } as Bi,
    cityText: { ar: "الدمام", en: "Dammam" } as Bi,
    regionText: { ar: "المنطقة الشرقية", en: "Eastern Province" } as Bi,
    display: {
      ar: "شارع زهير بن قيس، طيبة، الدمام 34271، المملكة العربية السعودية",
      en: "Zuhair Bin Qais Street, Taybah, Dammam 34271, Saudi Arabia",
    } as Bi,
  },
  geo: null as null | { latitude: string; longitude: string },
  /** Social profiles (full URLs). Emitted as schema.org `sameAs` once filled in. */
  social: {
    instagram: "",
    x: "",
    linkedin: "",
    facebook: "",
    snapchat: "",
    tiktok: "",
  },
} as const;

export const telHref = `tel:${COMPANY.phoneIntl}`;
export const mailHref = `mailto:${COMPANY.email}`;

/** wa.me link with a prefilled message so the team sees which page the enquiry came from. */
export function whatsAppHref(message?: string) {
  const base = `https://wa.me/${COMPANY.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const socialLinks = Object.entries(COMPANY.social)
  .filter(([, url]) => url.trim().length > 0)
  .map(([network, url]) => ({ network, url }));
