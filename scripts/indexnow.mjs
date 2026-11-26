/**
 * Push URLs to IndexNow (Bing, Yandex, Seznam, Naver; Bing's index feeds
 * Copilot and ChatGPT search).
 *
 *   node scripts/indexnow.mjs                          # everything in the live sitemap
 *   node scripts/indexnow.mjs /en/services/x /services/x
 *
 * Setup once:
 *   1. Generate a key: node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
 *   2. Save it as public/<key>.txt containing only the key, and deploy.
 *   3. Put the key and host below (or in env).
 *
 * The key file must be live before a submission validates. This script
 * checks it first, because the 403 you get otherwise is easy to misread.
 */

const HOST = process.env.INDEXNOW_HOST || "www.saadjamal.sa";
const KEY = process.env.INDEXNOW_KEY || "8326f362bedb8c1e90d824eaf2d9b4c2";
const ORIGIN = `https://${HOST}`;
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function urlsFromSitemap() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

function normalise(arg) {
  if (arg.startsWith("http")) return arg;
  return ORIGIN + (arg.startsWith("/") ? arg : `/${arg}`);
}

async function main() {
  const args = process.argv.slice(2);
  const urlList = args.length ? args.map(normalise) : await urlsFromSitemap();

  const offHost = urlList.filter((u) => !u.startsWith(ORIGIN));
  if (offHost.length) {
    console.error(`Refusing to submit URLs outside ${ORIGIN}:\n  ${offHost.join("\n  ")}`);
    process.exit(1);
  }

  const keyRes = await fetch(KEY_LOCATION);
  const keyBody = keyRes.ok ? (await keyRes.text()).trim() : "";
  if (!keyRes.ok || keyBody !== KEY) {
    console.error(`Key file not serving correctly at ${KEY_LOCATION} (status ${keyRes.status}). Deploy it first.`);
    process.exit(1);
  }

  console.log(`Submitting ${urlList.length} URLs to IndexNow…`);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  // 200 = accepted, 202 = accepted, key validation pending.
  if (res.status === 200 || res.status === 202) {
    console.log(`OK (${res.status}): ${urlList.length} URLs accepted.`);
  } else {
    console.error(`Failed (${res.status}): ${(await res.text()) || "(no body)"}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
