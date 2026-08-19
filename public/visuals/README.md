# Generated visuals

This folder is the drop zone for generated motion assets (Higgsfield or
otherwise). **It is empty on purpose, and the site is complete without it.**

## Adding a hero motion asset

1. Put the files here:

   ```
   public/visuals/hero-motion.mp4     H.264, muted, seamless loop, ≤ 6s, ≤ 3 MB
   public/visuals/hero-poster.webp    first frame, 1920×1080 or smaller
   ```

2. Pass them to the `<MotionBackground />` already sitting at the top of
   `sections/Hero.tsx`:

   ```tsx
   <MotionBackground
     src="/visuals/hero-motion.mp4"
     poster="/visuals/hero-poster.webp"
     opacity={0.35}
   />
   ```

That is the whole integration. Nothing else changes.

## What the component guarantees

- **Nothing breaks without the file.** No `src` means it renders nothing at all
  and the CSS backdrop (grid, glow, build frame) carries the hero as designed.
  A missing or failed video falls back to the poster; a missing poster falls
  back to the layers behind it.
- **Lazy.** The video is only requested once the section is within 200px of the
  viewport, with `preload="none"`.
- **Respectful.** Under `prefers-reduced-motion: reduce` or `Save-Data`, the
  video is never downloaded — the poster holds.
- **Muted, looping, inline**, so it plays on iOS without going fullscreen.

## Keeping it fast

Keep the file small. A hero video that pushes the page past a couple of
megabytes costs more in bounce than it earns in polish, which is the opposite
of the argument this site is making. If the asset can't be kept small, the
better answer is a still `poster` on its own — pass `poster` with no `src`.

## Other slots

The same component can back any section. `components/visuals/DigitalGrid.tsx`
(the blueprint field and the accent glow) and
`components/visuals/BuildAnimation.tsx` (the frame that assembles itself) are
pure CSS and need no assets.
