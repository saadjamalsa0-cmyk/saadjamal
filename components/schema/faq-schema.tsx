import JsonLd from "./json-ld";

/** Only use where the same questions are visible on the page. */
export default function FaqSchema({ questions }: { questions: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
      }}
    />
  );
}
