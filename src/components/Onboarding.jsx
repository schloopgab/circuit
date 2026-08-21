import { useState } from "react";
import { GOALS, JOINTS, DEFAULT_PROFILE } from "../lib/profile.js";
import { colors, fonts } from "../theme.js";

export function Onboarding({ initialProfile, onSave, onCancel }) {
  const base = initialProfile || DEFAULT_PROFILE;
  const [avoidJoints, setAvoidJoints] = useState(base.avoidJoints);
  const [goal, setGoal] = useState(base.goal);
  const isFirstRun = !initialProfile;

  const toggleJoint = (id) => {
    setAvoidJoints((cur) => (cur.includes(id) ? cur.filter((j) => j !== id) : [...cur, id]));
  };

  return (
    <div>
      <div style={{ fontFamily: fonts.display, fontSize: "30px", fontWeight: 700, marginBottom: "6px" }}>
        {isFirstRun ? "Let's set this up" : "Edit Preferences"}
      </div>
      <p style={{ color: colors.muted, fontSize: "14px", marginBottom: "24px", lineHeight: 1.5 }}>
        {isFirstRun
          ? "A couple quick questions so your circuits fit you. You can change these any time."
          : "Change your cautions or goal below — this reshapes all three circuits."}
      </p>

      <div style={{ marginBottom: "10px", fontFamily: fonts.mono, fontSize: "11px", letterSpacing: "0.06em", color: colors.accent }}>
        ANY JOINTS TO GO EASY ON?
      </div>
      <p style={{ color: colors.muted, fontSize: "13px", marginBottom: "12px", lineHeight: 1.5 }}>
        Selected joints get lower-risk exercise choices and an on-screen caution note. Leave blank if none apply.
      </p>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
        {JOINTS.map((j) => {
          const active = avoidJoints.includes(j.id);
          return (
            <button
              key={j.id}
              onClick={() => toggleJoint(j.id)}
              style={{
                background: active ? colors.accent : "transparent",
                color: active ? colors.bg : colors.chalk,
                border: `1px solid ${active ? colors.accent : colors.line}`,
                borderRadius: "20px",
                padding: "8px 16px",
                fontSize: "13px",
                fontFamily: fonts.body,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {j.label}
            </button>
          );
        })}
      </div>

      <div style={{ marginBottom: "10px", fontFamily: fonts.mono, fontSize: "11px", letterSpacing: "0.06em", color: colors.accent }}>
        WHAT'S YOUR MAIN FOCUS?
      </div>
      <div style={{ marginBottom: "28px" }}>
        {GOALS.map((g) => {
          const active = goal === g.id;
          return (
            <div
              key={g.id}
              onClick={() => setGoal(g.id)}
              role="radio"
              aria-checked={active}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setGoal(g.id);
                }
              }}
              style={{
                background: colors.surface,
                border: `1px solid ${active ? colors.accent : colors.line}`,
                borderRadius: "6px",
                padding: "12px 16px",
                marginBottom: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <div
                style={{
                  minWidth: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: `2px solid ${active ? colors.accent : colors.line}`,
                  background: active ? colors.accent : "transparent",
                  marginTop: "2px",
                }}
              />
              <div>
                <div style={{ fontSize: "14px", fontWeight: 500 }}>{g.label}</div>
                <div style={{ color: colors.muted, fontSize: "12px", marginTop: "2px" }}>{g.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => onSave({ avoidJoints, goal })}
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
        }}
      >
        {isFirstRun ? "START TRAINING" : "SAVE CHANGES"}
      </button>

      {onCancel && (
        <button
          onClick={onCancel}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            color: colors.muted,
            fontSize: "13px",
            cursor: "pointer",
            padding: "12px 0 0",
          }}
        >
          Cancel
        </button>
      )}
    </div>
  );
}
