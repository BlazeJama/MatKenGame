// MatKenGame — main React app
// MVP scaffold: a minimal landing screen confirming the React + Tailwind + PWA pipeline works end-to-end.
// Once the data file and game logic land, this file will host the Home / Quiz / End components.

const { useState } = React;

function App() {
  // Just a tiny piece of state so we can confirm React hooks are wired up
  const [tapped, setTapped] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navy header */}
      <header className="bg-navy text-white py-6 px-4 shadow">
        <h1 className="text-2xl font-bold tracking-wide text-center">MatKenGame</h1>
        <p className="text-sm text-center text-white/70 mt-1">
          Military vehicle recognition quiz
        </p>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <p className="text-lg text-gray-700 mb-6">
          🛠️ MVP scaffold is up and running.
        </p>
        <p className="text-sm text-gray-500 mb-10 max-w-md">
          The game itself is coming next. This screen just confirms React, Tailwind and the
          PWA setup are all working together.
        </p>

        <button
          onClick={() => setTapped((v) => !v)}
          className="bg-navy text-white text-lg font-semibold rounded-xl px-8 py-4 min-h-[44px] shadow-md active:scale-95 transition"
        >
          {tapped ? "It works! 🎯" : "Tap me to test"}
        </button>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-4">
        v0.1.1 — pre-MVP scaffold
      </footer>
    </div>
  );
}

// Mount the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
