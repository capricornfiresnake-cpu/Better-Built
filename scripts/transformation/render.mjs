/**
 * Renders the transformation composition to MP4 and WebM.
 *
 *   node scripts/transformation/render.mjs
 *
 * Drives the same `seek(t)` the preview page uses, one frame at a time, in a
 * headless browser at 1920x1080. Because the composition is a pure function of
 * time, stepping it produces exactly what the preview shows — there is no
 * real-time playback to drop frames, and no second implementation to drift.
 *
 * Puppeteer is already a devDependency (it shoots the portfolio covers) and
 * ffmpeg does the encoding, so this adds nothing to the project.
 */
import { execFileSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../..");
const OUT_DIR = join(ROOT, "public/videos/services");
const FRAME_DIR = join(HERE, ".frames");

const WIDTH = 1920;
const HEIGHT = 1080;
const FPS = 30;
const SECONDS = 5;
const FRAMES = FPS * SECONDS;

const NAME = "custom-website-transformation";

function ffmpeg(args) {
  execFileSync("ffmpeg", ["-y", "-v", "error", ...args], { stdio: "inherit" });
}

async function main() {
  for (const file of ["old.jpg", "new.jpg"]) {
    if (!existsSync(join(ROOT, file))) {
      throw new Error(`Missing source image: ${file}. Both are required and neither is generated.`);
    }
  }

  await rm(FRAME_DIR, { recursive: true, force: true });
  await mkdir(FRAME_DIR, { recursive: true });
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--force-device-scale-factor=1", "--hide-scrollbars", "--disable-lcd-text"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(join(HERE, "preview.html")).href, {
      waitUntil: "networkidle0",
    });
    await page.waitForFunction("window.__ready === true");

    // Stop the preview's own playback before stepping frames by hand.
    await page.evaluate(() => window.__pause());

    // Strip the preview chrome and seat the composition at the origin, so the
    // viewport and the composition are the same 1920x1080 rectangle.
    await page.addStyleTag({
      content: `
        body { margin: 0 !important; padding: 0 !important; background: #08090b !important; gap: 0 !important; }
        #shell > *:not(#frame) { display: none !important; }
        #frame { position: fixed !important; inset: 0 !important; width: ${WIDTH}px !important;
                 height: ${HEIGHT}px !important; border: 0 !important; border-radius: 0 !important; }
        #frame .bb-stage { transform: none !important; }
      `,
    });

    // Both screenshots decoded before the first capture, or frame 0 is empty.
    await page.waitForFunction(
      "Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0)",
    );

    process.stdout.write(`rendering ${FRAMES} frames `);
    for (let i = 0; i < FRAMES; i++) {
      await page.evaluate((t) => window.__seek(t), i / (FRAMES - 1));
      await page.screenshot({
        path: join(FRAME_DIR, `f${String(i).padStart(4, "0")}.png`),
        clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
        optimizeForSpeed: true,
      });
      if (i % 15 === 0) process.stdout.write(".");
    }
    process.stdout.write(" done\n");
  } finally {
    await browser.close();
  }

  const pattern = join(FRAME_DIR, "f%04d.png");

  console.log("encoding mp4 …");
  ffmpeg([
    "-framerate", String(FPS), "-i", pattern,
    "-c:v", "libx264", "-preset", "slow", "-crf", "18",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
    join(OUT_DIR, `${NAME}.mp4`),
  ]);

  console.log("encoding webm …");
  ffmpeg([
    "-framerate", String(FPS), "-i", pattern,
    "-c:v", "libvpx-vp9", "-crf", "38", "-b:v", "0",
    "-row-mt", "1", "-deadline", "good", "-cpu-used", "2",
    "-auto-alt-ref", "1", "-lag-in-frames", "25", "-an",
    join(OUT_DIR, `${NAME}.webm`),
  ]);

  console.log("poster …");
  ffmpeg([
    "-i", join(FRAME_DIR, `f${String(FRAMES - 1).padStart(4, "0")}.png`),
    "-vf", "scale=960:-2", "-c:v", "libwebp", "-quality", "82",
    join(OUT_DIR, `${NAME}.webp`),
  ]);

  await writeFile(join(FRAME_DIR, ".gitignore"), "*\n");
  console.log(`\nwrote ${OUT_DIR}`);
}

main().catch((error) => {
  console.error("\nrender failed:", error.message);
  process.exitCode = 1;
});
