// Writes lib/content-dates.json: when each page's content last changed, from git history.
// Feeds sitemap <lastmod>, WebPage dateModified and the visible "Updated" line.
// Files with uncommitted changes get today's date. Run before committing content changes.
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const SERVICES = ["content/services.ts", "content/service-details.ts", "content/trades.ts"];
const SECTIONS = {
  "/": ["content/site.ts", "components/sections.tsx"],
  "/about/": ["content/site.ts", "config/company.ts"],
  "/services/": ["content/services.ts"],
  "/contact/": ["content/site.ts", "config/company.ts"],
  "/services/scaffolders-supply/": SERVICES,
  "/services/welder-supply/": SERVICES,
  "/services/manpower-supply/": SERVICES,
  "/services/equipment-rental/": SERVICES,
};

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const today = new Date().toISOString().slice(0, 10);

const dates = {};
for (const [route, files] of Object.entries(SECTIONS)) {
  let date = today;
  try {
    const dirty = git("status", "--porcelain", "--", ...files);
    const committed = git("log", "-1", "--format=%cs", "--", ...files);
    if (!dirty && committed) date = committed;
  } catch {
    // not a git checkout: keep today
  }
  dates[route] = date;
}
writeFileSync("lib/content-dates.json", `${JSON.stringify(dates, null, 2)}\n`);
console.log(`Wrote lib/content-dates.json (${Object.keys(dates).length} pages)`);
