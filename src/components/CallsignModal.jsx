import React, { useState } from 'react';
import TacCard from './TacCard';

// Fullscreen overlay for setting / changing the operator callsign
export default function CallsignModal({ current, onSave, onCancel }) {
  const [value, setValue] = useState(current || "");
  const trimmed = value.trim();
  const canSave = trimmed.length >= 1 && trimmed.length <= 16;

  const handleSave = () => { if (canSave) onSave(trimmed.toUpperCase()); };
  const handleKey  = (e) => {
    if (e.key === "Enter" && canSave) handleSave();
    if (e.key === "Escape" && onCancel) onCancel();
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(7,11,20,0.93)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
      onClick={(e) => { if (e.target === e.currentTarget && onCancel) onCancel(); }}
    >
      <TacCard style={{ padding: "32px 28px", maxWidth: 360, width: "100%" }}>
        <div
          className="font-data text-xs tracking-widest mb-6 text-center"
          style={{ color: "rgba(245,158,11,0.5)", letterSpacing: "0.18em" }}
        >
          ◈ OPERATOR IDENT ◈
        </div>
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
            background: "rgba(15,23,42,0.8)",
            border: `1px solid ${canSave ? "rgba(245,158,11,0.4)" : "rgba(51,65,85,0.5)"}`,
            borderRadius: 2,
            padding: "10px 14px",
            color: "#f59e0b",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.8rem",
            letterSpacing: "0.1em",
            outline: "none",
            marginBottom: 20,
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={handleSave}
          disabled={!canSave}
          className="w-full font-display tracking-widest"
          style={{
            fontSize: "1.25rem",
            minHeight: 50,
            borderRadius: 2,
            background: canSave ? "#f59e0b" : "rgba(30,41,59,0.7)",
            color: canSave ? "#070b14" : "#334155",
            border: canSave ? "none" : "1px solid rgba(51,65,85,0.5)",
            letterSpacing: "0.14em",
            cursor: canSave ? "pointer" : "not-allowed",
            marginBottom: onCancel ? 10 : 0,
          }}
        >
          CONFIRM CALLSIGN
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="w-full font-data text-xs"
            style={{
              background: "transparent", border: "none",
              color: "#475569", letterSpacing: "0.1em",
              cursor: "pointer", padding: "8px 0",
            }}
          >
            CANCEL
          </button>
        )}
      </TacCard>
    </div>
  );
}
