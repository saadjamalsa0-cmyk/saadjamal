import { useLocale, useTranslations } from "next-intl";
import { Clock, Icon, Mail, MapPin, Phone, WhatsAppIcon } from "@/components/ui/icons";
import { COMPANY, mailHref, telHref, whatsAppHref } from "@/config/company";
import type { Locale } from "@/config/i18n";

export default function ContactCards() {
  const locale = useLocale() as Locale;
  const t = useTranslations("contactPage");
  const strong = "font-bold text-ink-950 hover:text-crimson-700";
  const cards = [
    {
      label: t("phone"),
      icon: <Phone className="h-6 w-6" aria-hidden="true" />,
      node: (
        <a href={telHref} dir="ltr" className={`${strong} rtl:block rtl:text-end`}>
          {COMPANY.phone}
        </a>
      ),
    },
    {
      label: t("whatsapp"),
      icon: <WhatsAppIcon className="h-6 w-6" />,
      node: (
        <a href={whatsAppHref()} target="_blank" rel="noopener noreferrer" dir="ltr" className={`${strong} rtl:block rtl:text-end`}>
          {COMPANY.phone}
        </a>
      ),
    },
    {
      label: t("email"),
      icon: <Mail className="h-6 w-6" aria-hidden="true" />,
      node: (
        <a href={mailHref} className={`${strong} break-all`}>
          {COMPANY.email}
        </a>
      ),
    },
    { label: t("hours"), icon: <Clock className="h-6 w-6" aria-hidden="true" />, node: <span className="font-bold text-ink-950">{COMPANY.hours.display[locale]}</span> },
    { label: t("address"), icon: <MapPin className="h-6 w-6" aria-hidden="true" />, node: <span className="font-bold text-ink-950">{COMPANY.address.display[locale]}</span> },
    {
      label: t("cr"),
      icon: <Icon name="badge" className="h-6 w-6" />,
      node: (
        <p dir="ltr" className="font-bold text-ink-950 rtl:text-end">
          {COMPANY.cr}
        </p>
      ),
    },
  ];
  return (
    <ul className="card mt-8 divide-y divide-ink-100">
      {cards.map((card) => (
        <li key={card.label} className="flex items-start gap-5 p-6">
          <span className="icon-tile icon-tile-sm">{card.icon}</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-ink-500">{card.label}</p>
            <div className="mt-1">{card.node}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
