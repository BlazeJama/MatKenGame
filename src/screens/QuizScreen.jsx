import React, { useState, useEffect, useRef } from 'react';
import TargetBrackets from '../components/TargetBrackets';
import { POINTS_PER_CORRECT, HINT_PENALTY, MAX_HINTS, QUESTION_TIME_MS, SPEED_BONUS_MAX_MS, SPEED_BONUS_MAX } from '../lib/constants';

export default function QuizScreen({ round, onComplete, onAbort, mode = "normal" }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore]                 = useState(0);
  const [selectedId, setSelectedId]       = useState(null);
  const [timedOut, setTimedOut]           = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(QUESTION_TIME_MS);
  const [hintsUsed, setHintsUsed]         = useState(0);
  const [eliminatedIds, setEliminatedIds] = useState(() => new Set());

  const timerIntervalRef  = useRef(null);
  const questionStartRef  = useRef(null);

  const isTimed        = mode === "timed";
  const question       = round[questionIndex];
  const isLastQuestion = questionIndex === round.length - 1;
  const hasAnswered    = selectedId !== null || timedOut;
  const isCorrect      = selectedId !== null && selectedId === question.vehicle.id;

  const eliminableWrong = question.options.filter(
    (opt) => opt.id !== question.vehicle.id && !eliminatedIds.has(opt.id)
  ).length;
  const canUseHint = !hasAnswered && hintsUsed < MAX_HINTS && eliminableWrong > 0;

  useEffect(() => {
    if (!isTimed) return;
    setTimeRemaining(QUESTION_TIME_MS);
    setTimedOut(false);
    questionStartRef.current = Date.now();

    timerIntervalRef.current = setInterval(() => {
      const elapsed   = Date.now() - questionStartRef.current;
      const remaining = Math.max(0, QUESTION_TIME_MS - elapsed);
      setTimeRemaining(remaining);
      if (remaining === 0) {
        clearInterval(timerIntervalRef.current);
        setTimedOut(true);
      }
    }, 100);

    return () => clearInterval(timerIntervalRef.current);
  }, [questionIndex, isTimed]);

  useEffect(() => {
    setEliminatedIds(new Set());
  }, [questionIndex]);

  useEffect(() => {
    if (!timedOut) return;
    const t = setTimeout(() => {
      if (isLastQuestion) {
        onComplete(score, hintsUsed);
      } else {
        setQuestionIndex((i) => i + 1);
        setSelectedId(null);
        setTimedOut(false);
      }
    }, 1500);
    return () => clearTimeout(t);
  }, [timedOut]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAbort = () => {
    if (confirm("Abort mission? Your progress in this round will be lost.")) {
      clearInterval(timerIntervalRef.current);
      onAbort();
    }
  };

  const handleHint = () => {
    if (!canUseHint) return;
    const wrong = question.options.filter(
      (opt) => opt.id !== question.vehicle.id && !eliminatedIds.has(opt.id)
    );
    const pick = wrong[Math.floor(Math.random() * wrong.length)];
    setEliminatedIds((prev) => new Set([...prev, pick.id]));
    setHintsUsed((n) => n + 1);
  };

  const handleSelect = (vehicleId) => {
    if (hasAnswered) return;
    clearInterval(timerIntervalRef.current);
    setSelectedId(vehicleId);

    if (vehicleId === question.vehicle.id) {
      let pts = POINTS_PER_CORRECT;
      if (isTimed && questionStartRef.current) {
        const elapsed = Date.now() - questionStartRef.current;
        const bonus   = Math.round(
          SPEED_BONUS_MAX * Math.max(0, (SPEED_BONUS_MAX_MS - elapsed) / SPEED_BONUS_MAX_MS)
        );
        pts += bonus;
      }
      setScore((s) => s + pts);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score, hintsUsed);
    } else {
      setQuestionIndex((i) => i + 1);
      setSelectedId(null);
      setTimedOut(false);
    }
  };

  const timerPct   = (timeRemaining / QUESTION_TIME_MS) * 100;
  const timerColor = timeRemaining > 8000 ? "#f59e0b"
                   : timeRemaining > 4000 ? "#fb923c"
                   : "#ef4444";

  const optionStyle = (optionId) => {
    const base = {
      width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 14,
      borderRadius: 2, padding: "11px 14px", minHeight: 52,
      fontFamily: "'Rajdhani', sans-serif",
      cursor: hasAnswered ? "default" : "pointer",
      border: "1px solid", transition: "border-color 0.15s, background 0.15s",
    };
    if (!hasAnswered && eliminatedIds.has(optionId)) return { ...base, background: "rgba(15,23,42,0.2)", borderColor: "rgba(30,41,59,0.2)", color: "#1e293b", opacity: 0.3, cursor: "not-allowed" };
    if (!hasAnswered) return { ...base, background: "rgba(15,23,42,0.85)", borderColor: "rgba(245,158,11,0.2)", color: "#e2e8f0" };
    if (optionId === question.vehicle.id) return { ...base, background: "rgba(34,197,94,0.1)", borderColor: "#22c55e", color: "#86efac" };
    if (optionId === selectedId) return { ...base, background: "rgba(239,68,68,0.1)", borderColor: "#ef4444", color: "#fca5a5" };
    return { ...base, background: "rgba(15,23,42,0.4)", borderColor: "rgba(30,41,59,0.5)", color: "#334155", opacity: 0.45 };
  };

  const badgeStyle = (optionId) => {
    const base = { width: 32, height: 32, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", flexShrink: 0 };
    if (!hasAnswered && eliminatedIds.has(optionId)) return { ...base, background: "rgba(15,23,42,0.2)", color: "#1e293b" };
    if (!hasAnswered) return { ...base, background: "rgba(245,158,11,0.15)", color: "#f59e0b" };
    if (optionId === question.vehicle.id) return { ...base, background: "rgba(34,197,94,0.2)", color: "#4ade80" };
    if (optionId === selectedId)          return { ...base, background: "rgba(239,68,68,0.2)",  color: "#f87171" };
    return { ...base, background: "rgba(30,41,59,0.5)", color: "#334155" };
  };

  const letters      = ["A", "B", "C", "D"];
  const progressPct  = ((questionIndex + (hasAnswered ? 1 : 0)) / round.length) * 100;

  return (
    <div className="quiz-shell font-tac" style={{ display: "flex", flexDirection: "column", background: "#070b14", overflow: "hidden" }}>
      <header style={{ background: "#0d1526", borderBottom: "1px solid rgba(245,158,11,0.12)", padding: "calc(env(safe-area-inset-top, 0px) + 12px) 16px 10px", flexShrink: 0 }}>
        <div className="max-w-md mx-auto w-full">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <button onClick={handleAbort} className="font-data"
              style={{ fontSize: "0.66rem", padding: "0 10px", height: 36, background: "rgba(15,23,42,0.6)", border: "1px solid rgba(239,68,68,0.35)", borderRadius: 2, color: "#f87171", letterSpacing: "0.1em", cursor: "pointer", display: "flex", alignItems: "center", whiteSpace: "nowrap", flexShrink: 0 }}
            >
              ✕ ABORT
            </button>
            <div style={{ textAlign: "center", lineHeight: 1 }}>
              <span className="font-display" style={{ fontSize: "1.45rem", letterSpacing: "0.04em", color: "#f59e0b" }}>{questionIndex + 1}</span>
              <span className="font-display" style={{ fontSize: "1.1rem", letterSpacing: "0.04em", color: "#334155" }}>/{round.length}</span>
            </div>
            <div className="font-display" style={{ fontSize: "1.45rem", letterSpacing: "0.04em", color: "#f59e0b", lineHeight: 1 }}>{score}</div>
            <button onClick={handleHint} disabled={!canUseHint} className="font-data"
              style={{ fontSize: "0.62rem", padding: "0 10px", height: 36, letterSpacing: "0.1em", borderRadius: 2, background: canUseHint ? "rgba(245,158,11,0.1)" : "transparent", border: `1px solid ${canUseHint ? "rgba(245,158,11,0.3)" : "rgba(30,41,59,0.35)"}`, color: canUseHint ? "#f59e0b" : "#1e293b", cursor: canUseHint ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 5, flexShrink: 0, whiteSpace: "nowrap" }}
            >
              HINT
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, borderRadius: "50%", background: canUseHint ? "rgba(245,158,11,0.2)" : "rgba(30,41,59,0.4)", fontSize: "0.6rem", lineHeight: 1, color: canUseHint ? "#f59e0b" : "#1e293b" }}>
                {MAX_HINTS - hintsUsed}
              </span>
            </button>
          </div>
          <div className="w-full rounded-full overflow-hidden" style={{ height: 3, background: "rgba(245,158,11,0.1)", marginBottom: isTimed ? 5 : 0 }}>
            <div style={{ height: "100%", width: `${progressPct}%`, background: "#f59e0b", transition: "width 0.4s ease", borderRadius: 9999 }} />
          </div>
          {isTimed && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div className="flex-1 overflow-hidden" style={{ height: 4, background: "rgba(239,68,68,0.12)", borderRadius: 2 }}>
                <div style={{ height: "100%", width: `${timerPct}%`, background: timerColor, borderRadius: 2, transition: "background 0.3s ease" }} />
              </div>
              <span className="font-display" style={{ fontSize: "1rem", lineHeight: 1, color: timedOut ? "#ef4444" : timerColor, minWidth: 24, textAlign: "right", letterSpacing: "0.02em" }}>
                {timedOut ? "0" : Math.ceil(timeRemaining / 1000)}
              </span>
            </div>
          )}
        </div>
      </header>

      <div style={{ flex: "1 1 0", minHeight: 0, position: "relative", overflow: "hidden", background: "#0a0e1a", maxWidth: 448, width: "100%", marginLeft: "auto", marginRight: "auto" }}>
        <img src={question.image.url} alt="Military vehicle to identify" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", clipPath: "inset(10px)" }} />
        <TargetBrackets size={26} color="#f59e0b" thickness={2} inset={10} />
        <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: "linear-gradient(to top, rgba(7,11,20,0.88), transparent)" }}>
          <span className="font-data text-xs" style={{ color: "rgba(245,158,11,0.65)", letterSpacing: "0.14em" }}>◉ IDENTIFY TARGET</span>
        </div>
      </div>

      <main style={{ flexShrink: 0, overflowY: "auto", padding: "12px 16px", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)", maxWidth: 448, marginLeft: "auto", marginRight: "auto", width: "100%", fontFamily: "'Rajdhani', sans-serif" }}>
        <div className="flex flex-col gap-2">
          {question.options.map((option, i) => {
            const isThisCorrect  = option.id === question.vehicle.id;
            const isThisSelected = option.id === selectedId;
            return (
              <button key={option.id} onClick={() => handleSelect(option.id)} disabled={hasAnswered || eliminatedIds.has(option.id)} style={optionStyle(option.id)} className={!hasAnswered ? "tac-answer" : ""}>
                <span style={badgeStyle(option.id)}>{letters[i]}</span>
                <span className="flex-1 text-left">
                  <span className="block font-semibold" style={{ fontSize: "1.05rem", letterSpacing: "0.02em" }}>{option.name}</span>
                  <span className="block font-data" style={{ fontSize: "0.7rem", opacity: 0.65, letterSpacing: "0.06em" }}>{option.country}</span>
                </span>
                {hasAnswered && isThisCorrect && <span style={{ color: "#4ade80", fontSize: "1.1rem", fontWeight: 700 }}>✓</span>}
                {hasAnswered && isThisSelected && !isThisCorrect && <span style={{ color: "#f87171", fontSize: "1.1rem", fontWeight: 700 }}>✗</span>}
              </button>
            );
          })}
        </div>

        {timedOut && (
          <div className="w-full mt-4 font-data text-xs text-center" style={{ color: "#ef4444", letterSpacing: "0.14em", minHeight: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>
            TIME EXPIRED — ADVANCING...
          </div>
        )}

        {!timedOut && (
          <button onClick={handleNext} disabled={!hasAnswered} className="w-full mt-4 font-display tracking-widest tac-primary"
            style={{ fontSize: "1.35rem", minHeight: "52px", borderRadius: 2, background: hasAnswered ? "#f59e0b" : "rgba(30,41,59,0.7)", color: hasAnswered ? "#070b14" : "#334155", border: hasAnswered ? "none" : "1px solid rgba(51,65,85,0.5)", letterSpacing: "0.14em", cursor: hasAnswered ? "pointer" : "not-allowed" }}
          >
            {isLastQuestion ? "DEBRIEF  →" : "NEXT TARGET  →"}
          </button>
        )}
      </main>
    </div>
  );
}
