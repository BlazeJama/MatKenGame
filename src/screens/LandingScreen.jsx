import React from 'react';
import TacCard from '../components/TacCard';

export default function LandingScreen({ callsign, vehicles, bestScores, onSetup, onLeaderboard, onLearning, onEditCallsign, onShowcase }) {
  const playableCount = vehicles.filter((v) => Array.isArray(v.images) && v.images.length > 0).length;
  const overallBest = Object.values(bestScores).flatMap((cat) =>
    Object.values(cat).flatMap((diff) => Object.values(diff))
  ).reduce((a, b) => Math.max(a, b), 0);

  return (
    <div className="min-h-screen flex flex-col tac-grid font-tac" style={{ background: "#070b14" }}>
      <header className="px-5 text-center" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 2.5rem)", paddingBottom: "1.2rem" }}>
        <div className="font-data" style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: "rgba(245,158,11,0.5)", marginBottom: 10 }}>
          ◈ ARMOURED RECOGNITION SYSTEM ◈
        </div>
        <h1 className="font-display text-white" style={{ fontSize: "clamp(3rem, 13vw, 4.8rem)", lineHeight: 1, letterSpacing: "0.04em" }}>
          MAT<span style={{ color: "#f59e0b" }}>KEN</span>GAME
        </h1>
        <button
          onClick={onEditCallsign}
          style={{ background: "transparent", border: "none", cursor: "pointer", marginTop: 10 }}
        >
          <span className="font-data" style={{ fontSize: "0.62rem", letterSpacing: "0.12em", color: "#334155" }}>
            OPERATOR: <span style={{ color: "#64748b" }}>{callsign}</span>
          </span>
        </button>
      </header>

      <main className="flex-1 flex flex-col px-5 gap-3 max-w-md mx-auto w-full pb-10">
        {/* Training */}
        <TacCard
          className="w-full"
          style={{ padding: "20px 18px", cursor: "pointer", userSelect: "none" }}
          onClick={onSetup}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onSetup()}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <div className="font-data" style={{ fontSize: "0.58rem", letterSpacing: "0.2em", color: "rgba(245,158,11,0.6)", marginBottom: 4 }}>◈ TRAINING</div>
              <div className="font-display text-white" style={{ fontSize: "1.7rem", letterSpacing: "0.06em", lineHeight: 1.1 }}>
                TEST YOUR<br />KNOWLEDGE
              </div>
            </div>
            <div className="text-right">
              <div className="font-data" style={{ fontSize: "0.58rem", letterSpacing: "0.12em", color: "#334155", marginBottom: 2 }}>BEST SCORE</div>
              <div className="font-display" style={{ fontSize: "1.6rem", color: overallBest > 0 ? "#f59e0b" : "#1e293b", letterSpacing: "0.04em" }}>
                {overallBest > 0 ? overallBest : "—"}
              </div>
            </div>
          </div>
          <div className="font-data" style={{ fontSize: "0.65rem", color: "#475569", letterSpacing: "0.08em", lineHeight: 1.6, marginBottom: 14 }}>
            {playableCount} VEHICLES · MULTIPLE CATEGORIES · 3 DIFFICULTY LEVELS
          </div>
          <div className="font-display w-full text-center" style={{ fontSize: "1.1rem", letterSpacing: "0.14em", background: "#f59e0b", color: "#070b14", borderRadius: 2, padding: "10px 0" }}>
            BEGIN TRAINING →
          </div>
        </TacCard>

        {/* Learning */}
        <TacCard
          className="w-full"
          style={{ padding: "20px 18px", cursor: "pointer", userSelect: "none" }}
          onClick={onLearning}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onLearning()}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <div className="font-data" style={{ fontSize: "0.58rem", letterSpacing: "0.2em", color: "rgba(245,158,11,0.6)", marginBottom: 4 }}>◈ INTELLIGENCE</div>
              <div className="font-display text-white" style={{ fontSize: "1.7rem", letterSpacing: "0.06em", lineHeight: 1.1 }}>
                LEARNING<br />HUB
              </div>
            </div>
            <div className="text-right">
              <div className="font-data" style={{ fontSize: "0.58rem", letterSpacing: "0.12em", color: "#334155", marginBottom: 2 }}>IN DATABASE</div>
              <div className="font-display" style={{ fontSize: "1.6rem", color: "#f59e0b", letterSpacing: "0.04em" }}>
                {vehicles.length}
              </div>
            </div>
          </div>
          <div className="font-data" style={{ fontSize: "0.65rem", color: "#475569", letterSpacing: "0.08em", lineHeight: 1.6, marginBottom: 14 }}>
            BROWSE VEHICLE PROFILES · ARMAMENT · PROTECTION · VARIANTS
          </div>
          <div className="font-display w-full text-center" style={{ fontSize: "1.1rem", letterSpacing: "0.14em", border: "1px solid rgba(245,158,11,0.35)", color: "#f59e0b", borderRadius: 2, padding: "10px 0" }}>
            STUDY VEHICLES →
          </div>
        </TacCard>

        {/* Leaderboard */}
        <TacCard
          className="w-full"
          style={{ padding: "20px 18px", cursor: "pointer", userSelect: "none" }}
          onClick={onLeaderboard}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onLeaderboard()}
        >
          <div style={{ marginBottom: 8 }}>
            <div className="font-data" style={{ fontSize: "0.58rem", letterSpacing: "0.2em", color: "rgba(245,158,11,0.6)", marginBottom: 4 }}>◈ GLOBAL</div>
            <div className="font-display text-white" style={{ fontSize: "1.7rem", letterSpacing: "0.06em", lineHeight: 1.1 }}>
              LEADER<span style={{ color: "#f59e0b" }}>BOARD</span>
            </div>
          </div>
          <div className="font-data" style={{ fontSize: "0.65rem", color: "#475569", letterSpacing: "0.08em", lineHeight: 1.6, marginBottom: 14 }}>
            COMPETE GLOBALLY · RANKED BY SCORE · ALL CATEGORIES
          </div>
          <div className="font-display w-full text-center" style={{ fontSize: "1.1rem", letterSpacing: "0.14em", border: "1px solid rgba(51,65,85,0.5)", color: "#64748b", borderRadius: 2, padding: "10px 0" }}>
            VIEW RANKINGS →
          </div>
        </TacCard>
      </main>

      <footer className="text-center" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}>
        <button onClick={onShowcase} className="font-data text-xs" style={{ background: "none", border: "none", cursor: "pointer", color: "#1e293b", letterSpacing: "0.12em", padding: "8px" }}>
          v0.2.0 · CLASSIFIED
        </button>
      </footer>
    </div>
  );
}
