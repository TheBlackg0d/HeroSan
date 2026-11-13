import { cn } from "#/lib/utils";
import { formatLogTime } from "./logFilters";

export const LEVEL_BADGE: Record<RuntimeLogLevel, string> = {
  info: "bg-secondary-container/20 text-secondary",
  debug: "bg-tertiary-container/15 text-tertiary-fixed",
  warn: "bg-status-building/20 text-status-building-foreground",
  error: "bg-error/30 text-error",
  health: "bg-tertiary-container/20 text-tertiary",
};

const ROW_STYLES: Partial<Record<RuntimeLogLevel, string>> = {
  warn: "bg-status-building/5 hover:bg-status-building/10",
  error: "py-1 bg-error-container/20 hover:bg-error-container/30",
  health: "opacity-80",
};

const MESSAGE_STYLES: Record<RuntimeLogLevel, string> = {
  info: "text-on-surface",
  debug: "text-on-surface-variant",
  warn: "text-status-building-foreground",
  error: "text-error font-medium",
  health: "text-outline",
};

const TONE_STYLES: Record<RuntimeLogTone, string> = {
  plain: "",
  muted: "text-outline",
  method: "text-tertiary",
  write: "text-primary-fixed-dim",
  success: "text-tertiary font-semibold",
  accent: "text-primary",
  code: "text-on-surface-variant",
};

type RuntimeLogRowProps = {
  entry: RuntimeLogEntry;
  lineNumber: number;
  striped: boolean;
};

export function RuntimeLogRow({ entry, lineNumber, striped }: RuntimeLogRowProps) {
  const special = ROW_STYLES[entry.level];
  return (
    <div
      className={cn(
        "group flex items-start gap-space-sm py-0.5 px-2 rounded font-code-sm text-code-sm",
        special ?? "hover:bg-surface-container/40",
        striped && !special && "bg-surface-container/20",
      )}
    >
      <span className="w-8 shrink-0 text-right text-outline/50 group-hover:text-outline select-none">
        {String(lineNumber).padStart(3, "0")}
      </span>
      <span className="shrink-0 text-outline/70 select-none">{formatLogTime(entry.time)}</span>
      <span className="shrink-0 text-secondary/80 font-medium select-none">[{entry.pod}]</span>
      <LevelBadge level={entry.level} />
      <div className={cn("flex min-w-0 flex-col gap-0.5", MESSAGE_STYLES[entry.level])}>
        <span className="break-words">
          {entry.message.map((segment) => (
            <span
              key={`${segment.tone ?? "plain"}:${segment.text}`}
              className={TONE_STYLES[segment.tone ?? "plain"]}
            >
              {segment.text}
            </span>
          ))}
        </span>
        {entry.stack?.map((frame) => (
          <span key={frame} className="pl-2 text-[11px] text-error/80 font-normal">
            ↳ {frame}
          </span>
        ))}
      </div>
    </div>
  );
}

export function LevelBadge({ level }: { level: RuntimeLogLevel }) {
  return (
    <span
      className={cn(
        "shrink-0 px-1.5 rounded text-[10px] font-semibold tracking-wider select-none",
        LEVEL_BADGE[level],
      )}
    >
      {level.toUpperCase()}
    </span>
  );
}
