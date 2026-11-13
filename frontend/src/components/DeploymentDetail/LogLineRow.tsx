import { cn } from "#/lib/utils";

const SOURCE_STYLES: Record<LogSource, string> = {
  init: "text-tertiary",
  git: "text-primary",
  nixpacks: "text-secondary-fixed",
  cache: "text-tertiary",
  deps: "text-primary",
  turbo: "text-secondary",
  next: "text-on-surface",
  warn: "text-status-building-foreground",
  error: "text-error",
  docker: "text-secondary-fixed",
  build: "text-secondary",
};

const LEVEL_STYLES: Record<LogLevel, string> = {
  default: "text-on-surface",
  muted: "text-on-surface-variant",
  success: "text-tertiary",
  warn: "text-status-building-foreground",
  error: "text-error",
};

type LogLineRowProps = {
  line: LogLine;
  lineNumber: number;
  wrap: boolean;
  live?: boolean;
};

export function LogLineRow({ line, lineNumber, wrap, live = false }: LogLineRowProps) {
  const level = line.level ?? "default";
  const isWarn = level === "warn";
  const isError = level === "error";

  return (
    <div
      className={cn(
        "flex items-baseline gap-3 px-1 rounded text-outline",
        live ? "py-1 bg-secondary/10" : "py-0.5 hover:bg-white/[0.02]",
        isWarn && "bg-status-building-foreground/5",
        isError && "bg-error-container/10",
      )}
    >
      <span
        className={cn(
          "w-8 shrink-0 text-right select-none",
          live && "text-secondary font-bold",
          isWarn && "text-status-building-foreground/60",
          isError && "text-error/70",
          !live && !isWarn && !isError && "text-outline-variant",
        )}
      >
        {String(lineNumber).padStart(3, "0")}
      </span>
      {line.timestamp && (
        <span className="shrink-0 text-secondary select-none">{line.timestamp}</span>
      )}
      <span
        className={cn(
          "shrink-0 font-semibold select-none",
          SOURCE_STYLES[line.source],
          live && "text-secondary animate-pulse",
        )}
      >
        [{line.source}]
      </span>
      <span
        className={cn(
          line.preformatted || !wrap ? "whitespace-pre" : "whitespace-pre-wrap break-all",
          live ? "text-secondary font-medium" : LEVEL_STYLES[level],
        )}
      >
        {line.message}
        {line.code && (
          <>
            {" "}
            <code className="text-secondary">{line.code}</code>
          </>
        )}
        {live && (
          <span className="inline-block w-2 h-4 ml-1 align-text-bottom bg-secondary animate-pulse" />
        )}
      </span>
    </div>
  );
}

export function formatLogLine(line: LogLine) {
  const parts = [line.timestamp, `[${line.source}]`, line.message, line.code];
  return parts.filter(Boolean).join(" ");
}
