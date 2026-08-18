# Better Built

Marketing site for Better Built — a web design studio.
**Better Websites. Better Business.**

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4. No animation
library and no UI kit. The only images are screenshots of live client sites.

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`npm run lint` runs ESLint. The production build must pass before deploying.

---

## Deploying to Vercel

1. Push the repo to GitHub.
2. Import it in Vercel — the framework preset is detected automatically, no
   build configuration needed.
3. Set the production domain, then update `site.url` in `lib/site.ts` to match.
   Canonical URLs, Open Graph tags, `sitemap.xml`, and `robots.txt` all read
   from that one value.

There are no environment variables to set.

---

## Where things live

```
app/                 Routes, metadata, sitemap, robots, OG image, lead API
components/
  layout/            Header, mobile menu, footer, wordmark, page header
  ui/                Button, Section, Container, Eyebrow, CropMarks, Reveal
  mockups/           Browser and phone chrome, preview scaler
  previews/          The miniature websites (one file per project)
  work/              Project card, cover renderer
  forms/             Contact form
  home/              Hero showcase, process timeline
sections/            Composable page sections (Hero, Pricing, Process, …)
data/                Projects, services, process, pricing, FAQ copy
lib/                 Site config, SEO helpers, utilities
scripts/             capture-covers.mjs — screenshots live client sites
public/work/         Generated cover screenshots (committed)
```

### Editing content

Almost everything a non-developer would want to change lives in `data/` and
`lib/site.ts`:

| Change | File |
| --- | --- |
| Contact email, domain, navigation, social links | `lib/site.ts` |
| Portfolio projects | `data/projects.ts` |
| Services and process steps | `data/services.ts` |
| Prices, plans, form options | `data/pricing.ts` |
| FAQ | `data/services.ts` |

---

## The portfolio covers

A project cover comes from one of two places, decided in
`components/work/ProjectPreview.tsx`:

**Client work → a real screenshot of the live site.** Captured headlessly by
`npm run capture:covers`, which reads every project with a `liveUrl`, shoots the
homepage at 1400×800 and 390×720 at 2× device pixel ratio, and writes WebP files
into `public/work/`. Served through `next/image` with per-placement `sizes`.

```bash
npm run capture:covers
```

Re-run it whenever a client site is redesigned, and commit the updated files.

**Concept work → a miniature website rendered in code.** Its own type, palette
and layout, authored at a fixed design size and scaled to fit its frame by
`components/mockups/ScaledPreview.tsx`. There is no photography in these:
imagery is drawn with layered CSS gradients (`components/previews/kit.tsx`), so
no stock photo ever stands in for a business that does not exist.

Both kinds land on the same aspect ratio, so they sit together in one grid.

Live client work: **Wavelink Surf** (wavelinksurf.com) and
**The Shanty** (theshantylounge.com). Their covers, the big preview on their
case studies, and their domain in the meta row all link straight to the live
site in a new tab; the project name and "Case study →" go to the case study.

### Adding a real client project

1. Add the entry to `data/projects.ts` with `status: "client"`, a `liveUrl`, and
   a `cover` pointing at `/work/<slug>-desktop.webp` and `-mobile.webp`.
2. Run `npm run capture:covers` to generate those two files.
3. Set `featured: true` to surface it in the homepage hero rotation.

No component or page changes are needed. To add a *concept* project instead,
build `components/previews/<slug>.tsx` exporting `Desktop` and `Mobile`, register
the slug in `components/previews/registry.ts`, and omit `cover`.

**Honesty rules baked into the site.** Client work carries `status: "client"`
and a brass **Client** tag; everything else is labelled **Concept** and is
Better Built's own design study with a fictional business. That distinction is
stated on every card and in the Status column of every case study.

The site publishes **no testimonials or social proof at all** — no reviews, no
logo wall, no statistics, no years-in-business claims. That is deliberate while
the studio is new. If real, attributable client quotes exist later, build a
section for them then; do not fill the gap with anything invented.

---

## Connecting the lead form

`app/api/lead/route.ts` is the single integration point. It validates the
submission, drops honeypot traffic, and currently logs the lead. Replace the
"Deliver" step with a CRM call, transactional email, SMS alert, database
insert, or webhook. No component changes are needed.

---

## Design system

Tokens are defined once in `app/globals.css` under `@theme`.

- **Ink** `#0b0c0f` · **Paper** `#f7f7f5` · **Fog** neutral grays
- **Brass** `#c9a468` on dark, `#7a5c24` on light — the only accent, used sparingly
- **Archivo** (variable width axis) for display, **Instrument Sans** for body,
  **Azeret Mono** for labels, **Newsreader** inside previews that need an
  editorial voice
- Crop marks (`CropMarks`) are the recurring structural motif

### Standards the site is held to

- One `<h1>` per page; previews are exposed as labelled `role="img"` regions
  rather than polluting the document outline
- All text meets WCAG AA contrast (verified across every page)
- No horizontal overflow from 320px to 1920px
- Keyboard navigable with visible focus; the mobile menu traps focus and
  restores it on close
- `prefers-reduced-motion` disables every animation
