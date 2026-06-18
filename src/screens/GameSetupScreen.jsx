import React from 'react';
import TacCard from '../components/TacCard';
import { CATEGORY_OPTIONS, ERA_OPTIONS, PACT_OPTIONS, DIFFICULTY_OPTIONS } from '../lib/constants';

export default function GameSetupScreen({
  onPlay, onGoHome, totalInCategory, playableCount, usingDraft,
  selectedCategory, onCategoryChange, categoryCounts,
  selectedEra, onEraChange, eraCounts,
  selectedPact, onPactChange, pactCounts,
  selectedNation, onNationChange, availableNations,
  selectedDifficulty, onDifficultyChange, difficultyCounts,
  selectedMode, onModeChange,
  bestScore, onViewStats, onViewLeaderboard,
  callsign, onEditCallsign,
}) {
  const canPlay = playableCount > 0;

  return (
    <div className="tac-grid" style={{ background: "#070b14", minHeight: "100vh" }}>
    <div className="font-tac flex flex-col" style={{ maxWidth: 390, margin: "0 auto", minHeight: "100vh" }}>

      {usingDraft && (
        <div
          style={{
            background: "rgba(120,80,0,0.3)",
            borderBottom: "1px solid rgba(245,158,11,0.3)",
            color: "#fcd34d",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.06em",
            textAlign: "center",
            paddingTop: "calc(env(safe-area-inset-top, 0px) + 8px)",
            paddingBottom: 8,
          }}
        >
          ⚠ PREVIEW MODE — LOCAL ADMIN DRAFT ACTIVE
        </div>
      )}

      {/* Header */}
      <header style={{
        height: "calc(140px + env(safe-area-inset-top, 0px))",
        background: "#070b14",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        {/* ← BACK */}
        <div style={{ position: "absolute", top: "calc(env(safe-area-inset-top, 0px) + 0px)", left: 0, right: 0, height: 40, display: "flex", alignItems: "flex-end", paddingLeft: 24, paddingBottom: 11 }}>
          <button
            onClick={onGoHome}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center" }}
          >
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.875rem", letterSpacing: 0, color: "#f59e0b" }}>
              ← BACK
            </span>
          </button>
        </div>

        {/* ◈ GLOBAL RANKING ◈ */}
        <div style={{ position: "absolute", top: "calc(env(safe-area-inset-top, 0px) + 40px)", left: 0, right: 0, height: 21, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#f59e0b", margin: 0 }}>
            ◈ GLOBAL RANKING ◈
          </p>
        </div>

        {/* GAME SETTINGS title */}
        <div style={{ position: "absolute", top: "calc(env(safe-area-inset-top, 0px) + 61px)", left: 0, right: 0, height: 50, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, paddingLeft: 15, paddingRight: 15 }}>
          <span className="font-display" style={{ fontSize: "3rem", lineHeight: 1, color: "#e2e8f0" }}>game</span>
          <span className="font-display" style={{ fontSize: "3rem", lineHeight: 1, color: "#f59e0b" }}>settings</span>
        </div>

        {/* Subtitle */}
        <div style={{ position: "absolute", top: "calc(env(safe-area-inset-top, 0px) + 111px)", left: 0, right: 0, height: 29, display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: 21, paddingRight: 21 }}>
          <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", color: "#475569", margin: 0 }}>
            MILITARY VEHICLES RECOGNITION TRAINING
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1" style={{ display: "flex", flexDirection: "column", gap: 16, padding: "0 24px 32px", overflowY: "auto", WebkitOverflowScrolling: "touch" }}>

        {/* Mission Intel */}
        <div style={{ background: "rgba(26,39,68,0.45)", border: "1px solid rgba(245,158,10,0.18)", borderRadius: 2, padding: "24px 28px 20px" }}>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.6875rem", letterSpacing: "0.154em", color: "rgba(245,158,10,0.4)", margin: "0 0 20px" }}>
            MISSION INTEL
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="font-display" style={{ fontSize: "3.75rem", lineHeight: 1, color: "#e2e8f0" }}>{playableCount}</span>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.8125rem", letterSpacing: "0.1em", color: "#637387" }}>VEHICLES READY</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
              <span className="font-display" style={{ fontSize: "2.8125rem", lineHeight: 1, color: "#f59e0a" }}>10</span>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.8125rem", letterSpacing: "0.1em", color: "#637387" }}>PER ROUND</span>
            </div>
          </div>
          <div style={{ height: 16 }} />
          <div style={{ height: 1, background: "rgba(51,65,85,0.4)", width: "100%" }} />
          <div style={{ height: 12 }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#334155" }}>
              {totalInCategory - playableCount > 0
                ? `${totalInCategory - playableCount} DRAFT${totalInCategory - playableCount !== 1 ? "S" : ""} — NO IMAGES`
                : "ALL VEHICLES READY"}
            </span>
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.6875rem", letterSpacing: "0.08em", color: bestScore != null ? "#f59e0a" : "#334155" }}>
              {selectedMode === "timed" ? "⏱ " : ""}BEST&nbsp;&nbsp;
              <span style={{ color: bestScore != null ? "#f59e0a" : "#1e293b" }}>
                {bestScore != null ? `${bestScore}` : "—"}
              </span>
            </span>
          </div>
        </div>

        {/* Category */}
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.6875rem", letterSpacing: "0.12em", color: "#334155", margin: 0 }}>CATEGORY</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: -8 }}>
          {CATEGORY_OPTIONS.filter((opt) => !opt.hidden).map((opt) => {
            const isSelected = selectedCategory === opt.id;
            const count = categoryCounts[opt.id] ?? 0;
            return (
              <button key={opt.id} onClick={() => onCategoryChange(opt.id)}
                style={{
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
                  fontSize: "0.875rem", letterSpacing: "0.011em",
                  padding: "13px 11px", borderRadius: 2, flexShrink: 0,
                  border: `1px solid ${isSelected ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                  background: isSelected ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                  color: isSelected ? "#f59e0a" : count > 0 ? "#637387" : "#1e293b",
                  opacity: count === 0 && !isSelected ? 0.45 : 1,
                  cursor: "pointer",
                }}
              >{opt.label}</button>
            );
          })}
        </div>

        {/* Era */}
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.6875rem", letterSpacing: "0.12em", color: "#334155", margin: 0 }}>ERA</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: -8 }}>
          {ERA_OPTIONS.filter((opt) => !opt.hidden).map((opt) => {
            const isSelected = selectedEra === opt.id;
            const count = eraCounts[opt.id] ?? 0;
            return (
              <button key={opt.id} onClick={() => onEraChange(opt.id)}
                style={{
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
                  fontSize: "0.875rem", letterSpacing: "0.011em",
                  padding: "13px 11px", borderRadius: 2, flexShrink: 0,
                  border: `1px solid ${isSelected ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                  background: isSelected ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                  color: isSelected ? "#f59e0a" : count > 0 ? "#637387" : "#1e293b",
                  opacity: count === 0 && !isSelected ? 0.45 : 1,
                  cursor: "pointer",
                }}
              >{opt.label}</button>
            );
          })}
        </div>

        {/* Alliance */}
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.6875rem", letterSpacing: "0.12em", color: "#334155", margin: 0 }}>ALLIANCE</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: -8 }}>
          {PACT_OPTIONS.filter((opt) => !opt.hidden).map((opt) => {
            const isSelected = selectedPact === opt.id;
            const count = pactCounts[opt.id] ?? 0;
            return (
              <button key={opt.id} onClick={() => onPactChange(opt.id)}
                style={{
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
                  fontSize: "0.875rem", letterSpacing: "0.011em",
                  padding: "13px 11px", borderRadius: 2, flexShrink: 0,
                  border: `1px solid ${isSelected ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                  background: isSelected ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                  color: isSelected ? "#f59e0a" : count > 0 ? "#637387" : "#1e293b",
                  opacity: count === 0 && !isSelected ? 0.45 : 1,
                  cursor: "pointer",
                }}
              >{opt.label}</button>
            );
          })}
        </div>

        {/* Difficulty */}
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.6875rem", letterSpacing: "0.12em", color: "#334155", margin: 0 }}>DIFFICULTY</p>
        <div style={{ display: "flex", gap: 8, marginTop: -8 }}>
          {DIFFICULTY_OPTIONS.map((opt) => {
            const isSelected = selectedDifficulty === opt.id;
            const count = difficultyCounts[opt.id] ?? 0;
            return (
              <button key={opt.id} onClick={() => onDifficultyChange(opt.id)}
                style={{
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
                  fontSize: "0.6875rem", letterSpacing: "0.1em",
                  height: 44, flex: "1 0 0", borderRadius: 2,
                  border: `1px solid ${isSelected ? "#f59e0a" : "rgba(51,65,85,0.5)"}`,
                  background: isSelected ? "rgba(245,158,10,0.12)" : "rgba(15,23,42,0.5)",
                  color: isSelected ? "#f59e0a" : count > 0 ? "#637387" : "#1e293b",
                  opacity: count === 0 && !isSelected ? 0.45 : 1,
                  cursor: "pointer",
                  whiteSpace: "pre",
                }}
              >{`${opt.stars}  ${opt.label}`}</button>
            );
          })}
        </div>

        {/* Mode */}
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.6875rem", letterSpacing: "0.12em", color: "#334155", margin: 0 }}>MODE</p>
        <div style={{ display: "flex", gap: 8, marginTop: -8 }}>
          {[
            { id: "normal", label: "NORMAL", sub: "10 × 100 pts" },
            { id: "timed",  label: "TIMED",  sub: "15s · speed bonus" },
          ].map((opt) => {
            const isSel = selectedMode === opt.id;
            return (
              <button key={opt.id} onClick={() => onModeChange(opt.id)}
                style={{
                  flex: "1 0 0", height: 46, borderRadius: 2,
                  border: `1px solid ${isSel ? "#f59e0a" : "rgba(51,65,85,0.5)"}`,
                  background: isSel ? "rgba(245,158,10,0.12)" : "rgba(15,23,42,0.5)",
                  cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
                }}
              >
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.6875rem", letterSpacing: "0.1em", color: isSel ? "#f59e0a" : "#637387" }}>{opt.label}</span>
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 400, fontSize: "0.5625rem", letterSpacing: "0.06em", color: "rgba(99,115,135,0.65)" }}>{opt.sub}</span>
              </button>
            );
          })}
        </div>

        {/* BEGIN TRAINING */}
        <button
          onClick={onPlay}
          disabled={!canPlay}
          className="font-display"
          style={{
            height: 40, borderRadius: 0, width: "100%",
            background: canPlay ? "#f59e0b" : "rgba(30,41,59,0.7)",
            color: canPlay ? "#070b14" : "#334155",
            border: canPlay ? "none" : "1px solid rgba(51,65,85,0.5)",
            fontSize: "1.4375rem", letterSpacing: "0.14em",
            cursor: canPlay ? "pointer" : "not-allowed",
          }}
        >
          {canPlay ? "BEGIN TRAINING →" : "NO VEHICLES LOADED"}
        </button>

      </main>

      {/* Footer */}
      <footer style={{ height: 50, display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "calc(env(safe-area-inset-bottom, 0px))" }}>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.6875rem", letterSpacing: "0.12em", color: "#1e293b" }}>
          v0.2.0 · CLASSIFIED
        </span>
      </footer>

    </div>
    </div>
  );
}
