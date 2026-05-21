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

const { useState, useEffect } = React;

// ---- Configuration ----------------------------------------------------------
// Change this password to something only you know before deploying!
// This is client-side only — anyone who views source can see it. The password
// is a casual gate, not real security. Real security would require a backend.
const ADMIN_PASSWORD = "matken";

// Storage keys
const SESSION_AUTH_KEY = "matken-admin-auth";
const DRAFT_STORAGE_KEY = "matken-draft-vehicles";

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

  // Any URL the user has typed must be HTTPS — blank rows are dropped on save
  const badProtocol = form.images
    .filter((img) => img.url.trim())
    .find((img) => !/^https:\/\//i.test(img.url.trim()));
  if (badProtocol) errors.push("Image URLs must start with https://");

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
// Image row — URL input + star selector + remove button
// =============================================================================

function ImageRow({ image, index, isSelected, onToggleSelect, onChange, onRemove }) {
  return (
    <div className={`flex items-center gap-2 rounded-lg p-1 -mx-1 transition ${isSelected ? "bg-red-50" : ""}`}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelect(index)}
        title="Select for bulk delete"
        className="w-4 h-4 rounded border-gray-300 accent-red-600 cursor-pointer shrink-0"
      />
      <input
        type="url"
        value={image.url}
        onChange={(e) => onChange(index, { ...image, url: e.target.value })}
        placeholder="https://upload.wikimedia.org/…"
        className="flex-1 min-w-0 px-3 py-1.5 text-sm rounded-lg border border-gray-200 focus:border-navy outline-none"
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
                src={img.url}
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
          <div className="flex items-baseline justify-between mb-2 gap-2">
            <label className="block text-xs font-medium text-gray-700">
              Images (optional — vehicles with zero images are skipped by the game)
            </label>
            <div className="flex items-center gap-2 shrink-0">
              {selectedImageIndices.size > 0 && (
                <button
                  type="button"
                  onClick={deleteSelectedImages}
                  className="text-xs px-2 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Delete {selectedImageIndices.size} selected
                </button>
              )}
              <button
                type="button"
                onClick={addImageRow}
                className="text-xs px-2 py-1 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                + Add image
              </button>
            </div>
          </div>
          {form.images.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No images yet. The vehicle will be saved as a draft and won't appear in rounds until you add one.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {form.images.map((img, i) => (
                <ImageRow
                  key={i}
                  image={img}
                  index={i}
                  isSelected={selectedImageIndices.has(i)}
                  onToggleSelect={toggleImageSelect}
                  onChange={updateImage}
                  onRemove={removeImageRow}
                />
              ))}
            </div>
          )}
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
    if (!confirm(`Delete "${vehicle.name}"?\n\nThis removes the vehicle from your draft. You can still revert via "Reset to file" until you export.`)) return;
    setDraftVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
    // If the deleted vehicle was on screen, clear the right column
    if (selectedId === vehicle.id) {
      setSelectedId(null);
      setMode("empty");
    }
  };

  // Wipe the localStorage draft and restore from the deployed file
  const handleResetToFile = () => {
    if (!confirm("Discard all local draft changes and reload the deployed data?\n\nThis cannot be undone.")) return;
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
      <header className="bg-navy text-white px-6 py-4 shadow flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-lg font-bold tracking-wide">MatKenGame Admin</h1>
          <p className="text-xs text-white/60">
            {draftVehicles.length} vehicles
            {isDirty && (
              <span className="ml-2 inline-flex items-center gap-1 bg-yellow-400/20 text-yellow-200 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                local draft (not yet exported)
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          {isDirty && (
            <button
              onClick={handleResetToFile}
              className="text-white/80 hover:text-white underline"
              title="Discard all local edits and reload from data/vehicles.js"
            >
              Reset to file
            </button>
          )}
          <a href="../" className="text-white/80 hover:text-white underline">View game</a>
          <button
            onClick={onLogout}
            className="text-white/80 hover:text-white underline"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Two-column body */}
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

      <footer className="text-center text-xs text-gray-400 py-3 shrink-0">
        Admin — PR 4 of 5 (delete + multi-select)
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
