import React, { useState } from 'react';
import TacCard from '../components/TacCard';

const CATEGORIES = [
  { id: "all",              label: "ALL"  },
  { id: "Main Battle Tank", label: "MBT"  },
  { id: "APC",              label: "APC"  },
  { id: "IFV",              label: "IFV"  },
  { id: "Artillery",        label: "ARTY" },
  { id: "Helicopter",       label: "HELO" },
];

const CAT_SHORT = {
  "Main Battle Tank": "MBT",
  "APC": "APC",
  "IFV": "IFV",
  "Artillery": "ARTY",
  "Helicopter": "HELO",
};

export default function LearningHomeScreen({ vehicles, onBack, onSelectVehicle }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");

  const filtered = vehicles.filter((v) => {
    const matchCat = cat === "all" || v.category === cat;
    const q = search.toLowerCase();
    const matchName = !q || v.name.toLowerCase().includes(q) || (v.country || "").toLowerCase().includes(q);
    return matchCat && matchName;
  });

  return (
    <div className="tac-grid" style={{ background: "#070b14", minHeight: "100vh" }}>
    <div className="font-tac flex flex-col" style={{ maxWidth: 390, margin: "0 auto", minHeight: "100vh" }}>

      {/* Header Secondary */}
      <header style={{ height: 110, background: "#070b14", position: "relative", overflow: "hidden", paddingTop: "calc(env(safe-area-inset-top, 0px))" }}>
        {/* Top: back + label */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "15px 15px 0", height: 61 }}>
          <button
            onClick={onBack}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center" }}
          >
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.01em", color: "#64748b" }}>
              ← BACK
            </span>
          </button>
          <div style={{ paddingTop: 10 }}>
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.68rem", color: "#f59e0b" }}>
              ◈ INTELLIGENCE FILES
            </span>
          </div>
        </div>
        {/* Bottom: screen title */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 15px", height: 49 }}>
          <h1 className="font-display" style={{ fontSize: "3rem", lineHeight: 1, letterSpacing: 0, margin: 0 }}>
            <span style={{ color: "#e2e8f0" }}>VEHICLE </span>
            <span style={{ color: "#f59e0b" }}>LIBRARY</span>
          </h1>
        </div>
      </header>

      {/* Search */}
      <div style={{ paddingLeft: 24, paddingRight: 24, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="SEARCH VEHICLES..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%", boxSizing: "border-box",
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 500,
            background: "rgba(15,23,42,0.5)",
            border: "1px solid rgba(51,65,85,0.5)",
            borderRadius: 2,
            color: "#94a3b8",
            height: 43, padding: "0 13px",
            fontSize: "0.75rem", letterSpacing: "0.08em",
            outline: "none",
          }}
        />
      </div>

      {/* Category chips */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, paddingLeft: 24, paddingRight: 24, paddingTop: 10, paddingBottom: 10, width: 342, marginLeft: "auto", marginRight: "auto" }}>
        {CATEGORIES.map((opt) => {
          const active = cat === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setCat(opt.id)}
              style={{
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
                fontSize: "0.68rem", letterSpacing: "0.1em",
                height: 44, padding: "0 12px",
                borderRadius: 2,
                border: `1px solid ${active ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                background: active ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                color: active ? "#f59e0b" : "#637387",
                cursor: "pointer",
                flex: "0 1 auto",
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Vehicle grid */}
      <main className="flex-1 overflow-y-auto" style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 40 }}>
        {filtered.length === 0 ? (
          <div className="text-center py-16" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "#334155", letterSpacing: "0.12em", lineHeight: 2 }}>
            NO VEHICLES MATCH<br /><span style={{ color: "#1e293b" }}>Adjust your search or filter</span>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "11px" }}>
            {filtered.map((v) => {
              const img = Array.isArray(v.images) && v.images.length > 0 ? v.images[0].url : null;
              const catShort = CAT_SHORT[v.category] || (v.category || "").toUpperCase();
              const era = (v.era || "").toUpperCase();
              return (
                <div
                  key={v.id}
                  style={{
                    background: "rgba(26,39,68,0.45)",
                    border: "1px solid rgba(245,158,10,0.18)",
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={() => onSelectVehicle(v)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && onSelectVehicle(v)}
                >
                  <div style={{ width: "100%", height: 89, background: "#0a0f1c", overflow: "hidden" }}>
                    {img ? (
                      <img src={img} alt={v.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.5rem", color: "#1e293b", letterSpacing: "0.12em" }}>NO IMAGE</span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", padding: "6px", height: 36, justifyContent: "center" }}>
                    <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.001em", color: "#e2e8f0", lineHeight: 1, margin: "0 0 0px 0" }}>
                      {v.name}
                    </p>
                    <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.68rem", letterSpacing: 0, color: "#64748b", lineHeight: 1, margin: 0 }}>
                      {[catShort, era].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: "#1e293b", padding: "8px" }}
        >
          ← HOME
        </button>
      </footer>
    </div>
    </div>
  );
}
