/** Safe JSON-LD serialising: `<` is escaped so data can never close the script tag. */
export function jsonLdScriptValue(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
