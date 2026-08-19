// ---------- Workout data ----------
// Every circuit is full-body — each round mixes a lower-body move, a push, a
// pull, and core, so no single session (or even round) is leg-only or
// upper-only. Four variants per circuit keep the exercises fresh week to
// week while the balance and joint cautions stay the same.
export const DAYS = {
  A: {
    id: "A",
    name: "Circuit 1",
    focus: "Full Body",
    subtitle: "shoulder + knee aware",
    variants: [
      [
        [
          { id: "a1", name: "Goblet Box Squat", detail: "3 × 10", eq: "Dumbbell", flag: "knee", mod: "Sit to a higher box/chair; stop above any pinch." },
          { id: "a2", name: "Incline Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Hands higher/more incline if it's achy today." },
          { id: "a3", name: "Band Pull-Apart", detail: "3 × 15", eq: "Band" },
          { id: "a4", name: "Dead Bug", detail: "3 × 10 ea. side", eq: "Bodyweight" },
          { id: "a5", name: "Standing Calf Raise", detail: "3 × 15", eq: "Dumbbell" },
        ],
        [
          { id: "a6", name: "Low Box Step-Up", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Keep the box low — avoid a deep bend at the top leg." },
          { id: "a7", name: "Dumbbell Floor Press", detail: "3 × 10", eq: "Dumbbell", flag: "shoulder", mod: "Elbows ~45° from torso, not flared to 90°." },
          { id: "a8", name: "Dumbbell Row", detail: "3 × 10 ea. arm", eq: "Dumbbell" },
          { id: "a9", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
          { id: "a10", name: "Band External Rotation", detail: "3 × 15 ea. side", eq: "Band" },
        ],
        [
          { id: "a11", name: "Single-Leg Glute Bridge", detail: "3 × 10 ea. leg", eq: "Bodyweight" },
          { id: "a12", name: "Band Face Pull", detail: "3 × 15", eq: "Band" },
          { id: "a13", name: "Single-Arm Dumbbell Row", detail: "3 × 10 ea. arm", eq: "Dumbbell" },
          { id: "a14", name: "Plank", detail: "3 × 30s", eq: "Bodyweight" },
          { id: "a15", name: "Wall Sit", detail: "3 × 20s", eq: "Bodyweight", flag: "knee", mod: "Shallow angle only — quarter squat depth, not 90°." },
        ],
      ],
      [
        [
          { id: "a1v2", name: "Dumbbell Sumo Squat", detail: "3 × 10", eq: "Dumbbell", flag: "knee", mod: "Shallow depth — stop above any pinch." },
          { id: "a2v2", name: "Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Drop to incline if it's achy today." },
          { id: "a3v2", name: "Standing Band Row", detail: "3 × 15", eq: "Band" },
          { id: "a4v2", name: "Plank with Leg Lift", detail: "3 × 8 ea. side", eq: "Bodyweight" },
          { id: "a5v2", name: "Seated Calf Raise", detail: "3 × 15", eq: "Dumbbell" },
        ],
        [
          { id: "a6v2", name: "Lateral Low Step-Up", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Keep the box low." },
          { id: "a7v2", name: "Band Internal Rotation", detail: "3 × 15 ea. side", eq: "Band" },
          { id: "a8v2", name: "Light Renegade Row", detail: "3 × 8 ea. side", eq: "Dumbbell", flag: "shoulder", mod: "Keep hips stable, moderate weight only." },
          { id: "a9v2", name: "Side Plank Hip Dip", detail: "3 × 10 ea. side", eq: "Bodyweight" },
          { id: "a10v2", name: "Band Good Morning", detail: "3 × 12", eq: "Band" },
        ],
        [
          { id: "a11v2", name: "Split Squat Hold", detail: "3 × 20s ea. leg", eq: "Bodyweight", flag: "knee", mod: "Quarter-depth only, no deep front-knee bend." },
          { id: "a12v2", name: "Band Tricep Kickback", detail: "3 × 12", eq: "Band" },
          { id: "a13v2", name: "Light Front Raise", detail: "3 × 10", eq: "Dumbbell", flag: "shoulder", mod: "Stop at shoulder height, no higher." },
          { id: "a14v2", name: "Hollow Body Hold", detail: "3 × 20s", eq: "Bodyweight" },
          { id: "a15v2", name: "Standing Band Hip Abduction", detail: "3 × 12 ea. side", eq: "Band" },
        ],
      ],
      [
        [
          { id: "a1v3", name: "Dumbbell Deadlift", detail: "3 × 10", eq: "Dumbbell" },
          { id: "a2v3", name: "Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Drop to incline if it's achy today." },
          { id: "a3v3", name: "Band Face Pull", detail: "3 × 15", eq: "Band" },
          { id: "a4v3", name: "Bird Dog", detail: "3 × 10 ea. side", eq: "Bodyweight" },
          { id: "a5v3", name: "Band Lateral Walk", detail: "3 × 10 ea. side", eq: "Band" },
        ],
        [
          { id: "a6v3", name: "Shallow Reverse Lunge", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Short step, shallow depth — no deep knee bend." },
          { id: "a7v3", name: "Band External Rotation", detail: "3 × 15 ea. side", eq: "Band" },
          { id: "a8v3", name: "Light Renegade Row", detail: "3 × 8 ea. side", eq: "Dumbbell", flag: "shoulder", mod: "Keep hips stable, moderate weight only." },
          { id: "a9v3", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
          { id: "a10v3", name: "Dumbbell Hip Thrust", detail: "3 × 12", eq: "Dumbbell" },
        ],
        [
          { id: "a11v3", name: "Bodyweight Squat", detail: "3 × 12", eq: "Bodyweight", flag: "knee", mod: "Only go as deep as feels clean — partial reps are fine." },
          { id: "a12v3", name: "Band Pull-Apart", detail: "3 × 15", eq: "Band" },
          { id: "a13v3", name: "Hammer Curl", detail: "3 × 12", eq: "Dumbbell" },
          { id: "a14v3", name: "Plank", detail: "3 × 30s", eq: "Bodyweight" },
          { id: "a15v3", name: "Standing Calf Raise", detail: "3 × 15", eq: "Dumbbell" },
        ],
      ],
      [
        [
          { id: "a1v4", name: "Barbell Back Squat", detail: "3 × 8", eq: "Barbell", flag: "knee", mod: "Moderate depth, controlled tempo — don't force past any pinch." },
          { id: "a2v4", name: "Barbell Bench Press", detail: "3 × 8", eq: "Barbell", flag: "shoulder", mod: "Moderate grip width, elbows ~45° from torso." },
          { id: "a3v4", name: "Lat Pulldown", detail: "3 × 12", eq: "Machine" },
          { id: "a4v4", name: "Copenhagen Plank", detail: "3 × 15s ea. side", eq: "Bodyweight (bench)", flag: "knee", mod: "Bend the top knee to shorten the lever, or cut hold time short if the near knee is achy." },
          { id: "a5v4", name: "Cable Woodchopper", detail: "3 × 10 ea. side", eq: "Machine" },
        ],
        [
          { id: "a6v4", name: "Leg Press", detail: "3 × 10", eq: "Machine", flag: "knee", mod: "Don't lock out knees at the top; stop short of any pinch at the bottom." },
          { id: "a7v4", name: "Seated Cable Row", detail: "3 × 12", eq: "Machine" },
          { id: "a8v4", name: "Cable Face Pull", detail: "3 × 15", eq: "Machine" },
          { id: "a9v4", name: "Dead Bug", detail: "3 × 10 ea. side", eq: "Bodyweight" },
          { id: "a10v4", name: "Band External Rotation", detail: "3 × 15 ea. side", eq: "Band" },
        ],
        [
          { id: "a11v4", name: "Leg Extension Machine", detail: "3 × 12, light", eq: "Machine", flag: "knee", mod: "Optional — light weight, partial range, skip entirely if it aggravates." },
          { id: "a12v4", name: "Barbell Romanian Deadlift", detail: "3 × 8", eq: "Barbell" },
          { id: "a13v4", name: "Standing Single-Arm Cable Press", detail: "3 × 10 ea. side", eq: "Machine", flag: "shoulder", mod: "Moderate weight, controlled path — stop if it pinches." },
          { id: "a14v4", name: "Plank", detail: "3 × 30s", eq: "Bodyweight" },
          { id: "a15v4", name: "Standing Calf Raise", detail: "3 × 15", eq: "Dumbbell" },
        ],
      ],
    ],
  },
  B: {
    id: "B",
    name: "Circuit 2",
    focus: "Full Body",
    subtitle: "shoulder + knee aware",
    variants: [
      [
        [
          { id: "b1", name: "Romanian Deadlift", detail: "3 × 10", eq: "Dumbbell" },
          { id: "b2", name: "Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Drop to incline (hands elevated) if it's achy today." },
          { id: "b3", name: "Dumbbell Row", detail: "3 × 10 ea. arm", eq: "Dumbbell" },
          { id: "b4", name: "Bird Dog", detail: "3 × 10 ea. side", eq: "Bodyweight" },
          { id: "b5", name: "Band Lateral Walk", detail: "3 × 10 ea. side", eq: "Band" },
        ],
        [
          { id: "b6", name: "Seated Leg Extension", detail: "3 × 12, light", eq: "Band", flag: "knee", mod: "Optional — skip entirely if it aggravates; straight-leg raises are a fine swap." },
          { id: "b7", name: "Band External Rotation", detail: "3 × 15 ea. side", eq: "Band" },
          { id: "b8", name: "Overhead Band Press", detail: "3 × 10", eq: "Band", flag: "shoulder", mod: "Optional — skip if achy overhead; a single-arm landmine press is a good sub." },
          { id: "b9", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
          { id: "b10", name: "Dumbbell Hip Thrust", detail: "3 × 12", eq: "Dumbbell" },
        ],
        [
          { id: "b11", name: "Bodyweight Squat", detail: "3 × 12", eq: "Bodyweight", flag: "knee", mod: "Only go as deep as feels clean — partial reps are fine." },
          { id: "b12", name: "Band Pull-Apart", detail: "3 × 15", eq: "Band" },
          { id: "b13", name: "Light Lateral Raise", detail: "3 × 12", eq: "Dumbbell", flag: "shoulder", mod: "Stop at shoulder height, no higher." },
          { id: "b14", name: "Plank", detail: "3 × 30s", eq: "Bodyweight" },
          { id: "b15", name: "Band Monster Walk", detail: "3 × 10 steps ea. dir.", eq: "Band" },
        ],
      ],
      [
        [
          { id: "b1v2", name: "Dumbbell Deadlift", detail: "3 × 10", eq: "Dumbbell" },
          { id: "b2v2", name: "Incline Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Elevate hands more if achy today." },
          { id: "b3v2", name: "Band Face Pull", detail: "3 × 15", eq: "Band" },
          { id: "b4v2", name: "Superman", detail: "3 × 12", eq: "Bodyweight" },
          { id: "b5v2", name: "Band Clamshell", detail: "3 × 12 ea. side", eq: "Band" },
        ],
        [
          { id: "b6v2", name: "Straight-Leg Raise", detail: "3 × 12, light", eq: "Bodyweight", flag: "knee", mod: "Optional — skip if it aggravates." },
          { id: "b7v2", name: "Band Internal/External Rotation", detail: "3 × 10 ea. side", eq: "Band" },
          { id: "b8v2", name: "Light Arnold Press", detail: "3 × 10", eq: "Dumbbell", flag: "shoulder", mod: "Optional — skip if overhead pressing is achy." },
          { id: "b9v2", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
          { id: "b10v2", name: "Dumbbell Hip Thrust", detail: "3 × 12", eq: "Dumbbell" },
        ],
        [
          { id: "b11v2", name: "Shallow Reverse Lunge", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Short step, shallow depth — no deep knee bend." },
          { id: "b12v2", name: "Band Pull-Apart", detail: "3 × 15", eq: "Band" },
          { id: "b13v2", name: "Hammer Curl", detail: "3 × 12", eq: "Dumbbell" },
          { id: "b14v2", name: "Plank Shoulder Taps", detail: "3 × 10 ea. side", eq: "Bodyweight" },
          { id: "b15v2", name: "Band Fire Hydrant", detail: "3 × 10 ea. side", eq: "Band" },
        ],
      ],
      [
        [
          { id: "b1v3", name: "Goblet Box Squat", detail: "3 × 10", eq: "Dumbbell", flag: "knee", mod: "Sit to a higher box/chair; stop above any pinch." },
          { id: "b2v3", name: "Incline Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Hands higher/more incline if it's achy today." },
          { id: "b3v3", name: "Standing Band Row", detail: "3 × 15", eq: "Band" },
          { id: "b4v3", name: "Dead Bug", detail: "3 × 10 ea. side", eq: "Bodyweight" },
          { id: "b5v3", name: "Band Monster Walk", detail: "3 × 10 steps ea. dir.", eq: "Band" },
        ],
        [
          { id: "b6v3", name: "Low Box Step-Up", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Keep the box low — avoid a deep bend at the top leg." },
          { id: "b7v3", name: "Band Internal Rotation", detail: "3 × 15 ea. side", eq: "Band" },
          { id: "b8v3", name: "Light Lateral Raise", detail: "3 × 12", eq: "Dumbbell", flag: "shoulder", mod: "Stop at shoulder height, no higher." },
          { id: "b9v3", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
          { id: "b10v3", name: "Band Pull-Through", detail: "3 × 12", eq: "Band" },
        ],
        [
          { id: "b11v3", name: "Wall Sit", detail: "3 × 20s", eq: "Bodyweight", flag: "knee", mod: "Shallow angle only — quarter squat depth, not 90°." },
          { id: "b12v3", name: "Band Tricep Kickback", detail: "3 × 12", eq: "Band" },
          { id: "b13v3", name: "Single-Arm Dumbbell Row", detail: "3 × 10 ea. arm", eq: "Dumbbell" },
          { id: "b14v3", name: "Plank", detail: "3 × 30s", eq: "Bodyweight" },
          { id: "b15v3", name: "Single-Leg Glute Bridge", detail: "3 × 10 ea. leg", eq: "Bodyweight" },
        ],
      ],
      [
        [
          { id: "b1v4", name: "Barbell Deadlift", detail: "3 × 8", eq: "Barbell" },
          { id: "b2v4", name: "Lat Pulldown", detail: "3 × 12", eq: "Machine" },
          { id: "b3v4", name: "Chest Press Machine", detail: "3 × 10", eq: "Machine", flag: "shoulder", mod: "Keep elbows slightly forward of your torso, moderate range." },
          { id: "b4v4", name: "Copenhagen Plank", detail: "3 × 15s ea. side", eq: "Bodyweight (bench)", flag: "knee", mod: "Bend the top knee to shorten the lever, or cut hold time short if achy." },
          { id: "b5v4", name: "Cable Face Pull", detail: "3 × 15", eq: "Machine" },
        ],
        [
          { id: "b6v4", name: "Leg Curl Machine", detail: "3 × 12", eq: "Machine" },
          { id: "b7v4", name: "Seated Cable Row", detail: "3 × 12", eq: "Machine" },
          { id: "b8v4", name: "Standing Single-Arm Cable Press", detail: "3 × 10 ea. side", eq: "Machine", flag: "shoulder", mod: "Moderate weight, controlled path — stop if it pinches." },
          { id: "b9v4", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
          { id: "b10v4", name: "Band External Rotation", detail: "3 × 15 ea. side", eq: "Band" },
        ],
        [
          { id: "b11v4", name: "Leg Extension Machine", detail: "3 × 12, light", eq: "Machine", flag: "knee", mod: "Optional — light weight, partial range, skip entirely if it aggravates." },
          { id: "b12v4", name: "Cable Tricep Pushdown", detail: "3 × 15", eq: "Machine" },
          { id: "b13v4", name: "Cable Woodchopper", detail: "3 × 10 ea. side", eq: "Machine" },
          { id: "b14v4", name: "Plank", detail: "3 × 30s", eq: "Bodyweight" },
          { id: "b15v4", name: "Barbell Romanian Deadlift", detail: "3 × 8", eq: "Barbell" },
        ],
      ],
    ],
  },
  C: {
    id: "C",
    name: "Circuit 3",
    focus: "Full Body",
    subtitle: "shoulder + knee aware",
    variants: [
      [
        [
          { id: "c1", name: "Dumbbell Deadlift", detail: "3 × 10", eq: "Dumbbell" },
          { id: "c2", name: "Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Drop to incline (hands elevated) if it's achy today." },
          { id: "c3", name: "Band Row", detail: "3 × 15", eq: "Band" },
          { id: "c4", name: "Bodyweight Squat", detail: "3 × 12", eq: "Bodyweight", flag: "knee", mod: "Only go as deep as feels clean — partial reps are fine." },
          { id: "c5", name: "Dead Bug", detail: "3 × 10", eq: "Bodyweight" },
        ],
        [
          { id: "c6", name: "Shallow Reverse Lunge", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Short step, shallow depth — no deep knee bend." },
          { id: "c7", name: "Band External Rotation", detail: "3 × 12 ea. side", eq: "Band" },
          { id: "c8", name: "Seated Shoulder Press", detail: "3 × 10, light", eq: "Dumbbell", flag: "shoulder", mod: "Optional — light weight, half range if pressing overhead is achy." },
          { id: "c9", name: "Dumbbell Hip Thrust", detail: "3 × 12", eq: "Dumbbell" },
          { id: "c10", name: "Plank Shoulder Taps", detail: "3 × 10 ea. side", eq: "Bodyweight" },
        ],
        [
          { id: "c11", name: "Band Pull-Apart", detail: "3 × 15", eq: "Band" },
          { id: "c12", name: "Low Box Step-Up", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Keep the box low." },
          { id: "c13", name: "Single-Arm Dumbbell Row", detail: "3 × 10 ea. arm", eq: "Dumbbell" },
          { id: "c14", name: "Wall Sit", detail: "3 × 20s", eq: "Bodyweight", flag: "knee", mod: "Shallow angle only." },
          { id: "c15", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
        ],
      ],
      [
        [
          { id: "c1v2", name: "Dumbbell Sumo Deadlift", detail: "3 × 10", eq: "Dumbbell" },
          { id: "c2v2", name: "Incline Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Elevate hands more if achy today." },
          { id: "c3v2", name: "Band Row", detail: "3 × 15", eq: "Band" },
          { id: "c4v2", name: "Shallow Split Squat", detail: "3 × 8 ea. leg", eq: "Bodyweight", flag: "knee", mod: "Quarter-depth only, no deep front-knee bend." },
          { id: "c5v2", name: "Hollow Body Hold", detail: "3 × 20s", eq: "Bodyweight" },
        ],
        [
          { id: "c6v2", name: "Shallow Curtsy Lunge", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Short, shallow step." },
          { id: "c7v2", name: "Band Internal/External Rotation", detail: "3 × 10 ea. side", eq: "Band" },
          { id: "c8v2", name: "Light Arnold Press", detail: "3 × 10", eq: "Dumbbell", flag: "shoulder", mod: "Optional — skip if overhead is achy." },
          { id: "c9v2", name: "Dumbbell Hip Thrust", detail: "3 × 12", eq: "Dumbbell" },
          { id: "c10v2", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
        ],
        [
          { id: "c11v2", name: "Band Pull-Apart", detail: "3 × 15", eq: "Band" },
          { id: "c12v2", name: "Lateral Low Step-Up", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Keep the box low." },
          { id: "c13v2", name: "Light Renegade Row", detail: "3 × 8 ea. side", eq: "Dumbbell", flag: "shoulder", mod: "Keep hips stable, moderate weight only." },
          { id: "c14v2", name: "Wall Sit", detail: "3 × 20s", eq: "Bodyweight", flag: "knee", mod: "Shallow angle only." },
          { id: "c15v2", name: "Plank Shoulder Taps", detail: "3 × 10 ea. side", eq: "Bodyweight" },
        ],
      ],
      [
        [
          { id: "c1v3", name: "Dumbbell Sumo Squat", detail: "3 × 10", eq: "Dumbbell", flag: "knee", mod: "Shallow depth — stop above any pinch." },
          { id: "c2v3", name: "Push-Up", detail: "3 × 10", eq: "Bodyweight", flag: "shoulder", mod: "Drop to incline if it's achy today." },
          { id: "c3v3", name: "Band Row", detail: "3 × 15", eq: "Band" },
          { id: "c4v3", name: "Dead Bug", detail: "3 × 10", eq: "Bodyweight" },
          { id: "c5v3", name: "Seated Calf Raise", detail: "3 × 15", eq: "Dumbbell" },
        ],
        [
          { id: "c6v3", name: "Split Squat Hold", detail: "3 × 20s ea. leg", eq: "Bodyweight", flag: "knee", mod: "Quarter-depth only, no deep front-knee bend." },
          { id: "c7v3", name: "Band External Rotation", detail: "3 × 12 ea. side", eq: "Band" },
          { id: "c8v3", name: "Overhead Band Press", detail: "3 × 10", eq: "Band", flag: "shoulder", mod: "Optional — skip if achy overhead." },
          { id: "c9v3", name: "Dumbbell Hip Thrust", detail: "3 × 12", eq: "Dumbbell" },
          { id: "c10v3", name: "Plank Shoulder Taps", detail: "3 × 10 ea. side", eq: "Bodyweight" },
        ],
        [
          { id: "c11v3", name: "Band Pull-Apart", detail: "3 × 15", eq: "Band" },
          { id: "c12v3", name: "Lateral Low Step-Up", detail: "3 × 8 ea. leg", eq: "Dumbbell", flag: "knee", mod: "Keep the box low." },
          { id: "c13v3", name: "Light Arnold Press", detail: "3 × 10", eq: "Dumbbell", flag: "shoulder", mod: "Optional — skip if overhead is achy." },
          { id: "c14v3", name: "Wall Sit", detail: "3 × 20s", eq: "Bodyweight", flag: "knee", mod: "Shallow angle only." },
          { id: "c15v3", name: "Side Plank", detail: "3 × 20s ea. side", eq: "Bodyweight" },
        ],
      ],
      [
        [
          { id: "c1v4", name: "Barbell Back Squat", detail: "3 × 8", eq: "Barbell", flag: "knee", mod: "Moderate depth, controlled tempo — don't force past any pinch." },
          { id: "c2v4", name: "Barbell Bench Press", detail: "3 × 8", eq: "Barbell", flag: "shoulder", mod: "Moderate grip width, elbows ~45° from torso." },
          { id: "c3v4", name: "Seated Cable Row", detail: "3 × 12", eq: "Machine" },
          { id: "c4v4", name: "Copenhagen Plank", detail: "3 × 15s ea. side", eq: "Bodyweight (bench)", flag: "knee", mod: "Bend the top knee to shorten the lever, or cut hold time short if achy." },
          { id: "c5v4", name: "Dead Bug", detail: "3 × 10", eq: "Bodyweight" },
        ],
        [
          { id: "c6v4", name: "Leg Curl Machine", detail: "3 × 12", eq: "Machine" },
          { id: "c7v4", name: "Lat Pulldown", detail: "3 × 12", eq: "Machine" },
          { id: "c8v4", name: "Cable Face Pull", detail: "3 × 15", eq: "Machine" },
          { id: "c9v4", name: "Plank Shoulder Taps", detail: "3 × 10 ea. side", eq: "Bodyweight" },
          { id: "c10v4", name: "Dumbbell Hip Thrust", detail: "3 × 12", eq: "Dumbbell" },
        ],
        [
          { id: "c11v4", name: "Leg Press", detail: "3 × 10", eq: "Machine", flag: "knee", mod: "Don't lock out knees at the top; stop short of any pinch at the bottom." },
          { id: "c12v4", name: "Standing Single-Arm Cable Press", detail: "3 × 10 ea. side", eq: "Machine", flag: "shoulder", mod: "Moderate weight, controlled path — stop if it pinches." },
          { id: "c13v4", name: "Cable Tricep Pushdown", detail: "3 × 15", eq: "Machine" },
          { id: "c14v4", name: "Cable Woodchopper", detail: "3 × 10 ea. side", eq: "Machine" },
          { id: "c15v4", name: "Standing Calf Raise", detail: "3 × 15", eq: "Dumbbell" },
        ],
      ],
    ],
  },
};

// Rotation is tied to the real calendar week (Monday-start), so every circuit
// shows the same set all week and moves to the next set the following Monday.
export function variantIndexFor(day) {
  const REF_MONDAY = new Date(2024, 0, 1); // known Monday, used as an anchor
  const now = new Date();
  const diffDays = Math.floor((now - REF_MONDAY) / 86400000);
  const weekNum = Math.floor(diffDays / 7);
  const n = day.variants.length;
  return ((weekNum % n) + n) % n;
}

export function currentRounds(day) {
  return day.variants[variantIndexFor(day)];
}

export const flagLabel = { shoulder: "SHOULDER", knee: "KNEE" };
