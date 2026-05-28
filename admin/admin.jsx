// MatKenGame — Admin Page
// =============================================================================
// Phase 2 feature, built incrementally across 5 PRs:
//   PR 1 (this one): shell + password gate + desktop-only check
//   PR 2: vehicle list with search, filter, and difficulty status
//   PR 3: add / edit form with in-memory state
//   PR 4: delete vehicle + multi-select image delete (with confirmations)
//   PR 5: export updated vehicles.js (download + clipboard)
//
// This is a separate React app from the main game. Vehicle data is shared
// via window.vehicles (loaded by ../data/vehicles.js before this file).
// =============================================================================

const { useState, useEffect, useRef } = React;

// ---- Configuration ----------------------------------------------------------
// Change this password to something only you know before deploying!
// This is client-side only — anyone who views source can see it. The password
// is a casual gate, not real security. Real security would require a backend.
const ADMIN_PASSWORD = "matken";

// Storage keys
const SESSION_AUTH_KEY   = "matken-admin-auth";
const DRAFT_STORAGE_KEY  = "matken-draft-vehicles";
const PACT_CONFIG_KEY    = "matken-pact-config";

// ---- localStorage helpers for the working draft -----------------------------
// The admin edits a draft that persists across refreshes via localStorage.
// The main game reads the same key, so opening the game shows your in-progress
// edits with a "Previewing local draft" banner.
function loadDraftFromStorage() {
  try {
    const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn("Failed to read draft from localStorage:", e);
  }
  return null;
}

function saveDraftToStorage(vehicles) {
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(vehicles));
  } catch (e) {
    console.warn("Failed to save draft to localStorage:", e);
  }
}

function clearDraftFromStorage() {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch (e) {}
}

// ---- Alliance (pact) config helpers -----------------------------------------
// Mirrors the sets in app.jsx — must be kept in sync when new members are added.
const NATO_COUNTRIES = new Set([
  "United States", "United Kingdom", "France", "Germany", "Italy",
  "Netherlands", "Belgium", "Canada", "Norway", "Denmark", "Portugal",
  "Spain", "Turkey", "Greece", "Poland", "Czech Republic", "Hungary",
  "Romania", "Bulgaria", "Slovakia", "Slovenia", "Estonia", "Latvia",
  "Lithuania", "Albania", "Croatia", "Montenegro", "North Macedonia",
  "Finland", "Sweden",
]);
const WARSAW_COUNTRIES = new Set(["Soviet Union", "Russia"]);

// Hardcoded default pact for a country (same logic as app.jsx)
function defaultPact(country) {
  if (NATO_COUNTRIES.has(country))   return "NATO";
  if (WARSAW_COUNTRIES.has(country)) return "Warsaw Pact";
  return "Other";
}

function loadPactConfig() {
  try {
    const raw = localStorage.getItem(PACT_CONFIG_KEY);
    if (raw) return JSON.parse(raw) || {};
  } catch (_) {}
  return {};
}

function savePactConfig(config) {
  try { localStorage.setItem(PACT_CONFIG_KEY, JSON.stringify(config)); } catch (_) {}
}

// ── Supabase (leaderboard admin) ──────────────────────────────────────────────
// Same publishable/anon key as the main game. Delete operations require a
// permissive RLS policy — see the SQL note at the top of LeaderboardAdmin.
const SUPABASE_URL      = "https://eftpalpigevckaisugmp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Lx6cMTZg5n9ZKQ6I4rYoFQ_1W1nhhsr";

// Below this width (px) we show a "use a desktop" message instead of the admin UI
const DESKTOP_MIN_WIDTH = 768;

// A vehicle is "ready" at a given star level once it has this many images
const READY_IMAGES_PER_LEVEL = 5;

// Vehicles can be saved as drafts with zero images and zero fun facts. The
// game just excludes any with zero images from a round (see app.jsx).

// Form dropdown options — kept in sync with CLAUDE.md and the data schema
const CATEGORY_OPTIONS = ["Main Battle Tank", "APC", "IFV", "Artillery", "Helicopter"];
const ERA_OPTIONS = ["WW2", "Cold War", "Modern"];

// Star label mapping for the image rows
const STAR_LABEL = { 1: "Easy", 2: "Medium", 3: "Hard" };

// =============================================================================
// Helpers — slug generation, default form state, validation
// =============================================================================

// Convert a vehicle name into a slug suitable for `id` (lowercase, alphanumeric only)
function slugify(name) {
  return (name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 40);
}

// Make sure a generated slug is unique within the current draft list.
// If "challenger2" already exists, return "challenger22" (append 2), then "challenger23" if that's also taken, etc.
function uniqueId(baseSlug, vehicles, ignoreId) {
  let candidate = baseSlug;
  let n = 2;
  while (vehicles.some((v) => v.id === candidate && v.id !== ignoreId)) {
    candidate = `${baseSlug}${n++}`;
  }
  return candidate;
}

// Initial empty form state — 2 blank image rows, 1 blank fun-fact row, default category/era
function blankFormState() {
  return {
    id: "",            // generated from name when saving a new vehicle
    name: "",
    country: "",
    category: CATEGORY_OPTIONS[0],
    era: ERA_OPTIONS[ERA_OPTIONS.length - 1], // Modern is the most common
    funFacts: [""],
    images: [
      { url: "", stars: 1 },
      { url: "", stars: 2 }
    ]
  };
}

// Normalise a vehicle's fun facts to an array — handles the legacy `funFact` field
function readFunFacts(vehicle) {
  if (Array.isArray(vehicle.funFacts)) return vehicle.funFacts;
  if (vehicle.funFact) return [vehicle.funFact];
  return [];
}

// Returns a list of human-readable validation errors. Empty list = valid.
// MVP: only `name` is required — everything else is optional so vehicles can be
// saved as drafts and completed later. The game ignores vehicles with zero
// images and skips the fun-fact panel when the array is empty.
function validateForm(form) {
  const errors = [];
  if (!form.name.trim()) errors.push("Name is required");
  // Images are now uploaded via drag-and-drop, so URL-protocol validation is
  // no longer needed — image.url is either a local path or a data URL.
  return errors;
}

// =============================================================================
// Helpers — difficulty status, badges
// =============================================================================

// Count images per star level (1, 2, 3) for a vehicle
function countImagesByLevel(vehicle) {
  const counts = { 1: 0, 2: 0, 3: 0 };
  for (const img of vehicle.images || []) {
    if (counts[img.stars] !== undefined) counts[img.stars]++;
  }
  return counts;
}

// "ready" | "partial" | "none" for a count at one star level
function statusFromCount(count) {
  if (count >= READY_IMAGES_PER_LEVEL) return "ready";
  if (count >= 1) return "partial";
  return "none";
}

// Tailwind text color for each status
const STATUS_STAR_COLOR = {
  ready: "text-yellow-400",   // bright gold
  partial: "text-gray-400",   // dim grey
  none: "text-gray-200"       // very dim
};

// Tailwind classes for the era badge — visually distinct per era
const ERA_BADGE = {
  "Modern": "bg-emerald-100 text-emerald-800",
  "Cold War": "bg-amber-100 text-amber-800",
  "WW2": "bg-rose-100 text-rose-800"
};

const CATEGORY_BADGE = "bg-blue-100 text-blue-800";

// =============================================================================
// Password Gate
// =============================================================================

function PasswordGate({ onAuth }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_AUTH_KEY, "true");
      onAuth();
    } else {
      setError(true);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
      >
        <h1 className="text-xl font-bold text-navy mb-1">MatKenGame Admin</h1>
        <p className="text-sm text-gray-600 mb-6">Enter the admin password to continue.</p>

        <input
          type="password"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          autoFocus
          placeholder="Password"
          className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition mb-2 ${
            error
              ? "border-red-400 bg-red-50 focus:border-red-500"
              : "border-gray-200 focus:border-navy"
          }`}
        />

        {error && (
          <p className="text-sm text-red-700 mb-2">Wrong password.</p>
        )}

        <button
          type="submit"
          className="w-full bg-navy text-white font-semibold rounded-xl px-6 py-3 mt-3 active:scale-95 transition"
        >
          Unlock
        </button>

        <p className="text-xs text-gray-400 mt-6 text-center">
          <a href="../" className="hover:text-navy underline">← Back to the game</a>
        </p>
      </form>
    </div>
  );
}

// =============================================================================
// Mobile / small-screen message
// =============================================================================

function DesktopOnlyMessage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-sm">
        <div className="text-5xl mb-4">🖥️</div>
        <h1 className="text-xl font-bold text-navy mb-3">Desktop only</h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          The admin page is designed for desktop browsers — it needs more space than
          a phone screen can comfortably give. Please open this URL on a laptop or
          desktop computer.
        </p>
        <p className="mt-6">
          <a href="../" className="text-sm text-navy underline hover:no-underline">
            ← Back to the game
          </a>
        </p>
      </div>
    </div>
  );
}

// =============================================================================
// Difficulty status indicator — 3 inline rows (E / M / H) per vehicle
// =============================================================================

function DifficultyStatus({ vehicle }) {
  const counts = countImagesByLevel(vehicle);
  const rows = [
    { label: "E", count: counts[1], levelName: "Easy" },
    { label: "M", count: counts[2], levelName: "Medium" },
    { label: "H", count: counts[3], levelName: "Hard" }
  ];

  return (
    <div className="flex items-center gap-4 text-xs">
      {rows.map(({ label, count, levelName }) => {
        const status = statusFromCount(count);
        return (
          <div
            key={label}
            className="flex items-center gap-1"
            title={`${levelName}: ${count} image${count === 1 ? "" : "s"} (${status})`}
          >
            <span className="text-gray-500 font-semibold w-3">{label}</span>
            <span className={`${STATUS_STAR_COLOR[status]} text-base leading-none`}>★</span>
            <span className="text-gray-400 tabular-nums">{count}</span>
          </div>
        );
      })}
    </div>
  );
}

// =============================================================================
// Single vehicle row
// =============================================================================

function VehicleRow({ vehicle, isSelected, onSelect, onDelete }) {
  const imageCount = (vehicle.images || []).length;
  const eraClass = ERA_BADGE[vehicle.era] || "bg-gray-100 text-gray-800";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(vehicle)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(vehicle);
        }
      }}
      className={`border rounded-xl p-4 transition cursor-pointer ${
        isSelected
          ? "border-navy bg-navy/5"
          : "border-gray-200 hover:border-navy/40 hover:bg-gray-50"
      }`}
    >
      {/* Top row: name + delete (PR 4) */}
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="min-w-0">
          <h3 className="font-semibold text-navy truncate">{vehicle.name}</h3>
          <p className="text-xs text-gray-500">{vehicle.country}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDelete(vehicle); }}
            className="text-xs px-3 py-1 rounded-lg border border-red-300 text-red-700 hover:bg-red-50"
            title={`Delete ${vehicle.name}`}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Badges + image count */}
      <div className="flex items-center flex-wrap gap-2 mb-2">
        <span className={`${CATEGORY_BADGE} text-xs px-2 py-0.5 rounded-full font-medium`}>
          {vehicle.category}
        </span>
        <span className={`${eraClass} text-xs px-2 py-0.5 rounded-full font-medium`}>
          {vehicle.era}
        </span>
        <span className="text-xs text-gray-500">
          · {imageCount} image{imageCount === 1 ? "" : "s"}
        </span>
      </div>

      {/* Difficulty status */}
      <DifficultyStatus vehicle={vehicle} />
    </div>
  );
}

// =============================================================================
// Vehicle list — left column. Search + category filter + scrollable rows
// =============================================================================

// Filter sentinels — using strings (not null) so they round-trip through <select>
const ALL_CATEGORIES = "All categories";
const DRAFTS_ONLY = "Drafts (no images)";
const ALL_COUNTRIES = "All countries";
const ANY_DIFFICULTY = "Any difficulty";
const DIFFICULTY_OPTIONS = [
  { value: ANY_DIFFICULTY, label: "Any difficulty" },
  { value: "1", label: "★ Easy (has 1-star image)" },
  { value: "2", label: "★★ Medium (has 2-star image)" },
  { value: "3", label: "★★★ Hard (has 3-star image)" }
];

function VehicleList({ vehicles, selectedId, onSelect, onNew, onDelete }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(ALL_CATEGORIES);
  const [countryFilter, setCountryFilter] = useState(ALL_COUNTRIES);
  const [difficultyFilter, setDifficultyFilter] = useState(ANY_DIFFICULTY);

  // Unique category + country lists derived from the current data so the dropdowns
  // stay in sync with whatever vehicles you've added. Blanks (draft entries with
  // no category/country yet) are excluded.
  const realCategories = Array.from(new Set(vehicles.map((v) => v.category).filter(Boolean))).sort();
  const countries = [ALL_COUNTRIES, ...Array.from(new Set(vehicles.map((v) => v.country).filter(Boolean))).sort()];

  // Apply all four filters, then sort alphabetically by name
  const filtered = vehicles
    .filter((v) => {
      const hasNoImages = !v.images || v.images.length === 0;

      const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase());

      let matchesCategory;
      if (categoryFilter === ALL_CATEGORIES) matchesCategory = true;
      else if (categoryFilter === DRAFTS_ONLY) matchesCategory = hasNoImages;
      else matchesCategory = v.category === categoryFilter;

      const matchesCountry = countryFilter === ALL_COUNTRIES || v.country === countryFilter;

      let matchesDifficulty;
      if (difficultyFilter === ANY_DIFFICULTY) {
        matchesDifficulty = true;
      } else {
        const star = parseInt(difficultyFilter, 10);
        matchesDifficulty = (v.images || []).some((img) => img.stars === star);
      }

      return matchesSearch && matchesCategory && matchesCountry && matchesDifficulty;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-baseline gap-3 min-w-0">
          <h2 className="font-semibold text-navy">Vehicles</h2>
          <span className="text-xs text-gray-500 truncate">
            {filtered.length === vehicles.length
              ? `${vehicles.length} total`
              : `Showing ${filtered.length} of ${vehicles.length}`}
          </span>
        </div>
        <button
          type="button"
          onClick={onNew}
          className="text-xs px-3 py-1.5 rounded-lg bg-navy text-white hover:bg-navy/90 shrink-0"
        >
          + New Vehicle
        </button>
      </div>

      {/* Search bar — full width on its own row */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name…"
        className="w-full mb-2 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-navy outline-none"
      />

      {/* Category + Country + Difficulty filters side by side */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="min-w-0 px-2 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:border-navy outline-none"
        >
          <option value={ALL_CATEGORIES}>{ALL_CATEGORIES}</option>
          <option value={DRAFTS_ONLY}>{DRAFTS_ONLY}</option>
          {realCategories.length > 0 && (
            <optgroup label="By category">
              {realCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </optgroup>
          )}
        </select>
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="min-w-0 px-2 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:border-navy outline-none"
        >
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="min-w-0 px-2 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:border-navy outline-none"
        >
          {DIFFICULTY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8">
          No vehicles match your filters.
        </p>
      ) : (
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">
          {filtered.map((v) => (
            <VehicleRow
              key={v.id}
              vehicle={v}
              isSelected={v.id === selectedId}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 flex items-center gap-4">
        <span className="font-medium">Difficulty status:</span>
        <span className="flex items-center gap-1"><span className="text-yellow-400">★</span> ready (5+)</span>
        <span className="flex items-center gap-1"><span className="text-gray-400">★</span> partial</span>
        <span className="flex items-center gap-1"><span className="text-gray-200">★</span> none</span>
      </div>
    </section>
  );
}

// =============================================================================
// Star selector — 3 buttons (Easy / Medium / Hard) used in each image row
// =============================================================================

function StarSelector({ value, onChange }) {
  return (
    <div className="inline-flex rounded-lg overflow-hidden border border-gray-200">
      {[1, 2, 3].map((star) => {
        const selected = value === star;
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            title={`${STAR_LABEL[star]} (${star} star${star === 1 ? "" : "s"})`}
            className={`px-2 py-1 text-xs font-medium transition ${
              selected
                ? "bg-navy text-white"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            {"★".repeat(star)}
          </button>
        );
      })}
    </div>
  );
}

// =============================================================================
// Image helpers — data URLs, target paths, pending-download bundling
// =============================================================================
//
// Image storage model:
//   - Committed images:  image.url = "assets/images/<id>-<nnn>.<ext>"
//   - Pending uploads:   image.url = "data:image/<type>;base64,<...>"
//
// Both render natively in <img src>, so the game/preview needs no special-case
// handling. On Export, pending data URLs are swapped for the target path they
// WILL have once the user drops the downloaded file into assets/images/.

function isDataUrl(s) {
  return typeof s === "string" && s.startsWith("data:");
}

// Admin lives at /admin/ — one level below the repo root.
// Relative image paths like "assets/images/foo.jpg" need a "../" prefix so
// they resolve to the correct location. Data URLs and full https:// URLs are
// left untouched.
function adminImgSrc(url) {
  if (!url) return url;
  if (isDataUrl(url)) return url;
  if (/^https?:\/\//i.test(url)) return url;
  // Relative path — prepend one directory up
  return url.startsWith("../") ? url : "../" + url;
}

// Map a data-URL MIME type to a file extension
function dataUrlExt(dataUrl) {
  const m = /^data:([^;]+)/.exec(dataUrl);
  const mime = m ? m[1] : "";
  return ({
    "image/jpeg": "jpg",
    "image/jpg":  "jpg",
    "image/png":  "png",
    "image/webp": "webp",
    "image/gif":  "gif",
    "image/svg+xml": "svg",
  })[mime] || "jpg";
}

// Read a File as a data URL via FileReader
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload  = () => resolve(r.result);
    r.onerror = () => reject(r.error || new Error("FileReader failed"));
    r.readAsDataURL(file);
  });
}

// Reject files this big — data URLs are ~33% larger than the binary, the
// admin draft persists to localStorage (5–10 MB cap on most browsers), and
// a single oversized drop would silently blow the quota.
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;  // 10 MB

// Filter a list of File objects down to images under MAX_IMAGE_BYTES,
// alerting the user once with a summary if anything was rejected.
function filterAcceptableImageFiles(files) {
  const list = Array.from(files || []);
  const accepted  = [];
  const tooBig    = [];
  const notImage  = [];
  for (const f of list) {
    if (!f) continue;
    if (!f.type.startsWith("image/")) { notImage.push(f.name || "(unnamed)"); continue; }
    if (f.size > MAX_IMAGE_BYTES)     { tooBig.push(f.name || "(unnamed)");   continue; }
    accepted.push(f);
  }
  const msgs = [];
  if (notImage.length) msgs.push(`Skipped — not images:\n  ${notImage.join("\n  ")}`);
  if (tooBig.length)   msgs.push(`Skipped — over 10 MB:\n  ${tooBig.join("\n  ")}`);
  if (msgs.length) alert(msgs.join("\n\n"));
  return accepted;
}

// Find the next available slot number for a vehicle's images. Looks at all
// existing committed URLs (e.g. "assets/images/m1abrams-003.jpg") and returns
// max+1, padded later by the caller. Pending images already assigned slots
// should be passed in via `extraSlotsTaken` to avoid collisions.
function nextImageSlotNumber(vehicleId, committedUrls, extraSlotsTaken = []) {
  const esc = vehicleId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re  = new RegExp("(?:^|/)" + esc + "-(\\d{3})\\.");
  let max = 0;
  for (const url of committedUrls) {
    const m = url && url.match(re);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  for (const n of extraSlotsTaken) max = Math.max(max, n);
  return max + 1;
}

// Walk every vehicle's images and produce the list of pending downloads
// (one per data-URL image). Each entry carries everything the export modal
// needs to render a download button and rewrite the URL in vehicles.js.
//
// Returns { downloads, orphans }:
//   downloads — array of resolvable pending images
//   orphans   — pending data-URL images that could NOT be assigned a target
//               path because the vehicle has no id (no name set yet).
//               Surfaced to the user as a warning so the file isn't silently
//               dropped from the export bundle.
function collectPendingDownloads(vehicles) {
  const downloads = [];
  const orphans   = [];
  for (const v of vehicles) {
    if (!Array.isArray(v.images)) continue;
    const committed  = v.images.map((i) => i.url).filter((u) => !isDataUrl(u));
    const takenSlots = [];
    v.images.forEach((img, i) => {
      if (!isDataUrl(img.url)) return;
      if (!v.id) {
        // Without an id we can't generate a filename. Tracked separately so
        // the export modal can warn instead of silently producing a ZIP
        // whose vehicles.js references files that aren't in the bundle.
        orphans.push({ vehicleName: v.name || "(unnamed)", imageIndex: i });
        return;
      }
      const ext      = dataUrlExt(img.url);
      const slotNum  = nextImageSlotNumber(v.id, committed, takenSlots);
      takenSlots.push(slotNum);
      const numStr   = String(slotNum).padStart(3, "0");
      const filename = `${v.id}-${numStr}.${ext}`;
      downloads.push({
        vehicleId:   v.id,
        vehicleName: v.name || v.id,
        imageIndex:  i,
        dataUrl:     img.url,
        filename,
        path:        `assets/images/${filename}`,
      });
    });
  }
  return { downloads, orphans };
}

// Convert vehicles for export: every data-URL `image.url` is replaced by the
// target path it will have once the user drops the file into assets/images/.
function vehiclesWithPathsForExport(vehicles, pendingDownloads) {
  const pathByKey = new Map();
  for (const p of pendingDownloads) {
    pathByKey.set(`${p.vehicleId}::${p.imageIndex}`, p.path);
  }
  return vehicles.map((v) => ({
    ...v,
    images: (v.images || []).map((img, i) => ({
      ...img,
      url: pathByKey.get(`${v.id}::${i}`) || img.url,
    })),
  }));
}

// Convert a data URL into a Blob. Browsers honor the `download` filename
// attribute much more reliably for blob: URLs than for data: URLs — without
// this conversion, Safari (and sometimes Chrome) drops the .jpg suffix or
// saves the file with the original drag-and-drop name.
function dataUrlToBlob(dataUrl) {
  const comma = dataUrl.indexOf(",");
  const meta  = dataUrl.slice(5, comma); // strip "data:"
  const isB64 = meta.includes(";base64");
  const mime  = meta.split(";")[0] || "application/octet-stream";
  const payload = dataUrl.slice(comma + 1);
  const binary  = isB64 ? atob(payload) : decodeURIComponent(payload);
  const bytes   = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

// Trigger the browser to download a data URL as a real file with the exact
// filename we specify. Uses a blob URL so the `download` attribute is honored.
function downloadDataUrl(dataUrl, filename) {
  const blob = dataUrlToBlob(dataUrl);
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Build a single ZIP containing vehicles.js + every pending image, structured
// to mirror the repo so the user can extract it into the project root and have
// every file land in the right place.
//   /data/vehicles.js
//   /assets/images/<id>-<nnn>.<ext>
async function downloadUpdateBundle(fileContent, pendingDownloads, filename = "matken-update.zip") {
  if (typeof JSZip === "undefined") {
    alert("ZIP library failed to load. Use the individual downloads instead.");
    return;
  }
  const zip = new JSZip();
  zip.file("data/vehicles.js", fileContent);
  const imagesDir = zip.folder("assets").folder("images");
  for (const p of pendingDownloads) {
    imagesDir.file(p.filename, dataUrlToBlob(p.dataUrl));
  }
  const blob = await zip.generateAsync({ type: "blob" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// =============================================================================
// Image row — drag-and-drop tile + star selector + remove button
// =============================================================================

function ImageRow({ image, vehicleId, index, isSelected, onToggleSelect, onChange, onRemove }) {
  const fileRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const isEmpty   = !image.url;
  const isPending = isDataUrl(image.url);

  const acceptFile = async (file) => {
    const [accepted] = filterAcceptableImageFiles(file ? [file] : []);
    if (!accepted) return;
    try {
      const dataUrl = await readFileAsDataUrl(accepted);
      onChange(index, { ...image, url: dataUrl });
    } catch (e) {
      alert(`Could not read "${accepted.name || "the file"}": ${e.message || e}`);
    }
  };

  const onPick = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) acceptFile(f);
    e.target.value = ""; // allow re-picking the same file
  };

  const onDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const onDragLeave = ()   => setDragOver(false);
  const onDrop = (e) => {
    e.preventDefault(); e.stopPropagation(); setDragOver(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) acceptFile(f);
  };

  // Filename label shown next to the thumbnail
  const filenameLabel = isPending
    ? `${vehicleId || "(set name first)"}-NNN.${dataUrlExt(image.url)} · will be saved on export`
    : (image.url || "").replace(/^assets\/images\//, "");

  return (
    <div className={`flex items-center gap-2 rounded-lg p-1 -mx-1 transition ${isSelected ? "bg-red-50" : ""}`}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelect(index)}
        title="Select for bulk delete"
        className="w-4 h-4 rounded border-gray-300 accent-red-600 cursor-pointer shrink-0"
      />

      {isEmpty ? (
        <button
          type="button"
          onClick={() => fileRef.current && fileRef.current.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`flex-1 min-w-0 h-14 border-2 border-dashed rounded-lg flex items-center justify-center text-xs transition ${
            dragOver
              ? "border-navy bg-blue-50 text-navy"
              : "border-gray-300 text-gray-500 hover:border-navy hover:text-navy"
          }`}
        >
          {dragOver ? "Drop to upload" : "Drag image here or click to browse"}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current && fileRef.current.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          title="Click or drop to replace"
          className={`flex-1 min-w-0 flex items-center gap-3 px-2 py-1 border rounded-lg cursor-pointer transition text-left ${
            dragOver
              ? "border-navy bg-blue-50"
              : isPending
                ? "border-amber-300 bg-amber-50 hover:border-amber-500"
                : "border-gray-200 hover:border-navy"
          }`}
        >
          <img
            src={adminImgSrc(image.url)}
            alt=""
            className="w-12 h-12 object-cover rounded shrink-0 bg-gray-100"
          />
          <div className="text-xs flex-1 min-w-0">
            {isPending && (
              <div className="text-amber-700 font-semibold mb-0.5">● Pending upload</div>
            )}
            <div className="text-gray-600 truncate" title={filenameLabel}>
              {filenameLabel}
            </div>
          </div>
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={onPick}
        className="hidden"
      />

      <StarSelector
        value={image.stars}
        onChange={(stars) => onChange(index, { ...image, stars })}
      />
      <button
        type="button"
        onClick={() => onRemove(index)}
        title="Remove this image"
        className="px-2 py-1 text-sm rounded-lg border border-gray-200 text-red-600 hover:bg-red-50"
      >
        ✕
      </button>
    </div>
  );
}

// =============================================================================
// Vehicle details — read-only view of the selected vehicle
// =============================================================================

function VehicleDetails({ vehicle, onEdit, onClose }) {
  const facts = readFunFacts(vehicle);
  const eraClass = ERA_BADGE[vehicle.era] || "bg-gray-100 text-gray-800";

  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-0 overflow-y-auto">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-4 gap-3">
        <div className="min-w-0">
          <h2 className="font-semibold text-navy truncate">{vehicle.name}</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            <code className="bg-gray-100 px-1 rounded">{vehicle.id}</code>
            {vehicle.country && <span> · {vehicle.country}</span>}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onEdit}
            className="text-xs px-3 py-1 rounded-lg bg-navy text-white hover:bg-navy/90"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onClose}
            title="Close"
            className="text-xs px-2 py-1 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center flex-wrap gap-2 mb-5">
        <span className={`${CATEGORY_BADGE} text-xs px-2 py-0.5 rounded-full font-medium`}>
          {vehicle.category}
        </span>
        <span className={`${eraClass} text-xs px-2 py-0.5 rounded-full font-medium`}>
          {vehicle.era}
        </span>
      </div>

      {/* Difficulty status */}
      <div className="mb-5">
        <h3 className="text-xs font-medium text-gray-700 mb-2">Difficulty status</h3>
        <DifficultyStatus vehicle={vehicle} />
      </div>

      {/* Fun facts */}
      <div className="mb-5">
        <h3 className="text-xs font-medium text-gray-700 mb-2">
          Fun facts ({facts.length})
        </h3>
        {facts.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No fun facts recorded.</p>
        ) : (
          <ul className="space-y-2 text-sm text-gray-700">
            {facts.map((fact, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-gray-400 shrink-0">💡</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Image thumbnails */}
      <div>
        <h3 className="text-xs font-medium text-gray-700 mb-2">
          Images ({vehicle.images.length})
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {vehicle.images.map((img, i) => (
            <div key={i} className="flex flex-col items-center">
              <img
                src={adminImgSrc(img.url)}
                alt={`${vehicle.name} ${STAR_LABEL[img.stars]}`}
                className="w-full h-20 object-cover rounded-lg bg-gray-100 border border-gray-200"
              />
              <span className="mt-1 text-xs text-gray-500">
                {"★".repeat(img.stars)} {STAR_LABEL[img.stars]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Empty-state panel for the right column when nothing is selected
// =============================================================================

function EmptyDetailsPanel() {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-center text-center">
      <div className="max-w-xs">
        <div className="text-4xl mb-3">📋</div>
        <h2 className="font-semibold text-navy mb-2">Nothing selected</h2>
        <p className="text-sm text-gray-500">
          Click a vehicle on the left to inspect it, or use <strong>+ New Vehicle</strong> to add one.
        </p>
      </div>
    </section>
  );
}

// =============================================================================
// Images section — header, batch dropzone, image rows
// =============================================================================
//
// Wraps the entire images list in a drop target so the user can drag one or
// many image files anywhere in the section to add them all at once. Also
// handles the per-image multi-select / delete UI.

function ImagesSection({
  images, vehicleId, selectedIndices,
  onAddFiles, onAddRow,
  onToggleSelect, onChangeImage, onRemoveImage, onDeleteSelected,
}) {
  const dropRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  // Track nested drag enter/leave with a counter so leaving a child element
  // doesn't prematurely clear the drag-over highlight
  const dragDepth = useRef(0);

  const onDragEnter = (e) => {
    if (!e.dataTransfer || !Array.from(e.dataTransfer.types || []).includes("Files")) return;
    e.preventDefault();
    dragDepth.current++;
    setDragOver(true);
  };
  const onDragOver = (e) => {
    if (!e.dataTransfer || !Array.from(e.dataTransfer.types || []).includes("Files")) return;
    e.preventDefault();
  };
  const onDragLeave = () => {
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setDragOver(false);
  };
  const onDrop = (e) => {
    if (!e.dataTransfer || !e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    e.preventDefault(); e.stopPropagation();
    dragDepth.current = 0; setDragOver(false);
    onAddFiles(e.dataTransfer.files);
  };

  return (
    <div
      ref={dropRef}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`rounded-xl transition ${dragOver ? "ring-2 ring-navy ring-offset-2 bg-blue-50/40" : ""}`}
    >
      <div className="flex items-baseline justify-between mb-2 gap-2">
        <label className="block text-xs font-medium text-gray-700">
          Images (optional — vehicles with zero images are skipped by the game)
        </label>
        <div className="flex items-center gap-2 shrink-0">
          {selectedIndices.size > 0 && (
            <button
              type="button"
              onClick={onDeleteSelected}
              className="text-xs px-2 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Delete {selectedIndices.size} selected
            </button>
          )}
          <button
            type="button"
            onClick={onAddRow}
            className="text-xs px-2 py-1 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            + Add image
          </button>
        </div>
      </div>

      {images.length === 0 ? (
        <div
          className={`border-2 border-dashed rounded-lg px-4 py-6 text-center text-xs transition ${
            dragOver
              ? "border-navy bg-blue-50 text-navy"
              : "border-gray-300 text-gray-500"
          }`}
        >
          {dragOver
            ? "Drop to upload — one tile per file"
            : (
              <>
                <div className="font-medium text-gray-700 mb-1">No images yet.</div>
                <div>Drag one or more image files here, or click <span className="font-medium">+ Add image</span> above to add an empty slot.</div>
                <div className="text-gray-400 mt-1">Vehicles without images are kept as drafts and skipped by the game until at least one is added.</div>
              </>
            )
          }
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {images.map((img, i) => (
            <ImageRow
              key={i}
              image={img}
              vehicleId={vehicleId}
              index={i}
              isSelected={selectedIndices.has(i)}
              onToggleSelect={onToggleSelect}
              onChange={onChangeImage}
              onRemove={onRemoveImage}
            />
          ))}
          <p className="text-[11px] text-gray-400 mt-1">
            Tip: drag more image files into this section to append them.
          </p>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Vehicle form — add new or edit existing
// =============================================================================

function VehicleForm({ mode, selectedVehicle, vehicles, onSave, onCancel }) {
  const [form, setForm] = useState(blankFormState());
  // Set of indices selected for bulk delete on the images list
  const [selectedImageIndices, setSelectedImageIndices] = useState(() => new Set());

  // When the selected vehicle changes, load its data into the form.
  // In "new" mode (selectedVehicle === null), reset to blank.
  useEffect(() => {
    if (selectedVehicle) {
      const facts = readFunFacts(selectedVehicle);
      setForm({
        id: selectedVehicle.id,
        name: selectedVehicle.name,
        country: selectedVehicle.country,
        category: selectedVehicle.category,
        era: selectedVehicle.era,
        funFacts: facts.length > 0 ? [...facts] : [""],
        // Deep-copy images so editing doesn't mutate the draft list directly
        images: selectedVehicle.images.map((img) => ({ ...img }))
      });
    } else {
      setForm(blankFormState());
    }
    // Reset image multi-select whenever the form's target changes
    setSelectedImageIndices(new Set());
  }, [selectedVehicle]);

  const isEditing = mode === "edit";
  const errors = validateForm(form);
  const isValid = errors.length === 0;
  // Auto-derived ID preview for new vehicles
  const previewId = isEditing ? form.id : uniqueId(slugify(form.name), vehicles);

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const updateImage = (i, image) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.map((img, idx) => (idx === i ? image : img))
    }));
  };

  const addImageRow = () => {
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, { url: "", stars: 1 }]
    }));
  };

  // Drop one or more image files anywhere on the Images section to append them
  // all at once as new pending uploads. Non-image files and oversized files
  // (>10 MB) are filtered with a user-visible summary alert. Individual
  // FileReader failures don't block the whole batch.
  const addFilesAsImages = async (files) => {
    const list = filterAcceptableImageFiles(files);
    if (list.length === 0) return;
    const results = await Promise.allSettled(list.map(readFileAsDataUrl));
    const successes = results
      .filter((r) => r.status === "fulfilled")
      .map((r) => r.value);
    const failures = results.filter((r) => r.status === "rejected").length;
    if (failures > 0) alert(`Could not read ${failures} of ${list.length} file(s).`);
    if (successes.length === 0) return;
    setForm((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        ...successes.map((url) => ({ url, stars: 1 })),
      ],
    }));
  };

  const removeImageRow = (i) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== i)
    }));
    // Keep the multi-select consistent — drop the removed index and shift any later ones down
    setSelectedImageIndices((prev) => {
      const next = new Set();
      for (const idx of prev) {
        if (idx === i) continue;
        next.add(idx > i ? idx - 1 : idx);
      }
      return next;
    });
  };

  const toggleImageSelect = (i) => {
    setSelectedImageIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const deleteSelectedImages = () => {
    const count = selectedImageIndices.size;
    if (count === 0) return;
    const label = count === 1 ? "1 image" : `${count} images`;
    if (!confirm(`Delete ${label} from "${form.name || "this vehicle"}"?\n\nThis cannot be undone.`)) return;
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => !selectedImageIndices.has(idx))
    }));
    setSelectedImageIndices(new Set());
  };

  const updateFunFact = (i, value) => {
    setForm((prev) => ({
      ...prev,
      funFacts: prev.funFacts.map((f, idx) => (idx === i ? value : f))
    }));
  };

  const addFunFactRow = () => {
    setForm((prev) => ({ ...prev, funFacts: [...prev.funFacts, ""] }));
  };

  const removeFunFactRow = (i) => {
    setForm((prev) => ({
      ...prev,
      funFacts: prev.funFacts.filter((_, idx) => idx !== i)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    // Build the final vehicle object — strip blank rows, trim strings
    const finalVehicle = {
      id: previewId,
      name: form.name.trim(),
      country: form.country.trim(),
      category: form.category,
      era: form.era,
      funFacts: form.funFacts.map((f) => f.trim()).filter((f) => f.length > 0),
      images: form.images
        .filter((img) => img.url.trim())
        .map((img) => ({ url: img.url.trim(), stars: img.stars }))
    };

    onSave(finalVehicle, isEditing);
  };

  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-0 overflow-y-auto">
      {/* Header — mode + cancel */}
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h2 className="font-semibold text-navy">
            {isEditing ? "Edit Vehicle" : "Add Vehicle"}
          </h2>
          {isEditing && (
            <p className="text-xs text-gray-500 mt-0.5">
              Editing: <code className="bg-gray-100 px-1 rounded">{form.id}</code>
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1 min-h-0">
        {/* Name + auto-ID preview */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="e.g. Challenger 2"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-navy outline-none"
          />
          {!isEditing && form.name && (
            <p className="text-xs text-gray-500 mt-1">
              ID will be: <code className="bg-gray-100 px-1 rounded">{previewId}</code>
            </p>
          )}
        </div>

        {/* Country — with autocomplete from existing vehicles */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Country</label>
          <input
            type="text"
            value={form.country}
            onChange={(e) => updateField("country", e.target.value)}
            placeholder="e.g. United Kingdom"
            list="known-countries"
            autoComplete="off"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-navy outline-none"
          />
          <datalist id="known-countries">
            {Array.from(new Set(vehicles.map((v) => v.country).filter(Boolean))).sort().map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <p className="text-xs text-gray-400 mt-1">
            Start typing to pick from existing countries, or type a new one.
          </p>
        </div>

        {/* Category + Era side-by-side */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:border-navy outline-none"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Era</label>
            <select
              value={form.era}
              onChange={(e) => updateField("era", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:border-navy outline-none"
            >
              {ERA_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Fun facts (optional — game picks one at random per question, or none) */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label className="block text-xs font-medium text-gray-700">
              Fun facts (optional)
            </label>
            <button
              type="button"
              onClick={addFunFactRow}
              className="text-xs px-2 py-1 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              + Add fun fact
            </button>
          </div>
          {form.funFacts.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No fun facts. Add one if you'd like — the game just skips the panel when there are none.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {form.funFacts.map((fact, i) => (
                <div key={i} className="flex items-start gap-2">
                  <textarea
                    value={fact}
                    onChange={(e) => updateFunFact(i, e.target.value)}
                    placeholder="One interesting sentence about this vehicle."
                    rows={2}
                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-navy outline-none resize-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeFunFactRow(i)}
                    title="Remove this fun fact"
                    className="mt-1 px-2 py-1 text-sm rounded-lg border border-gray-200 text-red-600 hover:bg-red-50"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image rows */}
        <div>
          <ImagesSection
            images={form.images}
            vehicleId={previewId}
            selectedIndices={selectedImageIndices}
            onAddFiles={addFilesAsImages}
            onAddRow={addImageRow}
            onToggleSelect={toggleImageSelect}
            onChangeImage={updateImage}
            onRemoveImage={removeImageRow}
            onDeleteSelected={deleteSelectedImages}
          />
        </div>

        {/* Validation errors */}
        {errors.length > 0 && (form.name || form.country || form.images.some((img) => img.url) || form.funFacts.some((f) => f)) && (
          <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            <ul className="list-disc list-inside space-y-0.5">
              {errors.map((err) => <li key={err}>{err}</li>)}
            </ul>
          </div>
        )}

        {/* Save */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={!isValid}
            className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl shadow-sm transition ${
              isValid
                ? "bg-navy text-white active:scale-95"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isEditing ? "Save changes" : "Add vehicle"}
          </button>
        </div>
      </form>
    </section>
  );
}

// =============================================================================
// Export — generate a properly-formatted vehicles.js from the current draft
// =============================================================================

// Schema doc block copied verbatim from data/vehicles.js so the exported file
// keeps the same header. If the schema docs change, update both places.
const EXPORTED_HEADER = `// MatKenGame — Vehicle Database
// =================================================================
// This is the ONLY place vehicle data lives. Adding a new vehicle
// never requires touching game code — just add an entry below.
//
// Schema (one entry per vehicle):
//   id        — unique lowercase string, no spaces (e.g. "challenger2")
//   name      — display name shown in answer buttons (e.g. "Challenger 2")
//   country   — country of origin (e.g. "United Kingdom")
//   category  — "Main Battle Tank" | "APC" | "IFV" | "Artillery" | "Helicopter"
//               (MVP uses Main Battle Tank only)
//   era       — "WW2" | "Cold War" | "Modern"
//   images    — array of { url, stars } objects. Zero or more.
//                 stars: 1 = easy, 2 = medium, 3 = hard
//                 MVP picks a random image and ignores stars. Phase 2 will
//                 filter by difficulty using these stars.
//                 Vehicles with zero images are excluded from the game
//                 until at least one is added.
//   funFacts  — array of zero or more sentences. After the player answers,
//               one is picked at random and shown. Empty array = no fact shown.
//
// Image storage:
//   - Each image.url is a local path under assets/images/
//   - Naming convention: {vehicleId}-{nnn}.{ext}  (e.g. m1abrams-001.jpg)
//   - Images are added via the Admin page (drag-and-drop), which generates
//     the correct filename and exports both the .js file and the image files.
//
// Loading model:
//   This file is loaded as a regular <script> in index.html *before* app.jsx,
//   and exposes the data as \`window.vehicles\`. When the project later adopts
//   a build step (Phase 2+), this can be swapped to \`export const vehicles\`.
//
// =================================================================
`;

// Format a single vehicle as JS source code (unquoted keys, 2-space indent
// under the array). Uses JSON.stringify for safe string escaping.
function formatVehicleEntry(v) {
  const lines = [];
  lines.push("  {");
  lines.push(`    id: ${JSON.stringify(v.id)},`);
  lines.push(`    name: ${JSON.stringify(v.name)},`);
  lines.push(`    country: ${JSON.stringify(v.country || "")},`);
  lines.push(`    category: ${JSON.stringify(v.category)},`);
  lines.push(`    era: ${JSON.stringify(v.era)},`);

  // Images array
  if (!v.images || v.images.length === 0) {
    lines.push("    images: [],");
  } else {
    lines.push("    images: [");
    v.images.forEach((img, i) => {
      const comma = i < v.images.length - 1 ? "," : "";
      lines.push(`      { url: ${JSON.stringify(img.url)}, stars: ${img.stars} }${comma}`);
    });
    lines.push("    ],");
  }

  // Fun facts array — always emit `funFacts` (the new schema)
  const facts = readFunFacts(v);
  if (facts.length === 0) {
    lines.push("    funFacts: []");
  } else {
    lines.push("    funFacts: [");
    facts.forEach((fact, i) => {
      const comma = i < facts.length - 1 ? "," : "";
      lines.push(`      ${JSON.stringify(fact)}${comma}`);
    });
    lines.push("    ]");
  }

  lines.push("  }");
  return lines.join("\n");
}

// Generate the full vehicles.js file content.
// pactConfig is the { [country]: pactId } map from the admin's Alliance Config modal.
function generateVehiclesJs(vehicles, pactConfig = {}) {
  const vehicleEntries = vehicles.map(formatVehicleEntry).join(",\n");
  const vehiclesBlock = vehicles.length === 0
    ? "window.vehicles = [];"
    : `window.vehicles = [\n${vehicleEntries}\n];`;

  // Emit all pact overrides sorted alphabetically so diffs are stable
  const pactLines = Object.entries(pactConfig)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([country, pact]) => `  ${JSON.stringify(country)}: ${JSON.stringify(pact)}`);
  const pactBlock =
    "// Alliance configuration — maps countries to military alliances.\n" +
    "// Managed via Admin → 🌐 Alliances. Empty = built-in defaults apply.\n" +
    `window.pactConfig = {\n${pactLines.join(",\n")}\n};`;

  return (
    `${EXPORTED_HEADER}\n` +
    `${vehiclesBlock}\n\n` +
    `// Convenience helper — total count, useful for the home-screen stats card\n` +
    `window.vehicleCount = window.vehicles.length;\n\n` +
    `${pactBlock}\n`
  );
}

// Trigger a browser download of `content` as `filename`.
// Defers revokeObjectURL by 1s so slower browsers (older Safari) have time to
// kick off the download before the URL is released.
function downloadAsFile(content, filename) {
  const blob = new Blob([content], { type: "text/javascript;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// =============================================================================
// Export modal — preview, download, copy
// =============================================================================

function ExportModal({ vehicles, pactConfig, onClose }) {
  // Compute pending downloads first, then build vehicles.js content with the
  // target paths swapped in for every data-URL image.
  const { downloads: pendingDownloads, orphans: orphanImages } = React.useMemo(
    () => collectPendingDownloads(vehicles),
    [vehicles]
  );
  const exportVehicles = React.useMemo(
    () => vehiclesWithPathsForExport(vehicles, pendingDownloads),
    [vehicles, pendingDownloads]
  );
  const fileContent = React.useMemo(
    () => generateVehiclesJs(exportVehicles, pactConfig),
    [exportVehicles, pactConfig]
  );
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fileContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      alert("Couldn't copy automatically. Select the text in the preview and press Ctrl+C / Cmd+C.");
    }
  };

  const handleDownload = () => {
    downloadAsFile(fileContent, "vehicles.js");
  };

  // Download every pending image at once. Browsers may throttle multi-download
  // triggers, so we space them ~150ms apart.
  const handleDownloadAllImages = async () => {
    for (const p of pendingDownloads) {
      downloadDataUrl(p.dataUrl, p.filename);
      await new Promise((r) => setTimeout(r, 150));
    }
  };

  // One-click bundle: vehicles.js + every pending image, zipped with the repo
  // folder layout. Extract at the project root and every file lands in place.
  const handleDownloadBundle = () => {
    downloadUpdateBundle(fileContent, pendingDownloads);
  };

  const hasPending = pendingDownloads.length > 0;

  const playableCount = vehicles.filter((v) => v.images && v.images.length > 0).length;
  const draftCount = vehicles.length - playableCount;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-navy">Save changes to game</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {vehicles.length} vehicle{vehicles.length === 1 ? "" : "s"} · {playableCount} playable
              {draftCount > 0 ? ` · ${draftCount} draft${draftCount === 1 ? "" : "s"}` : ""}
              {pendingDownloads.length > 0 ? ` · ${pendingDownloads.length} new image${pendingDownloads.length === 1 ? "" : "s"}` : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            title="Close (Esc)"
            className="text-gray-500 hover:text-gray-900 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Instructions — adapt depending on whether there are new images */}
        <div className="px-6 py-4 text-sm text-blue-900 bg-blue-50 border-b border-blue-100 space-y-2">
          <p className="font-semibold text-blue-950">How to publish these changes:</p>
          {hasPending ? (
            <ol className="space-y-1.5 list-decimal list-inside marker:text-blue-700">
              <li>
                Click <strong>📦 Download update bundle</strong> below — a single ZIP containing the new <code className="bg-white px-1 rounded border border-blue-200">vehicles.js</code> and all {pendingDownloads.length} new image{pendingDownloads.length === 1 ? "" : "s"} named for you.
              </li>
              <li>
                Extract the ZIP into the project root, overwriting when prompted. The folder structure inside the ZIP matches the repo exactly.
              </li>
              <li>
                Double-click <code className="bg-white px-1 rounded border border-blue-200">update-game.bat</code> in the project root. It commits and pushes for you — the game updates in about 30 seconds.
              </li>
            </ol>
          ) : (
            <ol className="space-y-1.5 list-decimal list-inside marker:text-blue-700">
              <li>
                Click <strong>💾 Download vehicles.js</strong> below.
              </li>
              <li>
                Move the downloaded file into the project's <code className="bg-white px-1 rounded border border-blue-200">data/</code> folder, replacing the existing <code className="bg-white px-1 rounded border border-blue-200">data/vehicles.js</code>.
              </li>
              <li>
                Double-click <code className="bg-white px-1 rounded border border-blue-200">update-game.bat</code> in the project root. It commits and pushes for you — the game updates in about 30 seconds.
              </li>
            </ol>
          )}
          <p className="text-xs text-blue-800 pt-1 border-t border-blue-200/70 mt-2">
            No git on your machine?{" "}
            <a
              href="https://github.com/BlazeJama/MatKenGame/edit/main/data/vehicles.js"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium hover:text-blue-950"
            >
              Edit data/vehicles.js directly on GitHub.com
            </a>{" "}
            — paste the contents from the preview below, then "Commit changes" on the GitHub page.
          </p>
        </div>

        {/* Orphan warning — pending images on vehicles that have no id yet */}
        {orphanImages.length > 0 && (
          <div className="px-6 py-3 bg-red-50 border-b border-red-200 text-sm text-red-900">
            <p className="font-semibold mb-1">
              ⚠ {orphanImages.length} pending image{orphanImages.length === 1 ? " is" : "s are"} attached to vehicles with no name
            </p>
            <p className="text-xs">
              These won't be included in the bundle. Set a Name on each vehicle so an id can be generated, then re-open Export. Affected:{" "}
              {orphanImages.map((o) => o.vehicleName).join(", ")}.
            </p>
          </div>
        )}

        {/* Pending image downloads — only shown when there are new images to commit */}
        {hasPending && (
          <div className="px-6 py-4 bg-amber-50 border-b border-amber-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-amber-900">
                {pendingDownloads.length} new image{pendingDownloads.length === 1 ? "" : "s"} to commit
              </p>
              <button
                onClick={handleDownloadAllImages}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-amber-400 text-amber-800 bg-white hover:bg-amber-100"
                title="Triggers one download per image — useful if you only want to grab a subset"
              >
                Download {pendingDownloads.length} as separate files
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {pendingDownloads.map((p) => (
                <button
                  key={`${p.vehicleId}-${p.imageIndex}`}
                  onClick={() => downloadDataUrl(p.dataUrl, p.filename)}
                  className="flex items-center gap-2 px-2 py-1.5 bg-white border border-amber-200 rounded-lg hover:border-amber-500 text-left transition"
                  title={`Save as ${p.path}`}
                >
                  <img src={p.dataUrl} alt="" className="w-8 h-8 object-cover rounded bg-gray-100 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-mono text-gray-700 truncate">{p.filename}</div>
                    <div className="text-[10px] text-gray-500 truncate">{p.vehicleName}</div>
                  </div>
                  <span className="text-amber-700 text-xs shrink-0">↓</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-amber-800 mt-2">
              Each file is renamed for you to match the path in <code className="bg-white px-1 rounded border border-amber-200">vehicles.js</code>. The simplest way is the <strong>Download update bundle</strong> button below — one ZIP with everything pre-organised.
            </p>
          </div>
        )}

        {/* Preview textarea */}
        <textarea
          readOnly
          value={fileContent}
          spellCheck={false}
          className="flex-1 min-h-0 px-6 py-4 font-mono text-xs text-gray-700 bg-gray-50 border-0 resize-none outline-none overflow-auto whitespace-pre"
        />

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            title="Copy the file contents (useful for pasting into GitHub.com or VS Code)"
            className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
              copied
                ? "bg-green-600 text-white"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {copied ? "✓ Copied!" : "Copy text"}
          </button>
          <button
            onClick={handleDownload}
            title={hasPending ? "Download just vehicles.js (you'll need to grab the images separately)" : "Save vehicles.js to your Downloads folder"}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
              hasPending
                ? "border border-gray-300 hover:bg-gray-50"
                : "bg-navy text-white hover:bg-navy/90"
            }`}
          >
            💾 vehicles.js only
          </button>
          {hasPending && (
            <button
              onClick={handleDownloadBundle}
              title={`Single ZIP containing vehicles.js + ${pendingDownloads.length} renamed image${pendingDownloads.length === 1 ? "" : "s"}. Extract into the project root.`}
              className="px-4 py-2 text-sm rounded-lg bg-navy text-white font-medium hover:bg-navy/90"
            >
              📦 Download update bundle ({pendingDownloads.length + 1} files)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Alliance Config modal
// =============================================================================

const PACT_OPTIONS_ADMIN = [
  { value: "NATO",         label: "NATO"         },
  { value: "Warsaw Pact",  label: "Warsaw Pact"  },
  { value: "Other",        label: "Other"        },
];

function AllianceConfigModal({ vehicles, pactConfig, onConfigChange, onResetConfig, onClose }) {
  // Unique countries with vehicle counts, sorted alphabetically
  const countryMap = {};
  vehicles.forEach((v) => {
    if (v.country) countryMap[v.country] = (countryMap[v.country] || 0) + 1;
  });
  const countries = Object.keys(countryMap).sort();

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const getAssignment = (country) => pactConfig[country] || defaultPact(country);
  const isOverridden  = (country) => Boolean(pactConfig[country]);

  const handleReset = () => {
    if (!confirm("Reset all alliance assignments back to the built-in defaults?\n\nAny custom assignments you've made will be lost.")) return;
    onResetConfig();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-semibold text-navy">Alliance Configuration</h2>
            <p className="text-xs text-gray-500 mt-0.5">{countries.length} countr{countries.length === 1 ? "y" : "ies"} in the current vehicle database</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-xl leading-none">✕</button>
        </div>

        {/* Info banner */}
        <div className="px-6 py-3 bg-blue-50 border-b border-blue-100 text-xs text-blue-800 shrink-0">
          Changes apply instantly in the game — no export needed. The configuration is stored locally in your browser.
        </div>

        {/* Country table */}
        <div className="flex-1 overflow-y-auto">
          {countries.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-10">No vehicles in the database yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
                <tr className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  <th className="px-6 py-3 text-left">Country</th>
                  <th className="px-6 py-3 text-center">Vehicles</th>
                  <th className="px-6 py-3 text-right">Alliance</th>
                </tr>
              </thead>
              <tbody>
                {countries.map((country, i) => {
                  const current    = getAssignment(country);
                  const overridden = isOverridden(country);
                  return (
                    <tr key={country} className={`border-b border-gray-100 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
                      <td className="px-6 py-3 font-medium text-navy">
                        {country}
                        {overridden && (
                          <span className="ml-2 text-xs text-amber-600 font-normal">★ custom</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-gray-500 text-center tabular-nums">{countryMap[country]}</td>
                      <td className="px-6 py-3 text-right">
                        <select
                          value={current}
                          onChange={(e) => onConfigChange(country, e.target.value)}
                          className="text-sm rounded-lg border border-gray-200 bg-white px-2 py-1.5 focus:border-navy outline-none"
                        >
                          {PACT_OPTIONS_ADMIN.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between shrink-0">
          <button
            onClick={handleReset}
            className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 transition"
          >
            Reset to defaults
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-navy text-white font-medium hover:bg-navy/90"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Leaderboard admin helpers
// =============================================================================

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// Fetch all leaderboard entries (up to 1000) — no limit for the admin view.
// Note: hints_used is intentionally excluded; it isn't displayed and may not
// exist on older schema versions, which would cause a 400 from Supabase.
async function adminFetchLeaderboard() {
  const url = `${SUPABASE_URL}/rest/v1/leaderboard`
    + `?select=id,callsign,score,total,category,difficulty,mode,created_at`
    + `&order=score.desc,created_at.asc&limit=1000`;
  const res = await fetch(url, {
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
}

// Delete a single entry by UUID. Requires the "Public delete" RLS policy.
async function adminDeleteEntry(id) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard?id=eq.${id}`, {
    method: "DELETE",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Prefer": "return=minimal",
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Delete failed (${res.status})${text ? ": " + text : ""}`);
  }
}

// =============================================================================
// Leaderboard admin panel
// =============================================================================

const LB_CAT_LABEL = {
  "all": "ALL", "Main Battle Tank": "MBT", "APC": "APC",
  "IFV": "IFV", "Artillery": "ARTY", "Helicopter": "HELO",
};
const LB_DIFF_STARS = { 1: "★", 2: "★★", 3: "★★★" };

function LeaderboardAdmin() {
  const [allEntries,   setAllEntries]   = useState([]);
  const [status,       setStatus]       = useState("loading");
  const [errorMsg,     setErrorMsg]     = useState("");
  const [deletingId,   setDeletingId]   = useState(null);

  // Filters
  const [callsignQ,    setCallsignQ]    = useState("");
  const [catFilter,    setCatFilter]    = useState("all");
  const [diffFilter,   setDiffFilter]   = useState("all");
  const [modeFilter,   setModeFilter]   = useState("all");
  const [sortBy,       setSortBy]       = useState("score_desc");

  const load = () => {
    setStatus("loading");
    adminFetchLeaderboard()
      .then((data) => { setAllEntries(data); setStatus("ok"); })
      .catch((err)  => { setErrorMsg(err.message || "Network error"); setStatus("error"); });
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (entry) => {
    if (!confirm(`Delete ${entry.callsign}'s score of ${entry.score}?\n\nThis cannot be undone.`)) return;
    setDeletingId(entry.id);
    try {
      await adminDeleteEntry(entry.id);
      setAllEntries((prev) => prev.filter((e) => e.id !== entry.id));
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // Client-side filter then sort
  const filtered = allEntries
    .filter((e) => {
      if (callsignQ  && !e.callsign.toLowerCase().includes(callsignQ.toLowerCase())) return false;
      if (catFilter  !== "all" && e.category   !== catFilter)                        return false;
      if (diffFilter !== "all" && e.difficulty !== parseInt(diffFilter, 10))         return false;
      if (modeFilter !== "all" && e.mode       !== modeFilter)                       return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "score_asc")  return a.score - b.score;
      if (sortBy === "date_new")   return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === "date_old")   return new Date(a.created_at) - new Date(b.created_at);
      // score_desc (default)
      return b.score - a.score || new Date(a.created_at) - new Date(b.created_at);
    });

  const selectCls = "px-2 py-1.5 text-sm rounded-lg border border-gray-200 bg-white focus:border-navy outline-none";

  return (
    <div className="flex-1 min-h-0 flex flex-col p-6 max-w-7xl mx-auto w-full">

      {/* SQL reminder banner */}
      <div className="mb-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
        <strong>One-time Supabase setup required for deletes:</strong> run{" "}
        <code className="bg-white px-1 rounded border border-amber-200">
          CREATE POLICY "Public delete" ON public.leaderboard FOR DELETE USING (true);
        </code>{" "}
        in your Supabase SQL Editor. Without it, delete requests will return 403.
      </div>

      {/* Filter + action bar */}
      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 flex items-center gap-3 flex-wrap shrink-0">
        <input
          type="text"
          value={callsignQ}
          onChange={(e) => setCallsignQ(e.target.value)}
          placeholder="Search callsign…"
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 focus:border-navy outline-none"
          style={{ minWidth: 160 }}
        />
        <select value={catFilter}  onChange={(e) => setCatFilter(e.target.value)}  className={selectCls}>
          <option value="all">All categories</option>
          <option value="Main Battle Tank">MBT</option>
          <option value="APC">APC</option>
          <option value="IFV">IFV</option>
          <option value="Artillery">Artillery</option>
          <option value="Helicopter">Helicopter</option>
        </select>
        <select value={diffFilter} onChange={(e) => setDiffFilter(e.target.value)} className={selectCls}>
          <option value="all">All difficulties</option>
          <option value="1">★ Easy</option>
          <option value="2">★★ Medium</option>
          <option value="3">★★★ Hard</option>
        </select>
        <select value={modeFilter} onChange={(e) => setModeFilter(e.target.value)} className={selectCls}>
          <option value="all">All modes</option>
          <option value="normal">Normal</option>
          <option value="timed">Timed</option>
        </select>
        <select value={sortBy}     onChange={(e) => setSortBy(e.target.value)}     className={selectCls}>
          <option value="score_desc">Score ↓</option>
          <option value="score_asc">Score ↑</option>
          <option value="date_new">Newest first</option>
          <option value="date_old">Oldest first</option>
        </select>
        <span className="text-sm text-gray-500 ml-auto">
          {status === "ok" ? `${filtered.length} / ${allEntries.length} entries` : ""}
        </span>
        <button
          onClick={load}
          disabled={status === "loading"}
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Table area */}
      <div className="flex-1 min-h-0 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
        {status === "loading" && (
          <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
            Loading entries…
          </div>
        )}
        {status === "error" && (
          <div className="flex-1 flex items-center justify-center text-sm text-red-600 text-center px-6">
            <div>
              <div className="font-medium mb-1">Failed to load leaderboard</div>
              <div className="text-xs text-red-400">{errorMsg}</div>
            </div>
          </div>
        )}
        {status === "ok" && filtered.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
            {allEntries.length === 0 ? "No entries in the leaderboard yet." : "No entries match your filters."}
          </div>
        )}
        {status === "ok" && filtered.length > 0 && (
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10">
                <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <th className="px-4 py-3 text-left w-10">#</th>
                  <th className="px-4 py-3 text-left">Callsign</th>
                  <th className="px-4 py-3 text-center">Score</th>
                  <th className="px-4 py-3 text-center">Cat</th>
                  <th className="px-4 py-3 text-center">Diff</th>
                  <th className="px-4 py-3 text-center">Mode</th>
                  <th className="px-4 py-3 text-left">Submitted</th>
                  <th className="px-4 py-3 w-20"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((entry, i) => (
                  <tr
                    key={entry.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      i % 2 === 0 ? "" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="px-4 py-2.5 text-gray-400 tabular-nums">{i + 1}</td>
                    <td className="px-4 py-2.5 font-semibold text-navy">{entry.callsign}</td>
                    <td className="px-4 py-2.5 text-center tabular-nums">
                      <span className="font-semibold">{entry.score}</span>
                      <span className="text-gray-400 text-xs">/{entry.total}</span>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                        {LB_CAT_LABEL[entry.category] ?? entry.category}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-center text-yellow-500">
                      {LB_DIFF_STARS[entry.difficulty] ?? "?"}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {entry.mode === "timed" ? (
                        <span className="text-xs bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-medium">⏱ TIMED</span>
                      ) : (
                        <span className="text-xs text-gray-400">NORMAL</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-gray-400 text-xs whitespace-nowrap">
                      {timeAgo(entry.created_at)}
                      <span className="block text-gray-300 text-xs" title={entry.created_at}>
                        {new Date(entry.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <button
                        onClick={() => handleDelete(entry)}
                        disabled={deletingId === entry.id}
                        className="text-xs px-2.5 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                      >
                        {deletingId === entry.id ? "…" : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// Admin shell (placeholder columns — filled in by later PRs)
// =============================================================================

// Build a fresh draft seed from window.vehicles (the deployed file)
function freshDraftFromFile() {
  return (window.vehicles || []).map((v) => ({
    ...v,
    images: v.images.map((img) => ({ ...img })),
    funFacts: readFunFacts(v)
  }));
}

function AdminShell({ onLogout }) {
  // Editable draft vehicle list — preferred source is localStorage (so refreshes
  // preserve in-progress edits), falling back to the deployed file.
  // PR 5 will let you export this draft back into data/vehicles.js.
  const [draftVehicles, setDraftVehicles] = useState(() => {
    const fromStorage = loadDraftFromStorage();
    if (fromStorage) {
      return fromStorage.map((v) => ({
        ...v,
        images: (v.images || []).map((img) => ({ ...img })),
        funFacts: readFunFacts(v)
      }));
    }
    return freshDraftFromFile();
  });

  // Persist every change to localStorage so the game (and a refreshed admin) can see it
  useEffect(() => {
    saveDraftToStorage(draftVehicles);
  }, [draftVehicles]);

  // Which vehicle is selected in the list. null = nothing selected (or creating new).
  const [selectedId, setSelectedId] = useState(null);

  // Right-column mode: "empty" | "view" | "edit" | "new"
  //   empty  → nothing selected, show empty panel
  //   view   → showing read-only details of selectedId
  //   edit   → editing selectedId
  //   new    → creating a brand-new vehicle (selectedId is null in this mode)
  const [mode, setMode] = useState("empty");

  // Active top-level tab: "vehicles" | "leaderboard"
  const [activeTab, setActiveTab] = useState("vehicles");

  // Whether the Export modal is open
  const [exportOpen, setExportOpen] = useState(false);

  // Alliance config — stored in its own localStorage key (separate from the vehicle draft)
  const [pactConfig, setPactConfig] = useState(loadPactConfig);
  const [allianceOpen, setAllianceOpen] = useState(false);

  const handlePactConfigChange = (country, pactId) => {
    const updated = { ...pactConfig, [country]: pactId };
    savePactConfig(updated);
    setPactConfig(updated);
  };

  const handleResetPactConfig = () => {
    localStorage.removeItem(PACT_CONFIG_KEY);
    setPactConfig({});
  };

  const hasCustomPactConfig = Object.keys(pactConfig).length > 0;

  const selectedVehicle = selectedId
    ? draftVehicles.find((v) => v.id === selectedId) || null
    : null;

  // Whether the draft has diverged from the original window.vehicles
  // (used in the header to remind the user they have unexported changes)
  const isDirty = JSON.stringify(draftVehicles) !== JSON.stringify(window.vehicles || []);

  // Clicking a row in the list selects it for viewing (read-only)
  const handleSelect = (vehicle) => {
    setSelectedId(vehicle.id);
    setMode("view");
  };

  // "+ New Vehicle" button in the list header
  const handleNew = () => {
    setSelectedId(null);
    setMode("new");
  };

  // "Edit" button inside the details panel
  const handleStartEdit = () => {
    if (selectedId) setMode("edit");
  };

  // Close (×) button in details OR Cancel button in the form
  const handleCancel = () => {
    setMode(selectedId ? "view" : "empty");
  };

  // Form's Save handler — either updates an existing vehicle or adds a new one,
  // then returns to view mode showing the just-saved vehicle
  const handleSave = (vehicle, wasEditing) => {
    setDraftVehicles((prev) => {
      if (wasEditing) {
        return prev.map((v) => (v.id === vehicle.id ? vehicle : v));
      }
      return [...prev, vehicle];
    });
    setSelectedId(vehicle.id);
    setMode("view");
  };

  // Delete a vehicle entirely (from the list row or the details panel)
  const handleDelete = (vehicle) => {
    if (!confirm(`Delete "${vehicle.name}"?\n\nThis removes the vehicle from your local draft. Click Save afterwards to publish the deletion to the live game.`)) return;
    setDraftVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
    // If the deleted vehicle was on screen, clear the right column
    if (selectedId === vehicle.id) {
      setSelectedId(null);
      setMode("empty");
    }
  };

  // Wipe the localStorage draft and restore from the deployed file
  const handleResetToFile = () => {
    const draftImages = draftVehicles.reduce((n, v) => n + (v.images?.length || 0), 0);
    const fileImages  = (window.vehicles || []).reduce((n, v) => n + (v.images?.length || 0), 0);
    const newImages   = Math.max(0, draftImages - fileImages);
    const draftCount  = draftVehicles.length;
    const fileCount   = (window.vehicles || []).length;
    const newVehicles = Math.max(0, draftCount - fileCount);

    const detail = [];
    if (newVehicles > 0) detail.push(`• ${newVehicles} new vehicle${newVehicles === 1 ? "" : "s"} you've added`);
    if (newImages   > 0) detail.push(`• ${newImages} image URL${newImages === 1 ? "" : "s"} you've added`);
    detail.push("• Any edits to existing vehicles (renames, fun facts, etc.)");

    const message =
      "⚠ DISCARD ALL LOCAL CHANGES?\n\n" +
      "You will permanently lose:\n" +
      detail.join("\n") + "\n\n" +
      "Your draft will be replaced with the deployed data/vehicles.js.\n" +
      "This cannot be undone.\n\n" +
      "Tip: if you want to KEEP your changes, click Save instead, then run update-game.bat to publish.";

    if (!confirm(message)) return;
    clearDraftFromStorage();
    setDraftVehicles(freshDraftFromFile());
    setSelectedId(null);
    setMode("empty");
  };

  // Decide what goes in the right column
  let rightColumn;
  if (mode === "new") {
    rightColumn = (
      <VehicleForm
        mode="new"
        selectedVehicle={null}
        vehicles={draftVehicles}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  } else if (mode === "edit" && selectedVehicle) {
    rightColumn = (
      <VehicleForm
        mode="edit"
        selectedVehicle={selectedVehicle}
        vehicles={draftVehicles}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  } else if (mode === "view" && selectedVehicle) {
    rightColumn = (
      <VehicleDetails
        vehicle={selectedVehicle}
        onEdit={handleStartEdit}
        onClose={() => { setSelectedId(null); setMode("empty"); }}
      />
    );
  } else {
    rightColumn = <EmptyDetailsPanel />;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-navy text-white px-6 py-3 shadow flex items-center justify-between shrink-0 gap-4">
        {/* Title */}
        <div className="shrink-0">
          <h1 className="text-lg font-bold tracking-wide leading-tight">MatKenGame Admin</h1>
          <p className="text-xs text-white/50 leading-tight">
            {activeTab === "vehicles"
              ? `${draftVehicles.length} vehicles${isDirty ? " · unsaved changes" : ""}`
              : "Leaderboard management"}
          </p>
        </div>

        {/* Tab navigation */}
        <nav className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
          {[
            { id: "vehicles",    label: "🗂 Vehicles"    },
            { id: "leaderboard", label: "🏆 Leaderboard" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
                activeTab === tab.id
                  ? "bg-white text-navy shadow-sm"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Action buttons — context-sensitive per tab */}
        <div className="flex items-center gap-3 text-sm shrink-0">
          {activeTab === "vehicles" && (
            <>
              <button
                onClick={() => setAllianceOpen(true)}
                title="Configure which alliance each country belongs to"
                className={`px-3 py-1.5 rounded-lg font-medium transition border ${
                  hasCustomPactConfig
                    ? "border-amber-400 text-amber-300 hover:bg-amber-400/10"
                    : "border-white/30 text-white/80 hover:text-white hover:border-white/60"
                }`}
              >
                🌐 Alliances{hasCustomPactConfig ? " ★" : ""}
              </button>
              <button
                onClick={() => setExportOpen(true)}
                disabled={draftVehicles.length === 0}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  draftVehicles.length === 0
                    ? "bg-white/20 text-white/40 cursor-not-allowed"
                    : "bg-white text-navy hover:bg-white/90"
                }`}
                title={draftVehicles.length === 0 ? "No vehicles to save" : "Download vehicles.js + publish to the live game"}
              >
                💾 Save
              </button>
              {isDirty && (
                <button
                  onClick={handleResetToFile}
                  className="text-red-300 hover:text-red-100 hover:bg-red-900/30 px-2 py-1 rounded transition-colors"
                  title="Permanently delete all local draft changes and reload from data/vehicles.js"
                >
                  🗑 Discard draft
                </button>
              )}
            </>
          )}
          <a href="../" className="text-white/80 hover:text-white underline">View game</a>
          <button onClick={onLogout} className="text-white/80 hover:text-white underline">
            Sign out
          </button>
        </div>
      </header>

      {exportOpen && (
        <ExportModal
          vehicles={draftVehicles}
          pactConfig={pactConfig}
          onClose={() => setExportOpen(false)}
        />
      )}

      {allianceOpen && (
        <AllianceConfigModal
          vehicles={draftVehicles}
          pactConfig={pactConfig}
          onConfigChange={handlePactConfigChange}
          onResetConfig={handleResetPactConfig}
          onClose={() => setAllianceOpen(false)}
        />
      )}

      {/* Body — switches between vehicles (two-column) and leaderboard (full-width) */}
      {activeTab === "vehicles" ? (
        <main className="flex-1 min-h-0 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 p-6 max-w-7xl mx-auto w-full">
          <VehicleList
            vehicles={draftVehicles}
            selectedId={selectedId}
            onSelect={handleSelect}
            onNew={handleNew}
            onDelete={handleDelete}
          />
          {rightColumn}
        </main>
      ) : (
        <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <LeaderboardAdmin />
        </main>
      )}

      <footer className="text-center text-xs text-gray-400 py-3 shrink-0">
        Admin — full edit-export-commit loop
      </footer>
    </div>
  );
}

// =============================================================================
// Root App — handles auth + responsive gate
// =============================================================================

function App() {
  // Track viewport width so we re-render on resize (e.g. user rotates tablet)
  const [width, setWidth] = useState(window.innerWidth);
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(SESSION_AUTH_KEY) === "true"
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    setAuthed(false);
  };

  if (width < DESKTOP_MIN_WIDTH) {
    return <DesktopOnlyMessage />;
  }

  if (!authed) {
    return <PasswordGate onAuth={() => setAuthed(true)} />;
  }

  return <AdminShell onLogout={handleLogout} />;
}

// Mount
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
