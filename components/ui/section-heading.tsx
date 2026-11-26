import { cn } from "@/lib/utils";

/** Eyebrow + title + optional text: the one heading pattern used by every section. */
export default function SectionHeading({ eyebrow, title, text, center, className }: { eyebrow: string; title: string; text?: string; center?: boolean; className?: string }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title mt-4">{title}</h2>
      {text && <p className="mt-5 text-lg leading-relaxed text-ink-600">{text}</p>}
    </div>
  );
}
