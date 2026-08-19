import { groupByWeek, weekRangeLabel, dateShort } from "../lib/date.js";
import { colors, fonts } from "../theme.js";

export function HistoryScreen({ history, onBack, onClear }) {
  const handleClear = () => {
    if (window.confirm("Clear all workout history? This can't be undone.")) {
      onClear();
    }
  };

  return (
    <div>
      <button
        onClick={onBack}
        style={{ background: "none", border: "none", color: colors.muted, fontSize: "13px", cursor: "pointer", padding: 0, marginBottom: "14px" }}
      >
        ← Back
      </button>
      <div style={{ fontFamily: fonts.display, fontSize: "30px", fontWeight: 700, marginBottom: "16px" }}>
        Box Score
      </div>

      {history === null && <div style={{ color: colors.muted, fontSize: "13px" }}>Loading…</div>}
      {history && history.length === 0 && (
        <div style={{ color: colors.muted, fontSize: "13px" }}>No sessions logged yet — finish a workout to start your streak.</div>
      )}
      {history && history.length > 0 && (
        <>
          {groupByWeek(history).map(([weekStart, entries]) => (
            <div key={weekStart} style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "6px",
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: "11px",
                    letterSpacing: "0.06em",
                    color: colors.accent,
                  }}
                >
                  {weekRangeLabel(weekStart).toUpperCase()}
                </div>
                <div style={{ fontFamily: fonts.mono, fontSize: "11px", color: colors.muted }}>
                  {entries.length} SESH
                </div>
              </div>
              {entries.map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: `1px solid ${colors.surface2}`,
                  }}
                >
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{h.dayName} — {h.focus}</div>
                    <div style={{ fontFamily: fonts.mono, fontSize: "11px", color: colors.muted }}>
                      {dateShort(h.date).toUpperCase()}
                    </div>
                  </div>
                  <div style={{ fontFamily: fonts.mono, fontSize: "13px", color: colors.accent }}>
                    {h.completed}/{h.total}
                  </div>
                </div>
              ))}
            </div>
          ))}
          <button
            onClick={handleClear}
            style={{
              background: "none",
              border: `1px solid ${colors.line}`,
              color: colors.muted,
              fontSize: "12px",
              padding: "8px 12px",
              borderRadius: "4px",
              marginTop: "8px",
              cursor: "pointer",
            }}
          >
            Clear history
          </button>
        </>
      )}
    </div>
  );
}
