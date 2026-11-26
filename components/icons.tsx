import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BrickWall,
  Building2,
  Check,
  Clock,
  Construction,
  Factory,
  Flame,
  Tractor,
  FileText,
  Gem,
  Handshake,
  HardHat,
  House,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PaintRoller,
  Phone,
  Plus,
  Route,
  ShieldCheck,
  Target,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

export {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  FileText,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  X,
};

const map: Record<string, LucideIcon> = {
  badge: BadgeCheck,
  file: FileText,
  hardhat: HardHat,
  message: MessageCircle,
  gem: Gem,
  clock: Clock,
  shield: ShieldCheck,
  users: Users,
  target: Target,
  handshake: Handshake,
  home: House,
  building: Building2,
  factory: Factory,
  paint: PaintRoller,
  renovate: BrickWall,
  zap: Zap,
  steel: Construction,
  road: Route,
  scaffold: Construction,
  welder: Flame,
  tractor: Tractor,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = map[name] ?? Building2;
  return <Cmp className={className} aria-hidden="true" strokeWidth={1.75} />;
}

/** Arrow that points "forward" in the reading direction (flips automatically in RTL). */
export function ForwardArrow({ className }: { className?: string }) {
  return <ArrowRight className={`rtl:-scale-x-100 ${className ?? ""}`} aria-hidden="true" />;
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.49-.22-.36a9.44 9.44 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.9.99 6.69 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.47-9.47 9.47zM20.52 3.45A11.38 11.38 0 0 0 12.05 0C5.77 0 .66 5.1.66 11.38c0 2 .52 3.96 1.52 5.69L.55 23.45l6.2-1.63a11.37 11.37 0 0 0 5.3 1.35h.01c6.28 0 11.39-5.1 11.39-11.38 0-3.04-1.18-5.9-3.33-8.04z" />
    </svg>
  );
}
