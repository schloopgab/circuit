import { colors, fonts } from "../theme.js";

export function ScoreStat({ label, value, unit }) {
  return (
    <div>
      <div style={{ fontFamily: fonts.mono, fontSize: "10px", color: colors.muted, letterSpacing: "0.1em" }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "5px" }}>
        <span style={{ fontFamily: fonts.display, fontSize: "30px", fontWeight: 600, color: colors.accent, lineHeight: 1 }}>
          {value}
        </span>
        <span style={{ fontFamily: fonts.mono, fontSize: "10px", color: colors.muted }}>{unit}</span>
      </div>
    </div>
  );
}
