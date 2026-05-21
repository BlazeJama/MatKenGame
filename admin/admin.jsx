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
// Admin shell (placeholder columns — filled in by later PRs)
// =============================================================================

function AdminShell({ onLogout }) {
  const vehicles = window.vehicles || [];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-navy text-white px-6 py-4 shadow flex items-center justify-between">
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
      <main className="flex-1 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 p-6 max-w-7xl mx-auto w-full">
        {/* LEFT: vehicle list (PR 2) */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-navy mb-2">Vehicles</h2>
          <p className="text-sm text-gray-500">
            Vehicle list with search, filter, and difficulty status will land in PR 2.
          </p>
        </section>

        {/* RIGHT: add/edit form (PR 3) */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-navy mb-2">Add / Edit Vehicle</h2>
          <p className="text-sm text-gray-500">
            Form for adding and editing vehicles will land in PR 3.
          </p>
        </section>
      </main>

      <footer className="text-center text-xs text-gray-400 py-3">
        Admin shell — PR 1 of 5
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
