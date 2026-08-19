import { DAYS, currentRounds, variantIndexFor } from "../data/workouts.js";
import { lastWeekStartISO, weekStartISO, weekRangeLabel, dateShort } from "../lib/date.js";
import { colors, fonts } from "../theme.js";

// Activates a click-equivalent on Enter/Space for elements that stand in for
// a button (a <div onClick>) but need to stay divs for layout reasons.
function onActivateKey(handler) {
  return (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handler();
    }
  };
}

export function HomeScreen({ history, onOpenDay }) {
  const lastDoneFor = (dayId) => {
    if (!history) return null;
    const found = history.find((h) => h.dayId === dayId);
    return found ? found.date : null;
  };

  const lastWeekStart = lastWeekStartISO();
  const lastWeekEntries = history ? history.filter((h) => weekStartISO(h.date) === lastWeekStart) : [];

  return (
    <div>
      <p style={{ color: colors.muted, fontSize: "14px", marginBottom: "20px", lineHeight: 1.5 }}>
        Three full-body circuits — legs, push, pull, and core all get hit in every session. Pick
        whichever fits today, aim for 2–3 a week. Each one cycles through 4 different sets —
        dumbbells/bands, then a full-gym set with barbells and machines — swapping to the next
        set every Monday. Log a weight and the app starts coaching you on what to lift next time.
        Tagged moves have a shoulder or knee note built in.
      </p>

      <div
        style={{
          background: colors.surface,
          border: `1px solid ${colors.line}`,
          borderRadius: "6px",
          padding: "14px 18px",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: "11px",
            letterSpacing: "0.06em",
            color: colors.accent,
            marginBottom: "8px",
          }}
        >
          LAST WEEK ({weekRangeLabel(lastWeekStart).toUpperCase()})
        </div>
        {history === null && <div style={{ color: colors.muted, fontSize: "13px" }}>Loading…</div>}
        {history !== null && lastWeekEntries.length === 0 && (
          <div style={{ color: colors.muted, fontSize: "13px" }}>Nothing logged last week.</div>
        )}
        {lastWeekEntries.map((h, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 0",
              borderTop: i > 0 ? `1px solid ${colors.surface2}` : "none",
            }}
          >
            <div>
              <span style={{ fontSize: "14px", fontWeight: 500 }}>{h.dayName}</span>
              <span style={{ color: colors.muted, fontSize: "12px" }}> — {h.focus}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontFamily: fonts.mono, fontSize: "11px", color: colors.muted }}>
                {dateShort(h.date).toUpperCase()}
              </span>
              <span style={{ fontFamily: fonts.mono, fontSize: "12px", color: colors.accent }}>
                {h.completed}/{h.total}
              </span>
            </div>
          </div>
        ))}
      </div>

      {Object.values(DAYS).map((day) => {
        const last = lastDoneFor(day.id);
        const rounds = currentRounds(day);
        const exCount = rounds.flat().length;
        const variantIdx = variantIndexFor(day);
        const variantLabel = String.fromCharCode(65 + variantIdx); // 0 -> A, 1 -> B, ...
        return (
          <div
            key={day.id}
            role="button"
            tabIndex={0}
            aria-label={`Open ${day.name} — ${day.focus}`}
            onClick={() => onOpenDay(day.id)}
            onKeyDown={onActivateKey(() => onOpenDay(day.id))}
            style={{
              background: colors.surface,
              border: `1px solid ${colors.line}`,
              borderRadius: "6px",
              padding: "16px 18px",
              marginBottom: "12px",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: fonts.display, fontSize: "26px", fontWeight: 600, lineHeight: 1 }}>
                  {day.name} — {day.focus}
                </div>
                <div style={{ color: colors.muted, fontSize: "12px", marginTop: "4px" }}>
                  {day.subtitle} · {rounds.length} rounds · {exCount} moves
                </div>
                {day.variants.length > 1 && (
                  <div
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      color: colors.accent,
                      marginTop: "6px",
                    }}
                  >
                    SET {variantLabel} · THIS WEEK
                  </div>
                )}
              </div>
              <div style={{ color: colors.accent, fontFamily: fonts.display, fontSize: "22px" }}>→</div>
            </div>
            {last && (
              <div style={{ fontFamily: fonts.mono, fontSize: "10px", color: colors.muted, marginTop: "10px", letterSpacing: "0.05em" }}>
                LAST DONE {dateShort(last).toUpperCase()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
