/**
 * Tiny static server for inspecting the preview in a browser.
 * The renderer does not need this — it loads the page over file://.
 *
 *   node scripts/transformation/serve.mjs   →  http://localhost:4321/scripts/transformation/preview.html
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(import.meta.url), "../../..");
const PORT = 4321;

const TYPES = {
  ".html": "text/html", ".js": "text/javascript", ".json": "application/json",
  ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".mp4": "video/mp4",
};

createServer(async (req, res) => {
  const rel = normalize(decodeURIComponent(req.url.split("?")[0])).replace(/^[/]+/, "");
  const file = join(ROOT, rel);
  if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream", "cache-control": "no-store" });
    res.end(body);
  } catch {
    res.writeHead(404).end("not found");
  }
}).listen(PORT, () => console.log(`serving ${ROOT} on http://localhost:${PORT}`));
