import React, { useState, useRef } from 'react';

const STUDY_TABS = ["OVERVIEW", "ARMAMENT", "PROTECTION", "WHATS", "VARIANTS"];

const STAR_LABEL = { 1: "EASY", 2: "MEDIUM", 3: "HARD" };

function groupBySection(items) {
  const order = [];
  const map = {};
  (items || []).forEach((item) => {
    if (!map[item.section]) { map[item.section] = []; order.push(item.section); }
    map[item.section].push(item);
  });
  return order.map((s) => ({ section: s, entries: map[s] }));
}

const Divider = () => (
  <div style={{ height: 1, background: "rgba(51,65,85,0.3)", flexShrink: 0 }} />
);

const SectionLabel = ({ children }) => (
  <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.154em", color: "#334155", margin: 0 }}>
    {children}
  </p>
);

function IntelPending({ tab }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 200, paddingTop: 30 }}>
      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.154em", color: "rgba(245,158,11,0.35)", marginBottom: 8, textAlign: "center" }}>
        ◈ {tab}
      </div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.08em", color: "#1e293b", marginBottom: 10, textAlign: "center" }}>
        INTEL PENDING
      </div>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: "#1e293b", letterSpacing: "0.1em", lineHeight: 1.8, textAlign: "center" }}>
        DATA NOT YET COMPILED<br />FOR THIS VEHICLE
      </div>
    </div>
  );
}

export default function VehicleStudyScreen({ vehicle, onBack }) {
  const [tab,          setTab]         = useState("OVERVIEW");
  const [imgIdx,       setImgIdx]      = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Zoom state — ref is the live value (no stale closures), state drives render
  const zoomRef  = useRef({ scale: 1, x: 0, y: 0 });
  const [zoom, setZoom] = useState({ scale: 1, x: 0, y: 0 });
  const updateZoom = (z) => { zoomRef.current = z; setZoom(z); };
  const resetZoom  = ()  => updateZoom({ scale: 1, x: 0, y: 0 });

  // Gesture tracking refs
  const touchStartX    = useRef(null);
  const touchStartY    = useRef(null);
  const pinchStartDist  = useRef(null);
  const pinchStartScale = useRef(1);
  const isPinching      = useRef(false);
  const panStartRef     = useRef(null);
  const lastTapTime     = useRef(0);

  if (!vehicle) return null;
  const images = Array.isArray(vehicle.images) ? vehicle.images : [];
  const specs  = vehicle.specs || {};
  const currentImage = images[imgIdx];

  const prevImage = () => { setImgIdx((i) => (i - 1 + images.length) % images.length); resetZoom(); };
  const nextImage = () => { setImgIdx((i) => (i + 1) % images.length); resetZoom(); };
  const closeLightbox = () => { setLightboxOpen(false); resetZoom(); };

  // ── Carousel touch handlers (swipe left/right only) ──────────────────────
  const handleCarouselTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleCarouselTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) && images.length > 1) {
      dx < 0 ? nextImage() : prevImage();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // ── Lightbox touch handlers (pinch-zoom + pan + swipe + double-tap) ──────
  const handleLightboxTouchStart = (e) => {
    if (e.touches.length === 2) {
      isPinching.current = true;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchStartDist.current  = Math.hypot(dx, dy);
      pinchStartScale.current = zoomRef.current.scale;
      touchStartX.current = null;
      touchStartY.current = null;
    } else if (e.touches.length === 1) {
      isPinching.current = false;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      touchStartX.current = x;
      touchStartY.current = y;
      panStartRef.current = { x, y };
      // Double-tap: toggle between 1× and 2.5×
      const now = Date.now();
      if (now - lastTapTime.current < 300) {
        zoomRef.current.scale > 1 ? resetZoom() : updateZoom({ scale: 2.5, x: 0, y: 0 });
        lastTapTime.current = 0;
      } else {
        lastTapTime.current = now;
      }
    }
  };

  const handleLightboxTouchMove = (e) => {
    if (e.touches.length === 2 && pinchStartDist.current !== null) {
      // Pinch zoom
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist     = Math.hypot(dx, dy);
      const newScale = Math.min(6, Math.max(1, pinchStartScale.current * (dist / pinchStartDist.current)));
      updateZoom({ ...zoomRef.current, scale: newScale });
    } else if (e.touches.length === 1 && zoomRef.current.scale > 1 && panStartRef.current) {
      // Pan while zoomed
      const dx = e.touches[0].clientX - panStartRef.current.x;
      const dy = e.touches[0].clientY - panStartRef.current.y;
      updateZoom({ ...zoomRef.current, x: zoomRef.current.x + dx, y: zoomRef.current.y + dy });
      panStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleLightboxTouchEnd = (e) => {
    if (isPinching.current) {
      isPinching.current    = false;
      pinchStartDist.current = null;
      // Snap back if nearly at 1×
      if (zoomRef.current.scale < 1.05) resetZoom();
      return;
    }
    panStartRef.current = null;
    // Swipe gestures only work when not zoomed in
    if (zoomRef.current.scale <= 1 && touchStartX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(dy) > 80 && Math.abs(dy) > Math.abs(dx) && dy > 0) {
        closeLightbox();
      } else if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) && images.length > 1) {
        dx < 0 ? nextImage() : prevImage();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

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

  const breadcrumb = [vehicle.category, vehicle.era, vehicle.country].filter(Boolean).join("  ·  ");

  const renderTabContent = () => {
    if (tab === "OVERVIEW") {
      const hasAbout = !!vehicle.about;
      const hasSpecs = SPEC_ROWS.length > 0;
      if (!hasAbout && !hasSpecs) return <IntelPending tab={tab} />;
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {hasAbout && (
            <>
              <SectionLabel>ABOUT</SectionLabel>
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.8rem", color: "#637387", lineHeight: "20px", letterSpacing: "0.04em", margin: 0 }}>
                {vehicle.about}
              </p>
              <div style={{ height: 8 }} />
            </>
          )}
          {hasSpecs && (
            <>
              <SectionLabel>SPECIFICATIONS</SectionLabel>
              {SPEC_ROWS.map(({ label, key }, i) => (
                <React.Fragment key={key}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", gap: 12 }}>
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.68rem", letterSpacing: "0.11em", color: "#637387" }}>
                      {label}
                    </span>
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.8rem", color: "#e2e8f0", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                      {specs[key]}
                    </span>
                  </div>
                  {i < SPEC_ROWS.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      );
    }

    if (tab === "ARMAMENT") {
      if (!vehicle.armament?.length) return <IntelPending tab={tab} />;
      const groups = groupBySection(vehicle.armament);
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {groups.map(({ section, entries }, gi) => (
            <React.Fragment key={section}>
              {gi > 0 && <div style={{ height: 4 }} />}
              <SectionLabel>{section}</SectionLabel>
              {entries.map((entry, i) => (
                <React.Fragment key={i}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "6px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.8rem", color: "#e2e8f0", letterSpacing: "0.04em" }}>
                        {entry.name}
                      </span>
                      {entry.visibilityRating > 0 && (
                        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.625rem", color: "rgba(245,158,10,0.75)", letterSpacing: "0.08em", flexShrink: 0 }}>
                          ◉ {entry.visibilityRating}
                        </span>
                      )}
                    </div>
                    {entry.description && (
                      <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.68rem", color: "#637387", lineHeight: "16px", letterSpacing: "0.044em", margin: 0 }}>
                        {entry.description}
                      </p>
                    )}
                  </div>
                  <Divider />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      );
    }

    if (tab === "PROTECTION") {
      if (!vehicle.protection?.length) return <IntelPending tab={tab} />;
      const groups = groupBySection(vehicle.protection);
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {groups.map(({ section, entries }, gi) => (
            <React.Fragment key={section}>
              {gi > 0 && <div style={{ height: 4 }} />}
              <SectionLabel>{section}</SectionLabel>
              {entries.map((entry, i) => (
                <React.Fragment key={i}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "6px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.8rem", color: "#e2e8f0", letterSpacing: "0.04em" }}>
                        {entry.name}
                      </span>
                      {entry.visibilityRating > 0 && (
                        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.625rem", color: "rgba(245,158,10,0.75)", letterSpacing: "0.08em", flexShrink: 0 }}>
                          ◉ {entry.visibilityRating}
                        </span>
                      )}
                    </div>
                    {entry.description && (
                      <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.68rem", color: "#637387", lineHeight: "16px", letterSpacing: "0.044em", margin: 0 }}>
                        {entry.description}
                      </p>
                    )}
                  </div>
                  <Divider />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      );
    }

    if (tab === "WHATS") {
      if (!vehicle.whats?.cues?.length) return <IntelPending tab={tab} />;
      const cues = vehicle.whats.cues;
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {vehicle.whats.intro && (
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.68rem", color: "rgba(99,115,135,0.6)", lineHeight: "16px", letterSpacing: "0.044em", margin: 0 }}>
              {vehicle.whats.intro}
            </p>
          )}
          <div style={{ height: 2 }} />
          {cues.map((cue, i) => (
            <React.Fragment key={i}>
              <div style={{ display: "flex", gap: 10, padding: "6px 0", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.375rem", color: "#f59e0a", lineHeight: 1, flexShrink: 0 }}>
                  {cue.letter}
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1, minWidth: 0 }}>
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.8rem", color: "#e2e8f0", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                    {cue.keyword}
                  </span>
                  {cue.description && (
                    <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.68rem", color: "#637387", lineHeight: "16px", letterSpacing: "0.044em", margin: 0 }}>
                      {cue.description}
                    </p>
                  )}
                </div>
              </div>
              <Divider />
            </React.Fragment>
          ))}
        </div>
      );
    }

    if (tab === "VARIANTS") {
      if (!vehicle.variants?.length) return <IntelPending tab={tab} />;
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.56rem", color: "rgba(99,115,135,0.45)", letterSpacing: "0.08em", margin: 0 }}>
            ◉ VISIBLE ID DIFFERENCE   ⚙ INTERNAL / NOT VISIBLE
          </p>
          <div style={{ height: 2 }} />
          {vehicle.variants.map((v, i) => (
            <React.Fragment key={i}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "6px 0" }}>
                <div style={{ display: "flex", gap: 6, alignItems: "baseline" }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.125rem", color: "#e2e8f0" }}>{v.name}</span>
                  {v.year && (
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.68rem", color: "#637387", letterSpacing: "0.044em" }}>
                      ({v.year})
                    </span>
                  )}
                  {v.label && (
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.625rem", color: "rgba(245,158,10,0.55)", letterSpacing: "0.12em", flex: 1, minWidth: 0 }}>
                      {v.label}
                    </span>
                  )}
                </div>
                {Array.isArray(v.visibleDifferences) && v.visibleDifferences.map((d, j) => (
                  <p key={j} style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.68rem", color: "rgba(245,158,10,0.85)", lineHeight: "16px", letterSpacing: "0.044em", margin: 0 }}>
                    ◉  {d}
                  </p>
                ))}
                {Array.isArray(v.internalDifferences) && v.internalDifferences.map((d, j) => (
                  <p key={j} style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.68rem", color: "rgba(99,115,135,0.6)", lineHeight: "16px", letterSpacing: "0.044em", margin: 0 }}>
                    ⚙  {d}
                  </p>
                ))}
              </div>
              <Divider />
            </React.Fragment>
          ))}
        </div>
      );
    }

    return <IntelPending tab={tab} />;
  };

  return (
    <>
      <div className="tac-grid" style={{ background: "#070b14", minHeight: "100vh" }}>
        <div style={{ maxWidth: 390, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

          {/* Nav Area */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "18px 16px 14px", paddingTop: "calc(env(safe-area-inset-top, 0px) + 18px)", flexShrink: 0 }}>
            <button
              onClick={onBack}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}
            >
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.875rem", letterSpacing: "0.154em", color: "#f59e0b" }}>
                ← BACK
              </span>
            </button>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.125rem", color: "#e2e8f0", letterSpacing: "0.08em", lineHeight: 1 }}>
              {vehicle.name}
            </div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.68rem", color: "#637387", letterSpacing: "0.11em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {breadcrumb}
            </div>
          </div>

          {/* Image Carousel — swipeable, tap to open lightbox */}
          <div
            style={{ position: "relative", width: "100%", height: 190, background: "#141f38", overflow: "hidden", flexShrink: 0, touchAction: "pan-y", userSelect: "none" }}
            onTouchStart={handleCarouselTouchStart}
            onTouchEnd={handleCarouselTouchEnd}
          >
            {currentImage ? (
              <img
                src={currentImage.url}
                alt={vehicle.name}
                onClick={() => setLightboxOpen(true)}
                style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "zoom-in", display: "block" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.8rem", color: "rgba(99,115,135,0.3)", letterSpacing: "0.04em" }}>
                  [ VEHICLE PHOTO ]
                </span>
              </div>
            )}
            {currentImage?.stars && (
              <div style={{ position: "absolute", left: 12, bottom: 10, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.625rem", color: "#f59e0a", letterSpacing: "0.12em", pointerEvents: "none" }}>
                ★  {STAR_LABEL[currentImage.stars] || "★".repeat(currentImage.stars)}
              </div>
            )}
            {images.length > 1 && (
              <>
                <button onClick={prevImage} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 32, height: 32, borderRadius: "50%", background: "rgba(15,23,42,0.7)", border: "1px solid rgba(51,65,85,0.5)", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", lineHeight: 1 }}>‹</button>
                <button onClick={nextImage} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", width: 32, height: 32, borderRadius: "50%", background: "rgba(15,23,42,0.7)", border: "1px solid rgba(51,65,85,0.5)", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", lineHeight: 1 }}>›</button>
              </>
            )}
          </div>

          {/* Dots Row */}
          <div style={{ display: "flex", gap: 6, height: 36, alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {images.length <= 1 ? (
              images.length === 1 ? <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0a" }} /> : null
            ) : (
              images.map((_, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  style={{ width: 6, height: 6, borderRadius: "50%", background: i === imgIdx ? "#f59e0a" : "rgba(51,65,85,0.4)", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}
                />
              ))
            )}
          </div>

          {/* Tab Bar + Content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ background: "#1e293b", height: 44, display: "flex", flexShrink: 0, position: "relative", overflowX: "auto" }}>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 1, background: "rgba(51,65,85,0.3)" }} />
              {STUDY_TABS.map((t) => {
                const active = tab === t;
                return (
                  <button key={t} onClick={() => setTab(t)}
                    style={{ height: 44, minWidth: 78, flex: "0 0 78px", background: "none", border: "none", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif", fontWeight: active ? 600 : 500, fontSize: "0.625rem", letterSpacing: "0.11em", color: active ? "#e2e8f0" : "rgba(99,115,135,0.7)", position: "relative" }}
                  >
                    {t}
                    {active && <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: "#f59e0a", zIndex: 1 }} />}
                  </button>
                );
              })}
            </div>
            <main style={{ flex: 1, overflowY: "auto", padding: "14px 16px", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)" }}>
              {renderTabContent()}
            </main>
          </div>
        </div>
      </div>

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(7,11,20,0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", touchAction: "none", userSelect: "none", overflow: "hidden" }}
          onTouchStart={handleLightboxTouchStart}
          onTouchMove={handleLightboxTouchMove}
          onTouchEnd={handleLightboxTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            style={{ position: "absolute", top: "calc(env(safe-area-inset-top, 0px) + 16px)", right: 20, background: "rgba(15,23,42,0.8)", border: "1px solid rgba(51,65,85,0.5)", borderRadius: "50%", width: 40, height: 40, color: "#94a3b8", fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >✕</button>

          {/* Vehicle name + counter */}
          <div style={{ position: "absolute", top: "calc(env(safe-area-inset-top, 0px) + 20px)", left: 20, right: 72 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem", color: "#e2e8f0", letterSpacing: "0.06em", lineHeight: 1 }}>
              {vehicle.name}
            </div>
            {images.length > 1 && (
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.62rem", color: "#637387", letterSpacing: "0.1em", marginTop: 2 }}>
                {imgIdx + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Image — pinch/pan transform applied here */}
          {currentImage && (
            <img
              src={currentImage.url}
              alt={vehicle.name}
              style={{
                maxWidth: "100%",
                maxHeight: "70vh",
                objectFit: "contain",
                display: "block",
                transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.scale})`,
                transformOrigin: "center center",
                // Smooth snap-back when releasing, instant during gesture
                transition: isPinching.current ? "none" : zoom.scale === 1 ? "transform 0.25s ease" : "none",
              }}
            />
          )}

          {/* Star + hint */}
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, pointerEvents: "none" }}>
            {currentImage?.stars && (
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#f59e0a", letterSpacing: "0.12em" }}>
                ★  {STAR_LABEL[currentImage.stars] || "★".repeat(currentImage.stars)}
              </div>
            )}
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, fontSize: "0.55rem", color: "rgba(99,115,135,0.4)", letterSpacing: "0.12em", textAlign: "center" }}>
              {zoom.scale > 1
                ? "PINCH TO ZOOM · DOUBLE-TAP TO RESET"
                : images.length > 1
                  ? "PINCH TO ZOOM · DOUBLE-TAP · SWIPE TO NAVIGATE · SWIPE DOWN TO CLOSE"
                  : "PINCH TO ZOOM · DOUBLE-TAP TO RESET · SWIPE DOWN TO CLOSE"
              }
            </div>
          </div>

          {/* Dots */}
          {images.length > 1 && (
            <div style={{ display: "flex", gap: 6, marginTop: 16, pointerEvents: zoom.scale > 1 ? "none" : "auto" }}>
              {images.map((_, i) => (
                <button key={i} onClick={() => { setImgIdx(i); resetZoom(); }}
                  style={{ width: 6, height: 6, borderRadius: "50%", background: i === imgIdx ? "#f59e0a" : "rgba(51,65,85,0.5)", border: "none", cursor: "pointer", padding: 0 }}
                />
              ))}
            </div>
          )}

          {/* Prev / Next arrows — hidden when zoomed in */}
          {images.length > 1 && zoom.scale <= 1 && (
            <>
              <button onClick={prevImage} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(15,23,42,0.7)", border: "1px solid rgba(51,65,85,0.5)", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", lineHeight: 1 }}>‹</button>
              <button onClick={nextImage} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(15,23,42,0.7)", border: "1px solid rgba(51,65,85,0.5)", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", lineHeight: 1 }}>›</button>
            </>
          )}
        </div>
      )}
    </>
  );
}
