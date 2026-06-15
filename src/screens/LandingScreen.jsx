import React from 'react';
import TacCard from '../components/TacCard';

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
      <header className="text-center px-6" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 2.5rem)", paddingBottom: "1.5rem" }}>
        <h1 className="font-display" style={{ fontSize: "clamp(3rem, 13vw, 4.8rem)", lineHeight: 1, letterSpacing: "0.04em" }}>
          <span style={{ color: "#e2e8f0" }}>MATKEN</span><span style={{ color: "#f59e0b" }}>GAME</span>
        </h1>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.68rem", letterSpacing: "0.16em", color: "#47576b", marginTop: 14 }}>
          MILITARY VEHICLE RECOGNITION TRAINING
        </p>
      </header>

      {/* Cards */}
      <main className="flex-1 flex flex-col px-6 max-w-md mx-auto w-full pb-10" style={{ gap: 16, paddingTop: 32 }}>

        {/* Leaderboard */}
        <TacCard
          style={{ padding: "24px 28px", cursor: "pointer", userSelect: "none" }}
          onClick={onLeaderboard}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onLeaderboard()}
        >
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.14em", color: "rgba(245,158,11,0.4)", marginBottom: 6 }}>
            LEADERBOARD
          </div>
          <div className="font-display" style={{ fontSize: "3rem", color: "#f59e0b", letterSpacing: "0.04em", lineHeight: 1 }}>
            {playerRank != null ? `#${playerRank}` : "—"}
          </div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.12em", color: "#637387", marginTop: 8 }}>
            YOUR BEST RANK
          </div>
          <div style={{ height: 1, background: "rgba(51,65,85,0.4)", margin: "14px 0" }} />
          {rankNeighbors.length > 0 ? (
            rankNeighbors.map((n, i) => (
              <div key={i} style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.68rem", letterSpacing: "0.08em", color: "#334155", lineHeight: 1.8 }}>
                {n}
              </div>
            ))
          ) : (
            <>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.68rem", color: "#334155", lineHeight: 1.8 }}>—</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.68rem", color: "#334155", lineHeight: 1.8 }}>—</div>
            </>
          )}
        </TacCard>

        {/* Learning */}
        <TacCard
          style={{ padding: "33px 28px", cursor: "pointer", userSelect: "none", border: "1px solid rgba(245,158,11,0.35)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 108 }}
          onClick={onLearning}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onLearning()}
        >
          <div className="font-display text-white" style={{ fontSize: "2.25rem", letterSpacing: "0.04em", lineHeight: 1 }}>
            STUDY VEHICLES
          </div>
        </TacCard>

        {/* Test Your Knowledge */}
        <TacCard
          style={{ padding: "33px 28px", cursor: "pointer", userSelect: "none", border: "1px solid rgba(245,158,11,0.35)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 108 }}
          onClick={onSetup}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onSetup()}
        >
          <div className="font-display text-white" style={{ fontSize: "2.25rem", letterSpacing: "0.04em", lineHeight: 1 }}>
            TEST YOUR KNOWLEDGE
          </div>
        </TacCard>

      </main>

      {/* Footer */}
      <footer className="text-center" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}>
        <button
          onClick={onShowcase}
          style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: "#1e293b", padding: "8px" }}
        >
          v0.2.0 · CLASSIFIED
        </button>
      </footer>
    </div>
    </div>
  );
}
