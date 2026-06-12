import React, { useState } from 'react';
import TacCard from '../components/TacCard';
import { DIFFICULTY_OPTIONS, HINT_PENALTY } from '../lib/constants';
import { scoreLabel, scoreSubtext, scoreLabelColor, submitScore } from '../lib/utils';

export default function EndScreen({
  score, total, onPlayAgain, onReturnHome,
  callsign, onEditCallsign,
  selectedCategory, selectedDifficulty, onViewLeaderboard,
  mode = "normal", hintsUsed = 0,
}) {
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
        <div className="font-data text-xs tracking-widest mb-4" style={{ color: "rgba(245,158,11,0.5)", letterSpacing: "0.18em" }}>
          ◈ MISSION COMPLETE ◈
        </div>
        <h1 className="font-display text-white" style={{ fontSize: "4rem", letterSpacing: "0.08em" }}>DEBRIEF</h1>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pb-10 max-w-md mx-auto w-full">
        <TacCard className="w-full text-center mb-5" style={{ padding: "28px 28px" }}>
          <div className="font-display" style={{ fontSize: "4rem", lineHeight: 1, letterSpacing: "0.04em" }}>
            <span className="text-white">{score}</span>
            <span style={{ fontSize: "1.6rem", color: "#334155", marginLeft: 2 }}>/{total}</span>
          </div>
          <div className="mx-auto my-4" style={{ height: 3, background: "rgba(245,158,11,0.12)", borderRadius: 2, maxWidth: 180 }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "#f59e0b", borderRadius: 2, transition: "width 0.7s ease" }} />
          </div>
          <div className="font-display tracking-widest mb-2" style={{ fontSize: "1.5rem", color: scoreLabelColor(score), letterSpacing: "0.12em" }}>
            {scoreLabel(score)}
          </div>
          <div style={{ color: "#475569", fontSize: "0.95rem" }}>{scoreSubtext(score)}</div>
          {hintsUsed > 0 && (
            <div className="font-data text-xs mt-3" style={{ color: "#f87171", letterSpacing: "0.08em" }}>
              −{hintsUsed * HINT_PENALTY} PTS · {hintsUsed} HINT{hintsUsed > 1 ? "S" : ""} USED
            </div>
          )}
          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
            <span className="font-data text-xs px-2 py-1" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 2, color: "#64748b", letterSpacing: "0.08em" }}>{catLabel}</span>
            <span className="font-data text-xs px-2 py-1" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 2, color: "#64748b", letterSpacing: "0.08em" }}>{diffLabel}</span>
            <span className="font-data text-xs px-2 py-1" style={{ background: mode === "timed" ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)", border: `1px solid ${mode === "timed" ? "rgba(239,68,68,0.25)" : "rgba(245,158,11,0.2)"}`, borderRadius: 2, color: mode === "timed" ? "#fca5a5" : "#64748b", letterSpacing: "0.08em" }}>
              {mode === "timed" ? "⏱ TIMED" : "NORMAL"}
            </span>
          </div>
        </TacCard>

        <button onClick={onPlayAgain} className="w-full font-display tracking-widest tac-primary mb-3"
          style={{ fontSize: "1.45rem", minHeight: "58px", borderRadius: 2, background: "#f59e0b", color: "#070b14", border: "none", letterSpacing: "0.14em", cursor: "pointer" }}
        >
          PLAY AGAIN
        </button>

        {callsign && submitState !== "submitted" && (
          <button onClick={handleSubmit} disabled={submitState === "submitting"} className="w-full font-display tracking-widest mb-3"
            style={{ fontSize: "1.45rem", minHeight: "58px", borderRadius: 2, background: submitState === "idle" ? "rgba(245,158,11,0.08)" : "rgba(15,23,42,0.5)", color: submitState === "idle" ? "#f59e0b" : "#334155", border: `1px solid ${submitState === "idle" ? "rgba(245,158,11,0.35)" : "rgba(51,65,85,0.3)"}`, letterSpacing: "0.14em", cursor: submitState === "idle" ? "pointer" : "not-allowed" }}
          >
            {submitState === "submitting" ? "TRANSMITTING..." : "SUBMIT SCORE"}
          </button>
        )}

        {submitState === "submitted" && (
          <div className="w-full font-data text-xs text-center mb-3 py-3" style={{ letterSpacing: "0.1em" }}>
            {wasNewBest
              ? <span style={{ color: "#4ade80" }}>✓ NEW PERSONAL BEST — LEADERBOARD UPDATED</span>
              : <span style={{ color: "#475569" }}>NOT A NEW PERSONAL BEST — SCORE NOT RECORDED</span>
            }
          </div>
        )}
        {submitState === "error" && (
          <div className="font-data text-xs text-center mb-3" style={{ color: "#f87171", letterSpacing: "0.06em" }}>{submitError}</div>
        )}

        <div className="w-full flex gap-2 mb-2">
          <button onClick={() => onViewLeaderboard(selectedCategory, selectedDifficulty)} className="flex-1 font-display tracking-widest"
            style={{ fontSize: "0.95rem", minHeight: "44px", borderRadius: 2, background: "transparent", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.35)", letterSpacing: "0.1em", cursor: "pointer" }}
          >
            ⊞ LEADERBOARD
          </button>
          <button onClick={onReturnHome} className="flex-1 font-display tracking-widest"
            style={{ fontSize: "0.95rem", minHeight: "44px", borderRadius: 2, background: "transparent", color: "#64748b", border: "1px solid rgba(51,65,85,0.4)", letterSpacing: "0.1em", cursor: "pointer" }}
          >
            ← CHANGE CAT
          </button>
        </div>
      </main>

      <footer className="text-center" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}>
        <span className="font-data text-xs" style={{ color: "#1e293b", letterSpacing: "0.12em" }}>v0.2.0 · CLASSIFIED</span>
      </footer>
    </div>
  );
}
