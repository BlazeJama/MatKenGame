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
    <div className="min-h-screen flex flex-col tac-grid font-tac">
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

      <header className="px-6 pb-6 text-center" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 1.4rem)" }}>
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
          <button
            onClick={onGoHome}
            className="font-data"
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "#475569", letterSpacing: "0.12em", fontSize: "0.68rem", padding: 0 }}
          >
            ← HOME
          </button>
        </div>
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
        <TacCard className="w-full mb-6" style={{ padding: "24px 28px" }}>
          <div
            className="font-data text-xs tracking-widest mb-5"
            style={{ color: "rgba(245,158,11,0.4)", letterSpacing: "0.14em" }}
          >
            MISSION INTEL
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="font-display text-white" style={{ fontSize: "3.8rem", lineHeight: 1 }}>
                {playableCount}
              </div>
              <div className="text-sm font-semibold tracking-wider mt-1" style={{ color: "#64748b", letterSpacing: "0.1em" }}>
                VEHICLES READY
              </div>
            </div>
            <div className="text-right">
              <div className="font-display" style={{ fontSize: "2.8rem", lineHeight: 1, color: "#f59e0b" }}>
                10
              </div>
              <div className="text-sm font-semibold tracking-wider mt-1" style={{ color: "#64748b", letterSpacing: "0.1em" }}>
                PER ROUND
              </div>
            </div>
          </div>
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
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>CATEGORY</div>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.filter((opt) => !opt.hidden).map((opt) => {
              const isSelected = selectedCategory === opt.id;
              const count = categoryCounts[opt.id] ?? 0;
              return (
                <button key={opt.id} onClick={() => onCategoryChange(opt.id)} className="font-data"
                  style={{
                    fontSize: "0.72rem", padding: "5px 12px", borderRadius: 2,
                    letterSpacing: "0.1em", minHeight: 44,
                    border: `1px solid ${isSelected ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                    background: isSelected ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                    color: isSelected ? "#f59e0b" : count > 0 ? "#64748b" : "#1e293b",
                    opacity: count === 0 && !isSelected ? 0.45 : 1,
                    cursor: "pointer",
                  }}
                >{opt.label}</button>
              );
            })}
          </div>
        </div>

        {/* Era selector */}
        <div className="w-full mb-4">
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>ERA</div>
          <div className="flex flex-wrap gap-2">
            {ERA_OPTIONS.filter((opt) => !opt.hidden).map((opt) => {
              const isSelected = selectedEra === opt.id;
              const count = eraCounts[opt.id] ?? 0;
              return (
                <button key={opt.id} onClick={() => onEraChange(opt.id)} className="font-data"
                  style={{
                    fontSize: "0.72rem", padding: "5px 12px", borderRadius: 2,
                    letterSpacing: "0.1em", minHeight: 44,
                    border: `1px solid ${isSelected ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                    background: isSelected ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                    color: isSelected ? "#f59e0b" : count > 0 ? "#64748b" : "#1e293b",
                    opacity: count === 0 && !isSelected ? 0.45 : 1,
                    cursor: "pointer",
                  }}
                >{opt.label}</button>
              );
            })}
          </div>
        </div>

        {/* Pact selector */}
        <div className="w-full mb-4">
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>ALLIANCE</div>
          <div className="flex flex-wrap gap-2">
            {PACT_OPTIONS.filter((opt) => !opt.hidden).map((opt) => {
              const isSelected = selectedPact === opt.id;
              const count = pactCounts[opt.id] ?? 0;
              return (
                <button key={opt.id} onClick={() => onPactChange(opt.id)} className="font-data"
                  style={{
                    fontSize: "0.72rem", padding: "5px 12px", borderRadius: 2,
                    letterSpacing: "0.1em", minHeight: 44,
                    border: `1px solid ${isSelected ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                    background: isSelected ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                    color: isSelected ? "#f59e0b" : count > 0 ? "#64748b" : "#1e293b",
                    opacity: count === 0 && !isSelected ? 0.45 : 1,
                    cursor: "pointer",
                  }}
                >{opt.label}</button>
              );
            })}
          </div>
        </div>

        {/* Nation selector — HIDDEN: change `false` to `true` to restore */}
        {false && <div className="w-full mb-4">
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>NATION</div>
          <div className="relative">
            <select
              value={selectedNation}
              onChange={(e) => onNationChange(e.target.value)}
              className="w-full font-data"
              style={{
                fontSize: "0.72rem", padding: "8px 32px 8px 12px", borderRadius: 2,
                letterSpacing: "0.1em", minHeight: 44,
                border: `1px solid ${selectedNation !== "all" ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                background: selectedNation !== "all" ? "rgba(245,158,11,0.08)" : "rgba(15,23,42,0.5)",
                color: selectedNation !== "all" ? "#f59e0b" : "#64748b",
                appearance: "none", WebkitAppearance: "none", width: "100%", cursor: "pointer",
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
              style={{ right: 12, top: "50%", transform: "translateY(-50%)", color: selectedNation !== "all" ? "#f59e0b" : "#475569", fontSize: "0.75rem", lineHeight: 1 }}
            >
              ▾
            </div>
          </div>
        </div>}

        {/* Difficulty selector */}
        <div className="w-full mb-5">
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>DIFFICULTY</div>
          <div className="flex gap-2">
            {DIFFICULTY_OPTIONS.map((opt) => {
              const isSelected = selectedDifficulty === opt.id;
              const count = difficultyCounts[opt.id] ?? 0;
              return (
                <button key={opt.id} onClick={() => onDifficultyChange(opt.id)} className="font-data flex-1"
                  style={{
                    fontSize: "0.72rem", padding: "8px 8px", borderRadius: 2,
                    letterSpacing: "0.1em", minHeight: 44,
                    border: `1px solid ${isSelected ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                    background: isSelected ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                    color: isSelected ? "#f59e0b" : count > 0 ? "#64748b" : "#1e293b",
                    opacity: count === 0 && !isSelected ? 0.45 : 1,
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
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
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>MODE</div>
          <div className="flex gap-2">
            {[
              { id: "normal", label: "NORMAL", sub: "10 × 100 pts" },
              { id: "timed",  label: "TIMED",  sub: "15s · speed bonus" },
            ].map((opt) => {
              const isSel = selectedMode === opt.id;
              return (
                <button key={opt.id} onClick={() => onModeChange(opt.id)} className="font-data flex-1"
                  style={{
                    padding: "8px", borderRadius: 2, letterSpacing: "0.1em", minHeight: 46,
                    border: `1px solid ${isSel ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                    background: isSel ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                    color: isSel ? "#f59e0b" : "#64748b",
                    cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
                  }}
                >
                  <span style={{ fontSize: "0.72rem" }}>{opt.label}</span>
                  <span style={{ fontSize: "0.58rem", opacity: 0.65, letterSpacing: "0.06em" }}>{opt.sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={onPlay}
          disabled={!canPlay}
          className="w-full font-display tracking-widest tac-primary mb-6"
          style={{
            fontSize: "1.45rem", minHeight: "58px", borderRadius: 2, letterSpacing: "0.14em",
            background: canPlay ? "#f59e0b" : "rgba(30,41,59,0.7)",
            color: canPlay ? "#070b14" : "#334155",
            border: canPlay ? "none" : "1px solid rgba(51,65,85,0.5)",
            cursor: canPlay ? "pointer" : "not-allowed",
          }}
        >
          {canPlay ? "BEGIN TRAINING" : "NO VEHICLES LOADED"}
        </button>

        <div className="w-full flex gap-2 mb-5">
          <button onClick={onViewStats} className="flex-1 font-data text-xs"
            style={{ background: "transparent", border: "1px solid rgba(51,65,85,0.35)", borderRadius: 2, color: "#475569", letterSpacing: "0.12em", cursor: "pointer", minHeight: 44 }}
          >
            ◆ PERF LOG
          </button>
          <button onClick={onViewLeaderboard} className="flex-1 font-data text-xs"
            style={{ background: "transparent", border: "1px solid rgba(51,65,85,0.35)", borderRadius: 2, color: "#475569", letterSpacing: "0.12em", cursor: "pointer", minHeight: 44 }}
          >
            ⊞ LEADERBOARD
          </button>
          {callsign && (
            <button onClick={onEditCallsign} className="flex-1 font-data text-xs"
              style={{ background: "transparent", border: "1px solid rgba(245,158,11,0.22)", borderRadius: 2, color: "#475569", letterSpacing: "0.1em", cursor: "pointer", minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
            >
              <span style={{ color: "#f59e0b" }}>{callsign}</span>
              <span style={{ fontSize: "0.6rem", opacity: 0.5 }}>✎</span>
            </button>
          )}
        </div>
      </main>

      <footer className="text-center" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}>
        <span className="font-data text-xs" style={{ color: "#1e293b", letterSpacing: "0.12em" }}>v0.2.0 · CLASSIFIED</span>
      </footer>
    </div>
  );
}
