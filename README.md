# Better Built

Marketing site for Better Built — a web design studio.
**Better Websites. Better Business.**

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4. No animation
library, no UI kit, no icon package — every SVG is drawn inline. The only
raster images are screenshots of live client sites.

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
  layout/            Header, mobile menu, footer, wordmark, page header,
                     page transition, prose
  ui/                Button, Section/Container/Eyebrow/Ticks/TechMeta,
                     Reveal, AnimatedText, Sheen, useInView
  visuals/           DigitalGrid + Glow, BuildSequence + BuildLadder +
                     TechReadout + useBuildPhases, MotionBackground
  mockups/           Browser and phone chrome, preview scaler
  previews/          The miniature websites (one file per concept project)
  work/              Project showcase, cover renderer, status tag
  services/          The six service diagrams
  forms/             Contact form
  home/              Hero showcase, process timeline
sections/            Composable page sections (Hero, SelectedWork, UnderTheHood,
                     Pricing, …)
data/                Projects, services, process, pricing, FAQ copy
lib/                 Site config, SEO helpers, utilities
scripts/             capture-covers.mjs — screenshots live client sites
docs/                HIGGSFIELD_PROMPTS.md — the generated-asset brief
public/work/         Generated cover screenshots (committed)
public/visuals/      Drop zone for generated motion assets (empty by default)
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

## Design system

The site is set up as a **drawing set**: a dark ground, warm chalk type,
hairline rules, and a single violet accent that belongs entirely to the
technical layer — grid lines, registration ticks, indices and active states are
all the same colour, so the "blueprint" and the "accent" are one system rather
than two decorations.

Tokens are defined once in `app/globals.css` under `@theme`.

**Colour**

| Token | Value | Use |
| --- | --- | --- |
| `void` | `#08090B` | page ground |
| `deck` | `#101216` | alternating section surface |
| `card` | `#15171C` | cards, frames |
| `line-soft` / `line` / `line-hard` | white at 5.5% / 10% / 20% | hairlines only |
| `chalk` | `#F2F0EA` | primary text |
| `slate` | `#9A9CA3` | secondary text |
| `dim` | `#85888F` | meta and labels |
| `figure` | `#6B6E77` | ghosted indices (large text only) |
| `accent` | `#6C63FF` | the technical layer |
| `accent-lift` | `#8B84FF` | accent at small text sizes |

Every one of these clears WCAG AA against every surface it is used on. The
accent is allowed to *glow* in exactly two places on the whole site: behind the
hero frame and behind the footer statement.

**Type**

One display family, used across two extreme widths — the system is that *the
larger the setting, the narrower the cut*, the way a real drawing title block
narrows as it scales up.

- **Archivo** (variable, `wdth` axis) — display. `wdth 76` at hero scale,
  widening to `100` at interface scale.
- **Instrument Sans** — body and UI.
- **Azeret Mono** — the technical layer: indices, statuses, dimensions, labels.
- **Newsreader** — reserved for portfolio previews with an editorial brand.
  Not part of the site's own voice.

Scale utilities: `display-mega`, `display-xl`, `display-lg`, `display-md`,
`display-sm`, `numeral`, `label-mono`, `label-mono-sm`, `lede`.

**Structural devices**

- `.sheet` draws the two vertical margin rules of a drawing sheet down a
  section. Suppressed below 640px where the gutter can't spare the pixels.
- `.ticks` adds registration marks at a module's corners.
- `DigitalGrid` is the masked blueprint field; `Glow` is the accent pool.

Numbering is only used where the content is genuinely sequential — the process
steps, the hero build ladder, the portfolio index. The six services are a *set*,
not a sequence, so they carry two-letter drawing references (`DS`, `MB`, `CV`,
`SE`, `LN`, `UP`) instead of being numbered `01–06`.

---

## Motion

No animation library. Everything is CSS transitions and keyframes, driven by one
shared `useInView` hook (`components/ui/useInView.ts`) so there is a single
IntersectionObserver implementation to reason about.

| Piece | What it does |
| --- | --- |
| `BuildSequence` | **The signature.** A browser frame that constructs itself over five stages — the drafting grid rules itself, components arrive as labelled outlines, they take on type and colour, a pointer tests the primary action, breakpoints are confirmed — then the wireframe dissolves into the real client site. ~3.5s, once. |
| `BuildLadder` / `TechReadout` | The stage words and the metadata panel either side of the frame. Both read the same clock as the sequence (`useBuildPhases`), so the stage number, component list, progress bar and breakpoint ticks are a genuine report of the animation rather than text printed beside it. There is no performance score anywhere on the site: a number nobody can verify is worth less than the page being quick in front of them. |
| Live frame | On a pointer device, hovering a portfolio preview runs the loading hairline once and sends a cursor toward the primary action, as though the page inside were live. Pure CSS, `(hover: hover)` only, off entirely under reduced motion. |
| `Reveal` | Scroll reveals in four modes: `fade`, `clip`, `settle` (96% → 100%, used on the previews), `rule` (a hairline drawing itself). |
| `AnimatedText` | Per-line masked headline reveal. Lines are authored explicitly because at display size the break is a composition decision. |
| `ProcessTimeline` | A rail that fills with scroll; each stage reports queued / active / complete. |
| `Sheen` | The only cursor effect on the site: a pool of accent light following the pointer across a preview. rAF-throttled, writes two CSS custom properties. |
| `PageTransition` | A 500ms rise-and-settle on the incoming route, keyed on pathname. No overlay, no loading state. |

`prefers-reduced-motion: reduce` switches all of it off in CSS — the design is
unchanged, only the movement stops. Nothing branches on it in JavaScript except
the three effects that would otherwise keep running a timer or a scroll handler.

### Generated visual assets

`components/visuals/MotionBackground.tsx` is the drop-in point for a generated
video or still. It renders nothing without a `src`, lazy-loads on approach,
skips the download entirely under reduced motion or Save-Data, and falls back
to its poster.

Four slots are already placed and inert: the hero, the `/work` page header,
Under The Hood, and the footer. `docs/HIGGSFIELD_PROMPTS.md` has the brief for
each — purpose, prompt, negative prompt, export settings and a size budget.
See also `public/visuals/README.md`.

---

## Under The Hood

`sections/UnderTheHood.tsx` is four disciplines against one interface diagram
that answers each of them: the type system highlights, component boundaries
surface, the layout genuinely reflows from 1440px to 390px, and the loading
strategy shows itself.

Every claim in that section is true of this page, which is the only reason to
make claims like that at all — a visitor can open dev tools and check. Nothing
is hidden behind the interaction either: all four lists stay on the page, and
the buttons only choose which view the diagram shows.

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

> The `.preview-scaler` / `.preview-canvas` rules in `globals.css` are load
> bearing. They clip the preview *and* stop a 1400px-wide miniature from setting
> the min-content width of the grid item it lives in.

Live client work: **Wavelink Surf** (wavelinksurf.com) and
**The Shanty** (theshantylounge.com). Their covers, the big preview on their
project pages, and their domain in the meta row all link straight to the live
site in a new tab; the project name and "See project →" go to the project page.

### Adding a real client project

1. Add the entry to `data/projects.ts` with `status: "client"`, a `liveUrl`, and
   a `cover` pointing at `/work/<slug>-desktop.webp` and `-mobile.webp`.
2. Run `npm run capture:covers` to generate those two files.
3. Set `featured: true` to surface it in the homepage hero rotation.

No component or page changes are needed. To add a *concept* project instead,
build `components/previews/<slug>.tsx` exporting `Desktop` and `Mobile`, register
the slug in `components/previews/registry.ts`, and omit `cover`.

**Honesty rules baked into the site.** Client work carries `status: "client"`
and a violet **Client** tag; everything else is labelled **Concept** and is
Better Built's own design study with a fictional business. That distinction is
stated on every showcase, in the Status column of every project page, and in a
note at the foot of `/work`.

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

## Standards the site is held to

Verified in-browser after the redesign, across `/`, `/work`, `/services`,
`/process`, `/pricing`, `/about`, `/contact` and the project pages:

- **No horizontal overflow** from 375px to 1920px (checked at 375, 390, 430,
  768, 1024, 1440, 1920).
- **WCAG AA contrast on every text node** — zero failures, measured against the
  actual composited background rather than assumed.
- One `<h1>` per page and no skipped heading levels; previews are exposed as
  labelled `role="img"` regions rather than polluting the document outline.
- Keyboard navigable with visible focus; the mobile menu traps focus, locks
  body scroll, closes on Escape, and restores focus on close.
- Every link and button carries an accessible name; external links declare
  `rel="noreferrer"` and announce that they open in a new tab.
- `prefers-reduced-motion` disables every animation.
- No animation or UI dependency: **zero** packages added, before or since. The
  build sequence, the readouts, the reflowing diagram and the live-frame hover
  are CSS transitions and one rAF clock.
- **No fabricated metrics anywhere.** No performance score, no client count, no
  years in business, no testimonials. The portfolio tags are derived from each
  project's real `scope`, so they cannot drift from what was delivered — which
  is why the concept studies carry one tag fewer than the launched ones.
