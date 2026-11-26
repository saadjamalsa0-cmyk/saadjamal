# Saad Jamal Contracting (saadjamal.sa)

Organised the same way as gulforbit.sa (`../gulf-orbit`).

## Layout
- `app/[locale]/` pages. Arabic is the default at `/`, English at `/en`. No trailing slashes.
- `i18n/`, `config/i18n.ts` next-intl routing. `messages/{ar,en}.json` all interface and page copy.
- `content/` services, service-page depth and trades (typed, bilingual).
- `config/company.ts` the only place for name, CR, phone, email, address, hours.
- `config/site-routing.mjs` headers and redirects.
- `components/` page blocks; `components/{home,about,services,contact,conversion,schema,ui}/`.
- `lib/seo/` URLs, hreflang, metadata, entity ids.
- `scripts/` export finishing, SEO crawl gate, banned claims, content dates, IndexNow, images.
- `docs/seo/business-goals.md` confirmed facts and open questions.

## Rules
- Publish only facts the owner can evidence. Banned wording lives in `scripts/banned-claims.mjs`.
- No review/rating schema, no invented clients, projects, headcounts or certifications.
- No city pages (owner decision).
- Every page: one H1, title ≤ 60, description 120–155, canonical + hreflang.

## Before releasing
`pnpm seo:dates` (if content changed) → `pnpm test` → `pnpm lint` → `pnpm build` → `pnpm seo:crawl`
