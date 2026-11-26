import { COMPANY } from "@/config/company";
import dates from "./content-dates.json";

/** Date a page's content last changed (written by `pnpm seo:dates` from git history). */
export function contentDate(path = ""): string {
  return (dates as Record<string, string>)[path] ?? COMPANY.crIssueDate;
}
