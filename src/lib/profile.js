import { storage } from "../storage.js";

// avoidJoints: array, any of "shoulder" | "knee" | "lowerBack" (empty = no cautions)
// goal: "general" | "strength" | "endurance"
export const DEFAULT_PROFILE = { avoidJoints: [], goal: "general" };

export const GOALS = [
  { id: "general", label: "General Fitness", description: "Balanced reps across the board — a solid all-around default." },
  { id: "strength", label: "Strength", description: "Lower reps on the big lifts, heavier relative loads." },
  { id: "endurance", label: "Endurance & Conditioning", description: "Higher reps throughout, more of a circuit-density feel." },
];

export const JOINTS = [
  { id: "shoulder", label: "Shoulder" },
  { id: "knee", label: "Knee" },
  { id: "lowerBack", label: "Lower Back" },
];

// Returns the saved profile, or null if this is a first-time user (the
// caller should show onboarding in that case, not fall back to defaults —
// asking is the point).
export async function loadProfile() {
  try {
    const res = await storage.get("profile");
    return res ? JSON.parse(res.value) : null;
  } catch (e) {
    return null;
  }
}

export async function saveProfile(profile) {
  await storage.set("profile", JSON.stringify(profile));
}
