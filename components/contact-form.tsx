"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { mailHref, whatsAppHref } from "@/config/company";
import { services } from "@/content/services";
import { contactPage as c } from "@/content/site";
import { type Locale, tr } from "@/lib/i18n";
import { WhatsAppIcon, Mail } from "@/components/icons";

const field =
  "w-full border border-ink-200 bg-white px-4 py-3.5 text-ink-900 placeholder:text-ink-400 transition-colors focus:border-crimson-700 focus:outline-none focus:ring-2 focus:ring-crimson-700/20";

/**
 * Static-site friendly contact form: no server needed.
 * On submit it builds a ready-to-send message and opens WhatsApp (or the email app).
 */
export function ContactForm({ locale, defaultService = "" }: { locale: Locale; defaultService?: string }) {
  const [error, setError] = useState(false);
  const serviceRef = useRef<HTMLSelectElement>(null);

  // Arriving from a service page (?service=slug): pre-select it.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    if (slug && serviceRef.current && services.some((s) => s.slug === slug)) serviceRef.current.value = slug;
  }, []);

  function build(form: HTMLFormElement) {
    const d = new FormData(form);
    const get = (k: string) => String(d.get(k) ?? "").trim();
    const serviceSlug = get("service");
    const serviceName = services.find((s) => s.slug === serviceSlug);
    const lines = [
      tr(c.waGreeting, locale),
      "",
      `${tr(c.labels.name, locale)}: ${get("name")}`,
      `${tr(c.labels.phone, locale)}: ${get("phone")}`,
      get("email") ? `Email: ${get("email")}` : null,
      `${tr(c.labels.service, locale)}: ${serviceName ? tr(serviceName.name, locale) : tr(c.fields.other, locale)}`,
      get("location") ? `${tr(c.labels.location, locale)}: ${get("location")}` : null,
      "",
      `${tr(c.labels.details, locale)}:`,
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
    const subject = encodeURIComponent(tr({ ar: "طلب عرض سعر", en: "Quotation request" }, locale));
    window.location.href = `${mailHref}?subject=${subject}&body=${encodeURIComponent(text)}`;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" id="quote-form">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-900">{tr(c.fields.name, locale)} *</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-900">{tr(c.fields.phone, locale)} *</span>
          <input name="phone" type="tel" required inputMode="tel" autoComplete="tel" dir="ltr" className={`${field} rtl:text-end`} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-900">{tr(c.fields.email, locale)}</span>
          <input name="email" type="email" autoComplete="email" dir="ltr" className={`${field} rtl:text-end`} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-900">{tr(c.fields.location, locale)}</span>
          <input name="location" autoComplete="address-level2" className={field} />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-ink-900">{tr(c.fields.service, locale)}</span>
        <select ref={serviceRef} name="service" defaultValue={defaultService} className={field}>
          <option value="">{tr(c.fields.select, locale)}</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {tr(s.name, locale)}
            </option>
          ))}
          <option value="other">{tr(c.fields.other, locale)}</option>
        </select>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-ink-900">{tr(c.fields.message, locale)} *</span>
        <textarea name="message" rows={5} required placeholder={tr(c.fields.messagePlaceholder, locale)} className={`${field} resize-y`} />
      </label>

      {error && (
        <p role="alert" className="border-s-4 border-crimson-700 bg-crimson-50 px-4 py-3 text-sm font-medium text-crimson-800">
          {tr(c.required, locale)}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary">
          <WhatsAppIcon className="h-[18px] w-[18px]" />
          {tr(c.sendWhatsapp, locale)}
        </button>
        <button type="button" onClick={(e) => onEmail(e.currentTarget.form)} className="btn btn-outline">
          <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
          {tr(c.sendEmail, locale)}
        </button>
      </div>
      <p className="text-sm text-ink-500">{tr(c.privacyNote, locale)}</p>
    </form>
  );
}
