/**
 * Capture portfolio cover screenshots from live client sites.
 *
 *   node scripts/capture-covers.mjs
 *
 * Writes WebP screenshots into `public/work/`, sized to the same canvas the
 * rendered previews use so both kinds of cover share one aspect ratio.
 *
 * Re-run this whenever a client site is redesigned. Targets are read from
 * `data/projects.ts` — any project with a `liveUrl` gets captured.
 */

import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "work");

/** Must match PREVIEW_DESKTOP / PREVIEW_MOBILE in components/previews/registry.ts. */
const VIEWPORTS = {
  desktop: { width: 1400, height: 800 },
  mobile: { width: 390, height: 720 },
};

/** Screenshots are captured at 2x, so they stay sharp on retina displays. */
const SCALE = 2;

async function readTargets() {
  const source = await readFile(join(root, "data", "projects.ts"), "utf8");
  const targets = [];
  const blocks = source.split(/\n  \{\n/).slice(1);

  for (const block of blocks) {
    const slug = block.match(/slug: "([^"]+)"/)?.[1];
    const liveUrl = block.match(/liveUrl: "([^"]+)"/)?.[1];
    if (slug && liveUrl) targets.push({ slug, liveUrl });
  }

  return targets;
}

async function capture(page, { slug, liveUrl }, device) {
  const { width, height } = VIEWPORTS[device];

  await page.setViewport({ width, height, deviceScaleFactor: SCALE, isMobile: device === "mobile" });
  await page.goto(liveUrl, { waitUntil: "networkidle2", timeout: 60_000 });

  // Let lazy images decode, then give entrance animations time to settle.
  // Raced against a timeout: a single stalled image must not hang the capture.
  await page
    .evaluate(
      () =>
        Promise.race([
          Promise.all(
            Array.from(document.images)
              .filter((img) => !img.complete)
              .map((img) => new Promise((res) => { img.onload = img.onerror = res; })),
          ),
          new Promise((res) => setTimeout(res, 8000)),
        ]),
    )
    .catch(() => {});

  await new Promise((r) => setTimeout(r, 3000));

  const file = join(outDir, `${slug}-${device}.webp`);
  await page.screenshot({ path: file, type: "webp", quality: 86, captureBeyondViewport: false });

  const { size } = await stat(file);
  console.log(`  ${device.padEnd(7)} ${width}x${height}@${SCALE}x  ${(size / 1024).toFixed(0)} KB`);
  return { device, file, width, height };
}

async function main() {
  const targets = await readTargets();
  if (!targets.length) {
    console.log("No projects with a liveUrl. Nothing to capture.");
    return;
  }

  await mkdir(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    protocolTimeout: 120_000,
    args: ["--hide-scrollbars", "--force-color-profile=srgb", "--font-render-hinting=none"],
  });

  const manifest = {};

  try {
    for (const target of targets) {
      console.log(`\n${target.slug} — ${target.liveUrl}`);
      const page = await browser.newPage();
      await page.emulateMediaFeatures([
        // Freeze scroll-triggered animations so the capture is the settled state.
        { name: "prefers-reduced-motion", value: "reduce" },
      ]);

      for (const device of Object.keys(VIEWPORTS)) {
        await capture(page, target, device);
      }

      manifest[target.slug] = {
        desktop: `/work/${target.slug}-desktop.webp`,
        mobile: `/work/${target.slug}-mobile.webp`,
        capturedAt: new Date().toISOString().slice(0, 10),
      };

      await page.close();
    }
  } finally {
    await browser.close();
  }

  await writeFile(
    join(outDir, "covers.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
  console.log(`\nWrote ${Object.keys(manifest).length} cover set(s) to public/work/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
