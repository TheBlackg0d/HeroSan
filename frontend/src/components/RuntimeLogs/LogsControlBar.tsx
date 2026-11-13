import { type ReactNode, useEffect, useId, useRef } from "react";
import {
  Download,
  Filter,
  ListX,
  Maximize,
  Pause,
  Play,
  SlidersHorizontal,
} from "lucide-react";
import { Panel } from "#/components/AppOverview/shared";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { Input } from "#/components/ui/input";
import { Kbd } from "#/components/ui/kbd";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "#/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import { cn } from "#/lib/utils";
import {
  ALL_PODS,
  podShortId,
  SEVERITY_FACETS,
  type SeverityFilter,
  TIME_RANGES,
  type TimeRange,
} from "./logFilters";

const POD_STATUS_LABEL: Record<PodStatus, string> = {
  ready: "Healthy",
  pending: "Pending",
  crashloop: "CrashLoop",
};

const selectTriggerClass =
  "h-auto w-full py-1.5 pl-3 pr-2 rounded border-0 shadow-sm bg-surface-container hover:bg-surface-container-high text-on-surface font-code-sm text-(length:--text-code-sm) focus-visible:ring-1 focus-visible:ring-primary";

const selectItemClass = "font-code-sm text-(length:--text-code-sm)";

export type LogsControlBarProps = {
  pods: PodInstance[];
  pod: string;
  onPodChange: (pod: string) => void;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  query: string;
  onQueryChange: (query: string) => void;
  streaming: boolean;
  onStreamingToggle: () => void;
  autoScroll: boolean;
  onAutoScrollChange: (value: boolean) => void;
  onClear: () => void;
  onDownload: () => void;
  onFullscreen: () => void;
  severity: SeverityFilter;
  onSeverityChange: (severity: SeverityFilter) => void;
  severityCounts: Record<SeverityFilter, number>;
  zebra: boolean;
  onZebraToggle: () => void;
};

export function LogsControlBar(props: LogsControlBarProps) {
  return (
    <Panel size="sm" className="gap-space-sm px-space-md">
      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex flex-1 min-w-70 flex-wrap items-center gap-space-sm">
          <PodSelect pods={props.pods} value={props.pod} onChange={props.onPodChange} />
          <TimeRangeSelect value={props.timeRange} onChange={props.onTimeRangeChange} />
          <LogQueryInput value={props.query} onChange={props.onQueryChange} />
        </div>
        <StreamActions {...props} />
      </div>
      <div className="flex items-center justify-between gap-space-sm pt-1 overflow-x-auto select-none">
        <SeverityFacets
          value={props.severity}
          onChange={props.onSeverityChange}
          counts={props.severityCounts}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={props.onZebraToggle}
          aria-pressed={props.zebra}
          className="h-auto shrink-0 px-1.5 py-0.5 text-outline hover:text-on-surface hover:bg-surface-container font-code-sm text-(length:--text-code-sm) font-normal"
        >
          <SlidersHorizontal className="size-3.5" />
          Zebra striping: {props.zebra ? "on" : "off"}
        </Button>
      </div>
    </Panel>
  );
}

function PodSelect({
  pods,
  value,
  onChange,
}: {
  pods: PodInstance[];
  value: string;
  onChange: (pod: string) => void;
}) {
  const running = pods.filter((pod) => pod.status === "ready").length;
  return (
    <div className="min-w-65">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-label="Pod" className={selectTriggerClass}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_PODS} className={selectItemClass}>
            All Pods ({running} running)
          </SelectItem>
          {pods.map((pod) => (
            <SelectItem key={pod.name} value={podShortId(pod.name)} className={selectItemClass}>
              {pod.name} ({POD_STATUS_LABEL[pod.status]})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function TimeRangeSelect({
  value,
  onChange,
}: {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}) {
  return (
    <div className="min-w-42">
      <Select value={value} onValueChange={(next) => onChange(next as TimeRange)}>
        <SelectTrigger aria-label="Time range" className={selectTriggerClass}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {TIME_RANGES.map((range) => (
            <SelectItem key={range.value} value={range.value} className={selectItemClass}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function LogQueryInput({ value, onChange }: { value: string; onChange: (query: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="relative flex-1 min-w-60">
      <Filter
        size={15}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none"
      />
      <Input
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Filter logs (regex supported, e.g. status:500)..."
        aria-label="Filter logs"
        spellCheck={false}
        className="h-auto pl-8 pr-12 py-1.5 rounded border-0 shadow-inner bg-surface-container-lowest focus-visible:ring-1 focus-visible:ring-primary font-code-sm text-(length:--text-code-sm) md:text-(length:--text-code-sm) text-on-surface placeholder:text-outline"
      />
      <Kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-surface-container-high text-outline font-code-sm text-(length:--text-code-sm)">
        ⌘K
      </Kbd>
    </div>
  );
}

function StreamActions({
  streaming,
  onStreamingToggle,
  autoScroll,
  onAutoScrollChange,
  onClear,
  onDownload,
  onFullscreen,
}: LogsControlBarProps) {
  const autoScrollId = useId();
  return (
    <div className="flex items-center gap-space-xs">
      <Button
        variant="ghost"
        onClick={onStreamingToggle}
        aria-pressed={streaming}
        className={cn(
          "h-auto rounded px-3 py-1.5 gap-1.5 font-headline-sm text-(length:--text-headline-sm)",
          streaming
            ? "bg-tertiary-container/20 hover:bg-tertiary-container/30 text-tertiary hover:text-tertiary"
            : "bg-status-building/20 hover:bg-status-building/30 text-status-building-foreground hover:text-status-building-foreground",
        )}
      >
        <span
          className={cn(
            "size-2 rounded-full",
            streaming ? "bg-tertiary animate-pulse" : "bg-status-building-foreground",
          )}
        />
        {streaming ? "Streaming Live" : "Stream Paused"}
        {streaming ? <Pause className="ml-1" /> : <Play className="ml-1" />}
      </Button>
      <label
        htmlFor={autoScrollId}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-surface-container text-on-surface-variant hover:text-on-surface cursor-pointer select-none"
      >
        <Checkbox
          id={autoScrollId}
          checked={autoScroll}
          onCheckedChange={(checked) => onAutoScrollChange(checked === true)}
          className="size-3.5 rounded-sm"
        />
        <span className="font-code-sm text-code-sm">Auto-scroll</span>
      </label>
      <IconAction label="Clear buffer" onClick={onClear}>
        <ListX />
      </IconAction>
      <IconAction label="Export .log file" onClick={onDownload}>
        <Download />
      </IconAction>
      <IconAction label="Toggle fullscreen" onClick={onFullscreen}>
        <Maximize />
      </IconAction>
    </div>
  );
}

function IconAction({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={label}
          onClick={onClick}
          className="rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface [&_svg:not([class*='size-'])]:size-4.5"
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

const FACET_STYLES: Record<Exclude<SeverityFilter, "all">, { pill: string; dot: string }> = {
  info: { pill: "bg-secondary-container/20 data-[state=on]:bg-secondary-container/30 text-secondary hover:bg-secondary-container/30", dot: "bg-secondary" },
  debug: { pill: "bg-tertiary-container/15 data-[state=on]:bg-tertiary-container/25 text-tertiary-fixed hover:bg-tertiary-container/25", dot: "bg-tertiary" },
  warn: {
    pill: "bg-status-building/10 data-[state=on]:bg-status-building/20 text-status-building-foreground hover:bg-status-building/20",
    dot: "bg-status-building-foreground",
  },
  error: { pill: "bg-error/15 data-[state=on]:bg-error/25 text-error hover:bg-error/25", dot: "bg-error" },
};

function SeverityFacets({
  value,
  onChange,
  counts,
}: {
  value: SeverityFilter;
  onChange: (severity: SeverityFilter) => void;
  counts: Record<SeverityFilter, number>;
}) {
  const format = (count: number) => count.toLocaleString();
  const facetClass =
    "h-auto min-w-0 rounded px-2.5 py-0.5 gap-1.5 font-code-sm text-(length:--text-code-sm) font-normal ring-1 ring-transparent data-[state=on]:ring-current/40 data-[state=on]:font-medium";

  return (
    <div className="flex items-center gap-space-xs">
      <span className="mr-1 font-label-sm text-label-sm uppercase tracking-wider text-outline">
        Severity:
      </span>
      <ToggleGroup
        type="single"
        spacing={1}
        value={value}
        onValueChange={(next) => onChange((next || "all") as SeverityFilter)}
        aria-label="Severity filter"
      >
        <ToggleGroupItem
          value="all"
          className={cn(
            facetClass,
            "bg-surface-container-highest hover:bg-surface-bright data-[state=on]:bg-surface-container-highest text-on-surface hover:text-on-surface",
          )}
        >
          All <span className="text-outline-variant font-normal">{format(counts.all)}</span>
        </ToggleGroupItem>
        {SEVERITY_FACETS.map((severity) => (
          <ToggleGroupItem
            key={severity}
            value={severity}
            className={cn(facetClass, FACET_STYLES[severity].pill, "hover:text-current")}
          >
            <span className={cn("size-1.5 rounded-full", FACET_STYLES[severity].dot)} />
            {severity.toUpperCase()}
            <span className={cn("opacity-80", severity === "error" && "font-semibold")}>
              {format(counts[severity])}
            </span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
