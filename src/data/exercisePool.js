// ---------- Exercise pool ----------
// The source material generateProgram.js assembles each person's circuits
// from. Every entry is tagged by movement pattern (which slot it can fill)
// and, where relevant, joint risk + a caution mod — the same flag/mod
// system the app always had, just applied per-user now instead of
// hardcoded for one person.
//
// `highShoulderRisk: true` marks overhead/incline pressing specifically —
// these are excluded entirely (not just flagged) when a user flags
// "shoulder" as a joint to go easy on, since overhead patterns are the
// most commonly provocative one for shoulder issues. Everything else is
// included-but-flagged rather than excluded, matching how knee/lower-back
// caution already worked (a cautious squat beats no squat at all).
//
// `detail` = a fixed, goal-invariant "N × reps" string (used for
// bodyweight holds/core work, where a "strength goal" doesn't really mean
// anything). Entries without `detail` get their rep count computed from
// REP_TABLE in generateProgram.js by pattern + goal, with `suffix`
// (" ea. side" / " ea. leg" / " ea. arm") appended.

export const EXERCISE_POOL = {
  squat: [
    { id: "barbell-back-squat", name: "Barbell Back Squat", eq: "Barbell", knee: true, mod: "Moderate depth, controlled tempo — stop above any pinch." },
    { id: "hack-squat", name: "Hack Squat", eq: "Machine", knee: true, mod: "Moderate depth — stop above any pinch; keep heels flat." },
    { id: "leg-press", name: "Leg Press", eq: "Machine", knee: true, mod: "Don't lock out knees at the top; stop short of any pinch at the bottom." },
    { id: "smith-machine-squat", name: "Smith Machine Squat", eq: "Machine", knee: true, mod: "Moderate depth, controlled tempo — stop above any pinch." },
    { id: "barbell-walking-lunge", name: "Barbell Walking Lunge", eq: "Barbell", knee: true, mod: "Short step, shallow depth — no deep knee bend.", suffix: " ea. leg" },
    { id: "barbell-bulgarian-split-squat", name: "Barbell Bulgarian Split Squat", eq: "Barbell", knee: true, mod: "Short, shallow range — back knee lightly grazes the floor, no deep drop.", suffix: " ea. leg" },
    { id: "wall-sit", name: "Wall Sit", eq: "Bodyweight", knee: true, mod: "Shallow angle only — quarter squat depth, not 90°.", detail: "3 × 20s" },
    { id: "split-squat-hold", name: "Split Squat Hold", eq: "Bodyweight", knee: true, mod: "Quarter-depth only, no deep front-knee bend.", detail: "3 × 20s ea. leg" },
  ],
  hinge: [
    { id: "barbell-deadlift", name: "Barbell Deadlift", eq: "Barbell", lowerBack: true, mod: "Neutral spine, brace before you pull — stop the set if your lower back rounds." },
    { id: "barbell-romanian-deadlift", name: "Barbell Romanian Deadlift", eq: "Barbell", lowerBack: true, mod: "Soft knees, hinge from the hips, keep the bar close — stop short of any lower-back rounding." },
    { id: "barbell-hip-thrust", name: "Barbell Hip Thrust", eq: "Barbell", lowerBack: true, mod: "Squeeze glutes at the top — avoid overarching your lower back." },
    { id: "cable-pull-through", name: "Cable Pull-Through", eq: "Machine", lowerBack: true, mod: "Hinge from the hips, soft knees — keep your lower back neutral." },
    { id: "leg-curl-machine", name: "Leg Curl Machine", eq: "Machine" },
  ],
  // Horizontal press + true overhead/incline press in one pool; the
  // highShoulderRisk ones are filtered out upstream when shoulder caution
  // is on, so this whole category is safe to pull from unconditionally.
  push: [
    { id: "barbell-bench-press", name: "Barbell Bench Press", eq: "Barbell", shoulder: true, mod: "Moderate grip width, elbows ~45° from torso." },
    { id: "machine-chest-press", name: "Machine Chest Press", eq: "Machine", shoulder: true, mod: "Keep elbows slightly forward of your torso, moderate range." },
    { id: "cable-chest-fly", name: "Cable Chest Fly", eq: "Machine", shoulder: true, mod: "Slight bend in elbows, stop at chest height — no stretch past a comfortable range." },
    { id: "standing-single-arm-cable-press", name: "Standing Single-Arm Cable Press", eq: "Machine", shoulder: true, mod: "Set the cable at chest height — not overhead. Moderate weight, controlled path, stop if it pinches.", suffix: " ea. side" },
    { id: "incline-barbell-press", name: "Incline Barbell Press", eq: "Barbell", shoulder: true, highShoulderRisk: true, mod: "Moderate incline (~30°), elbows ~45° from torso." },
    { id: "incline-machine-press", name: "Incline Machine Press", eq: "Machine", shoulder: true, highShoulderRisk: true, mod: "Moderate range, elbows ~45° from torso." },
    { id: "machine-shoulder-press", name: "Machine Shoulder Press", eq: "Machine", shoulder: true, highShoulderRisk: true, mod: "Controlled overhead path, moderate weight — stop short of full lockout if it pinches." },
    { id: "barbell-overhead-press", name: "Barbell Overhead Press", eq: "Barbell", shoulder: true, highShoulderRisk: true, mod: "Light weight, strict controlled path — stop short of full lockout if it pinches." },
  ],
  // Pulling/scapular work is generally protective for shoulder health, so
  // nothing here gets a caution flag regardless of profile.
  pull: [
    { id: "lat-pulldown", name: "Lat Pulldown", eq: "Machine" },
    { id: "seated-cable-row", name: "Seated Cable Row", eq: "Machine" },
    { id: "t-bar-row", name: "T-Bar Row", eq: "Machine" },
    { id: "barbell-row", name: "Barbell Row", eq: "Barbell" },
    { id: "chest-supported-row-machine", name: "Chest-Supported Row Machine", eq: "Machine" },
    { id: "cable-row-wide-grip", name: "Cable Row, Wide Grip", eq: "Machine" },
    { id: "cable-face-pull", name: "Cable Face Pull", eq: "Machine" },
    { id: "cable-external-rotation", name: "Cable External Rotation", eq: "Machine", suffix: " ea. side" },
    { id: "cable-internal-external-rotation", name: "Cable Internal/External Rotation", eq: "Machine", suffix: " ea. side" },
    { id: "cable-rear-delt-fly", name: "Cable Rear Delt Fly", eq: "Machine" },
  ],
  // Bodyweight, fixed detail regardless of goal — "strength goal" doesn't
  // change how you'd program a plank.
  core: [
    { id: "plank", name: "Plank", eq: "Bodyweight", detail: "3 × 30s" },
    { id: "side-plank", name: "Side Plank", eq: "Bodyweight", detail: "3 × 20s ea. side" },
    { id: "dead-bug", name: "Dead Bug", eq: "Bodyweight", detail: "3 × 10 ea. side" },
    { id: "bird-dog", name: "Bird Dog", eq: "Bodyweight", detail: "3 × 10 ea. side" },
    { id: "hollow-body-hold", name: "Hollow Body Hold", eq: "Bodyweight", detail: "3 × 20s" },
    { id: "plank-shoulder-taps", name: "Plank Shoulder Taps", eq: "Bodyweight", detail: "3 × 10 ea. side" },
    { id: "side-plank-hip-dip", name: "Side Plank Hip Dip", eq: "Bodyweight", detail: "3 × 10 ea. side" },
    { id: "superman", name: "Superman", eq: "Bodyweight", detail: "3 × 12" },
  ],
  accessory: [
    { id: "standing-calf-raise-machine", name: "Standing Calf Raise Machine", eq: "Machine" },
    { id: "seated-calf-raise-machine", name: "Seated Calf Raise Machine", eq: "Machine" },
    { id: "hip-abduction-machine", name: "Hip Abduction Machine", eq: "Machine", suffix: " ea. side" },
    { id: "hip-adduction-machine", name: "Hip Adduction Machine", eq: "Machine", suffix: " ea. side" },
    { id: "cable-lateral-raise", name: "Cable Lateral Raise", eq: "Machine", shoulder: true, mod: "Stop at shoulder height, no higher." },
    { id: "hammer-curl", name: "Hammer Curl", eq: "Dumbbell" },
    { id: "cable-tricep-pushdown", name: "Cable Tricep Pushdown", eq: "Machine" },
    { id: "cable-kickback", name: "Cable Kickback", eq: "Machine", suffix: " ea. side" },
    { id: "cable-woodchopper", name: "Cable Woodchopper", eq: "Machine", suffix: " ea. side" },
  ],
};
