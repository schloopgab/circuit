export function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function dateShort(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

// Monday-start week key, e.g. "2026-07-06"
export function weekStartISO(iso) {
  const d = new Date(iso + "T00:00:00");
  const day = d.getDay(); // 0 = Sun
  const diffToMonday = day === 0 ? 6 : day - 1;
  d.setDate(d.getDate() - diffToMonday);
  // Use local date parts, not toISOString() (which converts to UTC and
  // rolls back to the previous day for anyone east of Greenwich).
  return toLocalISO(d);
}

export function weekRangeLabel(startISO) {
  const start = new Date(startISO + "T00:00:00");
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const startLabel = start.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const endLabel = end.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const thisWeekStart = weekStartISO(todayISO());
  if (startISO === thisWeekStart) return `This Week (${startLabel} – ${endLabel})`;
  return `${startLabel} – ${endLabel}`;
}

export function groupByWeek(history) {
  const groups = {};
  history.forEach((h) => {
    const key = weekStartISO(h.date);
    if (!groups[key]) groups[key] = [];
    groups[key].push(h);
  });
  return Object.entries(groups).sort((a, b) => (a[0] < b[0] ? 1 : -1));
}

export function lastWeekStartISO() {
  const thisWeekStart = new Date(weekStartISO(todayISO()) + "T00:00:00");
  thisWeekStart.setDate(thisWeekStart.getDate() - 7);
  return toLocalISO(thisWeekStart);
}

export function toLocalISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Calendar-week membership (Monday-start), not a rolling 24h*7 window — so
// this agrees with the "This Week" / "Last Week" labels used elsewhere
// instead of drifting in and out of sync with them over the course of a day.
export function isThisWeek(iso) {
  return weekStartISO(iso) === weekStartISO(todayISO());
}

export function computeStreak(history) {
  if (!history.length) return 0;
  const dates = new Set(history.map((h) => h.date));
  let streak = 0;
  let cursor = new Date();
  // allow today to be "pending" — start check from today, but don't break streak if today missing
  for (let i = 0; i < 60; i++) {
    const iso = toLocalISO(cursor);
    if (dates.has(iso)) {
      streak++;
    } else if (iso !== todayISO()) {
      break;
    }
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
