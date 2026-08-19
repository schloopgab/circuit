import { coachSuggestion } from "../lib/coach.js";
import { colors, fonts } from "../theme.js";
import { ExerciseRow } from "./ExerciseRow.jsx";

// `rounds` and `variantLabel` are captured once when the workout is opened
// (see App.jsx) rather than derived live here — that way, if a session spans
// the weekly rotation boundary (e.g. started Sunday night, finished after
// midnight Monday), the exercises being checked off stay the same set that
// was shown when the user started, instead of silently switching under them.
export function WorkoutScreen({ day, rounds, variantLabel, checked, onToggle, onFinish, onBack, saving, weights, onWeightChange, exerciseLog }) {
  const total = rounds.flat().length;
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: colors.muted,
          fontSize: "13px",
          cursor: "pointer",
          padding: 0,
          marginBottom: "14px",
        }}
      >
        ← Back
      </button>

      <div style={{ fontFamily: fonts.display, fontSize: "34px", fontWeight: 700, lineHeight: 1 }}>
        {day.name} — {day.focus}
      </div>
      <div style={{ color: colors.muted, fontSize: "12px", marginTop: "4px", marginBottom: "18px" }}>
        {done} / {total} moves logged
        {day.variants.length > 1 && <span style={{ color: colors.accent }}> · Set {variantLabel} this week</span>}
      </div>

      {rounds.map((round, ri) => (
        <div key={ri} style={{ marginBottom: "22px" }}>
          <div
            style={{
              display: "inline-block",
              fontFamily: fonts.mono,
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: colors.bg,
              background: colors.accent,
              padding: "3px 9px",
              borderRadius: "3px",
              marginBottom: "10px",
            }}
          >
            ROUND {ri + 1} OF {rounds.length}
          </div>
          {round.map((ex) => (
            <ExerciseRow
              key={ex.id}
              ex={ex}
              isChecked={!!checked[ex.id]}
              onToggle={() => onToggle(ex.id)}
              weight={weights[ex.id] || ""}
              onWeightChange={(val) => onWeightChange(ex.id, val)}
              coach={coachSuggestion(ex, exerciseLog)}
            />
          ))}
        </div>
      ))}

      <button
        onClick={onFinish}
        disabled={saving}
        style={{
          width: "100%",
          background: colors.accent,
          color: colors.bg,
          border: "none",
          borderRadius: "6px",
          padding: "14px",
          fontFamily: fonts.display,
          fontSize: "20px",
          fontWeight: 600,
          letterSpacing: "0.03em",
          cursor: "pointer",
          marginTop: "8px",
          opacity: saving ? 0.6 : 1,
        }}
      >
        {saving ? "SAVING…" : "FINISH WORKOUT"}
      </button>
    </div>
  );
}
