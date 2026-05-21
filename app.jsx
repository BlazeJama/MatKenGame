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
// a randomly chosen image, and 4 shuffled answer options.
// Vehicles with zero images are excluded — they're treated as drafts.
function buildRound(vehicles) {
  const QUESTIONS_PER_ROUND = 10;
  const playable = vehicles.filter((v) => Array.isArray(v.images) && v.images.length > 0);
  const roundVehicles = shuffle(playable).slice(0, QUESTIONS_PER_ROUND);

  return roundVehicles.map((vehicle) => {
    const image = pickRandom(vehicle.images, 1)[0];
    // Pick one fun fact at random per question. Falls back to a singular
    // `funFact` field if the vehicle still uses the legacy schema.
    const facts =
      Array.isArray(vehicle.funFacts) && vehicle.funFacts.length > 0
        ? vehicle.funFacts
        : vehicle.funFact
        ? [vehicle.funFact]
        : [];
    const funFact = facts.length > 0 ? pickRandom(facts, 1)[0] : "";
    // Wrong answers: same category, different vehicle, must also have images
    const wrongPool = playable.filter(
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

function HomeScreen({ onPlay, vehicleCount, playableCount, usingDraft }) {
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
      <header className="px-6 pt-14 pb-6 text-center">
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
          {playableCount < vehicleCount && (
            <div
              className="font-data text-xs mt-5 pt-4"
              style={{
                color: "#334155",
                borderTop: "1px solid rgba(51,65,85,0.5)",
                letterSpacing: "0.06em",
              }}
            >
              {vehicleCount - playableCount} DRAFT
              {vehicleCount - playableCount !== 1 ? "S" : ""} PENDING — NO IMAGES YET
            </div>
          )}
        </TacCard>

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

      <footer className="text-center pb-6">
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
      className="min-h-screen flex flex-col font-tac"
      style={{ background: "#070b14" }}
    >
      {/* ── Header ──────────────────────────────────────── */}
      <header
        style={{
          background: "#0d1526",
          borderBottom: "1px solid rgba(245,158,11,0.12)",
          padding: "12px 16px 10px",
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
        className="max-w-md mx-auto w-full relative"
        style={{ background: "#0a0e1a", lineHeight: 0 }}
      >
        <img
          src={question.image.url}
          alt="Military vehicle to identify"
          className="w-full object-cover"
          style={{ height: 220, display: "block" }}
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
        className="flex-1 max-w-md mx-auto w-full px-4 py-4"
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
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

        {/* Result / fun-fact panel */}
        {hasAnswered && (
          <div
            className="mt-4 p-4 anim-panel"
            style={{
              borderRadius: 2,
              border: `1px solid ${isCorrect ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.28)"}`,
              background: isCorrect
                ? "rgba(34,197,94,0.06)"
                : "rgba(239,68,68,0.06)",
            }}
          >
            <p
              className="font-display tracking-widest mb-1"
              style={{
                fontSize: "1.15rem",
                color: isCorrect ? "#4ade80" : "#f87171",
                letterSpacing: "0.1em",
              }}
            >
              {isCorrect ? "✓ TARGET ACQUIRED" : "✗ WRONG TARGET"}
            </p>
            {!isCorrect && (
              <p className="text-sm mb-2" style={{ color: "#64748b" }}>
                Correct:{" "}
                <span style={{ color: "#e2e8f0", fontWeight: 600 }}>
                  {question.vehicle.name}
                </span>
              </p>
            )}
            {question.funFact && (
              <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                <span style={{ color: "#f59e0b" }}>◈ </span>
                {question.funFact}
              </p>
            )}
          </div>
        )}

        {/* Next / finish button */}
        {hasAnswered && (
          <button
            onClick={handleNext}
            className="w-full mt-4 font-display tracking-widest tac-primary anim-fade"
            style={{
              fontSize: "1.35rem",
              minHeight: "52px",
              borderRadius: 2,
              background: "#f59e0b",
              color: "#070b14",
              border: "none",
              letterSpacing: "0.14em",
              cursor: "pointer",
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

function EndScreen({ score, total, onPlayAgain }) {
  const pct = Math.round((score / total) * 100);

  return (
    <div className="min-h-screen flex flex-col tac-grid font-tac">
      <header className="text-center px-6 pt-14 pb-6">
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

        {/* Redeploy button */}
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
      </main>

      <footer className="text-center pb-6">
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
// App (screen router)
// ============================================================================

function App() {
  const [screen, setScreen]       = useState("home");
  const [round, setRound]         = useState(null);
  const [finalScore, setFinalScore] = useState(0);

  // Prefer a local draft (saved by the admin) over the deployed file.
  const draft    = loadDraftFromStorage();
  const vehicles = draft || window.vehicles || [];
  const usingDraft = Boolean(draft);

  const startGame = () => {
    setRound(buildRound(vehicles));
    setFinalScore(0);
    setScreen("quiz");
  };

  const finishGame = (score) => {
    setFinalScore(score);
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

  if (screen === "quiz") return <QuizScreen round={round} onComplete={finishGame} />;
  if (screen === "end")  return <EndScreen score={finalScore} total={round.length} onPlayAgain={startGame} />;

  const playableCount = vehicles.filter(
    (v) => Array.isArray(v.images) && v.images.length > 0
  ).length;

  return (
    <HomeScreen
      onPlay={startGame}
      vehicleCount={vehicles.length}
      playableCount={playableCount}
      usingDraft={usingDraft}
    />
  );
}

// Mount the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
