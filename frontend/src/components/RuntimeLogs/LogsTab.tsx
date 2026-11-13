import { useMemo, useRef, useState } from "react";
import { getRuntimeLogSource } from "#/data/runtimeLogs";
import { downloadTextFile } from "#/lib/download";
import {
  ALL_PODS,
  buildMatcher,
  countBySeverity,
  entryText,
  type SeverityFilter,
  severityOf,
  TIME_RANGES,
  type TimeRange,
} from "./logFilters";
import { LogsControlBar } from "./LogsControlBar";
import { RuntimeLogConsole } from "./RuntimeLogConsole";

export function LogsTab({ app }: { app: AppOverview }) {
  const source = getRuntimeLogSource(app.id);
  if (!source) {
    return (
      <div className="rounded-xl bg-surface-container-low p-10 text-center font-body-md text-body-md text-outline">
        No runtime log stream is configured for {app.name}.
      </div>
    );
  }
  return <RuntimeLogs app={app} source={source} />;
}

function RuntimeLogs({ app, source }: { app: AppOverview; source: RuntimeLogSource }) {
  const consoleRef = useRef<HTMLDivElement>(null);
  const [entries, setEntries] = useState(() => toEntries(source));
  const [streaming, setStreaming] = useState(true);

  const [pod, setPod] = useState(ALL_PODS);
  const [timeRange, setTimeRange] = useState<TimeRange>("live");
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState<SeverityFilter>("all");
  const [autoScroll, setAutoScroll] = useState(true);
  const [zebra, setZebra] = useState(true);

  const scoped = useMemo(() => {
    const rangeMs = TIME_RANGES.find((range) => range.value === timeRange)?.ms;
    const since = rangeMs ? Date.now() - rangeMs : Number.NEGATIVE_INFINITY;
    const matches = buildMatcher(query);
    return entries.filter(
      (entry) =>
        (pod === ALL_PODS || entry.pod === pod) &&
        entry.time >= since &&
        matches(entryText(entry)),
    );
  }, [entries, pod, timeRange, query]);

  const severityCounts = useMemo(() => countBySeverity(scoped), [scoped]);
  const visible = useMemo(
    () =>
      severity === "all" ? scoped : scoped.filter((entry) => severityOf(entry.level) === severity),
    [scoped, severity],
  );

  const changeTimeRange = (range: TimeRange) => {
    setTimeRange(range);
    setStreaming(range === "live");
  };

  const toggleStreaming = () => {
    const next = !streaming;
    setStreaming(next);
    if (next) setTimeRange("live");
  };

  const download = () =>
    downloadTextFile(
      `launchpad-${app.name}-${Date.now()}.log`,
      visible.map(entryText).join("\n"),
    );

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void consoleRef.current?.requestFullscreen();
    }
  };

  return (
    <div className="flex flex-col gap-space-lg">
      <LogsControlBar
        pods={app.pods}
        pod={pod}
        onPodChange={setPod}
        timeRange={timeRange}
        onTimeRangeChange={changeTimeRange}
        query={query}
        onQueryChange={setQuery}
        streaming={streaming}
        onStreamingToggle={toggleStreaming}
        autoScroll={autoScroll}
        onAutoScrollChange={setAutoScroll}
        onClear={() => setEntries([])}
        onDownload={download}
        onFullscreen={toggleFullscreen}
        severity={severity}
        onSeverityChange={setSeverity}
        severityCounts={severityCounts}
        zebra={zebra}
        onZebraToggle={() => setZebra((current) => !current)}
      />
      <RuntimeLogConsole
        ref={consoleRef}
        source={source}
        entries={visible}
        bufferedCount={entries.length}
        streaming={streaming}
        allocMb={app.telemetry.memory.usedMb}
        autoScroll={autoScroll}
        zebra={zebra}
      />
    </div>
  );
}

function toEntries(source: RuntimeLogSource): RuntimeLogEntry[] {
  const now = Date.now();
  return source.initial.map(({ secondsAgo, ...entry }, index) => ({
    ...entry,
    id: index + 1,
    time: now - secondsAgo * 1000,
  }));
}
