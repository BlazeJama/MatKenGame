import React, { useState } from 'react';
import TacCard from '../components/TacCard';
import TargetBrackets from '../components/TargetBrackets';

// ─── Section wrapper ─────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="mb-12">
      <div className="font-data text-xs mb-1" style={{ color: "rgba(245,158,11,0.5)", letterSpacing: "0.2em" }}>◈ {title}</div>
      <div style={{ borderBottom: "1px solid rgba(245,158,11,0.1)", marginBottom: 20 }} />
      {children}
    </div>
  );
}

function Label({ children }) {
  return (
    <div className="font-data" style={{ fontSize: "0.55rem", color: "#334155", letterSpacing: "0.14em", marginBottom: 6 }}>
      {children}
    </div>
  );
}

function Swatch({ color, name, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 80 }}>
      <div style={{ width: "100%", height: 48, background: color, borderRadius: 2, border: "1px solid rgba(255,255,255,0.06)" }} />
      <div className="font-data" style={{ fontSize: "0.6rem", color: "#64748b", letterSpacing: "0.06em" }}>{name}</div>
      <div className="font-data" style={{ fontSize: "0.55rem", color: "#334155", letterSpacing: "0.04em" }}>{value}</div>
    </div>
  );
}

export default function ShowcaseScreen({ onBack }) {
  const [answered, setAnswered] = useState(false);

  return (
    <div className="min-h-screen font-tac tac-grid" style={{ background: "#070b14" }}>
      {/* Header */}
      <header className="px-6 py-8" style={{ borderBottom: "1px solid rgba(245,158,11,0.1)", paddingTop: "calc(env(safe-area-inset-top, 0px) + 2rem)" }}>
        <button onClick={onBack} className="font-data" style={{ background: "transparent", border: "none", cursor: "pointer", color: "#475569", fontSize: "0.68rem", letterSpacing: "0.12em", padding: 0, marginBottom: 16 }}>
          ← HOME
        </button>
        <div className="font-data" style={{ fontSize: "0.62rem", color: "rgba(245,158,11,0.5)", letterSpacing: "0.2em", marginBottom: 6 }}>◈ DESIGN SYSTEM</div>
        <h1 className="font-display text-white" style={{ fontSize: "3rem", letterSpacing: "0.06em", lineHeight: 1 }}>
          COMPONENT<span style={{ color: "#f59e0b" }}>S</span>
        </h1>
      </header>

      <main className="px-6 py-10 max-w-2xl mx-auto w-full">

        {/* ── COLOURS ─────────────────────────────────────────────────────── */}
        <Section title="COLOUR PALETTE">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <Swatch color="#070b14" name="Background" value="#070b14" />
            <Swatch color="#0d1526" name="Surface" value="#0d1526" />
            <Swatch color="rgba(26,39,68,0.45)" name="Card" value="#1a2744 45%" />
            <Swatch color="#f59e0b" name="Amber" value="#f59e0b" />
            <Swatch color="rgba(245,158,11,0.12)" name="Amber Tint" value="#f59e0b 12%" />
            <Swatch color="#22c55e" name="Correct" value="#22c55e" />
            <Swatch color="rgba(34,197,94,0.1)" name="Correct Tint" value="#22c55e 10%" />
            <Swatch color="#ef4444" name="Wrong" value="#ef4444" />
            <Swatch color="rgba(239,68,68,0.1)" name="Wrong Tint" value="#ef4444 10%" />
            <Swatch color="#94a3b8" name="Text Primary" value="#94a3b8" />
            <Swatch color="#64748b" name="Text Secondary" value="#64748b" />
            <Swatch color="#475569" name="Text Dim" value="#475569" />
            <Swatch color="#334155" name="Text Faint" value="#334155" />
            <Swatch color="#1e293b" name="Text Ghost" value="#1e293b" />
          </div>
        </Section>

        {/* ── TYPOGRAPHY ──────────────────────────────────────────────────── */}
        <Section title="TYPOGRAPHY">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <Label>DISPLAY — BEBAS NEUE</Label>
              <div className="font-display text-white" style={{ fontSize: "4rem", lineHeight: 1, letterSpacing: "0.04em" }}>MATKENGAME</div>
              <div className="font-display" style={{ fontSize: "2.4rem", lineHeight: 1, letterSpacing: "0.04em", color: "#f59e0b" }}>LEADER<span style={{ color: "white" }}>BOARD</span></div>
              <div className="font-display text-white" style={{ fontSize: "1.5rem", letterSpacing: "0.1em" }}>ELITE OPERATOR</div>
              <div className="font-display text-white" style={{ fontSize: "1.1rem", letterSpacing: "0.14em" }}>BEGIN TRAINING →</div>
            </div>
            <div>
              <Label>DATA — SHARE TECH MONO / RAJDHANI</Label>
              <div className="font-data" style={{ fontSize: "0.72rem", color: "#64748b", letterSpacing: "0.12em" }}>CATEGORY · DIFFICULTY · MODE</div>
              <div className="font-data" style={{ fontSize: "0.62rem", color: "rgba(245,158,11,0.5)", letterSpacing: "0.2em" }}>◈ MISSION INTEL ◈</div>
              <div className="font-data" style={{ fontSize: "0.58rem", color: "#334155", letterSpacing: "0.16em" }}>ENTERED SERVICE · CREW · WEIGHT</div>
            </div>
          </div>
        </Section>

        {/* ── TACCARDS ────────────────────────────────────────────────────── */}
        <Section title="TAC CARD">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Label>DEFAULT</Label>
            <TacCard style={{ padding: "20px 24px" }}>
              <div className="font-display text-white" style={{ fontSize: "1.2rem" }}>Standard card with amber brackets</div>
              <div className="font-data" style={{ fontSize: "0.68rem", color: "#475569", letterSpacing: "0.08em", marginTop: 6 }}>Background: rgba(26,39,68,0.45) · Border: rgba(245,158,11,0.18)</div>
            </TacCard>

            <Label>STAT CARD</Label>
            <TacCard style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div className="font-data" style={{ fontSize: "0.58rem", color: "rgba(245,158,11,0.4)", letterSpacing: "0.14em", marginBottom: 4 }}>VEHICLES READY</div>
                  <div className="font-display text-white" style={{ fontSize: "3.8rem", lineHeight: 1 }}>47</div>
                </div>
                <div className="text-right">
                  <div className="font-data" style={{ fontSize: "0.58rem", color: "rgba(245,158,11,0.4)", letterSpacing: "0.14em", marginBottom: 4 }}>PER ROUND</div>
                  <div className="font-display" style={{ fontSize: "2.8rem", lineHeight: 1, color: "#f59e0b" }}>10</div>
                </div>
              </div>
            </TacCard>

            <Label>IMAGE CARD (no padding)</Label>
            <TacCard style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ height: 90, background: "#0d1520", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="font-data" style={{ fontSize: "0.6rem", color: "#334155", letterSpacing: "0.12em" }}>IMAGE SLOT 100% × 90px</span>
              </div>
              <div style={{ padding: "8px 12px" }}>
                <div className="font-display text-white" style={{ fontSize: "1rem" }}>M1 Abrams</div>
                <div className="font-data" style={{ fontSize: "0.6rem", color: "#475569" }}>United States</div>
              </div>
            </TacCard>
          </div>
        </Section>

        {/* ── BUTTONS ─────────────────────────────────────────────────────── */}
        <Section title="BUTTONS">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            <Label>PRIMARY — AMBER FILL</Label>
            <button className="w-full font-display tracking-widest"
              style={{ fontSize: "1.45rem", minHeight: 58, borderRadius: 2, background: "#f59e0b", color: "#070b14", border: "none", letterSpacing: "0.14em", cursor: "pointer" }}>
              BEGIN TRAINING
            </button>

            <Label>GHOST — AMBER BORDER</Label>
            <button className="w-full font-display tracking-widest"
              style={{ fontSize: "1.2rem", minHeight: 52, borderRadius: 2, background: "rgba(245,158,11,0.08)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.35)", letterSpacing: "0.14em", cursor: "pointer" }}>
              SUBMIT SCORE
            </button>

            <Label>GHOST — GREY BORDER</Label>
            <button className="w-full font-display tracking-widest"
              style={{ fontSize: "1.2rem", minHeight: 52, borderRadius: 2, background: "transparent", color: "#64748b", border: "1px solid rgba(51,65,85,0.4)", letterSpacing: "0.14em", cursor: "pointer" }}>
              ← CHANGE CAT
            </button>

            <Label>DANGER — RED BORDER</Label>
            <button className="font-data"
              style={{ fontSize: "0.66rem", padding: "0 16px", height: 40, background: "rgba(15,23,42,0.6)", border: "1px solid rgba(239,68,68,0.35)", borderRadius: 2, color: "#f87171", letterSpacing: "0.1em", cursor: "pointer" }}>
              ✕ ABORT
            </button>

            <Label>SMALL — DATA FONT</Label>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="font-data text-xs flex-1"
                style={{ background: "transparent", border: "1px solid rgba(51,65,85,0.35)", borderRadius: 2, color: "#475569", letterSpacing: "0.12em", cursor: "pointer", minHeight: 44 }}>
                ◆ PERF LOG
              </button>
              <button className="font-data text-xs flex-1"
                style={{ background: "transparent", border: "1px solid rgba(51,65,85,0.35)", borderRadius: 2, color: "#475569", letterSpacing: "0.12em", cursor: "pointer", minHeight: 44 }}>
                ⊞ LEADERBOARD
              </button>
            </div>

            <Label>DISABLED</Label>
            <button className="w-full font-display tracking-widest" disabled
              style={{ fontSize: "1.45rem", minHeight: 58, borderRadius: 2, background: "rgba(30,41,59,0.7)", color: "#334155", border: "1px solid rgba(51,65,85,0.5)", letterSpacing: "0.14em", cursor: "not-allowed" }}>
              NO VEHICLES LOADED
            </button>
          </div>
        </Section>

        {/* ── FILTER PILLS ────────────────────────────────────────────────── */}
        <Section title="FILTER PILLS">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Label>CATEGORY PILLS</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                { label: "ALL", sel: true },
                { label: "MBT", sel: false },
                { label: "APC", sel: false },
                { label: "IFV", sel: false },
              ].map((opt) => (
                <button key={opt.label} className="font-data"
                  style={{ fontSize: "0.72rem", padding: "5px 12px", borderRadius: 2, letterSpacing: "0.1em", minHeight: 44, border: `1px solid ${opt.sel ? "#f59e0b" : "rgba(51,65,85,0.5)"}`, background: opt.sel ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)", color: opt.sel ? "#f59e0b" : "#64748b", cursor: "pointer" }}>
                  {opt.label}
                </button>
              ))}
              <button className="font-data"
                style={{ fontSize: "0.72rem", padding: "5px 12px", borderRadius: 2, letterSpacing: "0.1em", minHeight: 44, border: "1px solid rgba(51,65,85,0.5)", background: "rgba(15,23,42,0.5)", color: "#1e293b", opacity: 0.45, cursor: "pointer" }}>
                ARTY
              </button>
            </div>

            <Label>DIFFICULTY PILLS</Label>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { stars: "★", label: "EASY", sel: false },
                { stars: "★★", label: "MEDIUM", sel: true },
                { stars: "★★★", label: "HARD", sel: false },
              ].map((opt) => (
                <button key={opt.label} className="font-data flex-1"
                  style={{ fontSize: "0.72rem", padding: "8px", borderRadius: 2, letterSpacing: "0.1em", minHeight: 44, border: `1px solid ${opt.sel ? "#f59e0b" : "rgba(51,65,85,0.5)"}`, background: opt.sel ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)", color: opt.sel ? "#f59e0b" : "#64748b", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <span style={{ color: opt.sel ? "#f59e0b" : "#475569" }}>{opt.stars}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>

            <Label>MODE PILLS</Label>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "NORMAL", sub: "10 × 100 pts", sel: true, timed: false },
                { label: "TIMED", sub: "15s · speed bonus", sel: false, timed: true },
              ].map((opt) => (
                <button key={opt.label} className="font-data flex-1"
                  style={{ padding: "8px", borderRadius: 2, letterSpacing: "0.1em", minHeight: 46, border: `1px solid ${opt.sel ? "#f59e0b" : "rgba(51,65,85,0.5)"}`, background: opt.sel ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)", color: opt.sel ? "#f59e0b" : "#64748b", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
                  <span style={{ fontSize: "0.72rem" }}>{opt.label}</span>
                  <span style={{ fontSize: "0.58rem", opacity: 0.65, letterSpacing: "0.06em" }}>{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* ── ANSWER OPTIONS ──────────────────────────────────────────────── */}
        <Section title="ANSWER OPTIONS">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Label>DEFAULT (unanswered)</Label>
            {[
              { letter: "A", name: "M1 Abrams", country: "United States", state: "default" },
              { letter: "B", name: "Challenger 2", country: "United Kingdom", state: "correct" },
              { letter: "C", name: "Leopard 2", country: "Germany", state: "wrong" },
              { letter: "D", name: "T-90", country: "Russia", state: "eliminated" },
            ].map((opt) => {
              const optionStyle = () => {
                const base = { width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 14, borderRadius: 2, padding: "11px 14px", minHeight: 52, fontFamily: "'Rajdhani', sans-serif", border: "1px solid" };
                if (opt.state === "default")    return { ...base, background: "rgba(15,23,42,0.85)", borderColor: "rgba(245,158,11,0.2)", color: "#e2e8f0", cursor: "pointer" };
                if (opt.state === "correct")    return { ...base, background: "rgba(34,197,94,0.1)", borderColor: "#22c55e", color: "#86efac", cursor: "default" };
                if (opt.state === "wrong")      return { ...base, background: "rgba(239,68,68,0.1)", borderColor: "#ef4444", color: "#fca5a5", cursor: "default" };
                if (opt.state === "eliminated") return { ...base, background: "rgba(15,23,42,0.2)", borderColor: "rgba(30,41,59,0.2)", color: "#1e293b", opacity: 0.3, cursor: "not-allowed" };
              };
              const badgeStyle = () => {
                const base = { width: 32, height: 32, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", flexShrink: 0 };
                if (opt.state === "default")    return { ...base, background: "rgba(245,158,11,0.15)", color: "#f59e0b" };
                if (opt.state === "correct")    return { ...base, background: "rgba(34,197,94,0.2)", color: "#4ade80" };
                if (opt.state === "wrong")      return { ...base, background: "rgba(239,68,68,0.2)", color: "#f87171" };
                if (opt.state === "eliminated") return { ...base, background: "rgba(15,23,42,0.2)", color: "#1e293b" };
              };
              return (
                <div key={opt.letter}>
                  <Label>{opt.state.toUpperCase()}</Label>
                  <button style={optionStyle()}>
                    <span style={badgeStyle()}>{opt.letter}</span>
                    <span style={{ flex: 1 }}>
                      <span style={{ display: "block", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "0.02em" }}>{opt.name}</span>
                      <span style={{ display: "block", fontSize: "0.7rem", opacity: 0.65, letterSpacing: "0.06em" }}>{opt.country}</span>
                    </span>
                    {opt.state === "correct" && <span style={{ color: "#4ade80", fontSize: "1.1rem", fontWeight: 700 }}>✓</span>}
                    {opt.state === "wrong"   && <span style={{ color: "#f87171", fontSize: "1.1rem", fontWeight: 700 }}>✗</span>}
                  </button>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ── BADGES & LABELS ─────────────────────────────────────────────── */}
        <Section title="BADGES & LABELS">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Label>CATEGORY BADGES</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["MBT", "APC", "IFV", "ARTY", "HELO"].map((cat) => (
                <span key={cat} className="font-data text-xs px-2 py-1"
                  style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 2, color: "#64748b", letterSpacing: "0.08em" }}>
                  {cat}
                </span>
              ))}
            </div>

            <Label>DIFFICULTY STARS</Label>
            <div style={{ display: "flex", gap: 8 }}>
              {["★", "★★", "★★★"].map((s) => (
                <span key={s} className="font-data text-xs px-2 py-1"
                  style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 2, color: "#64748b", letterSpacing: "0.08em" }}>
                  {s}
                </span>
              ))}
            </div>

            <Label>MODE BADGE</Label>
            <div style={{ display: "flex", gap: 8 }}>
              <span className="font-data text-xs px-2 py-1"
                style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 2, color: "#64748b", letterSpacing: "0.08em" }}>
                NORMAL
              </span>
              <span className="font-data text-xs px-2 py-1"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 2, color: "#fca5a5", letterSpacing: "0.08em" }}>
                ⏱ TIMED
              </span>
            </div>

            <Label>YOU TAG (leaderboard)</Label>
            <span className="font-data"
              style={{ fontSize: "0.55rem", letterSpacing: "0.1em", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 2, padding: "1px 4px", color: "#f59e0b", display: "inline-block" }}>
              YOU
            </span>
          </div>
        </Section>

        {/* ── PROGRESS BARS ───────────────────────────────────────────────── */}
        <Section title="PROGRESS BARS">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <Label>ROUND PROGRESS — 40%</Label>
              <div style={{ height: 3, background: "rgba(245,158,11,0.1)", borderRadius: 9999, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "40%", background: "#f59e0b", borderRadius: 9999 }} />
              </div>
            </div>
            <div>
              <Label>TIMER BAR — AMBER (plenty of time)</Label>
              <div style={{ height: 4, background: "rgba(239,68,68,0.12)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "80%", background: "#f59e0b", borderRadius: 2 }} />
              </div>
            </div>
            <div>
              <Label>TIMER BAR — ORANGE (8s remaining)</Label>
              <div style={{ height: 4, background: "rgba(239,68,68,0.12)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "50%", background: "#fb923c", borderRadius: 2 }} />
              </div>
            </div>
            <div>
              <Label>TIMER BAR — RED (critical)</Label>
              <div style={{ height: 4, background: "rgba(239,68,68,0.12)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "20%", background: "#ef4444", borderRadius: 2 }} />
              </div>
            </div>
            <div>
              <Label>SCORE PERCENT BAR — 85%</Label>
              <div style={{ height: 3, background: "rgba(245,158,11,0.12)", borderRadius: 2, maxWidth: 180 }}>
                <div style={{ height: "100%", width: "85%", background: "#f59e0b", borderRadius: 2 }} />
              </div>
            </div>
          </div>
        </Section>

        {/* ── SCORE DISPLAY ───────────────────────────────────────────────── */}
        <Section title="SCORE DISPLAY">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {[
              { score: 950, total: 1000, label: "ELITE OPERATOR", color: "#f59e0b" },
              { score: 700, total: 1000, label: "FIELD READY",    color: "#f59e0b" },
              { score: 480, total: 1000, label: "OBJECTIVE COMPLETE", color: "#94a3b8" },
              { score: 200, total: 1000, label: "BACK TO BASICS", color: "#ef4444" },
            ].map(({ score, total, label, color }) => (
              <TacCard key={score} style={{ padding: "20px 24px", flex: "1 1 180px", textAlign: "center" }}>
                <div className="font-display" style={{ fontSize: "2.4rem", lineHeight: 1, letterSpacing: "0.04em" }}>
                  <span className="text-white">{score}</span>
                  <span style={{ fontSize: "1rem", color: "#334155" }}>/{total}</span>
                </div>
                <div className="font-display tracking-widest mt-2" style={{ fontSize: "0.9rem", color, letterSpacing: "0.1em" }}>
                  {label}
                </div>
              </TacCard>
            ))}
          </div>
        </Section>

        {/* ── INPUT FIELD ─────────────────────────────────────────────────── */}
        <Section title="INPUT FIELD">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Label>CALLSIGN INPUT</Label>
            <input
              type="text"
              defaultValue="GHOST"
              readOnly
              style={{ display: "block", width: "100%", background: "rgba(15,23,42,0.85)", border: "1px solid rgba(245,158,11,0.4)", borderRadius: 2, padding: "10px 14px", color: "#f59e0b", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "0.1em", outline: "none", boxSizing: "border-box" }}
            />
            <Label>SEARCH INPUT</Label>
            <input
              type="text"
              placeholder="SEARCH BY NAME OR COUNTRY..."
              readOnly
              style={{ display: "block", width: "100%", background: "rgba(26,39,68,0.3)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 2, color: "#94a3b8", padding: "10px 14px", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.08em", outline: "none", minHeight: 44, boxSizing: "border-box" }}
            />
          </div>
        </Section>

        {/* ── TARGET BRACKETS ─────────────────────────────────────────────── */}
        <Section title="TARGET BRACKETS">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            {[
              { size: 14, label: "CARD (14px)" },
              { size: 20, label: "MEDIUM (20px)" },
              { size: 26, label: "QUIZ IMAGE (26px)" },
              { size: 36, label: "LARGE (36px)" },
            ].map(({ size, label }) => (
              <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={{ position: "relative", width: 80, height: 80, background: "rgba(15,23,42,0.6)", border: "1px solid rgba(51,65,85,0.3)" }}>
                  <TargetBrackets size={size} color="#f59e0b" thickness={2} inset={-1} />
                </div>
                <span className="font-data" style={{ fontSize: "0.55rem", color: "#334155", letterSpacing: "0.1em" }}>{label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── SW UPDATE BANNER ────────────────────────────────────────────── */}
        <Section title="SW UPDATE BANNER">
          <Label>UPDATE AVAILABLE STATE</Label>
          <div className="font-data" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(7,11,20,0.96)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 3, padding: "8px 12px 8px 14px", boxShadow: "0 4px 24px rgba(0,0,0,0.6)" }}>
            <span style={{ fontSize: "0.65rem", color: "#94a3b8", letterSpacing: "0.1em" }}>↑ UPDATE AVAILABLE</span>
            <button style={{ fontSize: "0.6rem", color: "#070b14", background: "#f59e0b", border: "none", borderRadius: 2, padding: "4px 10px", letterSpacing: "0.1em", cursor: "pointer", fontFamily: "'Share Tech Mono', monospace" }}>REFRESH</button>
          </div>
          <div style={{ marginTop: 12 }}>
            <Label>DURING QUIZ</Label>
            <div className="font-data" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(7,11,20,0.96)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 3, padding: "8px 12px 8px 14px" }}>
              <span style={{ fontSize: "0.65rem", color: "#94a3b8", letterSpacing: "0.1em" }}>↑ UPDATE AVAILABLE</span>
              <span style={{ fontSize: "0.6rem", color: "#334155", letterSpacing: "0.1em", border: "1px solid rgba(51,65,85,0.4)", borderRadius: 2, padding: "3px 8px" }}>AFTER ROUND</span>
            </div>
          </div>
        </Section>

      </main>

      <footer className="text-center px-6" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 2rem)", borderTop: "1px solid rgba(245,158,11,0.08)", paddingTop: "2rem" }}>
        <span className="font-data text-xs" style={{ color: "#1e293b", letterSpacing: "0.12em" }}>DESIGN SYSTEM · MatKenGame · v0.2.0</span>
      </footer>
    </div>
  );
}
