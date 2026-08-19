import { flagLabel } from "../data/workouts.js";
import { colors, fonts } from "../theme.js";

export function ExerciseRow({ ex, isChecked, onToggle, weight, onWeightChange, coach }) {
  const isWeighted = ex.eq && (ex.eq.includes("Dumbbell") || ex.eq.includes("Machine") || ex.eq.includes("Barbell"));

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "10px 4px",
        borderBottom: `1px solid ${colors.surface2}`,
        opacity: isChecked ? 0.5 : 1,
      }}
    >
      <div
        role="checkbox"
        aria-checked={isChecked}
        aria-label={ex.name}
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        style={{
          minWidth: "20px",
          height: "20px",
          borderRadius: "4px",
          border: `2px solid ${isChecked ? colors.accent : colors.line}`,
          background: isChecked ? colors.accent : "transparent",
          marginTop: "2px",
          cursor: "pointer",
        }}
      />
      <div style={{ flex: 1 }}>
        <div
          onClick={onToggle}
          style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", cursor: "pointer" }}
        >
          <span style={{ fontSize: "15px", fontWeight: 500, textDecoration: isChecked ? "line-through" : "none" }}>
            {ex.name}
          </span>
          {ex.flag && (
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: "9px",
                letterSpacing: "0.08em",
                color: colors.warn,
                border: `1px solid ${colors.warn}`,
                borderRadius: "3px",
                padding: "1px 5px",
              }}
            >
              {flagLabel[ex.flag]}
            </span>
          )}
        </div>
        <div
          onClick={onToggle}
          style={{ fontFamily: fonts.mono, fontSize: "12px", color: colors.muted, marginTop: "3px", cursor: "pointer" }}
        >
          {ex.detail} · {ex.eq}
        </div>
        {ex.mod && (
          <div onClick={onToggle} style={{ fontSize: "12px", color: colors.warn, marginTop: "4px", lineHeight: 1.4, cursor: "pointer" }}>
            {ex.mod}
          </div>
        )}
        {isWeighted && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px" }}>
            <label
              style={{
                fontFamily: fonts.mono,
                fontSize: "10px",
                color: colors.muted,
                letterSpacing: "0.06em",
              }}
            >
              WEIGHT
            </label>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              aria-label={`Weight for ${ex.name}, in pounds`}
              value={weight}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => onWeightChange(e.target.value)}
              placeholder="—"
              style={{
                width: "56px",
                background: colors.bg,
                border: `1px solid ${colors.line}`,
                borderRadius: "4px",
                color: colors.chalk,
                fontFamily: fonts.mono,
                fontSize: "12px",
                padding: "4px 6px",
              }}
            />
            <span style={{ fontFamily: fonts.mono, fontSize: "11px", color: colors.muted }}>
              lbs
            </span>
          </div>
        )}
        {isWeighted && coach && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "6px",
              marginTop: "6px",
              fontSize: "12px",
              lineHeight: 1.4,
              color: coach.tone === "up" ? colors.accent : colors.muted,
            }}
          >
            <span style={{ fontFamily: fonts.mono, fontSize: "9px", letterSpacing: "0.06em", marginTop: "2px" }}>
              COACH
            </span>
            <span onClick={(e) => e.stopPropagation()}>
              {coach.text}
              {coach.tone === "up" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const match = coach.text.match(/go to (\d+(\.\d+)?) lbs/);
                    if (match) onWeightChange(match[1]);
                  }}
                  style={{
                    marginLeft: "6px",
                    background: "none",
                    border: `1px solid ${colors.accent}`,
                    color: colors.accent,
                    borderRadius: "3px",
                    fontSize: "10px",
                    padding: "1px 6px",
                    fontFamily: fonts.mono,
                    cursor: "pointer",
                  }}
                >
                  USE IT
                </button>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
