import { useState, useEffect, useCallback } from "react";
import { storage } from "./storage.js";
import { DAYS, currentRounds, variantIndexFor } from "./data/workouts.js";
import { todayISO, isThisWeek, computeStreak } from "./lib/date.js";
import { colors, fonts } from "./theme.js";
import { ScoreStat } from "./components/ScoreStat.jsx";
import { HomeScreen } from "./components/HomeScreen.jsx";
import { WorkoutScreen } from "./components/WorkoutScreen.jsx";
import { HistoryScreen } from "./components/HistoryScreen.jsx";

export default function CircuitApp() {
  const [screen, setScreen] = useState("home"); // home | workout | history
  const [activeDayId, setActiveDayId] = useState(null);
  // The rounds/variant-label for the workout in progress are captured once,
  // when the workout is opened, rather than recomputed live from the current
  // date on every render — see the comment in WorkoutScreen.jsx for why.
  const [activeRounds, setActiveRounds] = useState(null);
  const [activeVariantLabel, setActiveVariantLabel] = useState(null);
  const [checked, setChecked] = useState({});
  const [history, setHistory] = useState(null); // null = loading
  const [weights, setWeights] = useState({}); // { exerciseId: "25" }
  const [exerciseLog, setExerciseLog] = useState({}); // { exerciseId: [{date, weight}] }
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadHistory = useCallback(async () => {
    try {
      const res = await storage.get("history", false);
      const parsed = res ? JSON.parse(res.value) : [];
      setHistory(parsed);
    } catch (e) {
      setHistory([]);
    }
  }, []);

  const loadWeights = useCallback(async () => {
    try {
      const res = await storage.get("weights", false);
      const parsed = res ? JSON.parse(res.value) : {};
      setWeights(parsed);
    } catch (e) {
      setWeights({});
    }
  }, []);

  const loadExerciseLog = useCallback(async () => {
    try {
      const res = await storage.get("exerciseLog", false);
      const parsed = res ? JSON.parse(res.value) : {};
      setExerciseLog(parsed);
    } catch (e) {
      setExerciseLog({});
    }
  }, []);

  useEffect(() => {
    loadHistory();
    loadWeights();
    loadExerciseLog();
  }, [loadHistory, loadWeights, loadExerciseLog]);

  const persistWeight = async (exId, value) => {
    const next = { ...weights, [exId]: value };
    setWeights(next);
    try {
      await storage.set("weights", JSON.stringify(next));
    } catch (e) {
      // silent — weight still held in local state for this session
    }
  };

  const openDay = (dayId) => {
    const day = DAYS[dayId];
    const variantIdx = variantIndexFor(day);
    setActiveDayId(dayId);
    setActiveRounds(currentRounds(day));
    setActiveVariantLabel(String.fromCharCode(65 + variantIdx));
    setChecked({});
    setScreen("workout");
  };

  const toggleExercise = (id) => {
    setChecked((c) => ({ ...c, [id]: !c[id] }));
  };

  const finishWorkout = async () => {
    if (!activeDayId || !activeRounds || !history) return;
    setSaving(true);
    setError(null);
    const day = DAYS[activeDayId];
    const total = activeRounds.flat().length;
    const done = Object.values(checked).filter(Boolean).length;
    const entry = {
      date: todayISO(),
      dayId: activeDayId,
      dayName: day.name,
      focus: day.focus,
      completed: done,
      total,
      ts: Date.now(),
    };
    const next = [entry, ...history].slice(0, 200);

    // Record today's weight for every weighted exercise in this workout that
    // has a value entered, so the coach has data to work with next time.
    const today = todayISO();
    const nextLog = { ...exerciseLog };
    activeRounds.flat().forEach((ex) => {
      const isWeighted = ex.eq && (ex.eq.includes("Dumbbell") || ex.eq.includes("Machine") || ex.eq.includes("Barbell"));
      const raw = weights[ex.id];
      if (!isWeighted || raw === undefined || raw === "" || isNaN(Number(raw))) return;
      const w = Number(raw);
      const prior = nextLog[ex.id] || [];
      // Replace today's entry if it already exists (e.g. re-finishing after a retry).
      const withoutToday = prior.filter((e) => e.date !== today);
      nextLog[ex.id] = [...withoutToday, { date: today, weight: w }].slice(-20);
    });

    // Try the save; on failure, retry once after a short pause before giving up.
    const attemptSave = async () => {
      const result = await storage.set("history", JSON.stringify(next));
      if (!result) throw new Error("Storage returned no result");
      await storage.set("exerciseLog", JSON.stringify(nextLog));
      return result;
    };

    try {
      await attemptSave();
      setHistory(next);
      setExerciseLog(nextLog);
      setSaving(false);
      setScreen("home");
    } catch (e1) {
      await new Promise((r) => setTimeout(r, 600));
      try {
        await attemptSave();
        setHistory(next);
        setExerciseLog(nextLog);
        setSaving(false);
        setScreen("home");
      } catch (e2) {
        setError(
          `Couldn't save (${e2 && e2.message ? e2.message : "unknown error"}). Your checked-off ` +
            `exercises are still here — tap Finish Workout again to retry.`
        );
        setSaving(false);
        // stay on the workout screen so nothing is lost
      }
    }
  };

  const clearHistory = async () => {
    try {
      await storage.set("history", JSON.stringify([]));
      setHistory([]);
    } catch (e) {}
  };

  const streak = history ? computeStreak(history) : 0;
  // Calendar-week count (Monday-start), matching the "This Week"/"Last Week"
  // labels used elsewhere in the app rather than a rolling 7*24h window.
  const weekCount = history ? history.filter((h) => isThisWeek(h.date)).length : 0;

  return (
    <div
      style={{
        background: colors.bg,
        color: colors.chalk,
        minHeight: "100vh",
        fontFamily: fonts.body,
      }}
    >
      {/* Scoreboard header */}
      <div
        style={{
          borderBottom: `1px solid ${colors.line}`,
          background: colors.surface,
          // env(safe-area-inset-top) keeps this clear of the notch/Dynamic
          // Island when installed full-screen on iOS (viewport-fit=cover in
          // index.html is what makes the inset values non-zero).
          padding: "calc(20px + env(safe-area-inset-top)) 20px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setScreen("home")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setScreen("home");
              }
            }}
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: "32px",
              letterSpacing: "0.02em",
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            CIRCUIT<span style={{ color: colors.accent }}>.</span>
          </div>
          <button
            onClick={() => setScreen("history")}
            style={{
              background: "none",
              border: `1px solid ${colors.line}`,
              color: colors.muted,
              fontFamily: fonts.mono,
              fontSize: "11px",
              letterSpacing: "0.08em",
              padding: "6px 10px",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            BOX SCORE
          </button>
        </div>
        <div style={{ display: "flex", gap: "20px", marginTop: "12px" }}>
          <ScoreStat label="STREAK" value={streak} unit="DAY" />
          <ScoreStat label="THIS WEEK" value={weekCount} unit="SESH" />
        </div>
      </div>

      <div
        style={{
          padding: "20px 20px calc(20px + env(safe-area-inset-bottom))",
          maxWidth: "560px",
          margin: "0 auto",
        }}
      >
        {screen === "home" && <HomeScreen history={history} onOpenDay={openDay} />}
        {screen === "workout" && activeDayId && activeRounds && (
          <WorkoutScreen
            day={DAYS[activeDayId]}
            rounds={activeRounds}
            variantLabel={activeVariantLabel}
            checked={checked}
            onToggle={toggleExercise}
            onFinish={finishWorkout}
            onBack={() => setScreen("home")}
            saving={saving}
            weights={weights}
            onWeightChange={persistWeight}
            exerciseLog={exerciseLog}
          />
        )}
        {screen === "history" && (
          <HistoryScreen history={history} onBack={() => setScreen("home")} onClear={clearHistory} />
        )}
        {error && (
          <div style={{ color: colors.warn, fontSize: "13px", marginTop: "12px" }}>{error}</div>
        )}
      </div>
    </div>
  );
}
