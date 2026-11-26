# Saad Jamal Contracting — saadjamal.sa

Website of **مؤسسة سعد جمال الاسمري للمقاولات** (Saad Jamal Al-Asmari Contracting Establishment), CR 7055602549.

Bilingual (Arabic default, English at `/en`), fully static (plain HTML — hosts anywhere), built with Next.js 16, React 19, Tailwind CSS 4 and TypeScript 7.

## Pages

| Arabic URL | English URL | Purpose |
| --- | --- | --- |
| `/` | `/en` | Home: hero, trust strip, about, services, process, why us, who we serve, FAQ, CTA |
| `/about` | `/en/about` | Story, mission & vision, values, CR registration details |
| `/services` | `/en/services` | The 4 services |
| `/services/<slug>` | `/en/services/<slug>` | One page per service (own SEO title, FAQ, schema) |
| `/contact` | `/en/contact` | Contact details + quotation form (opens WhatsApp / email) |
| `/privacy-policy` | `/en/privacy-policy` | Privacy policy (not in sitemap, `noindex`) |

No city pages, no blog, no CMS — by design.

## Run it

```bash
pnpm install        # once
pnpm dev            # http://localhost:3000
pnpm build          # writes the finished site to ./out
```

## Before launch

1. Confirm `info@saadjamal.sa` exists and receives mail, and the opening hours in `config/company.ts`.
2. Confirm the scaffolding systems and trades described in `content/` are really offered.
3. Replace illustrative pictures with your own site photos when you have them (see `IMAGE_PROMPTS.md`).

## Where things live

Same organisation as gulforbit.sa; see `CLAUDE.md`.

| To change… | Edit |
| --- | --- |
| Company name, CR, phone, email, address, hours | `config/company.ts` |
| Page text, titles and meta descriptions | `messages/ar.json` and `messages/en.json` |
| Services, service-page content, trades | `content/` |
| Pages | `app/[locale]/` |
| Headers and redirects | `config/site-routing.mjs` |
| Colours and styles | `app/globals.css` (`@theme`) |
| Images | `IMAGE_PROMPTS.md` + `pnpm images:optimize` |

## Contact form email (Resend, as on gulforbit.sa)

The form posts to `/api/contact`, handled by `worker/index.ts` → `server/api/contact.ts` → `lib/email.ts`.
It emails the enquiry to `info@saadjamal.sa` (and a short acknowledgement to the visitor, if they gave an email).

Setup once:

1. In [resend.com](https://resend.com), add the domain `saadjamal.sa` and create the DNS records it shows.
2. Create an API key, then store it as a secret (never in a file that is committed):
   ```bash
   npx wrangler secret put RESEND_API_KEY
   ```
3. Make sure the `info@saadjamal.sa` mailbox exists.

Test locally: copy `.dev.vars.example` to `.dev.vars`, add the key, then `pnpm build && pnpm start`.
(`pnpm dev` does not run the Worker, so sending fails there.)

## Deploy

`pnpm build && npx wrangler deploy` (Cloudflare Worker + static files, see `wrangler.toml`).

The email form **needs Cloudflare**. On cPanel / Apache the pages work but only the WhatsApp button can send.

## SEO system (same method as gulforbit.sa)

| Command | What it does |
| --- | --- |
| `pnpm seo:dates` | Page dates from git history → sitemap `lastmod`, schema `dateModified`, "Updated" line. Run after editing content. |
| `pnpm build` | Static export + responsive WebP images |
| `pnpm seo:crawl` | Release gate: canonical, hreflang, one H1, title ≤ 60, description 120–155, JSON-LD, banned claims. Do not deploy if it fails. |
| `pnpm seo:indexnow` | After deploying, tells Bing (and through it Copilot/ChatGPT search) about the pages |

- **Claims:** `scripts/banned-claims.mjs` lists wording that must not appear until documents prove it (including the brochure lines "exclusive sponsorship", "Contractors Authority" and "certified scaffolders").
- **Analytics:** set `NEXT_PUBLIC_GA_ID` at build time to enable Google Analytics 4 with call / WhatsApp / email / quote click events.
- **Entity data:** Organization + Dammam office + WebSite schema on home, about and contact; other pages reference it by `@id`.

## After launch (SEO checklist)

1. Add the site to **Google Search Console** and **Bing Webmaster Tools**; submit `https://www.saadjamal.sa/sitemap.xml`.
   Verification codes go in the host's environment variables: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`.
2. Create a **Google Business Profile** (same name, phone and address as `config/company.ts`) — this matters more for local search than anything on the site.
3. Put the website link on every social profile, then add the profile URLs to `COMPANY.social`.
4. Replace the illustrative pictures with real project photos as soon as you have them.
5. Check the share preview: send the link on WhatsApp — it should show the dark card with the logo.

## What the site deliberately does *not* claim

The CR was issued on 19 Nov 2026, so the site sells method and commitments (written scope, supervision, inspection before handover) — **not** years of experience, project counts, named clients, ISO or contractor-grade certifications. Add those only once they are real and documented.
