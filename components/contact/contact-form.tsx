"use client";

import { useLocale, useMessages, useTranslations } from "next-intl";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Mail, WhatsAppIcon } from "@/components/ui/icons";
import { mailHref, whatsAppHref } from "@/config/company";

const field =
  "w-full border border-ink-200 bg-white px-4 py-3.5 text-ink-900 placeholder:text-ink-400 transition-colors focus:border-crimson-700 focus:outline-none focus:ring-2 focus:ring-crimson-700/20";

type Props = {
  /** Passed from the server so service content is never shipped to the browser. */
  services: { slug: string; name: string }[];
  defaultService?: string;
};

type ContactCopy = {
  fields: Record<"name" | "phone" | "email" | "service" | "location" | "message" | "messagePlaceholder" | "other" | "select", string>;
  labels: Record<"name" | "phone" | "service" | "location" | "details", string>;
};

/** Needs no server: builds a ready-to-send message and opens WhatsApp or the email app. */
export default function ContactForm({ services, defaultService = "" }: Props) {
  const locale = useLocale();
  const t = useTranslations("contactPage");
  const common = useTranslations("common");
  const c = useMessages().contactPage as unknown as ContactCopy;
  const [error, setError] = useState(false);
  const serviceRef = useRef<HTMLSelectElement>(null);

  // Arriving with ?service=slug pre-selects it.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    if (slug && serviceRef.current && services.some((s) => s.slug === slug)) serviceRef.current.value = slug;
  }, [services]);

  function build(form: HTMLFormElement) {
    const d = new FormData(form);
    const get = (k: string) => String(d.get(k) ?? "").trim();
    const service = services.find((s) => s.slug === get("service"));
    const lines = [
      t("waGreeting"),
      "",
      `${c.labels.name}: ${get("name")}`,
      `${c.labels.phone}: ${get("phone")}`,
      get("email") ? `Email: ${get("email")}` : null,
      `${c.labels.service}: ${service?.name ?? c.fields.other}`,
      get("location") ? `${c.labels.location}: ${get("location")}` : null,
      "",
      `${c.labels.details}:`,
      get("message"),
    ].filter((l): l is string => l !== null);
    return { text: lines.join("\n"), valid: Boolean(get("name") && get("phone") && get("message")) };
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { text, valid } = build(e.currentTarget);
    if (!valid) return setError(true);
    setError(false);
    window.open(whatsAppHref(text), "_blank", "noopener,noreferrer");
  }

  function onEmail(form: HTMLFormElement | null) {
    if (!form) return;
    const { text, valid } = build(form);
    if (!valid) return setError(true);
    setError(false);
    window.location.href = `${mailHref}?subject=${encodeURIComponent(common("quoteSubject"))}&body=${encodeURIComponent(text)}`;
  }

  const label = "mb-2 block text-sm font-semibold text-ink-900";
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" id="quote-form" data-locale={locale}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={label}>{c.fields.name} *</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className={label}>{c.fields.phone} *</span>
          <input name="phone" type="tel" required inputMode="tel" autoComplete="tel" dir="ltr" className={`${field} rtl:text-end`} />
        </label>
        <label className="block">
          <span className={label}>{c.fields.email}</span>
          <input name="email" type="email" autoComplete="email" dir="ltr" className={`${field} rtl:text-end`} />
        </label>
        <label className="block">
          <span className={label}>{c.fields.location}</span>
          <input name="location" autoComplete="address-level2" className={field} />
        </label>
      </div>

      <label className="block">
        <span className={label}>{c.fields.service}</span>
        <select ref={serviceRef} name="service" defaultValue={defaultService} className={field}>
          <option value="">{c.fields.select}</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
          <option value="other">{c.fields.other}</option>
        </select>
      </label>

      <label className="block">
        <span className={label}>{c.fields.message} *</span>
        <textarea name="message" rows={5} required placeholder={c.fields.messagePlaceholder} className={`${field} resize-y`} />
      </label>

      {error && (
        <p role="alert" className="border-s-4 border-crimson-700 bg-crimson-50 px-4 py-3 text-sm font-medium text-crimson-800">
          {t("required")}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary">
          <WhatsAppIcon className="h-[18px] w-[18px]" />
          {t("sendWhatsapp")}
        </button>
        <button type="button" onClick={(e) => onEmail(e.currentTarget.form)} className="btn btn-outline">
          <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
          {t("sendEmail")}
        </button>
      </div>
      <p className="text-sm text-ink-500">{t("privacyNote")}</p>
    </form>
  );
}
