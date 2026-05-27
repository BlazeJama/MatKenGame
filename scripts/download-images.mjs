/**
 * download-images.mjs
 *
 * Downloads all vehicle images from Wikimedia Commons into assets/images/,
 * then rewrites data/vehicles.js so every URL points to the local copy.
 *
 * Naming convention:  assets/images/{vehicleId}-{001|002|003}.jpg
 * (extension taken from the remote file; defaults to .jpg if ambiguous)
 *
 * Usage:
 *   node scripts/download-images.mjs
 *
 * Re-running is safe — files already on disk are skipped (unless you pass --force).
 */

import fs   from "fs";
import path from "path";
import https from "https";
import http  from "http";
import vm    from "vm";
import { fileURLToPath } from "url";

const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const ROOT       = path.resolve(__dirname, "..");
const VEHICLES_JS = path.join(ROOT, "data", "vehicles.js");
const IMG_DIR    = path.join(ROOT, "assets", "images");
const FORCE      = process.argv.includes("--force");

// ── 1. Load vehicles data ────────────────────────────────────────────────────

const src = fs.readFileSync(VEHICLES_JS, "utf8");

// Execute vehicles.js in a sandbox that provides `window` so the
// `window.vehicles = [...]` assignment works.
const sandbox = { window: {} };
vm.runInNewContext(src, sandbox);
const vehicles = sandbox.window.vehicles;

if (!Array.isArray(vehicles) || vehicles.length === 0) {
  console.error("ERROR: Could not parse vehicles from data/vehicles.js");
  process.exit(1);
}

console.log(`Loaded ${vehicles.length} vehicles.`);

// ── 2. Ensure output directory exists ────────────────────────────────────────

fs.mkdirSync(IMG_DIR, { recursive: true });

// ── 3. Download helper ───────────────────────────────────────────────────────

/**
 * Follow redirects and download a URL to a local file.
 * Retries automatically on 429 (rate-limit) with exponential backoff.
 * Returns a Promise that resolves with the final content-type.
 */
async function download(url, destPath, attempt = 0) {
  const MAX_ATTEMPTS = 6;
  return new Promise((resolve, reject) => {
    const proto = url.startsWith("https") ? https : http;
    proto.get(url, { headers: { "User-Agent": "MatKenGame/1.0 (https://github.com/BlazeJama/MatKenGame)" } }, async (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return download(res.headers.location, destPath, attempt).then(resolve).catch(reject);
      }
      // Rate-limited — back off and retry
      if (res.statusCode === 429 || res.statusCode === 503) {
        res.resume();
        if (attempt >= MAX_ATTEMPTS) return reject(new Error(`HTTP ${res.statusCode} after ${MAX_ATTEMPTS} retries: ${url}`));
        const wait = Math.min(2000 * Math.pow(2, attempt), 30000); // 2s, 4s, 8s, 16s, 30s…
        process.stdout.write(`  WAIT  ${Math.round(wait/1000)}s (rate-limited, attempt ${attempt+1})...\n`);
        await sleep(wait);
        return download(url, destPath, attempt + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const contentType = res.headers["content-type"] || "";
      const out = fs.createWriteStream(destPath);
      res.pipe(out);
      out.on("finish", () => out.close(() => resolve(contentType)));
      out.on("error", reject);
    }).on("error", reject);
  });
}

/** Pause for ms milliseconds. */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Guess a file extension from a URL or content-type. */
function guessExt(url, contentType) {
  const ctMap = {
    "image/jpeg": ".jpg",
    "image/jpg":  ".jpg",
    "image/png":  ".png",
    "image/webp": ".webp",
    "image/gif":  ".gif",
  };
  const fromCt = Object.entries(ctMap).find(([k]) => contentType.includes(k));
  if (fromCt) return fromCt[1];
  // Fall back to URL path
  const base = url.split("?")[0].split("/").pop().toLowerCase();
  for (const ext of [".jpg", ".jpeg", ".png", ".webp", ".gif"]) {
    if (base.endsWith(ext)) return ext === ".jpeg" ? ".jpg" : ext;
  }
  return ".jpg"; // safe default
}

// ── 4. Download all images, build URL → local-path mapping ──────────────────

// Map from original Wikimedia URL → new relative path (for rewriting vehicles.js)
const urlMap = new Map();

let downloaded = 0;
let skipped    = 0;
let errors     = 0;

for (const vehicle of vehicles) {
  if (!Array.isArray(vehicle.images)) continue;

  for (let i = 0; i < vehicle.images.length; i++) {
    const img = vehicle.images[i];
    if (!img.url || !img.url.startsWith("http")) continue;

    // Strip query-string cache-buster from Wikimedia URLs
    const cleanUrl = img.url.split("?")[0];

    const idx     = String(i + 1).padStart(3, "0");
    // We'll determine the real extension after download, but need a temp name first.
    // Use a placeholder; we'll rename if the extension differs.
    const tmpPath = path.join(IMG_DIR, `${vehicle.id}-${idx}.tmp`);
    const prefix  = path.join(IMG_DIR, `${vehicle.id}-${idx}`);

    // Check if a file with this prefix already exists (any extension)
    const existing = fs.readdirSync(IMG_DIR).find(
      (f) => f.startsWith(`${vehicle.id}-${idx}.`) && !f.endsWith(".tmp")
    );

    if (existing && !FORCE) {
      const localPath = `assets/images/${existing}`;
      urlMap.set(img.url, localPath);
      skipped++;
      process.stdout.write(`  SKIP  ${vehicle.id}-${idx} (already on disk)\n`);
      continue;
    }

    process.stdout.write(`  GET   ${vehicle.id}-${idx}  ${cleanUrl.slice(0, 80)}...\n`);
    await sleep(700); // ~85 req/min — well under Wikimedia's limit

    try {
      const contentType = await download(cleanUrl, tmpPath);
      const ext         = guessExt(cleanUrl, contentType);
      const finalPath   = `${prefix}${ext}`;
      fs.renameSync(tmpPath, finalPath);
      const localPath = `assets/images/${vehicle.id}-${idx}${ext}`;
      urlMap.set(img.url, localPath);
      downloaded++;
    } catch (err) {
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
      console.error(`  ERROR ${vehicle.id}-${idx}: ${err.message}`);
      errors++;
    }
  }
}

console.log(`\nDone — ${downloaded} downloaded, ${skipped} skipped, ${errors} errors.\n`);

if (errors > 0) {
  console.warn("Some images failed. Check the errors above and re-run (failed vehicles keep their old URLs).");
}

// ── 5. Rewrite vehicles.js ───────────────────────────────────────────────────

let updated = src;
for (const [oldUrl, newPath] of urlMap.entries()) {
  // Replace every occurrence of the old URL (with or without its query string)
  // The URL in the source may have a query string appended; match both forms.
  const base    = oldUrl.split("?")[0];
  // Escape special regex chars in the URL
  const escaped = base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re      = new RegExp(escaped + '(?:\\?[^"]*)?', "g");
  updated = updated.replace(re, newPath);
}

fs.writeFileSync(VEHICLES_JS, updated, "utf8");
console.log("data/vehicles.js rewritten with local image paths.");
console.log("\nNext steps:");
console.log("  git add assets/images data/vehicles.js");
console.log("  git commit -m 'chore: host vehicle images locally for offline play'");
console.log("  git push origin main");
