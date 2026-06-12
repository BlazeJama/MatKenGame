import React, { useState, useEffect } from 'react';
import TacCard from '../components/TacCard';
import { CATEGORY_OPTIONS, DIFFICULTY_OPTIONS } from '../lib/constants';
import { fetchLeaderboard, fetchPlayerBest, fetchRankAbove, timeAgo } from '../lib/utils';

const DIFF_STARS = { 1: "★", 2: "★★", 3: "★★★" };
const CAT_LABEL  = { "all": "ALL", "Main Battle Tank": "MBT", "APC": "APC", "IFV": "IFV", "Artillery": "ARTY", "Helicopter": "HELO" };
const LB_DIFFICULTY_OPTIONS = [{ id: "all", label: "ALL", stars: "—" }, ...DIFFICULTY_OPTIONS];

export default function LeaderboardScreen({ initialCategory, initialDifficulty, initialMode, onReturnHome, callsign }) {
  const [category,   setCategory]   = useState(initialCategory  || "all");
  const [difficulty, setDifficulty] = useState(initialDifficulty !== undefined ? initialDifficulty : "all");
  const [mode,       setMode]       = useState(initialMode || "all");
  const [entries,    setEntries]    = useState([]);
  const [status,     setStatus]     = useState("loading");
  const [errorMsg,   setErrorMsg]   = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [ownEntry,   setOwnEntry]   = useState(null);
  const [ownRank,    setOwnRank]    = useState(null);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setOwnEntry(null);
    setOwnRank(null);

    fetchLeaderboard(category, difficulty, mode)
      .then(async (data) => {
        if (cancelled) return;
        setEntries(data);
        setStatus("ok");

        const isInTop10 = callsign && data.some((e) => e.callsign === callsign);
        if (!isInTop10 && callsign) {
          try {
            const own = await fetchPlayerBest(callsign, category, difficulty, mode);
            if (own && !cancelled) {
              setOwnEntry(own);
              const rank = await fetchRankAbove(own.score, category, difficulty, mode);
              if (!cancelled) setOwnRank(rank);
            }
          } catch (_) {}
        }
      })
      .catch((err) => {
        if (!cancelled) { setErrorMsg(err.message || "Network error"); setStatus("error"); }
      });
    return () => { cancelled = true; };
  }, [category, difficulty, mode, refreshKey]);

  const renderRow = (entry, rank, isOwnPinned = false) => {
    const isRank1 = rank === 1 && !isOwnPinned;
    const isYou   = isOwnPinned || (callsign && entry.callsign === callsign);
    return (
      <div className="grid" style={{ gridTemplateColumns: "28px 1fr 58px 44px 44px", padding: "10px 14px", background: isYou ? "rgba(245,158,11,0.07)" : isRank1 ? "rgba(245,158,11,0.04)" : "transparent", alignItems: "center" }}>
        <div className="font-display" style={{ fontSize: "1.1rem", color: isRank1 || isYou ? "#f59e0b" : "#334155" }}>{rank ?? "—"}</div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div className="font-display" style={{ fontSize: "1rem", color: isRank1 ? "#fcd34d" : isYou ? "#f59e0b" : "#94a3b8", letterSpacing: "0.04em" }}>{entry.callsign}</div>
            {isYou && (
              <span className="font-data" style={{ fontSize: "0.55rem", letterSpacing: "0.1em", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 2, padding: "1px 4px", color: "#f59e0b" }}>YOU</span>
            )}
          </div>
          <div className="font-data" style={{ fontSize: "0.62rem", color: "#334155", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 5 }}>
            {entry.mode === "timed" && <span style={{ color: "#f87171", letterSpacing: "0.06em" }}>⏱</span>}
            {timeAgo(entry.created_at)}
          </div>
        </div>
        <div className="font-display text-center" style={{ fontSize: "1.05rem", color: isRank1 || isYou ? "#f59e0b" : "#64748b", letterSpacing: "0.02em" }}>{entry.score}</div>
        <div className="text-center font-data" style={{ fontSize: "0.62rem", color: "#475569", letterSpacing: "0.06em" }}>{CAT_LABEL[entry.category] ?? entry.category}</div>
        <div className="text-center font-data" style={{ fontSize: "0.72rem", color: "#475569" }}>{DIFF_STARS[entry.difficulty] ?? "?"}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col tac-grid font-tac">
      <header className="px-5 pb-4 text-center" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 2.5rem)" }}>
        <div className="font-data text-xs tracking-widest mb-5" style={{ color: "rgba(245,158,11,0.5)", letterSpacing: "0.18em" }}>◈ GLOBAL RANKINGS ◈</div>
        <h1 className="font-display text-white" style={{ fontSize: "3.6rem", lineHeight: 1, letterSpacing: "0.04em" }}>
          LEADER<span style={{ color: "#f59e0b" }}>BOARD</span>
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center px-5 pb-10 max-w-md mx-auto w-full">
        {/* Category filter */}
        <div className="w-full mb-4">
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>CATEGORY</div>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((opt) => {
              const sel = category === opt.id;
              return (
                <button key={opt.id} onClick={() => setCategory(opt.id)} className="font-data"
                  style={{ fontSize: "0.72rem", padding: "5px 12px", borderRadius: 2, letterSpacing: "0.1em", minHeight: 44, border: `1px solid ${sel ? "#f59e0b" : "rgba(51,65,85,0.5)"}`, background: sel ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)", color: sel ? "#f59e0b" : "#64748b", cursor: "pointer" }}
                >{opt.label}</button>
              );
            })}
          </div>
        </div>

        {/* Difficulty filter */}
        <div className="w-full mb-4">
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>DIFFICULTY</div>
          <div className="flex gap-2">
            {LB_DIFFICULTY_OPTIONS.map((opt) => {
              const sel = difficulty === opt.id;
              return (
                <button key={opt.id} onClick={() => setDifficulty(opt.id)} className="font-data flex-1"
                  style={{ fontSize: "0.72rem", padding: "6px 4px", borderRadius: 2, letterSpacing: "0.08em", minHeight: 44, border: `1px solid ${sel ? "#f59e0b" : "rgba(51,65,85,0.5)"}`, background: sel ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)", color: sel ? "#f59e0b" : "#64748b", cursor: "pointer" }}
                >{opt.stars !== "—" ? opt.stars : ""} {opt.label}</button>
              );
            })}
          </div>
        </div>

        {/* Mode filter */}
        <div className="w-full mb-4">
          <div className="font-data text-xs mb-2" style={{ color: "#334155", letterSpacing: "0.12em" }}>MODE</div>
          <div className="flex gap-2">
            {[
              { id: "all",    label: "ALL"     },
              { id: "normal", label: "NORMAL"  },
              { id: "timed",  label: "⏱ TIMED" },
            ].map((opt) => {
              const sel = mode === opt.id;
              return (
                <button key={opt.id} onClick={() => setMode(opt.id)} className="font-data flex-1"
                  style={{ fontSize: "0.72rem", padding: "6px 4px", borderRadius: 2, letterSpacing: "0.08em", minHeight: 44, border: `1px solid ${sel ? (opt.id === "timed" ? "#f87171" : "#f59e0b") : "rgba(51,65,85,0.5)"}`, background: sel ? (opt.id === "timed" ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.12)") : "rgba(15,23,42,0.5)", color: sel ? (opt.id === "timed" ? "#f87171" : "#f59e0b") : "#64748b", cursor: "pointer" }}
                >{opt.label}</button>
              );
            })}
          </div>
        </div>

        {status === "loading" && (
          <div className="w-full text-center font-data text-xs py-10" style={{ color: "#334155", letterSpacing: "0.12em" }}>LOADING INTEL...</div>
        )}
        {status === "error" && (
          <div className="w-full text-center font-data text-xs py-6" style={{ color: "#f87171", letterSpacing: "0.08em", lineHeight: 2 }}>
            SIGNAL LOST<br /><span style={{ color: "#334155" }}>{errorMsg}</span>
          </div>
        )}
        {status === "ok" && entries.length === 0 && (
          <div className="w-full text-center font-data text-xs py-10" style={{ color: "#334155", letterSpacing: "0.1em", lineHeight: 2 }}>
            NO ENTRIES ON FILE<br /><span style={{ color: "#1e293b" }}>Be the first to post a score</span>
          </div>
        )}

        {status === "ok" && entries.length > 0 && (
          <TacCard className="w-full mb-4" style={{ padding: 0, overflow: "hidden" }}>
            <div className="grid font-data text-xs" style={{ gridTemplateColumns: "28px 1fr 58px 44px 44px", padding: "9px 14px", borderBottom: "1px solid rgba(245,158,11,0.1)", color: "#334155", letterSpacing: "0.08em" }}>
              <div>#</div><div>CALLSIGN</div><div className="text-center">SCORE</div><div className="text-center">CAT</div><div className="text-center">DIFF</div>
            </div>
            {entries.map((entry, i) => (
              <div key={i} style={{ borderBottom: i < entries.length - 1 || ownEntry ? "1px solid rgba(30,41,59,0.4)" : "none" }}>
                {renderRow(entry, i + 1, false)}
              </div>
            ))}
            {ownEntry && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px 4px", borderTop: "1px dashed rgba(245,158,11,0.2)" }}>
                  <span className="font-data" style={{ fontSize: "0.58rem", letterSpacing: "0.12em", color: "#475569", whiteSpace: "nowrap" }}>YOUR STANDING</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(245,158,11,0.08)" }} />
                </div>
                {renderRow(ownEntry, ownRank, true)}
              </>
            )}
          </TacCard>
        )}

        <div className="w-full flex gap-2 mt-2">
          <button onClick={() => setRefreshKey((k) => k + 1)} disabled={status === "loading"} className="font-data text-xs"
            style={{ flex: "0 0 auto", minHeight: 44, padding: "0 18px", borderRadius: 2, letterSpacing: "0.1em", cursor: "pointer", background: "transparent", border: "1px solid rgba(51,65,85,0.4)", color: status === "loading" ? "#1e293b" : "#475569" }}
          >
            ↻ REFRESH
          </button>
          <button onClick={onReturnHome} className="flex-1 font-display tracking-widest"
            style={{ fontSize: "1.2rem", minHeight: "44px", borderRadius: 2, background: "#f59e0b", color: "#070b14", border: "none", letterSpacing: "0.14em", cursor: "pointer" }}
          >
            ← BACK TO BASE
          </button>
        </div>
      </main>

      <footer className="text-center" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}>
        <span className="font-data text-xs" style={{ color: "#1e293b", letterSpacing: "0.12em" }}>v0.2.0 · CLASSIFIED</span>
      </footer>
    </div>
  );
}
