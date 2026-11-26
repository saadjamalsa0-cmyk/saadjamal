import { jsonLdScriptValue } from "@/lib/json-ld";

export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScriptValue(data) }} />;
}
