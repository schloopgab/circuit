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

export const flagLabel = { shoulder: "SHOULDER", knee: "KNEE", lowerBack: "LOWER BACK" };
