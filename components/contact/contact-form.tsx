"use client";

import { useLocale, useMessages, useTranslations } from "next-intl";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Mail, WhatsAppIcon } from "@/components/ui/icons";
import { whatsAppHref } from "@/config/company";

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

/** Emails the request through /api/contact (Resend). WhatsApp stays as the second way to send. */
export default function ContactForm({ services, defaultService = "" }: Props) {
  const locale = useLocale();
  const t = useTranslations("contactPage");
  const c = useMessages().contactPage as unknown as ContactCopy;
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<"required" | "invalidEmail" | "failed" | null>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);

  // Arriving with ?service=slug pre-selects it.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    if (slug && serviceRef.current && services.some((s) => s.slug === slug)) serviceRef.current.value = slug;
  }, [services]);

  function read(form: HTMLFormElement) {
    const d = new FormData(form);
    const get = (k: string) => String(d.get(k) ?? "").trim();
    const service = services.find((s) => s.slug === get("service"));
    return {
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      service: service?.name ?? c.fields.other,
      location: get("location"),
      message: get("message"),
      company_website: get("company_website"),
      locale,
    };
  }

  const complete = (data: ReturnType<typeof read>) => Boolean(data.name && data.phone && data.message);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = read(form);
    if (!complete(data)) return setError("required");
    setError(null);
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        setStatus("idle");
        return setError(result.code === "invalid-email" ? "invalidEmail" : "failed");
      }
      form.reset();
      setStatus("sent");
      (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.("event", "generate_lead", { page_path: location.pathname });
    } catch {
      setStatus("idle");
      setError("failed");
    }
  }

  function onWhatsApp(form: HTMLFormElement | null) {
    if (!form) return;
    const data = read(form);
    if (!complete(data)) return setError("required");
    setError(null);
    const lines = [
      t("waGreeting"),
      "",
      `${c.labels.name}: ${data.name}`,
      `${c.labels.phone}: ${data.phone}`,
      data.email ? `Email: ${data.email}` : null,
      `${c.labels.service}: ${data.service}`,
      data.location ? `${c.labels.location}: ${data.location}` : null,
      "",
      `${c.labels.details}:`,
      data.message,
    ].filter((l): l is string => l !== null);
    window.open(whatsAppHref(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  const label = "mb-2 block text-sm font-semibold text-ink-900";
  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5 overflow-hidden" id="quote-form" data-locale={locale}>
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

      {/* Honeypot: hidden from people, filled by bots. */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0" />

      {error && (
        <p role="alert" className="border-s-4 border-crimson-700 bg-crimson-50 px-4 py-3 text-sm font-medium text-crimson-800">
          {t(error)}
        </p>
      )}
      {status === "sent" && (
        <p role="status" className="border-s-4 border-emerald-600 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          {t("success")}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
          <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
          {status === "sending" ? t("sending") : t("sendMessage")}
        </button>
        <button type="button" onClick={(e) => onWhatsApp(e.currentTarget.form)} className="btn btn-outline">
          <WhatsAppIcon className="h-[18px] w-[18px]" />
          {t("sendWhatsapp")}
        </button>
      </div>
      <p className="text-sm text-ink-500">{t("privacyNote")}</p>
    </form>
  );
}
