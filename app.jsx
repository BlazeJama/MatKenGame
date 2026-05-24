// MatKenGame — main React app
// MVP build: Home → Quiz (10 questions) → End → Play Again
//
// Data is read from window.vehicles, set by data/vehicles.js (loaded before this file).
// Each round picks 10 random vehicles, one random image per vehicle, and 3 random wrong
// answers from the same category for each question.

const { useState } = React;

// localStorage key shared with the admin page — when present, the game
// uses your in-progress draft instead of the deployed window.vehicles
const DRAFT_STORAGE_KEY = "matken-draft-vehicles";

// localStorage key for nested best scores: { "all": { 1: 8, 2: 5, 3: 3 }, "Main Battle Tank": {...}, ... }
const BEST_SCORES_KEY = "matken-best-scores";

function loadBestScores() {
  try {
    const raw = localStorage.getItem(BEST_SCORES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    // Migrate from the pre-difficulty flat shape { category: number }
    // to the new nested shape { category: { difficulty: number } }.
    // Pre-difficulty scores are treated as Easy (★) scores.
    const migrated = {};
    for (const [cat, val] of Object.entries(parsed)) {
      if (typeof val === "number") {
        migrated[cat] = { 1: val };
      } else if (val && typeof val === "object") {
        migrated[cat] = val;
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
  { id: "Artillery",        label: "ARTY" },
  { id: "Helicopter",       label: "HELO" },
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
  { id: "WW2",      label: "WW2"      },
  { id: "Cold War", label: "COLD WAR" },
  { id: "Modern",   label: "MODERN"   },
];

// Military pact options
const PACT_OPTIONS = [
  { id: "all",          label: "ALL"    },
  { id: "NATO",         label: "NATO"   },
  { id: "Warsaw Pact",  label: "WARSAW" },
  { id: "Other",        label: "OTHER"  },
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

// Score rating labels (tactical tone)
function scoreLabel(score) {
  if (score >= 9) return "ELITE OPERATOR";
  if (score >= 7) return "FIELD READY";
  if (score >= 5) return "OBJECTIVE COMPLETE";
  if (score >= 3) return "TRAINING REQUIRED";
  return "BACK TO BASICS";
}

function scoreSubtext(score) {
  if (score >= 9) return "Exceptional field intelligence";
  if (score >= 7) return "Strong recognition capability";
  if (score >= 5) return "Continue your training";
  if (score >= 3) return "Review vehicle profiles";
  return "Intensive training needed";
}

function scoreLabelColor(score) {
  if (score >= 7) return "#f59e0b";
  if (score >= 5) return "#94a3b8";
  return "#ef4444";
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

// ============================================================================
// Home Screen
// ============================================================================

function HomeScreen({ onPlay, totalInCategory, playableCount, usingDraft,
                      selectedCategory, onCategoryChange, categoryCounts,
                      selectedEra, onEraChange, eraCounts,
                      selectedPact, onPactChange, pactCounts,
                      selectedNation, onNationChange, availableNations,
                      selectedDifficulty, onDifficultyChange, difficultyCounts,
                      bestScore, onViewStats }) {
  const canPlay = playableCount > 0;

  return (
    <div
      className="min-h-screen flex flex-col tac-grid font-tac"
    >
      {/* Draft warning */}
      {usingDraft && (
        <div
          className="font-data text-xs text-center py-2 px-4 border-b"
          style={{
            background: "rgba(120,80,0,0.3)",
            borderColor: "rgba(245,158,11,0.3)",
            color: "#fcd34d",
            letterSpacing: "0.06em",
          }}
        >
          ⚠ PREVIEW MODE — LOCAL ADMIN DRAFT ACTIVE
        </div>
      )}

      {/* Title block */}
      <header className="px-6 pb-6 text-center" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 2.5rem)" }}>
        <div
          className="font-data text-xs tracking-widest mb-5"
          style={{ color: "rgba(245,158,11,0.5)", letterSpacing: "0.18em" }}
        >
          ◈ SYSTEM ONLINE ◈
        </div>
        <h1
          className="font-display text-white"
          style={{ fontSize: "4.8rem", lineHeight: 1, letterSpacing: "0.04em" }}
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
              BEST&nbsp;
              <span style={{ color: bestScore != null ? "#f59e0b" : "#1e293b" }}>
                {bestScore != null ? `${bestScore}/10` : "—"}
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
            {CATEGORY_OPTIONS.map((opt) => {
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
                    minHeight: 32,
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
            {ERA_OPTIONS.map((opt) => {
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
                    minHeight: 32,
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
            {PACT_OPTIONS.map((opt) => {
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
                    minHeight: 32,
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

        {/* Nation selector */}
        <div className="w-full mb-4">
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
                minHeight: 38,
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
        </div>

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
                    minHeight: 38,
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

        {/* Performance log link */}
        <button
          onClick={onViewStats}
          className="w-full font-data text-xs mb-5"
          style={{
            background: "transparent",
            border: "1px solid rgba(51,65,85,0.35)",
            borderRadius: 2,
            color: "#475569",
            letterSpacing: "0.14em",
            cursor: "pointer",
            minHeight: 36,
          }}
        >
          ◆ PERFORMANCE LOG
        </button>

        {/* Field briefing */}
        <div
          className="w-full px-5 py-4 text-sm leading-relaxed"
          style={{
            background: "rgba(15,23,42,0.6)",
            border: "1px solid rgba(148,163,184,0.07)",
            borderRadius: 2,
            color: "#64748b",
          }}
        >
          <div
            className="font-data text-xs tracking-widest mb-3"
            style={{ color: "#334155", letterSpacing: "0.12em" }}
          >
            FIELD BRIEFING
          </div>
          <p style={{ color: "#94a3b8" }}>
            Examine the vehicle photograph and select the correct identification
            from four options. Each session contains up to{" "}
            <span style={{ color: "#f59e0b" }}>10 targets</span>.
          </p>
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

function QuizScreen({ round, onComplete }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore]                 = useState(0);
  const [selectedId, setSelectedId]       = useState(null);

  const question      = round[questionIndex];
  const isLastQuestion = questionIndex === round.length - 1;
  const hasAnswered   = selectedId !== null;
  const isCorrect     = hasAnswered && selectedId === question.vehicle.id;

  const handleSelect = (vehicleId) => {
    if (hasAnswered) return;
    setSelectedId(vehicleId);
    if (vehicleId === question.vehicle.id) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score);
    } else {
      setQuestionIndex((i) => i + 1);
      setSelectedId(null);
    }
  };

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
          <div className="flex items-center justify-between mb-2">
            <span className="font-data text-xs" style={{ color: "#475569", letterSpacing: "0.1em" }}>
              QUESTION{" "}
              <span style={{ color: "#f59e0b" }}>{questionIndex + 1}</span>
              <span style={{ color: "#334155" }}>/{round.length}</span>
            </span>
            <span className="font-data text-xs" style={{ color: "#475569", letterSpacing: "0.1em" }}>
              SCORE{" "}
              <span style={{ color: "#f59e0b" }}>{score}</span>
            </span>
          </div>
          {/* Progress bar */}
          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: 3, background: "rgba(245,158,11,0.1)" }}
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
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
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
                disabled={hasAnswered}
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

        {/* Result panel intentionally hidden — answer-button styling already
            signals correct (green) / wrong (red) / dimmed alternatives.
            Fun fact also remains hidden; both can be restored later. */}

        {/* Next / finish button — always visible, disabled until answered */}
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
      </main>
    </div>
  );
}

// ============================================================================
// End Screen
// ============================================================================

function EndScreen({ score, total, onPlayAgain, onReturnHome }) {
  const pct = Math.round((score / total) * 100);

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

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-10 max-w-md mx-auto w-full">
        {/* Score card */}
        <TacCard className="w-full text-center mb-8" style={{ padding: "32px 28px" }}>
          {/* Score fraction */}
          <div
            className="font-display"
            style={{ fontSize: "5.5rem", lineHeight: 1, letterSpacing: "0.04em" }}
          >
            <span className="text-white">{score}</span>
            <span style={{ fontSize: "2.8rem", color: "#334155" }}>/{total}</span>
          </div>

          {/* Percent bar */}
          <div
            className="mx-auto my-5"
            style={{
              height: 3,
              background: "rgba(245,158,11,0.12)",
              borderRadius: 2,
              maxWidth: 180,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                background: "#f59e0b",
                borderRadius: 2,
                transition: "width 0.7s ease",
              }}
            />
          </div>

          {/* Rating */}
          <div
            className="font-display tracking-widest mb-2"
            style={{
              fontSize: "1.5rem",
              color: scoreLabelColor(score),
              letterSpacing: "0.12em",
            }}
          >
            {scoreLabel(score)}
          </div>
          <div style={{ color: "#475569", fontSize: "0.95rem" }}>
            {scoreSubtext(score)}
          </div>
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
          }}
        >
          ↺  REDEPLOY
        </button>

        {/* Change category button (secondary — back to home) */}
        <button
          onClick={onReturnHome}
          className="w-full mt-3 font-display tracking-widest tac-primary"
          style={{
            fontSize: "1.05rem",
            minHeight: "46px",
            borderRadius: 2,
            background: "transparent",
            color: "#f59e0b",
            border: "1px solid rgba(245,158,11,0.45)",
            letterSpacing: "0.14em",
            cursor: "pointer",
          }}
        >
          ←  CHANGE CATEGORY
        </button>
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
// Stats Screen
// ============================================================================

function StatsScreen({ bestScores, onReturnHome, onClearScores }) {
  const getScore = (catId, diffId) => bestScores?.[catId]?.[diffId] ?? null;

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
              <span style={{ color: "#334155" }}>/10</span>
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
              gridTemplateColumns: "1fr 60px 60px 60px",
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
                  gridTemplateColumns: "1fr 60px 60px 60px",
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
                        fontSize: score !== null ? "1.3rem" : "0.9rem",
                        lineHeight: 1,
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
// App (screen router)
// ============================================================================

function App() {
  const [screen, setScreen]         = useState("home");
  const [round, setRound]           = useState(null);
  const [finalScore, setFinalScore] = useState(0);
  const [selectedCategory, setSelectedCategory]     = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState(1);  // 1 = Easy by default
  const [selectedEra, setSelectedEra]               = useState("all");
  const [selectedPact, setSelectedPact]             = useState("all");
  const [selectedNation, setSelectedNation]         = useState("all");
  const [bestScores, setBestScores] = useState(loadBestScores);

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

  const finishGame = (score) => {
    setFinalScore(score);
    // Persist best score for the category + difficulty that was just played
    const catScores = bestScores[selectedCategory] || {};
    const prev = catScores[selectedDifficulty] ?? -1;
    if (score > prev) {
      const updated = {
        ...bestScores,
        [selectedCategory]: { ...catScores, [selectedDifficulty]: score },
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

  const returnHome = () => {
    setRound(null);
    setFinalScore(0);
    setScreen("home");
  };

  const goToStats = () => setScreen("stats");

  const clearScores = () => {
    localStorage.removeItem(BEST_SCORES_KEY);
    setBestScores({});
  };

  if (screen === "quiz")  return <QuizScreen round={round} onComplete={finishGame} />;
  if (screen === "end")   return <EndScreen score={finalScore} total={round.length} onPlayAgain={startGame} onReturnHome={returnHome} />;
  if (screen === "stats") return <StatsScreen bestScores={bestScores} onReturnHome={returnHome} onClearScores={clearScores} />;

  return (
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
      bestScore={bestScores[selectedCategory]?.[selectedDifficulty]}
      onViewStats={goToStats}
    />
  );
}

// Mount the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
