# Image prompts for ChatGPT — Saad Jamal Contracting

All the photos the website uses are listed here, **in one place**, each with a ready-to-paste ChatGPT prompt.
The photo placeholders were replaced on 25 November 2026 with photorealistic AI-generated images using the built-in image generation tool and the prompts below. The optimized JPGs and transparent hero WebP are installed in `public/images/` and used by both language versions of the website.

The service photos were refreshed with dedicated professional commercial compositions for scaffolders, welding, and manpower. There are six active website photos in total.

The exact prompts used, including aspect-ratio and realism guidance, are saved in `assets/image-generation.json`. The hero is a transparent scaffolding cutout in 4:5; the other images follow the formats below. Use the steps below when replacing or regenerating an image.

## How to use (3 steps)

1. Open ChatGPT (image generation), paste **one prompt** from below, and generate.
   Ask for the shape shown in the **Format** line (landscape / portrait) — ChatGPT's `1536×1024` (landscape) and `1024×1536` (portrait) sizes are perfect.
2. Download the picture and save it in `public/images/_incoming/` using the **File name** shown (any extension is fine: `.png`, `.jpg`, `.webp`).
   For the service photos, put them in `public/images/_incoming/services/`.
   Example: `public/images/_incoming/hero.png`
3. Run once:
   ```bash
   pnpm images:optimize
   ```
   This resizes and compresses the photos to JPG, preserves the hero transparency in WebP, replaces the website asset and deletes the incoming PNG. Then `pnpm build`.

> **Tip:** if ChatGPT draws text, logos or odd hands, just say *"regenerate — no text, no logos, natural hands"*.

## Style rules (already included in every prompt)

Professional commercial industrial photography · natural light · true-to-life colours (no glow, no HDR, no "AI shine") · Saudi/Gulf setting · workers wearing proper safety gear (hard hats, hi-vis vests, boots, gloves) · **no text, no logos, no watermarks, no recognisable real people**.

## Important — be honest with your clients

These pictures are **illustrations of the type of work** the company does. They must not be presented as finished projects of the company (the website words them as service images, not "our projects").
When you complete real projects, replace these with your own site photos using the same file names — real photos always convert better.

---

## 1. Home hero — `hero-scaffolding.webp`

- **Where it appears:** the home hero visual beside the headline, in both languages
- **Format:** portrait 4:5 (final 1200×1500), genuine transparent background
- **File name:** `hero-scaffolding.webp` (generate as PNG, then optimize to WebP)
- **Presentation:** complete scaffold tower, contained without cropping, floating over a subtle light crimson background

```
Use case: photorealistic-natural
Asset type: transparent-background cutout for the home hero of a professional Saudi scaffolding and manpower company website.
Primary request: a premium, completely photorealistic commercial product photograph of an assembled galvanized steel ringlock scaffold tower, isolated on a genuinely transparent background. Full structure visible from base plates to top guardrails with comfortable transparent margins on all sides; slightly low three-quarter view so the front and one side are visible. Portrait 4:5 composition. Compact three-bay-wide, two-bay-deep industrial scaffold, three working lifts. Straight vertical standards with realistic rosette nodes, level horizontal ledgers, coherent diagonal bracing, non-slip metal decks, top and intermediate guardrails, toe boards, integrated access stair bay, adjustable base jacks with square foot plates on individual timber sole pads. Mechanically coherent real construction equipment, not an abstract lattice. No building or wall behind it. The spaces between poles, rails and braces must also be truly transparent, not white filled. Crisp realistic silver zinc-coated steel with subtle natural wear and dark-grey decks, neutral soft daylight from the upper left, restrained contrast, fine material detail, believable proportions and perspective. Minimal soft contact shadow immediately under the base only, preserve transparency elsewhere. Entire scaffold is the sole subject, no people, no sky, no scenery, no floor plane, no text, no logos, no watermarks, no labels, no graphic frame, no checkerboard baked into pixels, no CGI/cartoon shine. Intended to float naturally over a white website hero background.
```

## 2. About — large photo — `about-1.jpg`

- **Where it appears:** home page "About us" section and the About page (tall photo)
- **Format:** portrait 4:5 (final 1200×1500)
- **File name:** `about-1.jpg`

```
Photorealistic documentary photograph of two construction professionals on a building site in Saudi Arabia: a site engineer in a white hard hat and hi-vis vest and an experienced foreman in a hard hat, both seen from the side or three-quarter back, reviewing printed construction drawings on a table beside a concrete building frame. Natural daylight, shallow depth of field with the unfinished building softly blurred behind them, sand-coloured ground, clear blue sky. Professional, trustworthy, calm mood. Portrait orientation, 50mm lens, true-to-life colours. No text, no logos, no watermark, faces not the focus.
```

## About page photo — `about-3.jpg`

- **Where it appears:** the story section of the About page
- **Format:** portrait 4:5 (final 1200×1500)
- **Current picture:** scaffold crew reviewing a checklist (generated by the owner, 26 Nov 2026)
- **File name:** `about-3.jpg`

```
Photorealistic documentary photograph of a scaffolding supervisor and two scaffolders in white helmets with chin straps, full body harnesses, gloves and hi-vis vests, standing beside a completed galvanized steel scaffold on a Saudi construction site, reviewing a checklist on a clipboard. Faces not the focus. Natural morning light, clear sky, true-to-life colours, portrait orientation, 50mm lens. No text, no logos, no watermark.
```

---

## 3. About — small photo — `about-2.jpg`

- **Where it appears:** small overlapping photo next to the big one in the home "About us" section
- **Format:** landscape 4:3 (final 900×675)
- **File name:** `about-2.jpg`

```
Photorealistic close-up photograph of a construction worker's gloved hands tying steel reinforcement bars (rebar) before a concrete pour, with a clean rebar grid in the foreground and softly blurred workers and formwork behind. Bright natural daylight, crisp detail, shallow depth of field, neutral true-to-life colours. Landscape orientation, 85mm lens. No text, no logos, no watermark, no recognisable face.
```

---

## Service photos (3)

All service photos: **landscape 3:2** (final 1200×800), saved in `public/images/_incoming/services/`.

### 4. General & specialized manpower — `services/manpower-supply.jpg`

```
Use case: photorealistic-natural
Asset type: professional commercial photograph for a Saudi industrial services company website.
Style: premium commissioned industrial photography, completely photorealistic, natural materials and textures, clean confident composition, subtle neutral color grading, true-to-life daylight, crisp subject detail, no HDR or artificial gloss. Single landscape photograph in 3:2 aspect ratio for 1200x800 display. Clear service subject readable at small card size; keep key subjects within central 75% for responsive crops. No collage, no graphic overlays, no text, no brand logos, no watermarks. No recognizable real people.
Scene: a professional site supervisor briefs a small team of five skilled construction workers at a clean Saudi industrial project staging area before their shift. All wear matching practical navy work uniforms, high visibility yellow vests, white or yellow hard hats, protective gloves and safety boots. Supervisor in three-quarter back view holds a plain clipboard, the team naturally arranged in a loose semicircle listens attentively; varied natural stances with hands relaxed, no handshake, no staged thumbs-up, no one looking at camera. Medium-wide eye-level 35mm composition, people are main subject from knees up with ample headroom, industrial facility and neatly stored materials softly blurred behind them. Bright soft morning daylight, natural skin texture, professional and approachable workforce staffing photograph. No diagrams or readable writing on clipboard, no ID cards or badges.
```

### 5. Scaffolders supply — `services/scaffolders-supply.jpg`

```
Use case: photorealistic-natural
Asset type: professional commercial photograph for a Saudi industrial services company website.
Style: premium commissioned industrial photography, completely photorealistic, natural materials and textures, clean confident composition, subtle neutral color grading, true-to-life daylight, crisp subject detail, no HDR or artificial gloss. Single landscape photograph in 3:2 aspect ratio for 1200x800 display. Clear service subject readable at small card size; keep key subjects within central 75% for responsive crops. No collage, no graphic overlays, no text, no brand logos, no watermarks. No recognizable real people.
Scene: an orderly Saudi industrial construction site. Two skilled scaffolders in navy work coveralls, fluorescent yellow safety vests, white safety helmets with chin straps, gloves and safety boots inspect the lower section of a substantial galvanized ringlock scaffolding installation around an industrial building. Main worker in three-quarter back view uses a scaffold ratchet on an accessible ground-level rosette connection; colleague checks the adjacent upright. Real ringlock rosette discs and horizontal ledgers, coherent diagonal bracing, square base plates on timber sole boards. Completed upper platforms have continuous decking, double guardrails and toe boards. Medium-wide eye-level view, 35mm lens, morning sidelight. Emphasize professional scaffolding craft and quality, not painting or plastering. Everyone standing on level ground; natural anatomy, realistic tool grip.
```

### 6. Welder supply — `services/welder-supply.jpg`

```
Use case: photorealistic-natural
Asset type: professional commercial photograph for a Saudi industrial services company website.
Style: premium commissioned industrial photography, completely photorealistic, natural materials and textures, clean confident composition, subtle neutral color grading, true-to-life daylight, crisp subject detail, no HDR or artificial gloss. Single landscape photograph in 3:2 aspect ratio for 1200x800 display. Clear service subject readable at small card size; keep key subjects within central 75% for responsive crops. No collage, no graphic overlays, no text, no brand logos, no watermarks. No recognizable real people.
Scene: skilled structural welder at a tidy steel fabrication workshop in Saudi Arabia. One worker in dark navy flame-resistant coveralls, full lowered welding helmet, leather gauntlet gloves and sturdy safety boots carefully MIG welds a short joint on a substantial rectangular steel fabrication secured with clamps to a sturdy workbench. Medium three-quarter side view with face fully obscured by helmet, 50mm lens. A small realistic white-blue arc at the precise gun contact point, restrained orange sparks. Proper welding torch with cable, neatly routed welding lead and visible earth clamp; solid metal joint with physically plausible geometry. Muted welding screen behind the workstation and steel stock racks softly out of focus. Soft daylight from high workshop windows mixed with warm practical light. Premium professional industrial craft photograph, welding is the clear main subject, no cranes or additional trades.
```

---

## Files that already exist (don't regenerate)

| File | What it is |
| --- | --- |
| `public/images/logo.png` / `logo.webp` | Your logo with a transparent background (built from your original) |
| `public/images/og-image.jpg` | The picture that appears when the site link is shared on WhatsApp / X / LinkedIn |
| `public/icons/*`, `app/favicon.ico` | Browser tab icon and phone home-screen icons |

If you ever change the logo, replace `assets/logo-source.webp` and run `pnpm images:brand`.

## Optional extras (not needed for launch)

When you have real photos later, these are good additions — tell me and I'll wire them in:

- **Completed projects gallery** (real photos only, with project type + city)
- **Team photo** for the About page
- **Short site video** for the hero (MP4, under 8 MB)


> **Note (25 Nov 2026):** the site now has 3 services (scaffolders, welders, manpower). The 4 photos that belonged to the earlier construction-only services (villas, commercial, finishing, MEP) are kept in `assets/unused-photos/` for a future gallery.
