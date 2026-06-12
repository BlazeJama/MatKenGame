import React, { useState } from 'react';
import TacCard from '../components/TacCard';

const LEARN_CATS = [
  { id: "all",              label: "ALL"  },
  { id: "Main Battle Tank", label: "MBT"  },
  { id: "APC",              label: "APC"  },
  { id: "IFV",              label: "IFV"  },
  { id: "Artillery",        label: "ARTY" },
  { id: "Helicopter",       label: "HELO" },
];

export default function LearningHomeScreen({ vehicles, onBack, onSelectVehicle }) {
  const [search, setSearch] = useState("");
  const [cat,    setCat]    = useState("all");

  const filtered = vehicles.filter((v) => {
    const matchCat  = cat === "all" || v.category === cat;
    const q         = search.toLowerCase();
    const matchName = !q || v.name.toLowerCase().includes(q) || (v.country || "").toLowerCase().includes(q);
    return matchCat && matchName;
  });

  return (
    <div className="min-h-screen flex flex-col tac-grid font-tac" style={{ background: "#070b14" }}>
      <header className="px-5" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 1.6rem)", paddingBottom: "1rem" }}>
        <button
          onClick={onBack}
          className="font-data"
          style={{ background: "transparent", border: "none", cursor: "pointer", color: "#475569", letterSpacing: "0.12em", fontSize: "0.68rem", padding: 0, marginBottom: 10 }}
        >
          ← HOME
        </button>
        <div className="font-data" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(245,158,11,0.5)", marginBottom: 4 }}>◈ INTELLIGENCE FILES</div>
        <h1 className="font-display text-white" style={{ fontSize: "2.4rem", lineHeight: 1, letterSpacing: "0.06em" }}>
          VEHICLE<span style={{ color: "#f59e0b" }}> LIBRARY</span>
        </h1>
      </header>

      <div className="px-5 mb-3">
        <input
          type="text"
          placeholder="SEARCH BY NAME OR COUNTRY..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full font-data"
          style={{
            background: "rgba(26,39,68,0.3)", border: "1px solid rgba(245,158,11,0.15)",
            borderRadius: 2, color: "#94a3b8", padding: "10px 14px",
            fontSize: "0.7rem", letterSpacing: "0.08em", outline: "none", minHeight: 44,
          }}
        />
      </div>

      <div className="px-5 mb-4">
        <div className="flex flex-wrap gap-2">
          {LEARN_CATS.map((opt) => {
            const sel = cat === opt.id;
            return (
              <button key={opt.id} onClick={() => setCat(opt.id)} className="font-data"
                style={{
                  fontSize: "0.68rem", padding: "5px 12px", borderRadius: 2,
                  letterSpacing: "0.1em", minHeight: 36,
                  border: `1px solid ${sel ? "#f59e0b" : "rgba(51,65,85,0.5)"}`,
                  background: sel ? "rgba(245,158,11,0.12)" : "rgba(15,23,42,0.5)",
                  color: sel ? "#f59e0b" : "#64748b", cursor: "pointer",
                }}
              >{opt.label}</button>
            );
          })}
        </div>
      </div>

      <main className="flex-1 px-5 pb-10 max-w-md mx-auto w-full overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="text-center font-data text-xs py-16" style={{ color: "#334155", letterSpacing: "0.12em", lineHeight: 2 }}>
            NO VEHICLES MATCH<br /><span style={{ color: "#1e293b" }}>Adjust your search or filter</span>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {filtered.map((v) => {
              const img = Array.isArray(v.images) && v.images.length > 0 ? v.images[0].url : null;
              return (
                <TacCard
                  key={v.id}
                  style={{ cursor: "pointer", overflow: "hidden", padding: 0 }}
                  onClick={() => onSelectVehicle(v)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && onSelectVehicle(v)}
                >
                  <div style={{ width: "100%", height: 90, background: "#0d1520", overflow: "hidden" }}>
                    {img ? (
                      <img src={img} alt={v.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="font-data" style={{ fontSize: "0.55rem", color: "#1e293b", letterSpacing: "0.12em" }}>NO IMAGE</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "8px 10px" }}>
                    <div className="font-display text-white" style={{ fontSize: "0.95rem", letterSpacing: "0.04em", lineHeight: 1.2, marginBottom: 3 }}>{v.name}</div>
                    <div className="font-data" style={{ fontSize: "0.58rem", color: "#475569", letterSpacing: "0.08em" }}>{v.country}</div>
                    {v.category && (
                      <div className="font-data" style={{ fontSize: "0.52rem", letterSpacing: "0.1em", marginTop: 5, color: "rgba(245,158,11,0.6)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 2, padding: "2px 5px", display: "inline-block" }}>
                        {v.category === "Main Battle Tank" ? "MBT" : v.category.toUpperCase()}
                      </div>
                    )}
                  </div>
                </TacCard>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
