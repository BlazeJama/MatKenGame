// MatKenGame — main React app
// MVP build: Home → Quiz (10 questions) → End → Play Again
//
// Data is read from window.vehicles, set by data/vehicles.js (loaded before this file).
// Each round picks 10 random vehicles, one random image per vehicle, and 3 random wrong
// answers from the same category for each question.

const { useState, useEffect, useRef } = React;

// localStorage key shared with the admin page — when present, the game
// uses your in-progress draft instead of the deployed window.vehicles
const DRAFT_STORAGE_KEY = "matken-draft-vehicles";

// localStorage key for nested best scores.
// Current shape: { "all": { 1: { normal: 800, timed: 1280 }, 2: {...} }, "Main Battle Tank": {...}, ... }
// Migrated from older shapes — see loadBestScores().
const BEST_SCORES_KEY = "matken-best-scores";

// Points scoring model (Phase 3):
//   Normal mode  — 100 per correct answer, max 1000.
//   Hint penalty — 150 deducted per hint used (applied at end of round).
//   Timed mode   — 100 per correct + up to 50 speed bonus, max 1500.
const POINTS_PER_CORRECT = 100;
const HINT_PENALTY       = 150;
const MAX_HINTS          = 2;
const QUESTION_TIME_MS   = 15000;  // timed mode
const SPEED_BONUS_MAX_MS = 5000;   // full bonus if answered within 5s
const SPEED_BONUS_MAX    = 50;

function loadBestScores() {
  try {
    const raw = localStorage.getItem(BEST_SCORES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};

    // Migration ladder — old data is brought up to the new shape automatically:
    //   v1 (flat):       { cat: number(0-10) }
    //   v2 (nested):     { cat: { diff: number(0-10) } }
    //   v3 (points):     { cat: { diff: { normal: number(0-1000), timed: ... } } }   ← current
    const migrated = {};
    for (const [cat, val] of Object.entries(parsed)) {
      migrated[cat] = {};
      if (typeof val === "number") {
        // v1 → v3: treat as Easy normal-mode, convert raw count to points
        const pts = val <= 10 ? val * POINTS_PER_CORRECT : val;
        migrated[cat][1] = { normal: pts };
      } else if (val && typeof val === "object") {
        for (const [diff, score] of Object.entries(val)) {
          if (typeof score === "number") {
            // v2 → v3: convert raw count (0-10) to points (0-1000)
            const pts = score <= 10 ? score * POINTS_PER_CORRECT : score;
            migrated[cat][diff] = { normal: pts };
          } else if (score && typeof score === "object") {
            // v3 already — keep as-is
            migrated[cat][diff] = score;
          }
        }
      }
    }
    return migrated;
  } catch (_) {
    return {};
  }
}

// Category options shown in the home-screen selector.
// id matches the `category` field in vehicles.js (or "all" for no filter).
const CATEGORY_OPTIONS = [
  { id: "all",              label: "ALL"  },
  { id: "Main Battle Tank", label: "MBT"  },
  { id: "APC",              label: "APC"  },
  { id: "IFV",              label: "IFV"  },
  { id: "Artillery",        label: "ARTY", hidden: true },  // HIDDEN — remove `hidden: true` to restore
  { id: "Helicopter",       label: "HELO", hidden: true },  // HIDDEN — remove `hidden: true` to restore
];

// Difficulty levels — id matches the `stars` field on each image
const DIFFICULTY_OPTIONS = [
  { id: 1, label: "EASY",   stars: "★"   },
  { id: 2, label: "MEDIUM", stars: "★★"  },
  { id: 3, label: "HARD",   stars: "★★★" },
];

// Era options — id matches the `era` field in vehicles.js
const ERA_OPTIONS = [
  { id: "all",      label: "ALL"      },
  { id: "WW2",      label: "WW2",      hidden: true },  // HIDDEN — remove `hidden: true` to restore
  { id: "Modern",   label: "MODERN"   },
  { id: "Cold War", label: "COLD WAR" },
];

// Military pact options
const PACT_OPTIONS = [
  { id: "all",          label: "ALL"    },
  { id: "NATO",         label: "NATO"   },
  { id: "Warsaw Pact",  label: "WARSAW" },
  { id: "Other",        label: "OTHER",  hidden: true },  // HIDDEN — remove `hidden: true` to restore
];

// Countries belonging to each pact.
// Russia is grouped with the Warsaw Pact as the direct successor to Soviet military doctrine.
// Finland and Sweden reflect their current NATO membership.
const NATO_COUNTRIES = new Set([
  "United States", "United Kingdom", "France", "Germany", "Italy",
  "Netherlands", "Belgium", "Canada", "Norway", "Denmark", "Portugal",
  "Spain", "Turkey", "Greece", "Poland", "Czech Republic", "Hungary",
  "Romania", "Bulgaria", "Slovakia", "Slovenia", "Estonia", "Latvia",
  "Lithuania", "Albania", "Croatia", "Montenegro", "North Macedonia",
  "Finland", "Sweden",
]);

const WARSAW_COUNTRIES = new Set([
  "Soviet Union", "Russia",
]);

// localStorage key for custom alliance assignments set via the admin page
const PACT_CONFIG_KEY = "matken-pact-config";

// ── Supabase leaderboard ───────────────────────────────────────────────────
const SUPABASE_URL      = "https://eftpalpigevckaisugmp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Lx6cMTZg5n9ZKQ6I4rYoFQ_1W1nhhsr";
// localStorage key for the player's callsign (shown on the leaderboard)
const CALLSIGN_KEY = "matken-callsign";

// Returns the pact id ("NATO" | "Warsaw Pact" | "Other") for a given country.
// Priority:
//   1. localStorage (matken-pact-config) — live preview set via admin, not yet exported
//   2. window.pactConfig — baked into vehicles.js on last export, works on all devices
//   3. Hardcoded NATO / Warsaw sets — always-available fallback
function getVehiclePact(country) {
  try {
    const local = JSON.parse(localStorage.getItem(PACT_CONFIG_KEY) || "{}");
    if (local[country]) return local[country];
  } catch (_) {}
  if (window.pactConfig && window.pactConfig[country]) return window.pactConfig[country];
  if (NATO_COUNTRIES.has(country))   return "NATO";
  if (WARSAW_COUNTRIES.has(country)) return "Warsaw Pact";
  return "Other";
}

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

// ============================================================================
// Helpers
// ============================================================================

// Fisher-Yates shuffle — returns a new array, doesn't mutate the input
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pick n random items from an array without duplicates
function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

// Build one round: up to 10 question objects, each with the correct vehicle,
// an image at the chosen difficulty, and 4 shuffled answer options.
// Vehicles with zero images at the requested difficulty are excluded.
function buildRound(vehicles, difficulty) {
  const QUESTIONS_PER_ROUND = 10;
  const hasImageAtDifficulty = (v) =>
    Array.isArray(v.images) && v.images.some((img) => img.stars === difficulty);

  // Pool used to pick the QUESTION vehicles — must have at least one image
  // at the requested difficulty so we have something to show.
  const playable = vehicles.filter(hasImageAtDifficulty);
  const roundVehicles = shuffle(playable).slice(0, QUESTIONS_PER_ROUND);

  return roundVehicles.map((vehicle) => {
    const imagesAtDifficulty = vehicle.images.filter((img) => img.stars === difficulty);
    const image = pickRandom(imagesAtDifficulty, 1)[0];

    // Pick one fun fact at random per question. Falls back to a singular
    // `funFact` field if the vehicle still uses the legacy schema.
    const facts =
      Array.isArray(vehicle.funFacts) && vehicle.funFacts.length > 0
        ? vehicle.funFacts
        : vehicle.funFact
        ? [vehicle.funFact]
        : [];
    const funFact = facts.length > 0 ? pickRandom(facts, 1)[0] : "";

    // Wrong answers: any vehicle in the same category (we only use the name
    // in the answer options — not the image — so difficulty doesn't apply
    // to the wrong-answer pool).
    const wrongPool = vehicles.filter(
      (v) => v.id !== vehicle.id && v.category === vehicle.category
    );
    const wrongAnswers = pickRandom(wrongPool, Math.min(3, wrongPool.length));
    const options = shuffle([vehicle, ...wrongAnswers]);
    return { vehicle, image, options, funFact };
  });
}

// Score rating labels (tactical tone) — thresholds in the new 0–1000 (normal)
// / 0–1500 (timed) points scale. Tiers map roughly to the old 0–10 boundaries:
//   900+ = elite, 700+ = strong, 500+ = competent, 300+ = needs work, else back to basics.
function scoreLabel(score) {
  if (score >= 900) return "ELITE OPERATOR";
  if (score >= 700) return "FIELD READY";
  if (score >= 500) return "OBJECTIVE COMPLETE";
  if (score >= 300) return "TRAINING REQUIRED";
  return "BACK TO BASICS";
}

function scoreSubtext(score) {
  if (score >= 900) return "Exceptional field intelligence";
  if (score >= 700) return "Strong recognition capability";
  if (score >= 500) return "Continue your training";
  if (score >= 300) return "Review vehicle profiles";
  return "Intensive training needed";
}

function scoreLabelColor(score) {
  if (score >= 700) return "#f59e0b";
  if (score >= 500) return "#94a3b8";
  return "#ef4444";
}

// ── Leaderboard helpers ────────────────────────────────────────────────────

// Human-readable relative time from an ISO timestamp string
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// POST one score row to the Supabase leaderboard table.
// New (Phase 3) columns: mode ('normal' | 'timed'), hints_used (0–2).
// total is the max possible for the mode (1000 normal, 1500 timed).
// Returns { newBest: true } when the row was inserted, { newBest: false } when
// the trigger discarded it (player already has an equal or better score in that slot).
async function submitScore({ callsign, score, total, category, difficulty, mode = "normal", hintsUsed = 0 }) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      // return=representation so we can check whether a row was actually inserted.
      // If the before-insert trigger cancels the insert the response body is [].
      "Prefer": "return=representation",
    },
    body: JSON.stringify({
      callsign, score, total, category, difficulty,
      mode, hints_used: hintsUsed,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Submit failed (${res.status})${text ? ": " + text : ""}`);
  }
  const data = await res.json();
  return { newBest: Array.isArray(data) && data.length > 0 };
}

// GET top-10 scores, optionally filtered by category, difficulty, and/or mode
async function fetchLeaderboard(category, difficulty, mode) {
  let url = `${SUPABASE_URL}/rest/v1/leaderboard`
    + `?select=callsign,score,total,category,difficulty,mode,created_at`
    + `&order=score.desc,created_at.asc&limit=10`;
  if (category   && category   !== "all") url += `&category=eq.${encodeURIComponent(category)}`;
  if (difficulty && difficulty !== "all") url += `&difficulty=eq.${difficulty}`;
  if (mode       && mode       !== "all") url += `&mode=eq.${mode}`;
  const res = await fetch(url, {
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
}

// GET the calling player's personal best entry for a given filter combination.
// Returns the single highest-scoring row or null if none found.
async function fetchPlayerBest(callsign, category, difficulty, mode) {
  let url = `${SUPABASE_URL}/rest/v1/leaderboard`
    + `?select=callsign,score,total,category,difficulty,mode,created_at`
    + `&callsign=eq.${encodeURIComponent(callsign)}`
    + `&order=score.desc&limit=1`;
  if (category   && category   !== "all") url += `&category=eq.${encodeURIComponent(category)}`;
  if (difficulty && difficulty !== "all") url += `&difficulty=eq.${difficulty}`;
  if (mode       && mode       !== "all") url += `&mode=eq.${mode}`;
  const res = await fetch(url, {
    headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data[0] || null;
}

// Count entries ranked above `score` in the leaderboard (same filters) via a
// HEAD request — no row data transferred. Returns rank (count + 1) or null on error.
async function fetchRankAbove(score, category, difficulty, mode) {
  let url = `${SUPABASE_URL}/rest/v1/leaderboard?score=gt.${score}`;
  if (category   && category   !== "all") url += `&category=eq.${encodeURIComponent(category)}`;
  if (difficulty && difficulty !== "all") url += `&difficulty=eq.${difficulty}`;
  if (mode       && mode       !== "all") url += `&mode=eq.${mode}`;
  try {
    const res = await fetch(url, {
      method: "HEAD",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Prefer": "count=exact",
      },
    });
    const cr = res.headers.get("content-range");
    if (cr) {
      const count = parseInt(cr.split("/")[1]);
      if (!isNaN(count)) return count + 1;
    }
  } catch (_) {}
  return null;
}

// ============================================================================
// Shared UI primitives
// ============================================================================

// Four amber corner brackets — used to frame cards and the target image
function TargetBrackets({ size = 18, color = "#f59e0b", thickness = 2, inset = -1 }) {
  const common = { position: "absolute", width: size, height: size, borderColor: color };
  const line   = `${thickness}px solid ${color}`;
  return (
    <>
      <div style={{ ...common, top: inset, left: inset,   borderTop: line, borderLeft: line }} />
      <div style={{ ...common, top: inset, right: inset,  borderTop: line, borderRight: line }} />
      <div style={{ ...common, bottom: inset, left: inset,  borderBottom: line, borderLeft: line }} />
      <div style={{ ...common, bottom: inset, right: inset, borderBottom: line, borderRight: line }} />
    </>
  );
}

// Dark translucent card with amber border and corner brackets
function TacCard({ children, className = "", style: extraStyle = {} }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        background: "rgba(26,39,68,0.45)",
        border: "1px solid rgba(245,158,11,0.18)",
        borderRadius: 2,
        ...extraStyle,
      }}
    >
      <TargetBrackets size={14} thickness={2} inset={-1} />
      {children}
    </div>
  );
}

// Fullscreen overlay for setting / changing the operator callsign
function CallsignModal({ current, onSave, onCancel }) {
  const [value, setValue] = useState(current || "");
  const trimmed = value.trim();
  const canSave = trimmed.length >= 1 && trimmed.length <= 16;

  const handleSave = () => { if (canSave) onSave(trimmed.toUpperCase()); };
  const handleKey  = (e) => {
    if (e.key === "Enter" && canSave) handleSave();
    if (e.key === "Escape" && onCancel) onCancel();
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(7,11,20,0.93)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
      onClick={(e) => { if (e.target === e.currentTarget && onCancel) onCancel(); }}
    >
      <TacCard style={{ padding: "32px 28px", maxWidth: 360, width: "100%" }}>
        <div
          className="font-data text-xs tracking-widest mb-6 text-center"
          style={{ color: "rgba(245,158,11,0.5)", letterSpacing: "0.18em" }}
        >
          ◈ OPERATOR IDENT ◈
        </div>
        <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>
          CALLSIGN (1–16 CHARS)
        </div>
        <input
          type="text"
          value={value}
          maxLength={16}
          autoFocus
          spellCheck={false}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          onKeyDown={handleKey}
          placeholder="GHOST"
          style={{
            display: "block",
            width: "100%",
            background: "rgba(15,23,42,0.8)",
            border: `1px solid ${canSave ? "rgba(245,158,11,0.4)" : "rgba(51,65,85,0.5)"}`,
            borderRadius: 2,
            padding: "10px 14px",
            color: "#f59e0b",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.8rem",
            letterSpacing: "0.1em",
            outline: "none",
            marginBottom: 20,
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={handleSave}
          disabled={!canSave}
          className="w-full font-display tracking-widest"
          style={{
            fontSize: "1.25rem",
            minHeight: 50,
            borderRadius: 2,
            background: canSave ? "#f59e0b" : "rgba(30,41,59,0.7)",
            color: canSave ? "#070b14" : "#334155",
            border: canSave ? "none" : "1px solid rgba(51,65,85,0.5)",
            letterSpacing: "0.14em",
            cursor: canSave ? "pointer" : "not-allowed",
            marginBottom: onCancel ? 10 : 0,
          }}
        >
          CONFIRM CALLSIGN
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="w-full font-data text-xs"
            style={{
              background: "transparent", border: "none",
              color: "#475569", letterSpacing: "0.1em",
              cursor: "pointer", padding: "8px 0",
            }}
          >
            CANCEL
          </button>
        )}
      </TacCard>
    </div>
  );
}

// ============================================================================
// Welcome Screen — first-visit callsign registration
// Shown when localStorage has no `matken-callsign` yet. Once a callsign is
// saved this screen is never seen again unless localStorage is cleared.
// ============================================================================

function WelcomeScreen({ onSave }) {
  const [value, setValue] = useState("");
  const trimmed = value.trim();
  const canSave = trimmed.length >= 1 && trimmed.length <= 16;

  const handleSave = () => { if (canSave) onSave(trimmed.toUpperCase()); };
  const handleKey  = (e) => { if (e.key === "Enter" && canSave) handleSave(); };

  return (
    <div className="min-h-screen flex flex-col tac-grid font-tac">
      {/* Header */}
      <header className="px-6 pb-6 text-center" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 3rem)" }}>
        <div
          className="font-data text-xs tracking-widest mb-5"
          style={{ color: "rgba(245,158,11,0.5)", letterSpacing: "0.18em" }}
        >
          ◈ WELCOME, OPERATOR ◈
        </div>
        <h1
          className="font-display text-white"
          style={{ fontSize: "3.6rem", lineHeight: 1, letterSpacing: "0.04em" }}
        >
          MATKEN<span style={{ color: "#f59e0b" }}>GAME</span>
        </h1>
        <p
          className="font-data text-xs mt-3"
          style={{ color: "#475569", letterSpacing: "0.16em" }}
        >
          MILITARY VEHICLE RECOGNITION TRAINING
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-10 max-w-md mx-auto w-full">
        <TacCard className="w-full mb-5" style={{ padding: "28px 26px" }}>
          <div
            className="font-data text-xs tracking-widest mb-3 text-center"
            style={{ color: "rgba(245,158,11,0.5)", letterSpacing: "0.16em" }}
          >
            OPERATOR REGISTRATION
          </div>
          <p
            className="text-sm text-center mb-6"
            style={{ color: "#94a3b8", lineHeight: 1.55 }}
          >
            Select a callsign for the leaderboard.
            <br />
            <span style={{ color: "#475569" }}>You can change it later from the home screen.</span>
          </p>

          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>
            CALLSIGN (1–16 CHARS)
          </div>
          <input
            type="text"
            value={value}
            maxLength={16}
            autoFocus
            spellCheck={false}
            onChange={(e) => setValue(e.target.value.toUpperCase())}
            onKeyDown={handleKey}
            placeholder="GHOST"
            style={{
              display: "block",
              width: "100%",
              background: "rgba(15,23,42,0.85)",
              border: `1px solid ${canSave ? "rgba(245,158,11,0.4)" : "rgba(51,65,85,0.5)"}`,
              borderRadius: 2,
              padding: "12px 14px",
              color: "#f59e0b",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "2rem",
              letterSpacing: "0.1em",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </TacCard>

        <button
          onClick={handleSave}
          disabled={!canSave}
          className="w-full font-display tracking-widest"
          style={{
            fontSize: "1.45rem",
            minHeight: 58,
            borderRadius: 2,
            background: canSave ? "#f59e0b" : "rgba(30,41,59,0.7)",
            color: canSave ? "#070b14" : "#334155",
            border: canSave ? "none" : "1px solid rgba(51,65,85,0.5)",
            letterSpacing: "0.14em",
            cursor: canSave ? "pointer" : "not-allowed",
          }}
        >
          ▶  DEPLOY
        </button>
      </main>

      <footer className="text-center" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}>
        <span className="font-data text-xs" style={{ color: "#1e293b", letterSpacing: "0.12em" }}>
          v0.2.0 · CLASSIFIED
        </span>
      </footer>
    </div>
  );
}

// ============================================================================
// Home Screen
// ============================================================================

function HomeScreen({ onPlay, totalInCategory, playableCount, usingDraft,
                      selectedCategory, onCategoryChange, categoryCounts,
                      selectedEra, onEraChange, eraCounts,
                      selectedPact, onPactChange, pactCounts,
                      selectedNation, onNationChange, availableNations,
                      selectedDifficulty, onDifficultyChange, difficultyCounts,
                      selectedMode, onModeChange,
                      bestScore, onViewStats, onViewLeaderboard,
                      callsign, onEditCallsign }) {
  const canPlay = playableCount > 0;

  return (
    <div
      className="min-h-screen flex flex-col tac-grid font-tac"
    >
      {/* Draft warning */}
      {usingDraft && (
        <div
          className="font-data text-xs text-center px-4 border-b"
          style={{
            background: "rgba(120,80,0,0.3)",
            borderColor: "rgba(245,158,11,0.3)",
            color: "#fcd34d",
            letterSpacing: "0.06em",
            paddingTop: "calc(env(safe-area-inset-top, 0px) + 8px)",
            paddingBottom: 8,
          }}
        >
          ⚠ PREVIEW MODE — LOCAL ADMIN DRAFT ACTIVE
        </div>
      )}

      {/* Title block */}
      <header className="px-6 pb-6 text-center" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 2.5rem)" }}>
        <h1
          className="font-display text-white"
          style={{ fontSize: "clamp(3rem, 13vw, 4.8rem)", lineHeight: 1, letterSpacing: "0.04em", textAlign: "center", width: "100%" }}
        >
          MATKEN<span style={{ color: "#f59e0b" }}>GAME</span>
        </h1>
        <p
          className="font-data text-xs mt-3"
          style={{ color: "#475569", letterSpacing: "0.16em" }}
        >
          MILITARY VEHICLE RECOGNITION TRAINING
        </p>

      </header>

      <main
        className="flex-1 flex flex-col items-center px-6 pb-10 max-w-md mx-auto w-full"
        style={{ overflowY: "auto", WebkitOverflowScrolling: "touch" }}
      >
        {/* Mission intel card */}
        <TacCard className="w-full mb-6" style={{ padding: "24px 28px" }}>
          <div
            className="font-data text-xs tracking-widest mb-5"
            style={{ color: "rgba(245,158,11,0.4)", letterSpacing: "0.14em" }}
          >
            MISSION INTEL
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div
                className="font-display text-white"
                style={{ fontSize: "3.8rem", lineHeight: 1 }}
              >
                {playableCount}
              </div>
              <div
                className="text-sm font-semibold tracking-wider mt-1"
                style={{ color: "#64748b", letterSpacing: "0.1em" }}
              >
                VEHICLES READY
              </div>
            </div>
            <div className="text-right">
              <div
                className="font-display"
                style={{ fontSize: "2.8rem", lineHeight: 1, color: "#f59e0b" }}
              >
                10
              </div>
              <div
                className="text-sm font-semibold tracking-wider mt-1"
                style={{ color: "#64748b", letterSpacing: "0.1em" }}
              >
                PER ROUND
              </div>
            </div>
          </div>
          {/* Divider row — drafts note + best score */}
          <div
            className="mt-5 pt-4 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(51,65,85,0.4)" }}
          >
            <span className="font-data text-xs" style={{ color: "#334155", letterSpacing: "0.08em" }}>
              {totalInCategory - playableCount > 0
                ? `${totalInCategory - playableCount} DRAFT${totalInCategory - playableCount !== 1 ? "S" : ""} — NO IMAGES`
                : "ALL VEHICLES READY"}
            </span>
            <span className="font-data text-xs" style={{ color: bestScore != null ? "#f59e0b" : "#334155", letterSpacing: "0.08em" }}>
              {selectedMode === "timed" ? "⏱ " : ""}BEST&nbsp;
              <span style={{ color: bestScore != null ? "#f59e0b" : "#1e293b" }}>
                {bestScore != null ? `${bestScore}` : "—"}
              </span>
            </span>
          </div>
        </TacCard>

        {/* Category selector */}
        <div className="w-full mb-4">
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>
            CATEGORY
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.filter((opt) => !opt.hidden).map((opt) => {
              const isSelected = selectedCategory === opt.id;
              const count = categoryCounts[opt.id] ?? 0;
              return (
                <button
                  key={opt.id}
                  onClick={() => onCategoryChange(opt.id)}
                  className="font-data"
                  style={{
                    fontSize: "0.72rem",
                    padding: "5px 12px",
                    borderRadius: 2,
                    letterSpacing: "0.1em",
                    minHeight: 44,
                    border: `1px solid ${isSelected ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                    background: isSelected ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                    color: isSelected ? "#f59e0b" : count > 0 ? "#64748b" : "#1e293b",
                    opacity: count === 0 && !isSelected ? 0.45 : 1,
                    cursor: "pointer",
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Era selector */}
        <div className="w-full mb-4">
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>
            ERA
          </div>
          <div className="flex flex-wrap gap-2">
            {ERA_OPTIONS.filter((opt) => !opt.hidden).map((opt) => {
              const isSelected = selectedEra === opt.id;
              const count = eraCounts[opt.id] ?? 0;
              return (
                <button
                  key={opt.id}
                  onClick={() => onEraChange(opt.id)}
                  className="font-data"
                  style={{
                    fontSize: "0.72rem",
                    padding: "5px 12px",
                    borderRadius: 2,
                    letterSpacing: "0.1em",
                    minHeight: 44,
                    border: `1px solid ${isSelected ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                    background: isSelected ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                    color: isSelected ? "#f59e0b" : count > 0 ? "#64748b" : "#1e293b",
                    opacity: count === 0 && !isSelected ? 0.45 : 1,
                    cursor: "pointer",
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pact selector */}
        <div className="w-full mb-4">
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>
            ALLIANCE
          </div>
          <div className="flex flex-wrap gap-2">
            {PACT_OPTIONS.filter((opt) => !opt.hidden).map((opt) => {
              const isSelected = selectedPact === opt.id;
              const count = pactCounts[opt.id] ?? 0;
              return (
                <button
                  key={opt.id}
                  onClick={() => onPactChange(opt.id)}
                  className="font-data"
                  style={{
                    fontSize: "0.72rem",
                    padding: "5px 12px",
                    borderRadius: 2,
                    letterSpacing: "0.1em",
                    minHeight: 44,
                    border: `1px solid ${isSelected ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                    background: isSelected ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                    color: isSelected ? "#f59e0b" : count > 0 ? "#64748b" : "#1e293b",
                    opacity: count === 0 && !isSelected ? 0.45 : 1,
                    cursor: "pointer",
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Nation selector — HIDDEN: change `false` to `true` to restore */}
        {false && <div className="w-full mb-4">
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>
            NATION
          </div>
          <div className="relative">
            <select
              value={selectedNation}
              onChange={(e) => onNationChange(e.target.value)}
              className="w-full font-data"
              style={{
                fontSize: "0.72rem",
                padding: "8px 32px 8px 12px",
                borderRadius: 2,
                letterSpacing: "0.1em",
                minHeight: 44,
                border: `1px solid ${selectedNation !== "all" ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                background: selectedNation !== "all" ? "rgba(245,158,11,0.08)" : "rgba(15,23,42,0.5)",
                color: selectedNation !== "all" ? "#f59e0b" : "#64748b",
                appearance: "none",
                WebkitAppearance: "none",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <option value="all" style={{ background: "#0d1526", color: "#94a3b8" }}>ALL NATIONS</option>
              {availableNations.map((nation) => (
                <option key={nation} value={nation} style={{ background: "#0d1526", color: "#e2e8f0" }}>
                  {nation.toUpperCase()}
                </option>
              ))}
            </select>
            <div
              className="pointer-events-none absolute"
              style={{
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: selectedNation !== "all" ? "#f59e0b" : "#475569",
                fontSize: "0.75rem",
                lineHeight: 1,
              }}
            >
              ▾
            </div>
          </div>
        </div>}

        {/* Difficulty selector */}
        <div className="w-full mb-5">
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>
            DIFFICULTY
          </div>
          <div className="flex gap-2">
            {DIFFICULTY_OPTIONS.map((opt) => {
              const isSelected = selectedDifficulty === opt.id;
              const count = difficultyCounts[opt.id] ?? 0;
              return (
                <button
                  key={opt.id}
                  onClick={() => onDifficultyChange(opt.id)}
                  className="font-data flex-1"
                  style={{
                    fontSize: "0.72rem",
                    padding: "8px 8px",
                    borderRadius: 2,
                    letterSpacing: "0.1em",
                    minHeight: 44,
                    border: `1px solid ${isSelected ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                    background: isSelected ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                    color: isSelected ? "#f59e0b" : count > 0 ? "#64748b" : "#1e293b",
                    opacity: count === 0 && !isSelected ? 0.45 : 1,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ color: isSelected ? "#f59e0b" : "#475569", fontSize: "0.85rem" }}>{opt.stars}</span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mode selector */}
        <div className="w-full mb-5">
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>
            MODE
          </div>
          <div className="flex gap-2">
            {[
              { id: "normal", label: "NORMAL", sub: "10 × 100 pts" },
              { id: "timed",  label: "TIMED",  sub: "15s · speed bonus" },
            ].map((opt) => {
              const isSel = selectedMode === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onModeChange(opt.id)}
                  className="font-data flex-1"
                  style={{
                    padding: "8px",
                    borderRadius: 2,
                    letterSpacing: "0.1em",
                    minHeight: 46,
                    border: `1px solid ${isSel ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                    background: isSel ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                    color: isSel ? "#f59e0b" : "#64748b",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                  }}
                >
                  <span style={{ fontSize: "0.72rem" }}>{opt.label}</span>
                  <span style={{ fontSize: "0.58rem", opacity: 0.65, letterSpacing: "0.06em" }}>{opt.sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Begin training button */}
        <button
          onClick={onPlay}
          disabled={!canPlay}
          className="w-full font-display tracking-widest tac-primary mb-6"
          style={{
            fontSize: "1.45rem",
            minHeight: "58px",
            borderRadius: 2,
            letterSpacing: "0.14em",
            background: canPlay ? "#f59e0b" : "rgba(30,41,59,0.7)",
            color: canPlay ? "#070b14" : "#334155",
            border: canPlay ? "none" : "1px solid rgba(51,65,85,0.5)",
            cursor: canPlay ? "pointer" : "not-allowed",
          }}
        >
          {canPlay ? "▶  BEGIN TRAINING" : "NO VEHICLES LOADED"}
        </button>

        {/* Secondary nav row — Performance log + Leaderboard + Operator chip */}
        <div className="w-full flex gap-2 mb-5">
          <button
            onClick={onViewStats}
            className="flex-1 font-data text-xs"
            style={{
              background: "transparent",
              border: "1px solid rgba(51,65,85,0.35)",
              borderRadius: 2,
              color: "#475569",
              letterSpacing: "0.12em",
              cursor: "pointer",
              minHeight: 44,
            }}
          >
            ◆ PERF LOG
          </button>
          <button
            onClick={onViewLeaderboard}
            className="flex-1 font-data text-xs"
            style={{
              background: "transparent",
              border: "1px solid rgba(51,65,85,0.35)",
              borderRadius: 2,
              color: "#475569",
              letterSpacing: "0.12em",
              cursor: "pointer",
              minHeight: 44,
            }}
          >
            ⊞ LEADERBOARD
          </button>
          {/* Operator callsign chip — tap to edit */}
          {callsign && (
            <button
              onClick={onEditCallsign}
              className="flex-1 font-data text-xs"
              style={{
                background: "transparent",
                border: "1px solid rgba(245,158,11,0.22)",
                borderRadius: 2,
                color: "#475569",
                letterSpacing: "0.1em",
                cursor: "pointer",
                minHeight: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <span style={{ color: "#f59e0b" }}>{callsign}</span>
              <span style={{ fontSize: "0.6rem", opacity: 0.5 }}>✎</span>
            </button>
          )}
        </div>

      </main>

      <footer className="text-center" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}>
        <span
          className="font-data text-xs"
          style={{ color: "#1e293b", letterSpacing: "0.12em" }}
        >
          v0.2.0 · CLASSIFIED
        </span>
      </footer>
    </div>
  );
}

// ============================================================================
// Quiz Screen
// ============================================================================

function QuizScreen({ round, onComplete, onAbort, mode = "normal" }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore]                 = useState(0);
  const [selectedId, setSelectedId]       = useState(null);
  const [timedOut, setTimedOut]           = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(QUESTION_TIME_MS);
  // Hint system — hintsUsed accumulates across the whole round;
  // eliminatedIds resets per question so only the current question's
  // wrong answers can be eliminated.
  const [hintsUsed, setHintsUsed]         = useState(0);
  const [eliminatedIds, setEliminatedIds] = useState(() => new Set());

  // Refs so timer callbacks always see fresh values without stale-closure issues
  const timerIntervalRef  = useRef(null);
  const questionStartRef  = useRef(null);

  const isTimed        = mode === "timed";
  const question       = round[questionIndex];
  const isLastQuestion = questionIndex === round.length - 1;
  const hasAnswered    = selectedId !== null || timedOut;
  const isCorrect      = selectedId !== null && selectedId === question.vehicle.id;

  // How many wrong answers can still be eliminated on this question
  const eliminableWrong = question.options.filter(
    (opt) => opt.id !== question.vehicle.id && !eliminatedIds.has(opt.id)
  ).length;
  const canUseHint = !hasAnswered && hintsUsed < MAX_HINTS && eliminableWrong > 0;

  // Start (or restart) the countdown whenever the question index changes
  useEffect(() => {
    if (!isTimed) return;
    setTimeRemaining(QUESTION_TIME_MS);
    setTimedOut(false);
    questionStartRef.current = Date.now();

    timerIntervalRef.current = setInterval(() => {
      const elapsed   = Date.now() - questionStartRef.current;
      const remaining = Math.max(0, QUESTION_TIME_MS - elapsed);
      setTimeRemaining(remaining);
      if (remaining === 0) {
        clearInterval(timerIntervalRef.current);
        setTimedOut(true);
      }
    }, 100);

    return () => clearInterval(timerIntervalRef.current);
  }, [questionIndex, isTimed]);

  // Reset eliminated IDs whenever the question advances
  useEffect(() => {
    setEliminatedIds(new Set());
  }, [questionIndex]);

  // After a timeout, briefly show the correct answer then auto-advance
  useEffect(() => {
    if (!timedOut) return;
    const t = setTimeout(() => {
      if (isLastQuestion) {
        onComplete(score, hintsUsed);
      } else {
        setQuestionIndex((i) => i + 1);
        setSelectedId(null);
        setTimedOut(false);
      }
    }, 1500);
    return () => clearTimeout(t);
  }, [timedOut]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAbort = () => {
    if (confirm("Abort mission? Your progress in this round will be lost.")) {
      clearInterval(timerIntervalRef.current);
      onAbort();
    }
  };

  // Eliminate one random wrong answer on the current question
  const handleHint = () => {
    if (!canUseHint) return;
    const wrong = question.options.filter(
      (opt) => opt.id !== question.vehicle.id && !eliminatedIds.has(opt.id)
    );
    const pick = wrong[Math.floor(Math.random() * wrong.length)];
    setEliminatedIds((prev) => new Set([...prev, pick.id]));
    setHintsUsed((n) => n + 1);
  };

  const handleSelect = (vehicleId) => {
    if (hasAnswered) return;
    clearInterval(timerIntervalRef.current);
    setSelectedId(vehicleId);

    if (vehicleId === question.vehicle.id) {
      let pts = POINTS_PER_CORRECT;
      // Speed bonus: full 50 pts if answered within SPEED_BONUS_MAX_MS, linear falloff to 0
      if (isTimed && questionStartRef.current) {
        const elapsed = Date.now() - questionStartRef.current;
        const bonus   = Math.round(
          SPEED_BONUS_MAX * Math.max(0, (SPEED_BONUS_MAX_MS - elapsed) / SPEED_BONUS_MAX_MS)
        );
        pts += bonus;
      }
      setScore((s) => s + pts);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score, hintsUsed);
    } else {
      setQuestionIndex((i) => i + 1);
      setSelectedId(null);
      setTimedOut(false);
    }
  };

  // Timer bar visuals — amber with plenty of time, orange at 8s, red below 4s
  const timerPct   = (timeRemaining / QUESTION_TIME_MS) * 100;
  const timerColor = timeRemaining > 8000 ? "#f59e0b"
                   : timeRemaining > 4000 ? "#fb923c"
                   : "#ef4444";

  // Inline style for each answer button based on current state
  const optionStyle = (optionId) => {
    const base = {
      width: "100%",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      gap: 14,
      borderRadius: 2,
      padding: "11px 14px",
      minHeight: 52,
      fontFamily: "'Rajdhani', sans-serif",
      cursor: hasAnswered ? "default" : "pointer",
      border: "1px solid",
      transition: "border-color 0.15s, background 0.15s",
    };
    // Eliminated by hint — heavily dimmed, before answering only
    if (!hasAnswered && eliminatedIds.has(optionId)) return {
      ...base,
      background: "rgba(15,23,42,0.2)",
      borderColor: "rgba(30,41,59,0.2)",
      color: "#1e293b",
      opacity: 0.3,
      cursor: "not-allowed",
    };
    if (!hasAnswered) return {
      ...base,
      background: "rgba(15,23,42,0.85)",
      borderColor: "rgba(245,158,11,0.2)",
      color: "#e2e8f0",
    };
    if (optionId === question.vehicle.id) return {
      ...base,
      background: "rgba(34,197,94,0.1)",
      borderColor: "#22c55e",
      color: "#86efac",
    };
    if (optionId === selectedId) return {
      ...base,
      background: "rgba(239,68,68,0.1)",
      borderColor: "#ef4444",
      color: "#fca5a5",
    };
    return {
      ...base,
      background: "rgba(15,23,42,0.4)",
      borderColor: "rgba(30,41,59,0.5)",
      color: "#334155",
      opacity: 0.45,
    };
  };

  // Amber letter badge colours per option state
  const badgeStyle = (optionId) => {
    const base = {
      width: 32, height: 32, borderRadius: 2,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "1.1rem",
      flexShrink: 0,
    };
    if (!hasAnswered && eliminatedIds.has(optionId)) return { ...base, background: "rgba(15,23,42,0.2)", color: "#1e293b" };
    if (!hasAnswered) return { ...base, background: "rgba(245,158,11,0.15)", color: "#f59e0b" };
    if (optionId === question.vehicle.id) return { ...base, background: "rgba(34,197,94,0.2)", color: "#4ade80" };
    if (optionId === selectedId)          return { ...base, background: "rgba(239,68,68,0.2)",  color: "#f87171" };
    return { ...base, background: "rgba(30,41,59,0.5)", color: "#334155" };
  };

  const letters      = ["A", "B", "C", "D"];
  const progressPct  = ((questionIndex + (hasAnswered ? 1 : 0)) / round.length) * 100;

  return (
    <div
      className="quiz-shell font-tac"
      style={{ display: "flex", flexDirection: "column", background: "#070b14", overflow: "hidden" }}
    >
      {/* ── Header ──────────────────────────────────────── */}
      <header
        style={{
          background: "#0d1526",
          borderBottom: "1px solid rgba(245,158,11,0.12)",
          padding: "calc(env(safe-area-inset-top, 0px) + 12px) 16px 10px",
          flexShrink: 0,
        }}
      >
        <div className="max-w-md mx-auto w-full">
          {/* 4-item row: ABORT · 1/10 · SCORE · HINT — space-between gives identical gaps */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>

            {/* ABORT */}
            <button
              onClick={handleAbort}
              className="font-data"
              style={{
                fontSize: "0.66rem",
                padding: "0 10px",
                height: 36,
                background: "rgba(15,23,42,0.6)",
                border: "1px solid rgba(239,68,68,0.35)",
                borderRadius: 2,
                color: "#f87171",
                letterSpacing: "0.1em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              ✕ ABORT
            </button>

            {/* Question counter */}
            <div style={{ textAlign: "center", lineHeight: 1 }}>
              <span
                className="font-display"
                style={{ fontSize: "1.45rem", letterSpacing: "0.04em", color: "#f59e0b" }}
              >
                {questionIndex + 1}
              </span>
              <span
                className="font-display"
                style={{ fontSize: "1.1rem", letterSpacing: "0.04em", color: "#334155" }}
              >
                /{round.length}
              </span>
            </div>

            {/* Score */}
            <div style={{ textAlign: "center", lineHeight: 1 }}>
              <div className="font-data" style={{ fontSize: "0.55rem", color: "#334155", letterSpacing: "0.12em", marginBottom: 1 }}>SCORE</div>
              <div className="font-display" style={{ fontSize: "1.45rem", letterSpacing: "0.04em", color: "#f59e0b", lineHeight: 1 }}>{score}</div>
            </div>

            {/* HINT */}
            <button
              onClick={handleHint}
              disabled={!canUseHint}
              className="font-data"
              style={{
                fontSize: "0.62rem",
                padding: "0 10px",
                height: 36,
                letterSpacing: "0.1em",
                borderRadius: 2,
                background: canUseHint ? "rgba(245,158,11,0.1)" : "transparent",
                border: `1px solid ${canUseHint ? "rgba(245,158,11,0.3)" : "rgba(30,41,59,0.35)"}`,
                color: canUseHint ? "#f59e0b" : "#1e293b",
                cursor: canUseHint ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                gap: 5,
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              HINT
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: canUseHint ? "rgba(245,158,11,0.2)" : "rgba(30,41,59,0.4)",
                  fontSize: "0.6rem",
                  lineHeight: 1,
                  color: canUseHint ? "#f59e0b" : "#1e293b",
                }}
              >
                {MAX_HINTS - hintsUsed}
              </span>
            </button>

          </div>

          {/* Round progress bar */}
          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: 3, background: "rgba(245,158,11,0.1)", marginBottom: isTimed ? 5 : 0 }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPct}%`,
                background: "#f59e0b",
                transition: "width 0.4s ease",
                borderRadius: 9999,
              }}
            />
          </div>

          {/* Countdown timer bar — timed mode only */}
          {isTimed && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                className="flex-1 overflow-hidden"
                style={{ height: 4, background: "rgba(239,68,68,0.12)", borderRadius: 2 }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${timerPct}%`,
                    background: timerColor,
                    borderRadius: 2,
                    transition: "background 0.3s ease",
                  }}
                />
              </div>
              <span
                className="font-display"
                style={{
                  fontSize: "1rem",
                  lineHeight: 1,
                  color: timedOut ? "#ef4444" : timerColor,
                  minWidth: 24,
                  textAlign: "right",
                  letterSpacing: "0.02em",
                }}
              >
                {timedOut ? "0" : Math.ceil(timeRemaining / 1000)}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ── Target image ────────────────────────────────── */}
      <div
        style={{
          flex: "1 1 0",
          minHeight: 0,
          position: "relative",
          overflow: "hidden",
          background: "#0a0e1a",
          maxWidth: 448,
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <img
          src={question.image.url}
          alt="Military vehicle to identify"
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", clipPath: "inset(10px)" }}
        />
        {/* Targeting brackets */}
        <TargetBrackets size={26} color="#f59e0b" thickness={2} inset={10} />
        {/* Bottom label overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 p-3"
          style={{
            background: "linear-gradient(to top, rgba(7,11,20,0.88), transparent)",
          }}
        >
          <span
            className="font-data text-xs"
            style={{ color: "rgba(245,158,11,0.65)", letterSpacing: "0.14em" }}
          >
            ◉ IDENTIFY TARGET
          </span>
        </div>
      </div>

      {/* ── Answers + result ───────────────────────────── */}
      <main
        style={{
          flexShrink: 0,
          overflowY: "auto",
          padding: "12px 16px",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
          maxWidth: 448,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          fontFamily: "'Rajdhani', sans-serif",
        }}
      >
        <div className="flex flex-col gap-2">
          {question.options.map((option, i) => {
            const isThisCorrect  = option.id === question.vehicle.id;
            const isThisSelected = option.id === selectedId;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={hasAnswered || eliminatedIds.has(option.id)}
                style={optionStyle(option.id)}
                className={!hasAnswered ? "tac-answer" : ""}
              >
                {/* Letter badge */}
                <span style={badgeStyle(option.id)}>{letters[i]}</span>

                {/* Vehicle info */}
                <span className="flex-1 text-left">
                  <span
                    className="block font-semibold"
                    style={{ fontSize: "1.05rem", letterSpacing: "0.02em" }}
                  >
                    {option.name}
                  </span>
                  <span
                    className="block font-data"
                    style={{ fontSize: "0.7rem", opacity: 0.65, letterSpacing: "0.06em" }}
                  >
                    {option.country}
                  </span>
                </span>

                {/* Result icon */}
                {hasAnswered && isThisCorrect && (
                  <span style={{ color: "#4ade80", fontSize: "1.1rem", fontWeight: 700 }}>✓</span>
                )}
                {hasAnswered && isThisSelected && !isThisCorrect && (
                  <span style={{ color: "#f87171", fontSize: "1.1rem", fontWeight: 700 }}>✗</span>
                )}
              </button>
            );
          })}
        </div>


        {/* Timed-out label — replaces the next button briefly while auto-advancing */}
        {timedOut && (
          <div
            className="w-full mt-4 font-data text-xs text-center"
            style={{ color: "#ef4444", letterSpacing: "0.14em", minHeight: 52,
              display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            TIME EXPIRED — ADVANCING...
          </div>
        )}

        {/* Next / finish button — visible once answered (not on timeout, which auto-advances) */}
        {!timedOut && (
          <button
            onClick={handleNext}
            disabled={!hasAnswered}
            className="w-full mt-4 font-display tracking-widest tac-primary"
            style={{
              fontSize: "1.35rem",
              minHeight: "52px",
              borderRadius: 2,
              background: hasAnswered ? "#f59e0b" : "rgba(30,41,59,0.7)",
              color: hasAnswered ? "#070b14" : "#334155",
              border: hasAnswered ? "none" : "1px solid rgba(51,65,85,0.5)",
              letterSpacing: "0.14em",
              cursor: hasAnswered ? "pointer" : "not-allowed",
            }}
          >
            {isLastQuestion ? "DEBRIEF  →" : "NEXT TARGET  →"}
          </button>
        )}
      </main>
    </div>
  );
}

// ============================================================================
// End Screen
// ============================================================================

function EndScreen({ score, total, onPlayAgain, onReturnHome,
                    callsign, onEditCallsign,
                    selectedCategory, selectedDifficulty, onViewLeaderboard,
                    mode = "normal", hintsUsed = 0 }) {
  const pct = Math.min(100, Math.round((score / total) * 100));
  const [submitState, setSubmitState] = useState("idle"); // "idle"|"submitting"|"submitted"|"error"
  const [submitError, setSubmitError]  = useState("");
  const [wasNewBest,  setWasNewBest]   = useState(false);

  const handleSubmit = async () => {
    if (!callsign || submitState !== "idle") return;
    setSubmitState("submitting");
    try {
      const { newBest } = await submitScore({
        callsign, score, total,
        category: selectedCategory, difficulty: selectedDifficulty,
        mode, hintsUsed,
      });
      setWasNewBest(newBest);
      setSubmitState("submitted");
    } catch (err) {
      setSubmitError(err.message || "Submission failed — check your connection");
      setSubmitState("error");
    }
  };

  const diffLabel = DIFFICULTY_OPTIONS.find((d) => d.id === selectedDifficulty)?.stars ?? "";
  const catLabel  = { "all": "ALL", "Main Battle Tank": "MBT", "APC": "APC",
                      "IFV": "IFV", "Artillery": "ARTY", "Helicopter": "HELO" }[selectedCategory] ?? selectedCategory;

  return (
    <div className="min-h-screen flex flex-col tac-grid font-tac">
      <header className="text-center px-6 pb-6" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 2.5rem)" }}>
        <div
          className="font-data text-xs tracking-widest mb-4"
          style={{ color: "rgba(245,158,11,0.5)", letterSpacing: "0.18em" }}
        >
          ◈ MISSION COMPLETE ◈
        </div>
        <h1
          className="font-display text-white"
          style={{ fontSize: "4rem", letterSpacing: "0.08em" }}
        >
          DEBRIEF
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pb-10 max-w-md mx-auto w-full">
        {/* Score card */}
        <TacCard className="w-full text-center mb-5" style={{ padding: "28px 28px" }}>
          {/* Score fraction — sized for up to "1000/1000" */}
          <div
            className="font-display"
            style={{ fontSize: "4rem", lineHeight: 1, letterSpacing: "0.04em" }}
          >
            <span className="text-white">{score}</span>
            <span style={{ fontSize: "1.6rem", color: "#334155", marginLeft: 2 }}>/{total}</span>
          </div>

          {/* Percent bar */}
          <div className="mx-auto my-4" style={{ height: 3, background: "rgba(245,158,11,0.12)", borderRadius: 2, maxWidth: 180 }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "#f59e0b", borderRadius: 2, transition: "width 0.7s ease" }} />
          </div>

          {/* Rating */}
          <div
            className="font-display tracking-widest mb-2"
            style={{ fontSize: "1.5rem", color: scoreLabelColor(score), letterSpacing: "0.12em" }}
          >
            {scoreLabel(score)}
          </div>
          <div style={{ color: "#475569", fontSize: "0.95rem" }}>{scoreSubtext(score)}</div>

          {/* Hint penalty note */}
          {hintsUsed > 0 && (
            <div
              className="font-data text-xs mt-3"
              style={{ color: "#f87171", letterSpacing: "0.08em" }}
            >
              −{hintsUsed * HINT_PENALTY} PTS · {hintsUsed} HINT{hintsUsed > 1 ? "S" : ""} USED
            </div>
          )}

          {/* Session badges */}
          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
            <span className="font-data text-xs px-2 py-1" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 2, color: "#64748b", letterSpacing: "0.08em" }}>
              {catLabel}
            </span>
            <span className="font-data text-xs px-2 py-1" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 2, color: "#64748b", letterSpacing: "0.08em" }}>
              {diffLabel}
            </span>
            <span className="font-data text-xs px-2 py-1" style={{ background: mode === "timed" ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)", border: `1px solid ${mode === "timed" ? "rgba(239,68,68,0.25)" : "rgba(245,158,11,0.2)"}`, borderRadius: 2, color: mode === "timed" ? "#fca5a5" : "#64748b", letterSpacing: "0.08em" }}>
              {mode === "timed" ? "⏱ TIMED" : "NORMAL"}
            </span>
          </div>
        </TacCard>

        {/* Leaderboard submission card */}
        <TacCard className="w-full mb-5" style={{ padding: "18px 20px" }}>
          <div className="font-data text-xs mb-3" style={{ color: "#334155", letterSpacing: "0.12em" }}>
            LEADERBOARD SUBMISSION
          </div>

          {/* No callsign yet — show a prominent prompt */}
          {!callsign && (
            <button
              onClick={onEditCallsign}
              className="w-full font-display tracking-widest mb-2"
              style={{
                fontSize: "1.25rem",
                minHeight: 52,
                borderRadius: 2,
                background: "#f59e0b",
                color: "#070b14",
                border: "none",
                letterSpacing: "0.14em",
                cursor: "pointer",
              }}
            >
              ✎  SET CALLSIGN
            </button>
          )}

          {/* Callsign set — show name + change button + submit */}
          {callsign && (
            <>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-data text-xs mb-1" style={{ color: "#334155", letterSpacing: "0.08em" }}>CALLSIGN</div>
                  <div className="font-display" style={{ fontSize: "1.5rem", color: "#f59e0b", letterSpacing: "0.06em" }}>
                    {callsign}
                  </div>
                </div>
                <button
                  onClick={onEditCallsign}
                  className="font-data text-xs"
                  style={{
                    background: "rgba(15,23,42,0.8)", border: "1px solid rgba(51,65,85,0.5)",
                    borderRadius: 2, color: "#475569", letterSpacing: "0.1em",
                    cursor: "pointer", padding: "6px 12px",
                  }}
                >
                  CHANGE
                </button>
              </div>

              {submitState === "submitted" ? (
                <div className="w-full font-data text-xs text-center py-3" style={{ letterSpacing: "0.1em" }}>
                  {wasNewBest ? (
                    <span style={{ color: "#4ade80" }}>✓ NEW PERSONAL BEST — LEADERBOARD UPDATED</span>
                  ) : (
                    <span style={{ color: "#475569" }}>NOT A NEW PERSONAL BEST — SCORE NOT RECORDED</span>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitState === "submitting"}
                  className="w-full font-display tracking-widest"
                  style={{
                    fontSize: "1.1rem",
                    minHeight: 44,
                    borderRadius: 2,
                    background: submitState === "idle" ? "rgba(245,158,11,0.15)" : "rgba(15,23,42,0.5)",
                    color: submitState === "idle" ? "#f59e0b" : "#334155",
                    border: `1px solid ${submitState === "idle" ? "rgba(245,158,11,0.4)" : "rgba(51,65,85,0.3)"}`,
                    letterSpacing: "0.14em",
                    cursor: submitState === "idle" ? "pointer" : "not-allowed",
                  }}
                >
                  {submitState === "submitting" ? "TRANSMITTING..." : "SUBMIT SCORE"}
                </button>
              )}
            </>
          )}

          {submitState === "error" && (
            <div className="font-data text-xs mt-2 text-center" style={{ color: "#f87171", letterSpacing: "0.06em" }}>
              {submitError}
            </div>
          )}
        </TacCard>

        {/* Redeploy button (primary — same category again) */}
        <button
          onClick={onPlayAgain}
          className="w-full font-display tracking-widest tac-primary"
          style={{
            fontSize: "1.45rem",
            minHeight: "58px",
            borderRadius: 2,
            background: "#f59e0b",
            color: "#070b14",
            border: "none",
            letterSpacing: "0.14em",
            cursor: "pointer",
            marginBottom: 10,
          }}
        >
          ↺  REDEPLOY
        </button>

        {/* View leaderboard + change category */}
        <div className="w-full flex gap-2 mb-2">
          <button
            onClick={() => onViewLeaderboard(selectedCategory, selectedDifficulty)}
            className="flex-1 font-display tracking-widest"
            style={{
              fontSize: "0.95rem",
              minHeight: "44px",
              borderRadius: 2,
              background: "transparent",
              color: "#f59e0b",
              border: "1px solid rgba(245,158,11,0.35)",
              letterSpacing: "0.1em",
              cursor: "pointer",
            }}
          >
            ⊞ LEADERBOARD
          </button>
          <button
            onClick={onReturnHome}
            className="flex-1 font-display tracking-widest"
            style={{
              fontSize: "0.95rem",
              minHeight: "44px",
              borderRadius: 2,
              background: "transparent",
              color: "#64748b",
              border: "1px solid rgba(51,65,85,0.4)",
              letterSpacing: "0.1em",
              cursor: "pointer",
            }}
          >
            ← CHANGE CAT
          </button>
        </div>
      </main>

      <footer className="text-center" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}>
        <span className="font-data text-xs" style={{ color: "#1e293b", letterSpacing: "0.12em" }}>
          v0.2.0 · CLASSIFIED
        </span>
      </footer>
    </div>
  );
}

// ============================================================================
// Stats Screen
// ============================================================================

function StatsScreen({ bestScores, onReturnHome, onClearScores }) {
  // Returns the best normal-mode score (points, 0–1000) for the cat × diff combination,
  // or null if nothing on record. Timed mode bests can be added as a separate column later.
  const getScore = (catId, diffId) => bestScores?.[catId]?.[diffId]?.normal ?? null;

  const hasAnyScore = CATEGORY_OPTIONS.some((cat) =>
    DIFFICULTY_OPTIONS.some((diff) => getScore(cat.id, diff.id) !== null)
  );

  // Highest single score across all category × difficulty combinations
  let overallBest = null;
  CATEGORY_OPTIONS.forEach((cat) => {
    DIFFICULTY_OPTIONS.forEach((diff) => {
      const s = getScore(cat.id, diff.id);
      if (s !== null && (overallBest === null || s > overallBest)) overallBest = s;
    });
  });

  const handleClear = () => {
    if (confirm("Clear all performance records? This cannot be undone.")) {
      onClearScores();
    }
  };

  // Full category labels for the stats table (more readable than abbreviations)
  const categoryLabels = {
    "all":              "ALL",
    "Main Battle Tank": "MBT",
    "APC":              "APC",
    "IFV":              "IFV",
    "Artillery":        "ARTY",
    "Helicopter":       "HELO",
  };

  return (
    <div className="min-h-screen flex flex-col tac-grid font-tac">
      {/* Header */}
      <header className="px-6 pb-4 text-center" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 2.5rem)" }}>
        <div
          className="font-data text-xs tracking-widest mb-5"
          style={{ color: "rgba(245,158,11,0.5)", letterSpacing: "0.18em" }}
        >
          ◈ INTEL ARCHIVE ◈
        </div>
        <h1
          className="font-display text-white"
          style={{ fontSize: "4rem", lineHeight: 1, letterSpacing: "0.04em" }}
        >
          PERFORM<span style={{ color: "#f59e0b" }}>ANCE</span>
        </h1>
        <p
          className="font-data text-xs mt-3"
          style={{ color: "#475569", letterSpacing: "0.16em" }}
        >
          PERSONAL BEST SCORES
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center px-5 pb-10 max-w-md mx-auto w-full">
        {/* Overall best callout */}
        {overallBest !== null && (
          <div className="w-full flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: "rgba(245,158,11,0.12)" }} />
            <span className="font-data text-xs whitespace-nowrap" style={{ color: "#475569", letterSpacing: "0.12em" }}>
              PERSONAL BEST&nbsp;
              <span className="font-display" style={{ fontSize: "1.2rem", color: "#f59e0b", verticalAlign: "middle" }}>
                {overallBest}
              </span>
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(245,158,11,0.12)" }} />
          </div>
        )}

        {/* Score table */}
        <TacCard className="w-full mb-5" style={{ padding: 0, overflow: "hidden" }}>
          {/* Column headers */}
          <div
            className="grid font-data text-xs"
            style={{
              gridTemplateColumns: "1fr 72px 72px 72px",
              padding: "10px 16px",
              borderBottom: "1px solid rgba(245,158,11,0.1)",
              color: "#334155",
              letterSpacing: "0.1em",
            }}
          >
            <div>CATEGORY</div>
            {DIFFICULTY_OPTIONS.map((d) => (
              <div key={d.id} className="text-center" style={{ color: "#475569" }}>
                {d.stars}
              </div>
            ))}
          </div>

          {/* One row per category */}
          {CATEGORY_OPTIONS.map((cat, i) => {
            const scores      = DIFFICULTY_OPTIONS.map((d) => getScore(cat.id, d.id));
            const rowHasScore = scores.some((s) => s !== null);
            const isLast      = i === CATEGORY_OPTIONS.length - 1;
            return (
              <div
                key={cat.id}
                className="grid"
                style={{
                  gridTemplateColumns: "1fr 72px 72px 72px",
                  padding: "12px 16px",
                  borderBottom: isLast ? "none" : "1px solid rgba(30,41,59,0.45)",
                  background: rowHasScore ? "rgba(245,158,11,0.02)" : "transparent",
                  alignItems: "center",
                }}
              >
                <div
                  className="font-data"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.09em",
                    color: rowHasScore ? "#94a3b8" : "#334155",
                  }}
                >
                  {categoryLabels[cat.id] ?? cat.label}
                </div>
                {scores.map((score, di) => {
                  const isTopScore = score !== null && score === overallBest;
                  return (
                    <div
                      key={di}
                      className="font-display text-center"
                      style={{
                        fontSize: score !== null ? "1.05rem" : "0.9rem",
                        lineHeight: 1,
                        letterSpacing: "0.02em",
                        color: score !== null
                          ? isTopScore ? "#fcd34d" : "#f59e0b"
                          : "#1e293b",
                      }}
                    >
                      {score !== null ? score : "—"}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </TacCard>

        {/* Difficulty legend */}
        <div className="w-full flex justify-end gap-4 mb-5">
          {DIFFICULTY_OPTIONS.map((d) => (
            <span key={d.id} className="font-data text-xs" style={{ color: "#2d3f55", letterSpacing: "0.08em" }}>
              {d.stars} {d.label}
            </span>
          ))}
        </div>

        {/* Empty state */}
        {!hasAnyScore && (
          <div
            className="w-full text-center font-data text-xs mb-5"
            style={{ color: "#334155", letterSpacing: "0.1em", lineHeight: 2 }}
          >
            NO RECORDS ON FILE
            <br />
            <span style={{ color: "#1e293b" }}>Complete a training session to log your performance</span>
          </div>
        )}

        {/* Back to base */}
        <button
          onClick={onReturnHome}
          className="w-full font-display tracking-widest"
          style={{
            fontSize: "1.35rem",
            minHeight: "52px",
            borderRadius: 2,
            background: "#f59e0b",
            color: "#070b14",
            border: "none",
            letterSpacing: "0.14em",
            cursor: "pointer",
            marginBottom: 14,
          }}
        >
          ←  BACK TO BASE
        </button>

        {/* Clear records — only shown when there's something to clear */}
        {hasAnyScore && (
          <button
            onClick={handleClear}
            className="font-data text-xs"
            style={{
              background: "transparent",
              border: "none",
              color: "#334155",
              letterSpacing: "0.1em",
              cursor: "pointer",
              padding: "6px 12px",
              minHeight: 44,
            }}
          >
            🗑 CLEAR ALL RECORDS
          </button>
        )}
      </main>

      <footer className="text-center" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}>
        <span className="font-data text-xs" style={{ color: "#1e293b", letterSpacing: "0.12em" }}>
          v0.2.0 · CLASSIFIED
        </span>
      </footer>
    </div>
  );
}

// ============================================================================
// Leaderboard Screen
// ============================================================================

// Difficulty star labels for the table
const DIFF_STARS = { 1: "★", 2: "★★", 3: "★★★" };

// Readable category abbreviations for leaderboard display
const CAT_LABEL = {
  "all":              "ALL",
  "Main Battle Tank": "MBT",
  "APC":              "APC",
  "IFV":              "IFV",
  "Artillery":        "ARTY",
  "Helicopter":       "HELO",
};

// Leaderboard difficulty options — includes an "ALL" option that shows every level
const LB_DIFFICULTY_OPTIONS = [
  { id: "all", label: "ALL", stars: "—"   },
  ...DIFFICULTY_OPTIONS,
];

function LeaderboardScreen({ initialCategory, initialDifficulty, initialMode, onReturnHome, callsign }) {
  const [category,   setCategory]   = useState(initialCategory  || "all");
  const [difficulty, setDifficulty] = useState(
    initialDifficulty !== undefined ? initialDifficulty : "all"
  );
  const [mode,       setMode]       = useState(initialMode || "all");
  const [entries,    setEntries]    = useState([]);
  const [status,     setStatus]     = useState("loading"); // "loading"|"ok"|"error"
  const [errorMsg,   setErrorMsg]   = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  // Own entry pinned below top 10 (only populated when player is outside top 10)
  const [ownEntry,   setOwnEntry]   = useState(null);
  const [ownRank,    setOwnRank]    = useState(null);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setOwnEntry(null);
    setOwnRank(null);

    fetchLeaderboard(category, difficulty, mode)
      .then(async (data) => {
        if (cancelled) return;
        setEntries(data);
        setStatus("ok");

        // If the player's callsign isn't anywhere in the top 10, fetch their
        // personal best and pin it below the table with an approximate rank.
        const isInTop10 = callsign && data.some((e) => e.callsign === callsign);
        if (!isInTop10 && callsign) {
          try {
            const own = await fetchPlayerBest(callsign, category, difficulty, mode);
            if (own && !cancelled) {
              setOwnEntry(own);
              const rank = await fetchRankAbove(own.score, category, difficulty, mode);
              if (!cancelled) setOwnRank(rank);
            }
          } catch (_) {}
        }
      })
      .catch((err) => {
        if (!cancelled) { setErrorMsg(err.message || "Network error"); setStatus("error"); }
      });
    return () => { cancelled = true; };
  }, [category, difficulty, mode, refreshKey]);

  // Reusable row renderer — used for both the top-10 list and the pinned own entry
  const renderRow = (entry, rank, isOwnPinned = false) => {
    const isRank1 = rank === 1 && !isOwnPinned;
    const isYou   = isOwnPinned || (callsign && entry.callsign === callsign);
    return (
      <div
        className="grid"
        style={{
          gridTemplateColumns: "28px 1fr 58px 44px 44px",
          padding: "10px 14px",
          background: isYou
            ? "rgba(245,158,11,0.07)"
            : isRank1 ? "rgba(245,158,11,0.04)" : "transparent",
          alignItems: "center",
        }}
      >
        {/* Rank */}
        <div
          className="font-display"
          style={{ fontSize: "1.1rem", color: isRank1 || isYou ? "#f59e0b" : "#334155" }}
        >
          {rank ?? "—"}
        </div>
        {/* Callsign + timestamp */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              className="font-display"
              style={{
                fontSize: "1rem",
                color: isRank1 ? "#fcd34d" : isYou ? "#f59e0b" : "#94a3b8",
                letterSpacing: "0.04em",
              }}
            >
              {entry.callsign}
            </div>
            {isYou && (
              <span
                className="font-data"
                style={{
                  fontSize: "0.55rem", letterSpacing: "0.1em",
                  background: "rgba(245,158,11,0.15)",
                  border: "1px solid rgba(245,158,11,0.3)",
                  borderRadius: 2, padding: "1px 4px", color: "#f59e0b",
                }}
              >
                YOU
              </span>
            )}
          </div>
          <div className="font-data" style={{ fontSize: "0.62rem", color: "#334155", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 5 }}>
            {entry.mode === "timed" && (
              <span style={{ color: "#f87171", letterSpacing: "0.06em" }}>⏱</span>
            )}
            {timeAgo(entry.created_at)}
          </div>
        </div>
        {/* Score */}
        <div
          className="font-display text-center"
          style={{ fontSize: "1.05rem", color: isRank1 || isYou ? "#f59e0b" : "#64748b", letterSpacing: "0.02em" }}
        >
          {entry.score}
        </div>
        {/* Category */}
        <div className="text-center font-data" style={{ fontSize: "0.62rem", color: "#475569", letterSpacing: "0.06em" }}>
          {CAT_LABEL[entry.category] ?? entry.category}
        </div>
        {/* Difficulty */}
        <div className="text-center font-data" style={{ fontSize: "0.72rem", color: "#475569" }}>
          {DIFF_STARS[entry.difficulty] ?? "?"}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col tac-grid font-tac">
      {/* Header */}
      <header className="px-5 pb-4 text-center" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 2.5rem)" }}>
        <div
          className="font-data text-xs tracking-widest mb-5"
          style={{ color: "rgba(245,158,11,0.5)", letterSpacing: "0.18em" }}
        >
          ◈ GLOBAL RANKINGS ◈
        </div>
        <h1 className="font-display text-white" style={{ fontSize: "3.6rem", lineHeight: 1, letterSpacing: "0.04em" }}>
          LEADER<span style={{ color: "#f59e0b" }}>BOARD</span>
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center px-5 pb-10 max-w-md mx-auto w-full">
        {/* Category filter */}
        <div className="w-full mb-4">
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>CATEGORY</div>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((opt) => {
              const sel = category === opt.id;
              return (
                <button key={opt.id} onClick={() => setCategory(opt.id)} className="font-data"
                  style={{
                    fontSize: "0.72rem", padding: "5px 12px", borderRadius: 2,
                    letterSpacing: "0.1em", minHeight: 44,
                    border: `1px solid ${sel ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                    background: sel ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                    color: sel ? "#f59e0b" : "#64748b", cursor: "pointer",
                  }}
                >{opt.label}</button>
              );
            })}
          </div>
        </div>

        {/* Difficulty filter */}
        <div className="w-full mb-4">
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>DIFFICULTY</div>
          <div className="flex gap-2">
            {LB_DIFFICULTY_OPTIONS.map((opt) => {
              const sel = difficulty === opt.id;
              return (
                <button key={opt.id} onClick={() => setDifficulty(opt.id)} className="font-data flex-1"
                  style={{
                    fontSize: "0.72rem", padding: "6px 4px", borderRadius: 2,
                    letterSpacing: "0.08em", minHeight: 44,
                    border: `1px solid ${sel ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                    background: sel ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                    color: sel ? "#f59e0b" : "#64748b", cursor: "pointer",
                  }}
                >{opt.stars !== "—" ? opt.stars : ""} {opt.label}</button>
              );
            })}
          </div>
        </div>

        {/* Mode filter */}
        <div className="w-full mb-4">
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>MODE</div>
          <div className="flex gap-2">
            {[
              { id: "all",    label: "ALL"     },
              { id: "normal", label: "NORMAL"  },
              { id: "timed",  label: "⏱ TIMED" },
            ].map((opt) => {
              const sel = mode === opt.id;
              return (
                <button key={opt.id} onClick={() => setMode(opt.id)} className="font-data flex-1"
                  style={{
                    fontSize: "0.72rem", padding: "6px 4px", borderRadius: 2,
                    letterSpacing: "0.08em", minHeight: 44,
                    border: `1px solid ${sel ? (opt.id === "timed" ? "#f87171" : "#f59e0b") : "rgba(51,65,85,0.5)"}`,
                    background: sel ? (opt.id === "timed" ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.12)") : "rgba(15,23,42,0.5)",
                    color: sel ? (opt.id === "timed" ? "#f87171" : "#f59e0b") : "#64748b",
                    cursor: "pointer",
                  }}
                >{opt.label}</button>
              );
            })}
          </div>
        </div>

        {/* Loading */}
        {status === "loading" && (
          <div className="w-full text-center font-data text-xs py-10" style={{ color: "#334155", letterSpacing: "0.12em" }}>
            LOADING INTEL...
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="w-full text-center font-data text-xs py-6" style={{ color: "#f87171", letterSpacing: "0.08em", lineHeight: 2 }}>
            SIGNAL LOST<br />
            <span style={{ color: "#334155" }}>{errorMsg}</span>
          </div>
        )}

        {/* Empty */}
        {status === "ok" && entries.length === 0 && (
          <div className="w-full text-center font-data text-xs py-10" style={{ color: "#334155", letterSpacing: "0.1em", lineHeight: 2 }}>
            NO ENTRIES ON FILE<br />
            <span style={{ color: "#1e293b" }}>Be the first to post a score</span>
          </div>
        )}

        {/* Table */}
        {status === "ok" && entries.length > 0 && (
          <TacCard className="w-full mb-4" style={{ padding: 0, overflow: "hidden" }}>
            {/* Column headers */}
            <div
              className="grid font-data text-xs"
              style={{
                gridTemplateColumns: "28px 1fr 58px 44px 44px",
                padding: "9px 14px",
                borderBottom: "1px solid rgba(245,158,11,0.1)",
                color: "#334155", letterSpacing: "0.08em",
              }}
            >
              <div>#</div>
              <div>CALLSIGN</div>
              <div className="text-center">SCORE</div>
              <div className="text-center">CAT</div>
              <div className="text-center">DIFF</div>
            </div>

            {/* Top-10 rows */}
            {entries.map((entry, i) => (
              <div key={i} style={{ borderBottom: i < entries.length - 1 || ownEntry ? "1px solid rgba(30,41,59,0.4)" : "none" }}>
                {renderRow(entry, i + 1, false)}
              </div>
            ))}

            {/* Pinned own entry — only when player is outside the visible top 10 */}
            {ownEntry && (
              <>
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "6px 14px 4px",
                    borderTop: "1px dashed rgba(245,158,11,0.2)",
                  }}
                >
                  <span className="font-data" style={{ fontSize: "0.58rem", letterSpacing: "0.12em", color: "#475569", whiteSpace: "nowrap" }}>
                    YOUR STANDING
                  </span>
                  <div style={{ flex: 1, height: 1, background: "rgba(245,158,11,0.08)" }} />
                </div>
                {renderRow(ownEntry, ownRank, true)}
              </>
            )}
          </TacCard>
        )}

        {/* Refresh + Back */}
        <div className="w-full flex gap-2 mt-2">
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            disabled={status === "loading"}
            className="font-data text-xs"
            style={{
              flex: "0 0 auto",
              minHeight: 44, padding: "0 18px",
              borderRadius: 2, letterSpacing: "0.1em", cursor: "pointer",
              background: "transparent",
              border: "1px solid rgba(51,65,85,0.4)",
              color: status === "loading" ? "#1e293b" : "#475569",
            }}
          >
            ↻ REFRESH
          </button>
          <button
            onClick={onReturnHome}
            className="flex-1 font-display tracking-widest"
            style={{
              fontSize: "1.2rem",
              minHeight: "44px",
              borderRadius: 2,
              background: "#f59e0b",
              color: "#070b14",
              border: "none",
              letterSpacing: "0.14em",
              cursor: "pointer",
            }}
          >
            ← BACK TO BASE
          </button>
        </div>
      </main>

      <footer className="text-center" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}>
        <span className="font-data text-xs" style={{ color: "#1e293b", letterSpacing: "0.12em" }}>
          v0.2.0 · CLASSIFIED
        </span>
      </footer>
    </div>
  );
}

// ============================================================================
// App (screen router)
// ============================================================================

function App() {
  const [screen, setScreen]         = useState("home");
  const [round, setRound]           = useState(null);
  const [finalScore, setFinalScore] = useState(0);

  // ── Service-worker update detection ────────────────────────────────────────
  // When a new SW has installed and is waiting, we show an update banner.
  // The user must explicitly click Refresh — we never auto-reload, especially
  // not during a quiz round (screen === "quiz").
  const [swUpdateReady, setSwUpdateReady] = useState(false);
  const swRegRef = useRef(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // Watch an installing worker through to the "installed" (waiting) state.
    const trackInstalling = (worker) => {
      worker.addEventListener("statechange", () => {
        if (worker.state === "installed" && navigator.serviceWorker.controller) {
          // A new version is ready but waiting — show the banner.
          setSwUpdateReady(true);
        }
      });
    };

    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) return;
      swRegRef.current = reg;

      // Already waiting when the page loaded (e.g. tab was open during deploy).
      if (reg.waiting && navigator.serviceWorker.controller) {
        setSwUpdateReady(true);
      }

      // New SW found while the tab is open.
      reg.addEventListener("updatefound", () => {
        if (reg.installing) trackInstalling(reg.installing);
      });
    });

    // When the waiting SW takes control (after skipWaiting), reload to get
    // the new assets. The controllerchange fires on every page so guard it.
    let reloading = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    });
  }, []);

  // Tell the waiting SW to activate, which triggers controllerchange → reload.
  const handleSwUpdate = () => {
    const reg = swRegRef.current;
    if (reg && reg.waiting) {
      reg.waiting.postMessage({ type: "SKIP_WAITING" });
    }
  };
  const [selectedCategory, setSelectedCategory]     = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState(1);  // 1 = Easy by default
  const [selectedMode, setSelectedMode]             = useState("normal");
  const [selectedEra, setSelectedEra]               = useState("all");
  const [selectedPact, setSelectedPact]             = useState("all");
  const [selectedNation, setSelectedNation]         = useState("all");
  const [bestScores, setBestScores]     = useState(loadBestScores);
  const [lastHintsUsed, setLastHintsUsed] = useState(0);

  // Callsign — persisted to localStorage, shown on leaderboard
  const [callsign, setCallsign] = useState(() => localStorage.getItem(CALLSIGN_KEY) || "");
  const [callsignModalOpen, setCallsignModalOpen] = useState(false);

  // Leaderboard filter memory — pre-seeded from the last finished game
  const [lbInitCategory,   setLbInitCategory]   = useState("all");
  const [lbInitDifficulty, setLbInitDifficulty] = useState("all");
  const [lbInitMode,       setLbInitMode]       = useState("all");

  // Prefer a local draft (saved by the admin) over the deployed file.
  const draft    = loadDraftFromStorage();
  const vehicles = draft || window.vehicles || [];
  const usingDraft = Boolean(draft);

  // ── Filter chain: category → era → pact → nation ───────────────────────
  const vehiclesByCategory = selectedCategory === "all"
    ? vehicles
    : vehicles.filter((v) => v.category === selectedCategory);

  const vehiclesByCatEra = selectedEra === "all"
    ? vehiclesByCategory
    : vehiclesByCategory.filter((v) => v.era === selectedEra);

  const vehiclesByCatEraPact = selectedPact === "all"
    ? vehiclesByCatEra
    : vehiclesByCatEra.filter((v) => getVehiclePact(v.country) === selectedPact);

  // Available nations derived from category+era+pact (before nation filter)
  // so the dropdown always reflects what's reachable at current settings.
  const availableNations = Array.from(
    new Set(vehiclesByCatEraPact.map((v) => v.country).filter(Boolean))
  ).sort();

  const filteredVehicles = selectedNation === "all"
    ? vehiclesByCatEraPact
    : vehiclesByCatEraPact.filter((v) => v.country === selectedNation);

  // Playable = has at least one image AT THE SELECTED DIFFICULTY
  const hasImageAtSelected = (v) =>
    Array.isArray(v.images) && v.images.some((img) => img.stars === selectedDifficulty);
  const playableCount   = filteredVehicles.filter(hasImageAtSelected).length;
  const totalInCategory = filteredVehicles.length;

  // Per-category counts: respect era + pact + nation + difficulty
  const categoryCounts = CATEGORY_OPTIONS.reduce((acc, opt) => {
    const byCat  = opt.id === "all" ? vehicles : vehicles.filter((v) => v.category === opt.id);
    const byEra  = selectedEra    === "all" ? byCat  : byCat.filter((v) => v.era === selectedEra);
    const byPact = selectedPact   === "all" ? byEra  : byEra.filter((v) => getVehiclePact(v.country) === selectedPact);
    const byNat  = selectedNation === "all" ? byPact : byPact.filter((v) => v.country === selectedNation);
    acc[opt.id] = byNat.filter(hasImageAtSelected).length;
    return acc;
  }, {});

  // Per-era counts: respect category + pact + nation + difficulty
  const eraCounts = ERA_OPTIONS.reduce((acc, opt) => {
    const byEra  = opt.id === "all" ? vehiclesByCategory : vehiclesByCategory.filter((v) => v.era === opt.id);
    const byPact = selectedPact   === "all" ? byEra  : byEra.filter((v) => getVehiclePact(v.country) === selectedPact);
    const byNat  = selectedNation === "all" ? byPact : byPact.filter((v) => v.country === selectedNation);
    acc[opt.id] = byNat.filter(hasImageAtSelected).length;
    return acc;
  }, {});

  // Per-pact counts: respect category + era + nation + difficulty
  const pactCounts = PACT_OPTIONS.reduce((acc, opt) => {
    const byPact = opt.id === "all" ? vehiclesByCatEra : vehiclesByCatEra.filter((v) => getVehiclePact(v.country) === opt.id);
    const byNat  = selectedNation === "all" ? byPact : byPact.filter((v) => v.country === selectedNation);
    acc[opt.id] = byNat.filter(hasImageAtSelected).length;
    return acc;
  }, {});

  // Per-difficulty counts: respect all other active filters
  const difficultyCounts = DIFFICULTY_OPTIONS.reduce((acc, opt) => {
    acc[opt.id] = filteredVehicles.filter(
      (v) => Array.isArray(v.images) && v.images.some((img) => img.stars === opt.id)
    ).length;
    return acc;
  }, {});

  // Change handlers — each resets nation when it's no longer available in the new context
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const byCat  = cat === "all" ? vehicles : vehicles.filter((v) => v.category === cat);
    const byEra  = selectedEra  === "all" ? byCat  : byCat.filter((v) => v.era === selectedEra);
    const byPact = selectedPact === "all" ? byEra  : byEra.filter((v) => getVehiclePact(v.country) === selectedPact);
    if (selectedNation !== "all" && !byPact.some((v) => v.country === selectedNation)) {
      setSelectedNation("all");
    }
  };

  const handleEraChange = (era) => {
    setSelectedEra(era);
    const byEra  = era === "all" ? vehiclesByCategory : vehiclesByCategory.filter((v) => v.era === era);
    const byPact = selectedPact === "all" ? byEra : byEra.filter((v) => getVehiclePact(v.country) === selectedPact);
    if (selectedNation !== "all" && !byPact.some((v) => v.country === selectedNation)) {
      setSelectedNation("all");
    }
  };

  const handlePactChange = (pact) => {
    setSelectedPact(pact);
    const byPact = pact === "all" ? vehiclesByCatEra : vehiclesByCatEra.filter((v) => getVehiclePact(v.country) === pact);
    if (selectedNation !== "all" && !byPact.some((v) => v.country === selectedNation)) {
      setSelectedNation("all");
    }
  };

  const startGame = () => {
    setRound(buildRound(filteredVehicles, selectedDifficulty));
    setFinalScore(0);
    setScreen("quiz");
  };

  const finishGame = (score, hintsUsed = 0) => {
    // Apply hint penalty at end of round (min 0)
    const finalScore = Math.max(0, score - hintsUsed * HINT_PENALTY);
    setFinalScore(finalScore);
    setLastHintsUsed(hintsUsed);
    // Persist best score for category + difficulty + mode.
    // Shape: { cat: { diff: { normal: pts, timed: pts } } }
    const mode = selectedMode;
    const catScores  = bestScores[selectedCategory] || {};
    const diffScores = catScores[selectedDifficulty] || {};
    const prev = diffScores[mode] ?? -1;
    if (finalScore > prev) {
      const updated = {
        ...bestScores,
        [selectedCategory]: {
          ...catScores,
          [selectedDifficulty]: { ...diffScores, [mode]: finalScore },
        },
      };
      setBestScores(updated);
      localStorage.setItem(BEST_SCORES_KEY, JSON.stringify(updated));
    }
    setScreen("end");
  };

  // Safety net — if data didn't load, show a clear error
  if (vehicles.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6 text-center tac-grid font-tac"
      >
        <div>
          <p className="font-display text-red-400 mb-3" style={{ fontSize: "1.8rem", letterSpacing: "0.1em" }}>
            DATA LOAD FAILURE
          </p>
          <p className="text-sm" style={{ color: "#64748b" }}>
            Check that{" "}
            <code className="font-data" style={{ color: "#f59e0b" }}>data/vehicles.js</code>{" "}
            loads before{" "}
            <code className="font-data" style={{ color: "#f59e0b" }}>app.jsx</code>.
          </p>
        </div>
      </div>
    );
  }

  const handleCallsignSave = (newCallsign) => {
    setCallsign(newCallsign);
    localStorage.setItem(CALLSIGN_KEY, newCallsign);
    setCallsignModalOpen(false);
  };

  const returnHome = () => {
    setRound(null);
    setFinalScore(0);
    setScreen("home");
  };

  const goToStats = () => setScreen("stats");

  const goToLeaderboard = (cat, diff, mode) => {
    setLbInitCategory(cat    !== undefined ? cat   : "all");
    setLbInitDifficulty(diff !== undefined ? diff  : "all");
    setLbInitMode(mode       !== undefined ? mode  : "all");
    setScreen("leaderboard");
  };

  const clearScores = () => {
    localStorage.removeItem(BEST_SCORES_KEY);
    setBestScores({});
  };

  // First-visit gate — no callsign yet, force registration before anything else.
  // The Welcome screen has no other navigation; saving a callsign drops the user
  // straight onto the home screen (since `screen` defaults to "home").
  if (!callsign) {
    return <WelcomeScreen onSave={handleCallsignSave} />;
  }

  // Pick the active screen
  let body;
  if (screen === "quiz") {
    body = <QuizScreen round={round} onComplete={finishGame} onAbort={returnHome} mode={selectedMode} />;
  } else if (screen === "end") {
    body = (
      <EndScreen
        score={finalScore}
        total={selectedMode === "timed" ? 1500 : 1000}
        onPlayAgain={startGame}
        onReturnHome={returnHome}
        callsign={callsign}
        onEditCallsign={() => setCallsignModalOpen(true)}
        selectedCategory={selectedCategory}
        selectedDifficulty={selectedDifficulty}
        onViewLeaderboard={(cat, diff) => goToLeaderboard(cat, diff, selectedMode)}
        mode={selectedMode}
        hintsUsed={lastHintsUsed}
      />
    );
  } else if (screen === "stats") {
    body = <StatsScreen bestScores={bestScores} onReturnHome={returnHome} onClearScores={clearScores} />;
  } else if (screen === "leaderboard") {
    body = (
      <LeaderboardScreen
        initialCategory={lbInitCategory}
        initialDifficulty={lbInitDifficulty}
        initialMode={lbInitMode}
        onReturnHome={returnHome}
        callsign={callsign}
      />
    );
  } else {
    body = (
      <HomeScreen
        onPlay={startGame}
        totalInCategory={totalInCategory}
        playableCount={playableCount}
        usingDraft={usingDraft}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categoryCounts={categoryCounts}
        selectedEra={selectedEra}
        onEraChange={handleEraChange}
        eraCounts={eraCounts}
        selectedPact={selectedPact}
        onPactChange={handlePactChange}
        pactCounts={pactCounts}
        selectedNation={selectedNation}
        onNationChange={setSelectedNation}
        availableNations={availableNations}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        difficultyCounts={difficultyCounts}
        selectedMode={selectedMode}
        onModeChange={setSelectedMode}
        bestScore={bestScores[selectedCategory]?.[selectedDifficulty]?.[selectedMode]}
        onViewStats={goToStats}
        onViewLeaderboard={() => goToLeaderboard("all", "all")}
        callsign={callsign}
        onEditCallsign={() => setCallsignModalOpen(true)}
      />
    );
  }

  // The CallsignModal is rendered at the top level so it can overlay any screen
  // (currently the home and end screens both expose an Edit Callsign action).
  const isPlaying = screen === "quiz";

  return (
    <>
      {body}

      {/* ── SW update banner ─────────────────────────────────────────────────
          Appears whenever a new service worker is waiting.
          During gameplay the refresh action is suppressed so the round is
          never interrupted — the pill changes to "AFTER ROUND" instead.     */}
      {swUpdateReady && (
        <div
          className="font-data"
          style={{
            position: "fixed",
            bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9997,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(7,11,20,0.96)",
            border: "1px solid rgba(245,158,11,0.3)",
            borderRadius: 3,
            padding: "8px 12px 8px 14px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontSize: "0.65rem", color: "#94a3b8", letterSpacing: "0.1em" }}>
            ↑ UPDATE AVAILABLE
          </span>
          {isPlaying ? (
            <span
              style={{
                fontSize: "0.6rem",
                color: "#334155",
                letterSpacing: "0.1em",
                border: "1px solid rgba(51,65,85,0.4)",
                borderRadius: 2,
                padding: "3px 8px",
              }}
            >
              AFTER ROUND
            </span>
          ) : (
            <button
              onClick={handleSwUpdate}
              style={{
                fontSize: "0.6rem",
                color: "#070b14",
                background: "#f59e0b",
                border: "none",
                borderRadius: 2,
                padding: "4px 10px",
                letterSpacing: "0.1em",
                cursor: "pointer",
                fontFamily: "'Share Tech Mono', monospace",
              }}
            >
              REFRESH
            </button>
          )}
        </div>
      )}

      {callsignModalOpen && (
        <CallsignModal
          current={callsign}
          onSave={handleCallsignSave}
          onCancel={() => setCallsignModalOpen(false)}
        />
      )}
    </>
  );
}

// Mount the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
