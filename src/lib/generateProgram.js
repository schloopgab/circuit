import { EXERCISE_POOL } from "../data/exercisePool.js";

// Rep count by movement pattern + goal, for exercises without a fixed
// `detail` (i.e. everything except bodyweight holds/core work, which stay
// goal-invariant — a "strength goal" doesn't mean anything for a plank).
const REP_TABLE = {
  squat: { general: 10, strength: 5, endurance: 15 },
  hinge: { general: 8, strength: 5, endurance: 12 },
  push: { general: 10, strength: 6, endurance: 15 },
  pull: { general: 12, strength: 8, endurance: 15 },
  accessory: { general: 15, strength: 10, endurance: 20 },
};

const CIRCUITS = [
  { id: "A", name: "Circuit 1" },
  { id: "B", name: "Circuit 2" },
  { id: "C", name: "Circuit 3" },
];

// Same slot layout every circuit/variant used previously: two lower-body +
// push + pull + core/accessory rounds, then a hinge-heavy round with extra
// pulling. Kept simple/uniform rather than per-circuit-unique, since the
// exercise *selection* within each slot is what varies now.
const ROUND_TEMPLATE = [
  ["squat", "push", "pull", "core", "accessory"],
  ["squat", "push", "pull", "core", "accessory"],
  ["hinge", "pull", "pull", "core", "accessory"],
];

const VARIANTS_PER_CIRCUIT = 4;

const JOINT_LABEL = { shoulder: "shoulder", knee: "knee", lowerBack: "lower back" };

function buildSubtitle(avoidJoints) {
  if (avoidJoints.length === 0) return "full-body circuit";
  return avoidJoints.map((j) => JOINT_LABEL[j]).join(" + ") + " aware";
}

function repDetail(pattern, goal, suffix) {
  const reps = REP_TABLE[pattern][goal];
  return `3 × ${reps}${suffix || ""}`;
}

// Builds the final exercise object for one slot. Caution flags are only
// attached when the user actually asked to be cautious about that joint —
// someone with no knee concerns doesn't need a "KNEE" badge on every squat.
function buildExercise(entry, pattern, goal, avoidJoints) {
  const ex = {
    id: entry.id,
    name: entry.name,
    detail: entry.detail || repDetail(pattern, goal, entry.suffix),
    eq: entry.eq,
  };
  if (entry.knee && avoidJoints.includes("knee")) {
    ex.flag = "knee";
    ex.mod = entry.mod;
  } else if (entry.lowerBack && avoidJoints.includes("lowerBack")) {
    ex.flag = "lowerBack";
    ex.mod = entry.mod;
  } else if (entry.shoulder && avoidJoints.includes("shoulder")) {
    ex.flag = "shoulder";
    ex.mod = entry.mod;
  }
  return ex;
}

// Deterministic given the same profile (no Math.random) — round-robins
// through each pattern's eligible pool as slots get filled, so variants
// stay varied without literally repeating the same exercise back-to-back,
// and the whole thing is reproducible (same profile always yields the
// same program, which matters since ids double as the weight-history key).
export function generateProgram(profile) {
  const avoidJoints = profile.avoidJoints || [];
  const goal = profile.goal || "general";
  const avoidShoulder = avoidJoints.includes("shoulder");

  const pools = {
    squat: EXERCISE_POOL.squat,
    hinge: EXERCISE_POOL.hinge,
    push: EXERCISE_POOL.push.filter((e) => !(avoidShoulder && e.highShoulderRisk)),
    pull: EXERCISE_POOL.pull,
    core: EXERCISE_POOL.core,
    accessory: EXERCISE_POOL.accessory,
  };

  const nextIndex = { squat: 0, hinge: 0, push: 0, pull: 0, core: 0, accessory: 0 };
  function pick(pattern) {
    const pool = pools[pattern];
    const entry = pool[nextIndex[pattern] % pool.length];
    nextIndex[pattern] += 1;
    return buildExercise(entry, pattern, goal, avoidJoints);
  }

  const days = {};
  for (const circuit of CIRCUITS) {
    const variants = [];
    for (let v = 0; v < VARIANTS_PER_CIRCUIT; v++) {
      variants.push(ROUND_TEMPLATE.map((round) => round.map((pattern) => pick(pattern))));
    }
    days[circuit.id] = {
      id: circuit.id,
      name: circuit.name,
      focus: "Full Body",
      subtitle: buildSubtitle(avoidJoints),
      variants,
    };
  }
  return days;
}
