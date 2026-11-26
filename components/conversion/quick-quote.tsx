import { useLocale, useTranslations } from "next-intl";
import ContactForm from "@/components/contact/contact-form";
import { Clock, Mail, MapPin, Phone } from "@/components/ui/icons";
import { COMPANY, mailHref, telHref } from "@/config/company";
import type { Locale } from "@/config/i18n";
import { services } from "@/content/services";
import { tr } from "@/lib/i18n";

/** Quote form at the foot of the home and service pages: contact details beside the form. */
export default function QuickQuote({ service }: { service?: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const row = "flex items-start gap-4";
  const tile = "flex h-11 w-11 shrink-0 items-center justify-center bg-white text-crimson-700 shadow-sm";
  return (
    <section id="quote" className="scroll-mt-20 border-t border-ink-200 bg-white py-24 md:py-28">
      <div className="container">
        <div className="grid border border-ink-200 shadow-lift lg:grid-cols-12">
          <div className="bg-stone-100 p-8 md:p-12 lg:col-span-5">
            <span className="eyebrow">{t("ui.requestQuote")}</span>
            <h2 className="section-title mt-4">{t("cta.title")}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">{t("contactPage.formText")}</p>
            <ul className="mt-10 space-y-5 font-bold text-ink-950">
              <li className={row}>
                <span className={tile}>
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <a href={telHref} dir="ltr" className="self-center hover:text-crimson-700">
                  {COMPANY.phone}
                </a>
              </li>
              <li className={row}>
                <span className={tile}>
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <a href={mailHref} className="self-center break-all hover:text-crimson-700">
                  {COMPANY.email}
                </a>
              </li>
              <li className={row}>
                <span className={tile}>
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="self-center">{COMPANY.hours.display[locale]}</span>
              </li>
              <li className={row}>
                <span className={tile}>
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="self-center">{COMPANY.address.display[locale]}</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-8 md:p-12 lg:col-span-7">
            <ContactForm defaultService={service} services={services.map((s) => ({ slug: s.slug, name: tr(s.name, locale) }))} />
          </div>
        </div>
      </div>
    </section>
  );
}
