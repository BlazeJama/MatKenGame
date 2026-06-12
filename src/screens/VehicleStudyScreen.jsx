import React, { useState } from 'react';
import TacCard from '../components/TacCard';

const STUDY_TABS = ["OVERVIEW", "ARMAMENT", "PROTECTION", "WHATS", "VARIANTS"];

function groupBySection(items) {
  const order = [];
  const map = {};
  (items || []).forEach((item) => {
    if (!map[item.section]) { map[item.section] = []; order.push(item.section); }
    map[item.section].push(item);
  });
  return order.map((s) => ({ section: s, entries: map[s] }));
}

function IntelPending({ tab }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 200, paddingTop: 30 }}>
      <div className="font-data text-center" style={{ fontSize: "0.62rem", letterSpacing: "0.16em", color: "rgba(245,158,11,0.35)", marginBottom: 8 }}>◈ {tab}</div>
      <div className="font-display text-center" style={{ fontSize: "1.5rem", letterSpacing: "0.08em", color: "#1e293b", marginBottom: 10 }}>INTEL PENDING</div>
      <div className="font-data text-center" style={{ fontSize: "0.62rem", color: "#1e293b", letterSpacing: "0.1em", lineHeight: 1.8 }}>
        DATA NOT YET COMPILED<br />FOR THIS VEHICLE
      </div>
    </div>
  );
}

export default function VehicleStudyScreen({ vehicle, onBack }) {
  const [tab,    setTab]    = useState("OVERVIEW");
  const [imgIdx, setImgIdx] = useState(0);

  if (!vehicle) return null;
  const images = Array.isArray(vehicle.images) ? vehicle.images : [];
  const specs  = vehicle.specs || {};

  const SPEC_ROWS = [
    { label: "CREW",            key: "crew"           },
    { label: "WEIGHT",          key: "weight"         },
    { label: "LENGTH",          key: "length"         },
    { label: "WIDTH",           key: "width"          },
    { label: "HEIGHT",          key: "height"         },
    { label: "ENGINE",          key: "engine"         },
    { label: "HORSEPOWER",      key: "horsepower"     },
    { label: "FUEL",            key: "fuel"           },
    { label: "TOP SPEED",       key: "speed"          },
    { label: "RANGE",           key: "range"          },
    { label: "ENTERED SERVICE", key: "enteredService" },
  ].filter(({ key }) => specs[key]);

  const renderTabContent = () => {
    if (tab === "OVERVIEW") {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {vehicle.about && (
            <div>
              <div className="font-data" style={{ fontSize: "0.58rem", letterSpacing: "0.16em", color: "#334155", marginBottom: 8 }}>◈ ABOUT</div>
              <div className="font-data" style={{ fontSize: "0.75rem", color: "#64748b", letterSpacing: "0.03em", lineHeight: 1.7 }}>{vehicle.about}</div>
            </div>
          )}
          {SPEC_ROWS.length > 0 && (
            <div>
              <div className="font-data" style={{ fontSize: "0.58rem", letterSpacing: "0.16em", color: "#334155", marginBottom: 8 }}>◈ SPECIFICATIONS</div>
              <TacCard style={{ padding: "12px 14px" }}>
                {SPEC_ROWS.map(({ label, key }, i) => (
                  <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "6px 0", borderBottom: i < SPEC_ROWS.length - 1 ? "1px solid rgba(30,41,59,0.5)" : "none", gap: 12 }}>
                    <div className="font-data" style={{ fontSize: "0.58rem", letterSpacing: "0.12em", color: "#334155", flexShrink: 0 }}>{label}</div>
                    <div className="font-data" style={{ fontSize: "0.72rem", color: "#94a3b8", letterSpacing: "0.03em", textAlign: "right" }}>{specs[key]}</div>
                  </div>
                ))}
              </TacCard>
            </div>
          )}
          {!vehicle.about && SPEC_ROWS.length === 0 && (
            <TacCard style={{ padding: "14px 16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px" }}>
                {[
                  { label: "COUNTRY",  value: vehicle.country  || "—" },
                  { label: "CATEGORY", value: vehicle.category === "Main Battle Tank" ? "MBT" : (vehicle.category || "—") },
                  { label: "ERA",      value: vehicle.era       || "—" },
                  { label: "IMAGES",   value: images.length > 0 ? `${images.length} on file` : "None" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="font-data" style={{ fontSize: "0.55rem", letterSpacing: "0.16em", color: "#334155", marginBottom: 3 }}>{label}</div>
                    <div className="font-data" style={{ fontSize: "0.8rem", color: "#94a3b8", letterSpacing: "0.04em" }}>{value}</div>
                  </div>
                ))}
              </div>
            </TacCard>
          )}
          {Array.isArray(vehicle.funFacts) && vehicle.funFacts.length > 0 && (
            <div>
              <div className="font-data" style={{ fontSize: "0.58rem", letterSpacing: "0.16em", color: "#334155", marginBottom: 8 }}>◈ FIELD NOTES</div>
              {vehicle.funFacts.map((fact, i) => (
                <TacCard key={i} style={{ padding: "12px 14px", marginBottom: 8 }}>
                  <div className="font-data" style={{ fontSize: "0.72rem", color: "#64748b", letterSpacing: "0.04em", lineHeight: 1.6 }}>{fact}</div>
                </TacCard>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (tab === "ARMAMENT") {
      if (!vehicle.armament?.length) return <IntelPending tab={tab} />;
      const groups = groupBySection(vehicle.armament);
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {groups.map(({ section, entries }) => (
            <div key={section}>
              <div className="font-data" style={{ fontSize: "0.58rem", letterSpacing: "0.16em", color: "#334155", marginBottom: 8 }}>◈ {section}</div>
              <TacCard style={{ padding: "4px 0" }}>
                {entries.map((entry, i) => (
                  <div key={i} style={{ padding: "10px 14px", borderBottom: i < entries.length - 1 ? "1px solid rgba(30,41,59,0.45)" : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: entry.description ? 4 : 0 }}>
                      <div className="font-data" style={{ fontSize: "0.75rem", color: "#94a3b8", letterSpacing: "0.03em", lineHeight: 1.4 }}>{entry.name}</div>
                      {entry.visibilityRating > 0 && (
                        <div className="font-data" style={{ fontSize: "0.6rem", color: "rgba(245,158,11,0.7)", flexShrink: 0 }}>{"◉".repeat(entry.visibilityRating)}</div>
                      )}
                    </div>
                    {entry.description ? (
                      <div className="font-data" style={{ fontSize: "0.65rem", color: "#475569", letterSpacing: "0.03em", lineHeight: 1.5 }}>{entry.description}</div>
                    ) : null}
                  </div>
                ))}
              </TacCard>
            </div>
          ))}
        </div>
      );
    }

    if (tab === "PROTECTION") {
      if (!vehicle.protection?.length) return <IntelPending tab={tab} />;
      const groups = groupBySection(vehicle.protection);
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {groups.map(({ section, entries }) => (
            <div key={section}>
              <div className="font-data" style={{ fontSize: "0.58rem", letterSpacing: "0.16em", color: "#334155", marginBottom: 8 }}>◈ {section}</div>
              <TacCard style={{ padding: "4px 0" }}>
                {entries.map((entry, i) => (
                  <div key={i} style={{ padding: "10px 14px", borderBottom: i < entries.length - 1 ? "1px solid rgba(30,41,59,0.45)" : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: entry.description ? 4 : 0 }}>
                      <div className="font-data" style={{ fontSize: "0.75rem", color: "#94a3b8", letterSpacing: "0.03em", lineHeight: 1.4 }}>{entry.name}</div>
                      {entry.visibilityRating > 0 && (
                        <div className="font-data" style={{ fontSize: "0.6rem", color: "rgba(245,158,11,0.7)", flexShrink: 0 }}>{"◉".repeat(entry.visibilityRating)}</div>
                      )}
                    </div>
                    {entry.description ? (
                      <div className="font-data" style={{ fontSize: "0.65rem", color: "#475569", letterSpacing: "0.03em", lineHeight: 1.5 }}>{entry.description}</div>
                    ) : null}
                  </div>
                ))}
              </TacCard>
            </div>
          ))}
        </div>
      );
    }

    if (tab === "WHATS") {
      if (!vehicle.whats?.cues?.length) return <IntelPending tab={tab} />;
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {vehicle.whats.intro && (
            <div className="font-data" style={{ fontSize: "0.75rem", color: "#64748b", letterSpacing: "0.03em", lineHeight: 1.7 }}>
              {vehicle.whats.intro}
            </div>
          )}
          <div>
            <div className="font-data" style={{ fontSize: "0.58rem", letterSpacing: "0.16em", color: "#334155", marginBottom: 8 }}>◈ VISUAL CUES</div>
            <TacCard style={{ padding: "4px 0" }}>
              {vehicle.whats.cues.map((cue, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "12px 14px", borderBottom: i < vehicle.whats.cues.length - 1 ? "1px solid rgba(30,41,59,0.45)" : "none", alignItems: "flex-start" }}>
                  <div className="font-display" style={{ fontSize: "1.6rem", color: "#f59e0b", lineHeight: 1, flexShrink: 0, minWidth: 22 }}>{cue.letter}</div>
                  <div>
                    <div className="font-data" style={{ fontSize: "0.72rem", color: "#94a3b8", letterSpacing: "0.06em", marginBottom: 3 }}>{cue.keyword}</div>
                    {cue.description && (
                      <div className="font-data" style={{ fontSize: "0.65rem", color: "#475569", letterSpacing: "0.03em", lineHeight: 1.5 }}>{cue.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </TacCard>
          </div>
        </div>
      );
    }

    if (tab === "VARIANTS") {
      if (!vehicle.variants?.length) return <IntelPending tab={tab} />;
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {vehicle.variants.map((v, i) => (
            <TacCard key={i} style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                <div className="font-display text-white" style={{ fontSize: "1.1rem", letterSpacing: "0.06em" }}>{v.name}</div>
                {v.year && <div className="font-data" style={{ fontSize: "0.6rem", color: "#475569", letterSpacing: "0.08em" }}>{v.year}</div>}
              </div>
              {v.label && (
                <div className="font-data" style={{ fontSize: "0.68rem", color: "#64748b", letterSpacing: "0.03em", lineHeight: 1.5, marginBottom: v.visibleDifferences?.length || v.internalDifferences?.length ? 10 : 0 }}>
                  {v.label}
                </div>
              )}
              {Array.isArray(v.visibleDifferences) && v.visibleDifferences.length > 0 && (
                <div style={{ marginTop: 6 }}>
                  <div className="font-data" style={{ fontSize: "0.55rem", letterSpacing: "0.14em", color: "rgba(245,158,11,0.5)", marginBottom: 4 }}>◉ VISIBLE DIFFERENCES</div>
                  {v.visibleDifferences.map((d, j) => (
                    <div key={j} className="font-data" style={{ fontSize: "0.65rem", color: "#475569", lineHeight: 1.6 }}>· {d}</div>
                  ))}
                </div>
              )}
              {Array.isArray(v.internalDifferences) && v.internalDifferences.length > 0 && (
                <div style={{ marginTop: 6 }}>
                  <div className="font-data" style={{ fontSize: "0.55rem", letterSpacing: "0.14em", color: "#334155", marginBottom: 4 }}>⚙ INTERNAL DIFFERENCES</div>
                  {v.internalDifferences.map((d, j) => (
                    <div key={j} className="font-data" style={{ fontSize: "0.65rem", color: "#475569", lineHeight: 1.6 }}>· {d}</div>
                  ))}
                </div>
              )}
            </TacCard>
          ))}
        </div>
      );
    }

    return <IntelPending tab={tab} />;
  };

  return (
    <div className="min-h-screen flex flex-col tac-grid font-tac" style={{ background: "#070b14" }}>
      <header className="px-4" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 1.4rem)", paddingBottom: "0.8rem" }}>
        <button
          onClick={onBack}
          className="font-data"
          style={{ background: "transparent", border: "none", cursor: "pointer", color: "#475569", letterSpacing: "0.12em", fontSize: "0.68rem", padding: 0, marginBottom: 8 }}
        >
          ← VEHICLE LIBRARY
        </button>
        <div className="font-display text-white" style={{ fontSize: "2rem", letterSpacing: "0.05em", lineHeight: 1.1 }}>{vehicle.name}</div>
        <div className="font-data" style={{ fontSize: "0.62rem", color: "#475569", letterSpacing: "0.1em", marginTop: 2 }}>
          {vehicle.country}{vehicle.era ? ` · ${vehicle.era}` : ""}
        </div>
      </header>

      {images.length > 0 && (
        <div style={{ position: "relative", width: "100%", height: 190, background: "#0d1520", overflow: "hidden", flexShrink: 0 }}>
          <img src={images[imgIdx]?.url} alt={vehicle.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {images[imgIdx]?.stars && (
            <div className="font-data" style={{ position: "absolute", top: 10, right: 10, background: "rgba(7,11,20,0.8)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 2, padding: "3px 8px", fontSize: "0.6rem", letterSpacing: "0.1em", color: "#f59e0b" }}>
              {"★".repeat(images[imgIdx].stars)}
            </div>
          )}
        </div>
      )}

      {images.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "10px 0", background: "#070b14", flexShrink: 0 }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => setImgIdx(i)} style={{ width: i === imgIdx ? 18 : 6, height: 6, borderRadius: 3, background: i === imgIdx ? "#f59e0b" : "rgba(245,158,11,0.2)", border: "none", cursor: "pointer", padding: 0, transition: "width 0.2s" }} />
          ))}
        </div>
      )}

      <div style={{ flexShrink: 0, borderBottom: "1px solid rgba(245,158,11,0.12)" }}>
        <div style={{ display: "flex", overflowX: "auto" }}>
          {STUDY_TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className="font-data"
              style={{
                flex: "0 0 auto", padding: "12px 14px", fontSize: "0.6rem", letterSpacing: "0.12em",
                border: "none", cursor: "pointer", background: "transparent",
                color: tab === t ? "#f59e0b" : "#334155",
                borderBottom: `2px solid ${tab === t ? "#f59e0b" : "transparent"}`,
                marginBottom: -1,
              }}
            >{t}</button>
          ))}
        </div>
      </div>

      <main className="flex-1 px-4 py-4 max-w-md mx-auto w-full overflow-y-auto">
        {renderTabContent()}
      </main>
    </div>
  );
}
