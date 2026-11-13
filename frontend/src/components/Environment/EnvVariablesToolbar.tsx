import { Lock, Search } from "lucide-react";
import { Input } from "#/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "#/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import { BulkEditDialog } from "./BulkEditDialog";
import { ALL_SCOPES, type DotenvEntry, SCOPE_LABELS } from "./envUtils";

export type ScopeFilter = "all" | EnvScope;

type EnvVariablesToolbarProps = {
  variables: EnvVariable[];
  query: string;
  onQueryChange: (query: string) => void;
  scopeFilter: ScopeFilter;
  onScopeFilterChange: (filter: ScopeFilter) => void;
  onBulkApply: (entries: DotenvEntry[]) => void;
};

export function EnvVariablesToolbar({
  variables,
  query,
  onQueryChange,
  scopeFilter,
  onScopeFilterChange,
  onBulkApply,
}: EnvVariablesToolbarProps) {
  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
      <div className="flex flex-1 flex-wrap items-center gap-space-sm">
        <div className="relative flex-1 min-w-60 max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none"
          />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search variables or keys..."
            aria-label="Search variables"
            className="h-auto pl-9 pr-3 py-1.5 rounded-lg border-0 shadow-inner bg-surface-container-low focus-visible:bg-surface-container focus-visible:ring-0 font-code-sm text-(length:--text-code-sm) md:text-(length:--text-code-sm) text-on-surface placeholder:text-outline/70"
          />
        </div>
        <ScopeFilterTabs
          variables={variables}
          value={scopeFilter}
          onChange={onScopeFilterChange}
        />
      </div>

      <div className="flex shrink-0 items-center justify-between lg:justify-end gap-space-sm">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container-low text-tertiary font-code-sm text-code-sm shadow-sm">
              <Lock size={14} />
              <span>AES-256-GCM Encrypted</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Stored in KMS hardware modules</TooltipContent>
        </Tooltip>
        <BulkEditDialog variables={variables} onApply={onBulkApply} />
      </div>
    </div>
  );
}

function ScopeFilterTabs({
  variables,
  value,
  onChange,
}: {
  variables: EnvVariable[];
  value: ScopeFilter;
  onChange: (filter: ScopeFilter) => void;
}) {
  const countFor = (scope: EnvScope) =>
    variables.filter((variable) => variable.scopes.includes(scope)).length;
  const triggerClass =
    "h-auto flex-none rounded px-2.5 py-1 border-0 font-label-sm text-(length:--text-label-sm) font-normal text-on-surface-variant hover:text-on-surface data-active:bg-surface-container-high data-active:text-on-surface data-active:font-medium data-active:shadow-sm";

  return (
    <Tabs value={value} onValueChange={(next) => onChange(next as ScopeFilter)}>
      <TabsList className="h-auto gap-0 p-0.5 rounded-lg bg-surface-container-low group-data-horizontal/tabs:h-auto">
        <TabsTrigger value="all" className={triggerClass}>
          All ({variables.length})
        </TabsTrigger>
        {ALL_SCOPES.map((scope) => (
          <TabsTrigger key={scope} value={scope} className={triggerClass}>
            {SCOPE_LABELS[scope].long} ({countFor(scope)})
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
