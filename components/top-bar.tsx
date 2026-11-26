import { COMPANY, mailHref, telHref } from "@/config/company";
import { type Locale, tr } from "@/lib/i18n";
import { Clock, Mail, MapPin, Phone } from "@/components/icons";

/** Slim contact strip above the header (desktop only). Scrolls away; the header below stays sticky. */
export function TopBar({ locale }: { locale: Locale }) {
  return (
    <div className="hidden border-b border-ink-200 bg-stone-100 text-[0.8rem] text-ink-600 lg:block">
      <div className="container flex h-10 items-center justify-between gap-6">
        <ul className="flex items-center gap-6">
          <li className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-crimson-700" aria-hidden="true" />
            <span>{tr(COMPANY.address.display, locale)}</span>
          </li>
          <li className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-crimson-700" aria-hidden="true" />
            <span>{tr(COMPANY.hours.display, locale)}</span>
          </li>
        </ul>
        <ul className="flex items-center gap-6 font-semibold text-ink-800">
          <li>
            <a href={mailHref} className="flex items-center gap-2 transition-colors hover:text-crimson-700">
              <Mail className="h-3.5 w-3.5 text-crimson-700" aria-hidden="true" />
              {COMPANY.email}
            </a>
          </li>
          <li>
            <a href={telHref} dir="ltr" className="flex items-center gap-2 transition-colors hover:text-crimson-700">
              <Phone className="h-3.5 w-3.5 text-crimson-700" aria-hidden="true" />
              {COMPANY.phone}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
