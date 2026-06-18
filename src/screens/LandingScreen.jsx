import React from 'react';

export default function LandingScreen({
  vehicles,
  playerRank = null,
  rankNeighbors = [],
  onSetup,
  onLeaderboard,
  onLearning,
  onShowcase,
  // kept for App.jsx compatibility
  callsign, bestScores, onEditCallsign,
}) {
  return (
    <div className="tac-grid" style={{ background: "#070b14", minHeight: "100vh" }}>
    <div className="font-tac flex flex-col" style={{ maxWidth: 390, margin: "0 auto", minHeight: "100vh" }}>

      {/* Header */}
      <header style={{ background: "#070b14", paddingTop: "calc(env(safe-area-inset-top, 0px) + 40px)", paddingBottom: 18 }}>
        <div style={{ paddingLeft: 67, display: "flex", alignItems: "baseline" }}>
          <span className="font-display" style={{ fontSize: "3.5625rem", lineHeight: 1, letterSpacing: "0.04em", color: "#e2e8f0" }}>MATKEN</span>
          <span className="font-display" style={{ fontSize: "3.5625rem", lineHeight: 1, letterSpacing: "0.04em", color: "#f59e0a" }}>GAME</span>
        </div>
        <p style={{ paddingLeft: 72, marginTop: 16, fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.6875rem", letterSpacing: "0.16em", color: "#47576b", margin: "16px 0 0 0" }}>
          MILITARY VEHICLE RECOGNITION TRAINING
        </p>
      </header>

      {/* Cards */}
      <main className="flex-1" style={{ display: "flex", flexDirection: "column", gap: 16, padding: "32px 24px 40px" }}>

        {/* Test Your Self */}
        <div
          style={{ background: "rgba(26,39,68,0.45)", border: "1px solid rgba(245,158,11,0.35)", height: 160, display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", cursor: "pointer" }}
          onClick={onSetup}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onSetup()}
        >
          <div style={{ padding: "0 20px", flex: "0 0 57px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#f59e0b", margin: 0 }}>
              ◈ TRAINING
            </p>
            <p className="font-display" style={{ fontSize: "2.25rem", lineHeight: 1, margin: 0 }}>
              <span style={{ color: "#e2e8f0" }}>TEST </span>
              <span style={{ color: "#f59e0b" }}>YOUR self</span>
            </p>
          </div>
          <div style={{ padding: "0 20px", flex: "0 0 22px", display: "flex", alignItems: "center" }}>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#64748b", margin: 0, whiteSpace: "nowrap" }}>
              60+ VEHICLES - MULTIPLE CATEGORIES - 3 DIFFICULTY LEVELS
            </p>
          </div>
          <div style={{ padding: "0 20px" }}>
            <div style={{ background: "#f59e0b", height: 40, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
              <span className="font-display" style={{ fontSize: "1.4375rem", color: "#070b14", letterSpacing: "0.14em" }}>
                BEGIN TRAINING →
              </span>
            </div>
          </div>
        </div>

        {/* Vehicle Library */}
        <div
          style={{ background: "rgba(26,39,68,0.45)", border: "1px solid rgba(245,158,11,0.35)", borderRadius: 2, height: 160, display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", cursor: "pointer" }}
          onClick={onLearning}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onLearning()}
        >
          <div style={{ padding: "0 20px", flex: "0 0 57px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#f59e0b", margin: 0 }}>
              ◈ INTELLIGENCE
            </p>
            <p className="font-display" style={{ fontSize: "2.25rem", lineHeight: 1, margin: 0 }}>
              <span style={{ color: "#e2e8f0" }}>VEHICLE </span>
              <span style={{ color: "#f59e0b" }}>LIBRARY</span>
            </p>
          </div>
          <div style={{ padding: "0 20px", flex: "0 0 22px", display: "flex", alignItems: "center" }}>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#64748b", margin: 0, whiteSpace: "nowrap" }}>
              VEHICLES PROFILES - ARMAMENT - PROTECTION - VARIANTS
            </p>
          </div>
          <div style={{ padding: "0 20px" }}>
            <div style={{ border: "1px solid #f59e0b", borderRadius: 2, height: 40, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
              <span className="font-display" style={{ fontSize: "1.4375rem", color: "#f59e0b", letterSpacing: "0.14em" }}>
                STUDY VEHICLES →
              </span>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div
          style={{ background: "rgba(26,39,68,0.45)", border: "1px solid rgba(245,158,10,0.35)", borderRadius: 2, height: 160, display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", cursor: "pointer" }}
          onClick={onLeaderboard}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onLeaderboard()}
        >
          <div style={{ padding: "0 20px", flex: "0 0 57px", display: "flex", gap: 29, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", flex: 1, overflow: "hidden", whiteSpace: "nowrap" }}>
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#f59e0b", margin: 0 }}>
                ◈ TRAINING
              </p>
              <p className="font-display" style={{ fontSize: "2.25rem", lineHeight: 1, margin: 0 }}>
                <span style={{ color: "#e2e8f0" }}>LEADER</span>
                <span style={{ color: "#f87171" }}>BOARD</span>
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", overflow: "hidden", flexShrink: 0 }}>
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.6875rem", letterSpacing: "0.118em", color: "#637387", whiteSpace: "nowrap", margin: 0 }}>
                YOUR RANK
              </p>
              <p className="font-display" style={{ fontSize: "2.25rem", lineHeight: 1, color: "#e2e8f0", whiteSpace: "nowrap", margin: "4px 0 0 0" }}>
                {playerRank != null ? `#${playerRank}` : "—"}
              </p>
            </div>
          </div>
          <div style={{ padding: "0 20px", flex: "0 0 22px", display: "flex", alignItems: "center" }}>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#64748b", margin: 0, whiteSpace: "nowrap" }}>
              GLOBAL STANDING - RANKED BY SCORE - ALL CATEGORIES
            </p>
          </div>
          <div style={{ padding: "0 20px" }}>
            <div style={{ border: "1px solid #334054", height: 40, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
              <span className="font-display" style={{ fontSize: "1.4375rem", color: "#64748b", letterSpacing: "0.14em" }}>
                VIEW RANKINGS →
              </span>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="text-center" style={{ height: 50, display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "calc(env(safe-area-inset-bottom, 0px))" }}>
        <button
          onClick={onShowcase}
          style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.6875rem", letterSpacing: "0.12em", color: "#1e293b", padding: "8px" }}
        >
          v0.2.0 · CLASSIFIED
        </button>
      </footer>

    </div>
    </div>
  );
}
