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

// Below this width (px) we show a "use a desktop" message instead of the admin UI
const DESKTOP_MIN_WIDTH = 768;

// A vehicle is "ready" at a given star level once it has this many images
const READY_IMAGES_PER_LEVEL = 5;

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

function VehicleRow({ vehicle, onEdit, onDelete }) {
  const imageCount = (vehicle.images || []).length;
  const eraClass = ERA_BADGE[vehicle.era] || "bg-gray-100 text-gray-800";

  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:border-navy/40 transition">
      {/* Top row: name + actions */}
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="min-w-0">
          <h3 className="font-semibold text-navy truncate">{vehicle.name}</h3>
          <p className="text-xs text-gray-500">{vehicle.country}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onEdit(vehicle)}
            disabled
            className="text-xs px-3 py-1 rounded-lg border border-gray-300 text-gray-500 cursor-not-allowed"
            title="Edit — coming in PR 3"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(vehicle)}
            disabled
            className="text-xs px-3 py-1 rounded-lg border border-gray-300 text-gray-500 cursor-not-allowed"
            title="Delete — coming in PR 4"
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

function VehicleList({ vehicles, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Unique category list from data — keeps the dropdown future-proof for Phase 2
  const categories = ["All", ...Array.from(new Set(vehicles.map((v) => v.category))).sort()];

  // Apply both filters
  const filtered = vehicles.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || v.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-0">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="font-semibold text-navy">Vehicles</h2>
        <span className="text-xs text-gray-500">
          {filtered.length === vehicles.length
            ? `${vehicles.length} total`
            : `Showing ${filtered.length} of ${vehicles.length}`}
        </span>
      </div>

      {/* Search + filter controls */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name…"
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-navy outline-none"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:border-navy outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
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
              onEdit={onEdit}
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
// Admin shell (placeholder columns — filled in by later PRs)
// =============================================================================

function AdminShell({ onLogout }) {
  const vehicles = window.vehicles || [];

  // These callbacks are placeholders for now — PR 3 wires up Edit, PR 4 wires up Delete
  const handleEdit = (vehicle) => {
    console.log("Edit clicked (wired up in PR 3):", vehicle.id);
  };
  const handleDelete = (vehicle) => {
    console.log("Delete clicked (wired up in PR 4):", vehicle.id);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-navy text-white px-6 py-4 shadow flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-lg font-bold tracking-wide">MatKenGame Admin</h1>
          <p className="text-xs text-white/60">{vehicles.length} vehicles loaded</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
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
        {/* LEFT: vehicle list */}
        <VehicleList
          vehicles={vehicles}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* RIGHT: add/edit form (PR 3) */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-navy mb-2">Add / Edit Vehicle</h2>
          <p className="text-sm text-gray-500">
            Form for adding and editing vehicles will land in PR 3.
          </p>
        </section>
      </main>

      <footer className="text-center text-xs text-gray-400 py-3 shrink-0">
        Admin — PR 2 of 5 (vehicle list)
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
