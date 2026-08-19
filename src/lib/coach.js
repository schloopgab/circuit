// --- Coaching logic ---
// Reads an exercise's logged weight history (one entry per time it was actually
// finished with a weight recorded) and returns a directive, non-motivational
// note about what to do next time. No note until there's at least one prior
// data point — a single number by itself isn't a trend.
export function incrementFor(eq, currentWeight) {
  if (eq.includes("Barbell")) return currentWeight >= 135 ? 10 : 5;
  if (eq.includes("Machine")) return currentWeight >= 90 ? 10 : 5;
  return currentWeight >= 40 ? 5 : 2.5; // Dumbbell
}

export function coachSuggestion(ex, log) {
  const entries = log[ex.id] || [];
  if (entries.length === 0) return null;
  const last = entries[entries.length - 1].weight;
  if (entries.length === 1) {
    return { tone: "info", text: `Last logged: ${last} lbs. Log it again next time this comes up to start tracking a trend.` };
  }
  const prev = entries[entries.length - 2].weight;
  const streak = entries.length >= 3 && entries[entries.length - 3].weight === last && prev === last ? 3 : prev === last ? 2 : 1;
  if (last === prev) {
    const bump = incrementFor(ex.eq, last);
    return {
      tone: "up",
      text: `Held ${last} lbs for ${streak} session${streak > 1 ? "s" : ""} straight — go to ${last + bump} lbs next time.`,
    };
  }
  if (last > prev) {
    return { tone: "hold", text: `You moved up last time (${prev} → ${last} lbs). Hold at ${last} lbs until it's clean, then push again.` };
  }
  return { tone: "hold", text: `You backed off last time (${prev} → ${last} lbs). Stay at ${last} lbs and rebuild before adding more.` };
}
