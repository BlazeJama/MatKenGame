import React, { useState } from 'react';

// First-visit callsign registration — shown until localStorage has a callsign
export default function WelcomeScreen({ onSave }) {
  const [value, setValue] = useState("");
  const trimmed = value.trim();
  const canSave = trimmed.length >= 1 && trimmed.length <= 16;

  const handleSave = () => { if (canSave) onSave(trimmed.toUpperCase()); };
  const handleKey  = (e) => { if (e.key === "Enter" && canSave) handleSave(); };

  return (
    <div className="tac-grid" style={{ background: "#070b14", minHeight: "100vh" }}>
    <div className="font-tac flex flex-col" style={{ maxWidth: 390, margin: "0 auto", minHeight: "100vh" }}>

      {/* Header */}
      <header style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 80px)", paddingBottom: 24, paddingLeft: 24, paddingRight: 24, textAlign: "center" }}>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.6875rem", letterSpacing: "0.18em", color: "#f59e0b", margin: 0 }}>
          ◈ WELCOME, OPERATOR ◈
        </p>
        <div style={{ height: 20 }} />
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center" }}>
          <span className="font-display" style={{ fontSize: "3.5625rem", lineHeight: 1, letterSpacing: "0.04em", color: "#e2e8f0" }}>MATKEN</span>
          <span className="font-display" style={{ fontSize: "3.5625rem", lineHeight: 1, letterSpacing: "0.04em", color: "#f59e0b" }}>GAME</span>
        </div>
        <div style={{ height: 12 }} />
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.6875rem", letterSpacing: "0.16em", color: "#475569", margin: 0 }}>
          MILITARY VEHICLE RECOGNITION TRAINING
        </p>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col" style={{ padding: "5px 24px 32px" }}>
        {/* TacCard */}
        <div style={{ background: "rgba(26,39,68,0.45)", border: "1px solid rgba(245,158,10,0.18)", borderRadius: 2, padding: "28px 26px", display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.6875rem", letterSpacing: "0.16em", color: "rgba(245,158,10,0.5)", textAlign: "center", margin: 0 }}>
            OPERATOR REGISTRATION
          </p>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.55, color: "#94a3b8", textAlign: "center", margin: 0 }}>
            Select a callsign for the leaderboard.<br />
            You can change it later from the home screen.
          </p>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.6875rem", letterSpacing: "0.12em", color: "#334155", margin: "4px 0 0" }}>
            CALLSIGN (1–16 CHARS)
          </p>
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
              display: "block", width: "100%", boxSizing: "border-box",
              background: "rgba(15,23,42,0.85)",
              border: `1px solid ${canSave ? "rgba(245,158,10,0.4)" : "rgba(51,65,85,0.5)"}`,
              borderRadius: 2,
              padding: "12px 14px",
              color: "#f59e0a",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "2rem",
              letterSpacing: "0.1em",
              outline: "none",
            }}
          />
        </div>

        <div style={{ height: 16 }} />

        {/* DEPLOY button */}
        <button
          onClick={handleSave}
          disabled={!canSave}
          className="font-display"
          style={{
            height: 58, borderRadius: 2, width: "100%",
            background: canSave ? "#f59e0a" : "rgba(30,41,59,0.7)",
            color: canSave ? "#070b14" : "#334155",
            border: canSave ? "none" : "1px solid rgba(51,65,85,0.5)",
            fontSize: "1.4375rem", letterSpacing: "0.14em",
            cursor: canSave ? "pointer" : "not-allowed",
          }}
        >
          DEPLOY
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
