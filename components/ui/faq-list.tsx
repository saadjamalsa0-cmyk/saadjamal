import { Plus } from "@/components/ui/icons";

/** Native <details> accordion: works without JavaScript and is crawlable. */
export default function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.q} className="faq group border border-ink-200 bg-white transition-colors">
          <summary className="flex items-center justify-between gap-6 px-5 py-5 text-start text-ink-950 sm:px-6">
            <h3 className="text-base font-bold leading-snug md:text-lg">{item.q}</h3>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-crimson-50 text-crimson-700 transition-colors group-open:bg-crimson-700 group-open:text-white">
              <Plus className="faq-icon h-4 w-4 transition-transform duration-200" aria-hidden="true" />
            </span>
          </summary>
          <p className="px-5 pb-6 leading-relaxed text-ink-600 sm:px-6">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
