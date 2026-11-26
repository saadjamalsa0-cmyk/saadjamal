import { cn } from "@/lib/utils";

/**
 * Decorative double-arc taken from the logo's elliptical swoosh (light-theme version).
 * Purely visual: aria-hidden, pointer-events none.
 */
export function Swoosh({ className, tone = "light" }: { className?: string; tone?: "light" | "crimson" }) {
  const a = tone === "crimson" ? "rgba(255,255,255,0.20)" : "rgba(143,15,44,0.10)";
  const b = tone === "crimson" ? "rgba(255,255,255,0.14)" : "rgba(10,10,12,0.10)";
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none absolute rtl:-scale-x-100", className)}
    >
      <path d="M60 470C150 250 430 70 690 95c110 12 110 150 35 270" stroke={a} strokeWidth="26" strokeLinecap="round" />
      <path d="M720 140C760 330 600 500 330 540 210 558 110 530 80 470" stroke={b} strokeWidth="2" />
      <path d="M690 95C470 90 200 270 60 470" stroke={b} strokeWidth="2" />
    </svg>
  );
}
