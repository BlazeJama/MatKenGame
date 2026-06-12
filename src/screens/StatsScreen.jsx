import React from 'react';
import TacCard from '../components/TacCard';
import { CATEGORY_OPTIONS, DIFFICULTY_OPTIONS } from '../lib/constants';

export default function StatsScreen({ bestScores, onReturnHome, onClearScores }) {
  const getScore = (catId, diffId) => bestScores?.[catId]?.[diffId]?.normal ?? null;

  const hasAnyScore = CATEGORY_OPTIONS.some((cat) =>
    DIFFICULTY_OPTIONS.some((diff) => getScore(cat.id, diff.id) !== null)
  );

  let overallBest = null;
  CATEGORY_OPTIONS.forEach((cat) => {
    DIFFICULTY_OPTIONS.forEach((diff) => {
      const s = getScore(cat.id, diff.id);
      if (s !== null && (overallBest === null || s > overallBest)) overallBest = s;
    });
  });

  const handleClear = () => {
    if (confirm("Clear all performance records? This cannot be undone.")) {
      onClearScores();
    }
  };

  const categoryLabels = {
    "all":              "ALL",
    "Main Battle Tank": "MBT",
    "APC":              "APC",
    "IFV":              "IFV",
    "Artillery":        "ARTY",
    "Helicopter":       "HELO",
  };

  return (
    <div className="min-h-screen flex flex-col tac-grid font-tac">
      <header className="px-6 pb-4 text-center" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 2.5rem)" }}>
        <div className="font-data text-xs tracking-widest mb-5" style={{ color: "rgba(245,158,11,0.5)", letterSpacing: "0.18em" }}>
          ◈ INTEL ARCHIVE ◈
        </div>
        <h1 className="font-display text-white" style={{ fontSize: "4rem", lineHeight: 1, letterSpacing: "0.04em" }}>
          PERFORM<span style={{ color: "#f59e0b" }}>ANCE</span>
        </h1>
        <p className="font-data text-xs mt-3" style={{ color: "#475569", letterSpacing: "0.16em" }}>PERSONAL BEST SCORES</p>
      </header>

      <main className="flex-1 flex flex-col items-center px-5 pb-10 max-w-md mx-auto w-full">
        {overallBest !== null && (
          <div className="w-full flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: "rgba(245,158,11,0.12)" }} />
            <span className="font-data text-xs whitespace-nowrap" style={{ color: "#475569", letterSpacing: "0.12em" }}>
              PERSONAL BEST&nbsp;
              <span className="font-display" style={{ fontSize: "1.2rem", color: "#f59e0b", verticalAlign: "middle" }}>{overallBest}</span>
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(245,158,11,0.12)" }} />
          </div>
        )}

        <TacCard className="w-full mb-5" style={{ padding: 0, overflow: "hidden" }}>
          <div className="grid font-data text-xs" style={{ gridTemplateColumns: "1fr 72px 72px 72px", padding: "10px 16px", borderBottom: "1px solid rgba(245,158,11,0.1)", color: "#334155", letterSpacing: "0.1em" }}>
            <div>CATEGORY</div>
            {DIFFICULTY_OPTIONS.map((d) => (
              <div key={d.id} className="text-center" style={{ color: "#475569" }}>{d.stars}</div>
            ))}
          </div>
          {CATEGORY_OPTIONS.map((cat, i) => {
            const scores      = DIFFICULTY_OPTIONS.map((d) => getScore(cat.id, d.id));
            const rowHasScore = scores.some((s) => s !== null);
            const isLast      = i === CATEGORY_OPTIONS.length - 1;
            return (
              <div key={cat.id} className="grid" style={{ gridTemplateColumns: "1fr 72px 72px 72px", padding: "12px 16px", borderBottom: isLast ? "none" : "1px solid rgba(30,41,59,0.45)", background: rowHasScore ? "rgba(245,158,11,0.02)" : "transparent", alignItems: "center" }}>
                <div className="font-data" style={{ fontSize: "0.7rem", letterSpacing: "0.09em", color: rowHasScore ? "#94a3b8" : "#334155" }}>
                  {categoryLabels[cat.id] ?? cat.label}
                </div>
                {scores.map((score, di) => {
                  const isTopScore = score !== null && score === overallBest;
                  return (
                    <div key={di} className="font-display text-center" style={{ fontSize: score !== null ? "1.05rem" : "0.9rem", lineHeight: 1, letterSpacing: "0.02em", color: score !== null ? (isTopScore ? "#fcd34d" : "#f59e0b") : "#1e293b" }}>
                      {score !== null ? score : "—"}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </TacCard>

        <div className="w-full flex justify-end gap-4 mb-5">
          {DIFFICULTY_OPTIONS.map((d) => (
            <span key={d.id} className="font-data text-xs" style={{ color: "#2d3f55", letterSpacing: "0.08em" }}>{d.stars} {d.label}</span>
          ))}
        </div>

        {!hasAnyScore && (
          <div className="w-full text-center font-data text-xs mb-5" style={{ color: "#334155", letterSpacing: "0.1em", lineHeight: 2 }}>
            NO RECORDS ON FILE<br />
            <span style={{ color: "#1e293b" }}>Complete a training session to log your performance</span>
          </div>
        )}

        <button onClick={onReturnHome} className="w-full font-display tracking-widest"
          style={{ fontSize: "1.35rem", minHeight: "52px", borderRadius: 2, background: "#f59e0b", color: "#070b14", border: "none", letterSpacing: "0.14em", cursor: "pointer", marginBottom: 14 }}
        >
          ←  BACK TO BASE
        </button>

        {hasAnyScore && (
          <button onClick={handleClear} className="font-data text-xs"
            style={{ background: "transparent", border: "none", color: "#334155", letterSpacing: "0.1em", cursor: "pointer", padding: "6px 12px", minHeight: 44 }}
          >
            🗑 CLEAR ALL RECORDS
          </button>
        )}
      </main>

      <footer className="text-center" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}>
        <span className="font-data text-xs" style={{ color: "#1e293b", letterSpacing: "0.12em" }}>v0.2.0 · CLASSIFIED</span>
      </footer>
    </div>
  );
}
