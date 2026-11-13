import { useEffect, useMemo, useRef, useState } from "react";
import { SquareTerminal } from "lucide-react";
import { useCopyToClipboard } from "#/hooks/useCopyToClipboard";
import { formatLogLine, LogLineRow } from "./LogLineRow";
import { type LogFilter, LogToolbar } from "./LogToolbar";

type BuildLogTerminalProps = {
  terminal: BuildTerminal;
  downloadName: string;
};

export function BuildLogTerminal({ terminal, downloadName }: BuildLogTerminalProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<LogFilter>("all");
  const [query, setQuery] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const [wrap, setWrap] = useState(false);
  const { copied, copy } = useCopyToClipboard();

  const numbered = useMemo(
    () => terminal.lines.map((line, index) => ({ line, number: index + 1 })),
    [terminal.lines],
  );
  const lastNumber = terminal.lines.length;
  const errorCount = terminal.lines.filter((line) => line.level === "error").length;

  const visible = useMemo(() => {
    const matches = buildMatcher(query);
    return numbered.filter(
      ({ line }) => matchesFilter(line, filter) && matches(formatLogLine(line)),
    );
  }, [numbered, filter, query]);

  const visibleCount = visible.length;
  useEffect(() => {
    if (!autoScroll || !bodyRef.current || visibleCount === 0) return;
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [autoScroll, visibleCount]);

  const rawText = () => terminal.lines.map(formatLogLine).join("\n");

  const download = () => {
    const url = URL.createObjectURL(new Blob([rawText()], { type: "text/plain" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${downloadName}.log`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void frameRef.current?.requestFullscreen();
    }
  };

  return (
    <div
      ref={frameRef}
      className="rounded-xl overflow-hidden bg-[#070709] shadow-2xl flex flex-col"
    >
      <TerminalTitleBar worker={terminal.worker} streaming={terminal.streaming} />
      <LogToolbar
        filter={filter}
        onFilterChange={setFilter}
        errorCount={errorCount}
        query={query}
        onQueryChange={setQuery}
        matchCount={visible.length}
        autoScroll={autoScroll}
        onAutoScrollChange={setAutoScroll}
        wrap={wrap}
        onWrapToggle={() => setWrap((value) => !value)}
        copied={copied}
        onCopy={() => copy(rawText())}
        onDownload={download}
        onFullscreen={toggleFullscreen}
      />
      <div
        ref={bodyRef}
        role="log"
        aria-live={terminal.streaming ? "polite" : "off"}
        className="flex-1 p-4 font-code-sm text-code-sm leading-relaxed overflow-auto min-h-115 max-h-145 space-y-0.5 select-text bg-[#070709]"
      >
        {visible.length === 0 ? (
          <div className="py-8 text-center text-outline">No log lines match.</div>
        ) : (
          visible.map(({ line, number }) => (
            <LogLineRow
              key={number}
              line={line}
              lineNumber={number}
              wrap={wrap}
              live={terminal.streaming && number === lastNumber}
            />
          ))
        )}
      </div>
      <TerminalStatusBar process={terminal.process} />
    </div>
  );
}

function matchesFilter(line: LogLine, filter: LogFilter) {
  switch (filter) {
    case "build":
      return line.category === "build";
    case "container":
      return line.category === "container";
    case "errors":
      return line.level === "error";
    default:
      return true;
  }
}

function buildMatcher(query: string): (text: string) => boolean {
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

function TerminalTitleBar({
  worker,
  streaming,
}: {
  worker: string;
  streaming: boolean;
}) {
  return (
    <div className="h-11 px-4 bg-surface-container-low flex items-center justify-between select-none">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-status-failed-foreground/70" />
          <span className="size-3 rounded-full bg-status-building-foreground/70" />
          <span className="size-3 rounded-full bg-status-healthy-foreground/70" />
        </div>
        <span className="hidden sm:inline text-outline-variant font-code-sm text-code-sm">
          |
        </span>
        <div className="flex items-center gap-2 font-code-sm text-code-sm text-on-surface-variant">
          <SquareTerminal size={16} className="text-tertiary" />
          <span className="font-medium text-on-surface">{worker}</span>
          <span className="hidden md:inline text-outline">
            {"// stdout & stderr stream"}
          </span>
        </div>
      </div>
      {streaming ? (
        <div className="flex items-center gap-2 font-code-sm text-code-sm">
          <span className="size-2 rounded-full bg-tertiary animate-ping" />
          <span className="text-tertiary font-medium">STREAMING LIVE</span>
        </div>
      ) : (
        <span className="font-code-sm text-code-sm text-outline">STREAM CLOSED</span>
      )}
    </div>
  );
}

function TerminalStatusBar({ process }: { process: BuildTerminal["process"] }) {
  const running = process.exitCode === null;
  return (
    <div className="px-4 py-2 bg-surface-container-low flex flex-wrap items-center justify-between gap-2 font-code-sm text-code-sm text-outline">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span
            className={running ? "size-1.5 rounded-full bg-secondary" : "size-1.5 rounded-full bg-outline"}
          />
          <span className="text-on-surface">
            PID {process.pid} ({process.name})
          </span>
        </div>
        <span className="text-outline-variant">·</span>
        <span>
          Exit Code:{" "}
          <span className="text-on-surface-variant">
            {running ? "running" : process.exitCode}
          </span>
        </span>
        <span className="text-outline-variant">·</span>
        <span>
          Memory:{" "}
          <span className="text-on-surface">
            {process.memoryUsedMb} MB / {process.memoryLimitMb} MB
          </span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span>Encoding: {process.encoding}</span>
        <span className="text-outline-variant">·</span>
        <span>
          Shell: <code className="text-on-surface">{process.shell}</code>
        </span>
      </div>
    </div>
  );
}
