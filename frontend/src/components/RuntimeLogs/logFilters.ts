export type SeverityFilter = "all" | "info" | "debug" | "warn" | "error";

export const SEVERITY_FACETS: Exclude<SeverityFilter, "all">[] = [
  "info",
  "debug",
  "warn",
  "error",
];

export type TimeRange = "live" | "15m" | "1h" | "24h";

export const TIME_RANGES: { value: TimeRange; label: string; ms?: number }[] = [
  { value: "live", label: "Live (tail)" },
  { value: "15m", label: "Last 15m", ms: 15 * 60_000 },
  { value: "1h", label: "Last 1h", ms: 60 * 60_000 },
  { value: "24h", label: "Last 24h", ms: 24 * 60 * 60_000 },
];

export const ALL_PODS = "all";

export function podShortId(podName: string) {
  return podName.slice(podName.lastIndexOf("-") + 1);
}

export function severityOf(level: RuntimeLogLevel): Exclude<SeverityFilter, "all"> {
  return level === "health" ? "info" : level;
}

export function entryText(entry: RuntimeLogEntry) {
  return [
    formatLogTime(entry.time),
    `[${entry.pod}]`,
    entry.level.toUpperCase(),
    entry.message.map((segment) => segment.text).join(""),
    ...(entry.stack ?? []).map((frame) => `    ${frame}`),
  ].join(" ");
}

export function buildMatcher(query: string): (text: string) => boolean {
  const trimmed = query.trim();
  if (!trimmed) return () => true;
  try {
    const pattern = new RegExp(trimmed, "i");
    return (text) => pattern.test(text);
  } catch {
    const needle = trimmed.toLowerCase();
    return (text) => text.toLowerCase().includes(needle);
  }
}

export function formatLogTime(time: number) {
  const date = new Date(time);
  const pad = (value: number, length = 2) => String(value).padStart(length, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`;
}

export function countBySeverity(entries: RuntimeLogEntry[]) {
  const counts: Record<SeverityFilter, number> = {
    all: entries.length,
    info: 0,
    debug: 0,
    warn: 0,
    error: 0,
  };
  for (const entry of entries) counts[severityOf(entry.level)] += 1;
  return counts;
}
