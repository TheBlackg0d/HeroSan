import { type ReactNode, useId } from "react";
import { Check, Copy, Download, Maximize, Search, WrapText } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { Input } from "#/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "#/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import { cn } from "#/lib/utils";

export type LogFilter = "all" | "build" | "container" | "errors";

type LogToolbarProps = {
  filter: LogFilter;
  onFilterChange: (filter: LogFilter) => void;
  errorCount: number;
  query: string;
  onQueryChange: (query: string) => void;
  matchCount: number;
  autoScroll: boolean;
  onAutoScrollChange: (value: boolean) => void;
  wrap: boolean;
  onWrapToggle: () => void;
  copied: boolean;
  onCopy: () => void;
  onDownload: () => void;
  onFullscreen: () => void;
};

export function LogToolbar(props: LogToolbarProps) {
  const autoScrollId = useId();
  return (
    <div className="px-4 py-2.5 bg-surface-container-lowest flex flex-wrap items-center justify-between gap-3 text-on-surface-variant">
      <LogFilterTabs
        value={props.filter}
        onChange={props.onFilterChange}
        errorCount={props.errorCount}
      />
      <LogSearch
        query={props.query}
        onChange={props.onQueryChange}
        matchCount={props.matchCount}
      />
      <div className="flex items-center gap-2 font-code-sm text-code-sm">
        <label
          htmlFor={autoScrollId}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container/60 cursor-pointer select-none hover:text-on-surface transition-colors"
        >
          <Checkbox
            id={autoScrollId}
            checked={props.autoScroll}
            onCheckedChange={(checked) => props.onAutoScrollChange(checked === true)}
            className="size-3.5 rounded-sm data-checked:bg-secondary data-checked:border-secondary data-checked:text-on-secondary"
          />
          <span className={props.autoScroll ? "text-secondary font-medium" : ""}>
            Auto-scroll
          </span>
        </label>
        <ToolbarIconButton
          label={props.wrap ? "Disable line wrap" : "Enable line wrap"}
          onClick={props.onWrapToggle}
          active={props.wrap}
        >
          <WrapText />
        </ToolbarIconButton>
        <ToolbarIconButton
          label={props.copied ? "Copied!" : "Copy raw stdout"}
          onClick={props.onCopy}
        >
          {props.copied ? <Check className="text-tertiary" /> : <Copy />}
        </ToolbarIconButton>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={props.onDownload}
              className="h-auto rounded px-2 py-1 bg-surface-container hover:bg-surface-container-high text-on-surface hover:text-on-surface font-code-sm text-(length:--text-code-sm)"
            >
              <Download className="text-outline" />
              <span className="hidden md:inline">.log</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download .log file</TooltipContent>
        </Tooltip>
        <ToolbarIconButton label="Expand to fullscreen" onClick={props.onFullscreen}>
          <Maximize />
        </ToolbarIconButton>
      </div>
    </div>
  );
}

function LogFilterTabs({
  value,
  onChange,
  errorCount,
}: {
  value: LogFilter;
  onChange: (filter: LogFilter) => void;
  errorCount: number;
}) {
  const triggerClass =
    "h-auto flex-none rounded px-2.5 py-1 border-0 font-code-sm text-(length:--text-code-sm) font-normal text-on-surface-variant hover:text-on-surface data-active:bg-surface-bright data-active:text-on-surface data-active:font-medium data-active:shadow-none";

  return (
    <Tabs value={value} onValueChange={(next) => onChange(next as LogFilter)}>
      <TabsList className="h-auto gap-1 p-0.5 rounded-lg bg-surface-container group-data-horizontal/tabs:h-auto">
        <TabsTrigger value="all" className={triggerClass}>
          All Logs
        </TabsTrigger>
        <TabsTrigger value="build" className={triggerClass}>
          Build Steps
        </TabsTrigger>
        <TabsTrigger value="container" className={triggerClass}>
          Container Init
        </TabsTrigger>
        <TabsTrigger
          value="errors"
          className={cn(triggerClass, "hover:text-error data-active:text-error")}
        >
          Errors
          <span
            className={cn(
              "px-1 rounded font-code-sm text-code-sm",
              errorCount > 0
                ? "bg-error-container/40 text-error"
                : "bg-surface-container-highest text-outline",
            )}
          >
            {errorCount}
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

function LogSearch({
  query,
  onChange,
  matchCount,
}: {
  query: string;
  onChange: (query: string) => void;
  matchCount: number;
}) {
  return (
    <div className="relative flex items-center flex-1 sm:flex-initial min-w-55 max-w-sm">
      <Search size={16} className="absolute left-2.5 text-outline pointer-events-none" />
      <Input
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search logs (regex supported)..."
        aria-label="Search logs"
        className="h-auto pl-8 pr-18 py-1 rounded-lg border-0 bg-surface-container focus-visible:bg-surface-container-high focus-visible:ring-0 font-code-sm text-(length:--text-code-sm) md:text-(length:--text-code-sm) text-on-surface placeholder:text-outline"
      />
      <span className="absolute right-2 px-1 rounded bg-surface-container-highest font-code-sm text-code-sm text-outline pointer-events-none">
        {matchCount} items
      </span>
    </div>
  );
}

function ToolbarIconButton({
  label,
  onClick,
  active = false,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={label}
          aria-pressed={active || undefined}
          onClick={onClick}
          className={cn(
            "rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container [&_svg:not([class*='size-'])]:size-4.5",
            active && "text-secondary bg-surface-container",
          )}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
