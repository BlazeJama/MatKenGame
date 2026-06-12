import React, { useState } from 'react';
import TacCard from '../components/TacCard';

// First-visit callsign registration — shown until localStorage has a callsign
export default function WelcomeScreen({ onSave }) {
  const [value, setValue] = useState("");
  const trimmed = value.trim();
  const canSave = trimmed.length >= 1 && trimmed.length <= 16;

  const handleSave = () => { if (canSave) onSave(trimmed.toUpperCase()); };
  const handleKey  = (e) => { if (e.key === "Enter" && canSave) handleSave(); };

  return (
    <div className="min-h-screen flex flex-col tac-grid font-tac">
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
