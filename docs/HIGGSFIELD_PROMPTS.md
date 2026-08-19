# Higgsfield prompts — Better Built

Five generated assets, each tied to a moment on the site that it genuinely
improves. **None of them exist yet, and the site is complete without every one
of them.** Each has a `<MotionBackground />` slot already in place; adding a
file and passing two props is the whole integration.

Before generating anything, read the two rules at the bottom of this file —
they are what keep these assets from turning the site into the kind of page it
is arguing against.

---

## House style — apply to every prompt

Paste this into every generation, and keep it identical across all five so the
set reads as one shoot:

> Dark near-black environment (#08090B). Warm off-white detail (#F2F0EA). A
> single restrained electric violet accent (#6C63FF) used sparingly as an
> interface indicator, never as ambient colour. Fine hairline technical
> geometry. Premium industrial-design product photography lighting: soft, low,
> directional. Slow deliberate camera. Shallow depth of field. Clean negative
> space. Editorial, architectural, precise.

**Universal negative prompt** — paste into every generation:

> people, hands, faces, robots, androids, cyberpunk, neon signage, Matrix
> falling code, green code rain, glitch effects, lens flares, bokeh particles,
> floating blobs, gradient mesh backgrounds, glassmorphism, 3D spheres,
> holograms, circuit boards, brains, glowing purple fog, chrome, sci-fi HUD,
> stock-photo business imagery, logos, readable brand names, text artefacts,
> gibberish lettering, watermarks, oversaturation, heavy vignette, shaky
> camera, fast cuts, zoom punches

---

## Asset 1 — Digital website construction

| | |
| --- | --- |
| **Purpose** | Ambient depth behind the hero's build sequence — the room the construction happens in, not the construction itself. |
| **Where** | `sections/Hero.tsx`, the `<MotionBackground />` already at the top of the section. |
| **Aspect ratio** | 16:9 |
| **Duration** | 6–8s, seamless loop |
| **Priority** | Highest. This is the one that changes first impressions. |

**Prompt**

> A dark studio void. Fine violet hairlines rule themselves across the space in
> sequence, forming an orthographic construction grid. Thin rectangular
> interface planes fade up in position one after another — a navigation bar, a
> large content plane, a media plane, three cards — floating in precise
> alignment, edge-lit, with soft shadow beneath. The camera drifts slowly
> forward and slightly right, parallax separating the planes. Everything stays
> geometric, aligned and calm. [HOUSE STYLE]

**Also avoid**: filled screens, visible websites, UI text, icons, dashboards,
charts, mockup devices.

**Integration**

```tsx
<MotionBackground
  src="/visuals/hero-motion.mp4"
  poster="/visuals/hero-poster.webp"
  opacity={0.3}
/>
```

Keep `opacity` at or below `0.35`. The build sequence in the frame is the
subject; this is the room behind it. If the two compete, lower the opacity
rather than changing the sequence.

**Export**: MP4 (H.264, yuv420p), 1920×1080, 24fps, CRF 26, no audio track.
Target **under 2 MB**. Poster: WebP, quality 80, 1600px wide, under 120 KB.

---

## Asset 2 — Website UI motion

| | |
| --- | --- |
| **Purpose** | A cinematic reminder, at the top of the portfolio, that the work is the point. |
| **Where** | `app/work/page.tsx`, the `<MotionBackground />` in the page header. |
| **Aspect ratio** | 16:9 (it sits behind a header, so the centre is what matters) |
| **Duration** | 5–7s, seamless loop |

**Prompt**

> Extreme slow macro dolly across a premium website interface rendered on a
> dark matte surface. The camera passes a thin navigation rule, large
> off-white display typography rendered as abstract type-blocks, a single soft
> violet action element, and the edge of an image card. Razor-sharp hairline
> borders. Shallow depth of field so only one element is in focus at a time.
> Continuous single take, no cuts. [HOUSE STYLE]

**Also avoid**: readable words, real letterforms, cursors, click effects,
browser chrome, phone or laptop hardware.

**Integration**

```tsx
<MotionBackground
  src="/visuals/work-motion.mp4"
  poster="/visuals/work-poster.webp"
  opacity={0.28}
  overlayClassName="bg-void/70"
/>
```

**Export**: MP4 (H.264), 1920×1080, 24fps, CRF 27. Target **under 1.8 MB**.

---

## Asset 3 — Digital blueprint

| | |
| --- | --- |
| **Purpose** | The wireframe-to-interface idea, behind the Under The Hood diagram. |
| **Where** | `sections/UnderTheHood.tsx` — add a `<MotionBackground />` as the first child of the `<Section>`. |
| **Aspect ratio** | 16:9 |
| **Duration** | 6–8s, seamless loop |

**Prompt**

> An architectural drawing sheet in a dark void. A fine violet measurement grid
> draws itself, then dashed wireframe rectangles are set out on it with small
> registration ticks at their corners. The dashed outlines resolve into solid
> edge-lit planes with soft off-white surfaces. Slow orthographic camera push,
> almost still. Drafting-table precision. [HOUSE STYLE]

**Also avoid**: blueprint blue, paper texture, pencils, rulers, drafting hands,
architectural buildings, floor plans.

**Export**: MP4 (H.264), 1600×900, 24fps, CRF 27. Target **under 1.5 MB**.

---

## Asset 4 — Responsive transformation

| | |
| --- | --- |
| **Purpose** | Supports the Mobile-First service. The CSS diagram already reflows honestly, so this is optional polish, not a replacement. |
| **Where** | `components/services/ServiceVisual.tsx`, the `mobile` visual — or as a poster only. |
| **Aspect ratio** | 16:11 to match the service panels |
| **Duration** | 4–6s, seamless loop |

**Prompt**

> One interface plane in a dark studio, lit from above. It smoothly narrows
> from a wide desktop proportion to a tablet proportion to a tall phone
> proportion, its internal rectangles reflowing from three columns to one as it
> narrows, then returning. Continuous, elegant, mechanical. Locked-off camera.
> [HOUSE STYLE]

**Also avoid**: physical devices, phone bezels, hands holding phones, app
icons, home screens.

**Export**: MP4 (H.264), 1280×880, 24fps, CRF 28. Target **under 1 MB**.
Given the size, a **poster-only** treatment is a reasonable call here.

---

## Asset 5 — Deploy / launch

| | |
| --- | --- |
| **Purpose** | The closing beat above the footer statement. Lowest priority — skip it if the set is already heavy. |
| **Where** | `components/layout/SiteFooter.tsx`, above the statement block. |
| **Aspect ratio** | 21:9 (it sits in a wide band) |
| **Duration** | 5–6s, seamless loop |

**Prompt**

> A single finished interface plane in a dark void, held in a dashed violet
> construction outline. The outline retracts and dissolves; the plane settles,
> gains a soft warm off-white glow from within, and a fine violet underline
> draws left to right beneath it. Slow, quiet, final. Locked-off camera. [HOUSE
> STYLE]

**Also avoid**: rockets, launch imagery, upward motion trails, confetti,
checkmarks, success badges.

**Export**: MP4 (H.264), 1920×820, 24fps, CRF 28. Target **under 1.2 MB**.

---

## Rule 1 — the site must not need any of this

Every slot renders nothing without a `src`, falls back to its poster if the
video fails, and is covered by a CSS composition that is the real design rather
than a placeholder. Delete the whole `public/visuals/` folder and the site
should be exactly as good. If an asset ever becomes load-bearing, that is a bug
in the integration, not a reason to keep the file.

## Rule 2 — the budget is 2 MB, total

This is a web design studio arguing that fast sites win work. Four assets at
1.5 MB each is a slow homepage, which loses the argument in the medium the
argument is being made in.

- Ship **one** video — Asset 1 — and use posters for the rest.
- Every slot is already lazy: nothing downloads until it is within 200px of the
  viewport, and nothing downloads at all under `prefers-reduced-motion` or
  Save-Data.
- Compress hard, then check the homepage on a throttled connection. If it feels
  slower than it does today, cut the asset. There is no version of this where
  the video is worth a worse first impression.

**Compression, for reference:**

```bash
ffmpeg -i in.mov -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -an -vf "scale=1920:-2,fps=24" out.mp4
```

```bash
ffmpeg -i in.mov -vf "select=eq(n\,0),scale=1600:-2" -frames:v 1 -c:v libwebp -quality 80 poster.webp
```
