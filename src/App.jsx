import React, { useState, useEffect, useRef } from 'react';
import { vehicles as fileVehicles, pactConfig as filePactConfig } from '../data/vehicles';

import {
  BEST_SCORES_KEY, CALLSIGN_KEY, HINT_PENALTY,
  CATEGORY_OPTIONS, DIFFICULTY_OPTIONS, ERA_OPTIONS, PACT_OPTIONS,
} from './lib/constants';
import {
  loadBestScores, loadDraftFromStorage, buildRound, getVehiclePact,
  fetchPlayerBest, fetchRankAbove, fetchLeaderboardWindow,
} from './lib/utils';

import CallsignModal     from './components/CallsignModal';
import WelcomeScreen     from './screens/WelcomeScreen';
import LandingScreen     from './screens/LandingScreen';
import GameSetupScreen   from './screens/GameSetupScreen';
import QuizScreen        from './screens/QuizScreen';
import EndScreen         from './screens/EndScreen';
import StatsScreen       from './screens/StatsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import LearningHomeScreen  from './screens/LearningHomeScreen';
import VehicleStudyScreen  from './screens/VehicleStudyScreen';
import ShowcaseScreen      from './screens/ShowcaseScreen';

function App() {
  const [screen, setScreen]         = useState("landing");
  const [round, setRound]           = useState(null);
  const [finalScore, setFinalScore] = useState(0);
  const [studyVehicle, setStudyVehicle] = useState(null);

  // ── Service-worker update detection ────────────────────────────────────────
  const [swUpdateReady, setSwUpdateReady] = useState(false);
  const swRegRef = useRef(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const trackInstalling = (worker) => {
      worker.addEventListener("statechange", () => {
        if (worker.state === "installed" && navigator.serviceWorker.controller) {
          setSwUpdateReady(true);
        }
      });
    };

    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) return;
      swRegRef.current = reg;
      if (reg.waiting && navigator.serviceWorker.controller) setSwUpdateReady(true);
      reg.addEventListener("updatefound", () => {
        if (reg.installing) trackInstalling(reg.installing);
      });
    });

    let reloading = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    });

    // Re-check for a new SW every time the app comes back to the foreground.
    // Critical for home-screen PWAs: the browser won't poll on its own when
    // the app is launched from the icon or brought out of the background.
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        swRegRef.current?.update().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const handleSwUpdate = () => {
    const reg = swRegRef.current;
    if (reg && reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
  };

  // Auto-apply a waiting SW update as soon as the player is not mid-quiz.
  // If an update arrives during a quiz it stays pending (banner shows "AFTER
  // ROUND"); the moment the quiz ends this effect fires and applies it.
  const isPlaying = screen === "quiz";
  useEffect(() => {
    if (swUpdateReady && !isPlaying) handleSwUpdate();
  }, [swUpdateReady, isPlaying]);

  const [selectedCategory,  setSelectedCategory]  = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState(1);
  const [selectedMode,      setSelectedMode]      = useState("normal");
  const [selectedEra,       setSelectedEra]       = useState("all");
  const [selectedPact,      setSelectedPact]      = useState("all");
  const [selectedNation,    setSelectedNation]    = useState("all");
  const [bestScores,        setBestScores]        = useState(loadBestScores);
  const [lastHintsUsed,     setLastHintsUsed]     = useState(0);
  const [callsign,          setCallsign]          = useState(() => localStorage.getItem(CALLSIGN_KEY) || "");
  const [callsignModalOpen, setCallsignModalOpen] = useState(false);

  const [playerRank,    setPlayerRank]    = useState(null);
  const [rankNeighbors, setRankNeighbors] = useState([]);

  // Fetch the player's global rank and two neighbours for the landing card.
  // Fires once on load (and again if the callsign changes). Errors are
  // swallowed silently — the card just stays at "—" if Supabase is down.
  useEffect(() => {
    if (!callsign) return;
    let cancelled = false;
    (async () => {
      try {
        const best = await fetchPlayerBest(callsign, "all", "all", "all");
        if (!best || cancelled) return;
        const rank = await fetchRankAbove(best.score, "all", "all", "all");
        if (rank == null || cancelled) return;
        setPlayerRank(rank);
        const offset = Math.max(0, rank - 2);
        const window = await fetchLeaderboardWindow(offset, 3);
        if (cancelled) return;
        const neighbors = window
          .map((e, i) => ({ ...e, rank: offset + i + 1 }))
          .filter((e) => e.callsign !== callsign)
          .slice(0, 2)
          .map((e) => `#${e.rank} ${e.callsign} · ${e.score}`);
        setRankNeighbors(neighbors);
      } catch (_) {}
    })();
    return () => { cancelled = true; };
  }, [callsign]);

  const [lbInitCategory,   setLbInitCategory]   = useState("all");
  const [lbInitDifficulty, setLbInitDifficulty] = useState("all");
  const [lbInitMode,       setLbInitMode]       = useState("all");

  const draft    = loadDraftFromStorage();
  const vehicles = draft || fileVehicles || [];
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

  const availableNations = Array.from(
    new Set(vehiclesByCatEraPact.map((v) => v.country).filter(Boolean))
  ).sort();

  const filteredVehicles = selectedNation === "all"
    ? vehiclesByCatEraPact
    : vehiclesByCatEraPact.filter((v) => v.country === selectedNation);

  const hasImageAtSelected = (v) =>
    Array.isArray(v.images) && v.images.some((img) => img.stars === selectedDifficulty);
  const playableCount   = filteredVehicles.filter(hasImageAtSelected).length;
  const totalInCategory = filteredVehicles.length;

  const categoryCounts = CATEGORY_OPTIONS.reduce((acc, opt) => {
    const byCat  = opt.id === "all" ? vehicles : vehicles.filter((v) => v.category === opt.id);
    const byEra  = selectedEra    === "all" ? byCat  : byCat.filter((v) => v.era === selectedEra);
    const byPact = selectedPact   === "all" ? byEra  : byEra.filter((v) => getVehiclePact(v.country) === selectedPact);
    const byNat  = selectedNation === "all" ? byPact : byPact.filter((v) => v.country === selectedNation);
    acc[opt.id] = byNat.filter(hasImageAtSelected).length;
    return acc;
  }, {});

  const eraCounts = ERA_OPTIONS.reduce((acc, opt) => {
    const byEra  = opt.id === "all" ? vehiclesByCategory : vehiclesByCategory.filter((v) => v.era === opt.id);
    const byPact = selectedPact   === "all" ? byEra  : byEra.filter((v) => getVehiclePact(v.country) === selectedPact);
    const byNat  = selectedNation === "all" ? byPact : byPact.filter((v) => v.country === selectedNation);
    acc[opt.id] = byNat.filter(hasImageAtSelected).length;
    return acc;
  }, {});

  const pactCounts = PACT_OPTIONS.reduce((acc, opt) => {
    const byPact = opt.id === "all" ? vehiclesByCatEra : vehiclesByCatEra.filter((v) => getVehiclePact(v.country) === opt.id);
    const byNat  = selectedNation === "all" ? byPact : byPact.filter((v) => v.country === selectedNation);
    acc[opt.id] = byNat.filter(hasImageAtSelected).length;
    return acc;
  }, {});

  const difficultyCounts = DIFFICULTY_OPTIONS.reduce((acc, opt) => {
    acc[opt.id] = filteredVehicles.filter(
      (v) => Array.isArray(v.images) && v.images.some((img) => img.stars === opt.id)
    ).length;
    return acc;
  }, {});

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const byCat  = cat === "all" ? vehicles : vehicles.filter((v) => v.category === cat);
    const byEra  = selectedEra  === "all" ? byCat  : byCat.filter((v) => v.era === selectedEra);
    const byPact = selectedPact === "all" ? byEra  : byEra.filter((v) => getVehiclePact(v.country) === selectedPact);
    if (selectedNation !== "all" && !byPact.some((v) => v.country === selectedNation)) setSelectedNation("all");
  };

  const handleEraChange = (era) => {
    setSelectedEra(era);
    const byEra  = era === "all" ? vehiclesByCategory : vehiclesByCategory.filter((v) => v.era === era);
    const byPact = selectedPact === "all" ? byEra : byEra.filter((v) => getVehiclePact(v.country) === selectedPact);
    if (selectedNation !== "all" && !byPact.some((v) => v.country === selectedNation)) setSelectedNation("all");
  };

  const handlePactChange = (pact) => {
    setSelectedPact(pact);
    const byPact = pact === "all" ? vehiclesByCatEra : vehiclesByCatEra.filter((v) => getVehiclePact(v.country) === pact);
    if (selectedNation !== "all" && !byPact.some((v) => v.country === selectedNation)) setSelectedNation("all");
  };

  const startGame = () => {
    setRound(buildRound(filteredVehicles, selectedDifficulty));
    setFinalScore(0);
    setScreen("quiz");
  };

  const finishGame = (score, hintsUsed = 0) => {
    const final = Math.max(0, score - hintsUsed * HINT_PENALTY);
    setFinalScore(final);
    setLastHintsUsed(hintsUsed);
    const mode = selectedMode;
    const catScores  = bestScores[selectedCategory] || {};
    const diffScores = catScores[selectedDifficulty] || {};
    const prev = diffScores[mode] ?? -1;
    if (final > prev) {
      const updated = { ...bestScores, [selectedCategory]: { ...catScores, [selectedDifficulty]: { ...diffScores, [mode]: final } } };
      setBestScores(updated);
      localStorage.setItem(BEST_SCORES_KEY, JSON.stringify(updated));
    }
    setScreen("end");
  };

  if (vehicles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center tac-grid font-tac">
        <div>
          <p className="font-display text-red-400 mb-3" style={{ fontSize: "1.8rem", letterSpacing: "0.1em" }}>DATA LOAD FAILURE</p>
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

  const returnHome = () => { setRound(null); setFinalScore(0); setScreen("landing"); };
  const goToStats  = () => setScreen("stats");

  const goToLeaderboard = (cat, diff, mode) => {
    setLbInitCategory(cat    !== undefined ? cat   : "all");
    setLbInitDifficulty(diff !== undefined ? diff  : "all");
    setLbInitMode(mode       !== undefined ? mode  : "all");
    setScreen("leaderboard");
  };

  const clearScores = () => { localStorage.removeItem(BEST_SCORES_KEY); setBestScores({}); };

  if (!callsign) return <WelcomeScreen onSave={handleCallsignSave} />;

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
  } else if (screen === "learning") {
    body = (
      <LearningHomeScreen
        vehicles={vehicles}
        onBack={() => setScreen("landing")}
        onSelectVehicle={(v) => { setStudyVehicle(v); setScreen("vehicle-study"); }}
      />
    );
  } else if (screen === "vehicle-study") {
    body = <VehicleStudyScreen vehicle={studyVehicle} onBack={() => setScreen("learning")} />;
  } else if (screen === "showcase") {
    body = <ShowcaseScreen onBack={returnHome} />;
  } else if (screen === "home") {
    body = (
      <GameSetupScreen
        onPlay={startGame}
        onGoHome={() => setScreen("landing")}
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
  } else {
    body = (
      <LandingScreen
        callsign={callsign}
        vehicles={vehicles}
        bestScores={bestScores}
        playerRank={playerRank}
        rankNeighbors={rankNeighbors}
        onSetup={() => setScreen("home")}
        onLeaderboard={() => goToLeaderboard("all", "all")}
        onLearning={() => setScreen("learning")}
        onEditCallsign={() => setCallsignModalOpen(true)}
        onShowcase={() => setScreen("showcase")}
      />
    );
  }

  return (
    <>
      {body}

      {swUpdateReady && (
        <div className="font-data"
          style={{ position: "fixed", bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)", left: "50%", transform: "translateX(-50%)", zIndex: 9997, display: "flex", alignItems: "center", gap: 10, background: "rgba(7,11,20,0.96)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 3, padding: "8px 12px 8px 14px", boxShadow: "0 4px 24px rgba(0,0,0,0.6)", whiteSpace: "nowrap" }}
        >
          <span style={{ fontSize: "0.65rem", color: "#94a3b8", letterSpacing: "0.1em" }}>↑ UPDATE AVAILABLE</span>
          {isPlaying ? (
            <span style={{ fontSize: "0.6rem", color: "#334155", letterSpacing: "0.1em", border: "1px solid rgba(51,65,85,0.4)", borderRadius: 2, padding: "3px 8px" }}>AFTER ROUND</span>
          ) : (
            <button onClick={handleSwUpdate}
              style={{ fontSize: "0.6rem", color: "#070b14", background: "#f59e0b", border: "none", borderRadius: 2, padding: "4px 10px", letterSpacing: "0.1em", cursor: "pointer", fontFamily: "'Share Tech Mono', monospace" }}
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

export default App;
