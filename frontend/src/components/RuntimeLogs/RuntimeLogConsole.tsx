import { forwardRef, useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { TerminalDots } from "#/components/Terminal/TerminalDots";
import { Button } from "#/components/ui/button";
import { RuntimeLogRow } from "./RuntimeLogRow";

type RuntimeLogConsoleProps = {
  source: RuntimeLogSource;
  entries: RuntimeLogEntry[];
  bufferedCount: number;
  streaming: boolean;
  allocMb: number;
  autoScroll: boolean;
  zebra: boolean;
};

export const RuntimeLogConsole = forwardRef<HTMLDivElement, RuntimeLogConsoleProps>(
  function RuntimeLogConsole(
    { source, entries, bufferedCount, streaming, allocMb, autoScroll, zebra },
    ref,
  ) {
    const canvasRef = useRef<HTMLDivElement>(null);
    const lastEntryId = entries.at(-1)?.id;

    const scrollToBottom = () => {
      const canvas = canvasRef.current;
      if (canvas) canvas.scrollTop = canvas.scrollHeight;
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      if (autoScroll && canvas && lastEntryId !== undefined) {
        canvas.scrollTop = canvas.scrollHeight;
      }
    }, [autoScroll, lastEntryId]);

    return (
      <div
        ref={ref}
        className="flex flex-col rounded-xl overflow-hidden shadow-2xl bg-surface-container-lowest"
      >
        <div className="flex flex-wrap items-center justify-between gap-space-sm px-space-md py-2 bg-surface-container-low select-none">
          <div className="flex items-center gap-space-md font-code-sm text-code-sm">
            <TerminalDots className="text-[0.625rem]" />
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="text-primary font-medium">runtime-tail</span>
              <span className="text-outline">::</span>
              <span>container:{source.container}</span>
              <span className="text-outline">::</span>
              <span className="text-secondary">{source.process}</span>
            </div>
          </div>
          <div className="flex items-center gap-space-lg font-code-sm text-code-sm text-outline">
            <Stat
              label="Buffer"
              value={`${bufferedCount.toLocaleString()} / ${source.bufferLimit.toLocaleString()} lines`}
              className="text-on-surface"
            />
            <span>·</span>
            <Stat label="Alloc" value={`${allocMb} MB`} className="text-tertiary" />
          </div>
        </div>

        <div
          ref={canvasRef}
          role="log"
          aria-live={streaming ? "polite" : "off"}
          className="h-145 overflow-y-auto p-space-md flex flex-col gap-0.5 selection:bg-primary-container selection:text-on-primary-container"
        >
          {entries.map((entry, index) => (
            <RuntimeLogRow
              key={entry.id}
              entry={entry}
              lineNumber={entry.id}
              striped={zebra && index % 2 === 1}
            />
          ))}
          <TailRow
            lineNumber={(lastEntryId ?? 0) + 1}
            streaming={streaming}
            cleared={bufferedCount === 0}
            filteredOut={bufferedCount > 0 && entries.length === 0}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 px-space-md py-1.5 bg-surface-container-low font-code-sm text-code-sm text-outline select-none">
          <div className="flex items-center gap-space-md">
            <span className="flex items-center gap-1 text-on-surface-variant">
              <span
                className={streaming ? "size-1.5 rounded-full bg-tertiary" : "size-1.5 rounded-full bg-outline"}
              />
              tail -f {source.logPath}
            </span>
            <span>·</span>
            <span>Encoding: UTF-8</span>
            <span>·</span>
            <span>ANSI Colors: Enabled</span>
          </div>
          <div className="flex items-center gap-2">
            <span>
              Showing {entries.length.toLocaleString()} of {bufferedCount.toLocaleString()} lines
            </span>
            <Button
              variant="link"
              size="xs"
              onClick={scrollToBottom}
              className="h-auto p-0 gap-0.5 text-primary font-code-sm text-(length:--text-code-sm)"
            >
              Jump to bottom
              <ArrowDown className="size-3" />
            </Button>
          </div>
        </div>
      </div>
    );
  },
);

function Stat({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-on-surface-variant">{label}:</span>
      <span className={`font-medium ${className}`}>{value}</span>
    </div>
  );
}

function TailRow({
  lineNumber,
  streaming,
  cleared,
  filteredOut,
}: {
  lineNumber: number;
  streaming: boolean;
  cleared: boolean;
  filteredOut: boolean;
}) {
  const message = filteredOut
    ? "No buffered lines match the current filters."
    : cleared
      ? streaming
        ? "Buffer cleared. Listening for incoming stream packets..."
        : "Buffer cleared. Resume the stream to receive new lines."
      : streaming
        ? "Streaming runtime events via socket IPC..."
        : "Stream paused. New lines are not being received.";

  return (
    <div className="flex items-center gap-space-sm py-1 px-2 font-code-sm text-code-sm text-outline">
      <span className="w-8 shrink-0 text-right text-outline/40 select-none">
        {String(lineNumber).padStart(3, "0")}
      </span>
      <span className="flex items-center gap-1.5 text-on-surface-variant">
        {message}
        {streaming && !filteredOut && (
          <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse" />
        )}
      </span>
    </div>
  );
}
