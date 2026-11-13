import { Pill } from "#/components/AppOverview/shared";
import { ToggleGroup, ToggleGroupItem } from "#/components/ui/toggle-group";
import { cn } from "#/lib/utils";
import { ALL_SCOPES, SCOPE_LABELS } from "./envUtils";

type ScopeToggleGroupProps = {
  value: EnvScope[];
  onChange: (scopes: EnvScope[]) => void;
  className?: string;
};

export function ScopeToggleGroup({ value, onChange, className }: ScopeToggleGroupProps) {
  return (
    <ToggleGroup
      type="multiple"
      spacing={1}
      value={value}
      onValueChange={(next) => onChange(ALL_SCOPES.filter((scope) => next.includes(scope)))}
      aria-label="Environment scopes"
      className={cn("w-full p-1 rounded-lg bg-surface-container-lowest", className)}
    >
      {ALL_SCOPES.map((scope) => (
        <ToggleGroupItem
          key={scope}
          value={scope}
          aria-label={SCOPE_LABELS[scope].long}
          className="flex-1 h-auto min-w-0 py-1 rounded font-code-sm text-(length:--text-code-sm) font-normal text-outline hover:bg-transparent hover:text-on-surface data-[state=on]:bg-primary/20 data-[state=on]:text-primary data-[state=on]:font-medium"
        >
          {SCOPE_LABELS[scope].short}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export function ScopeBadges({ scopes }: { scopes: EnvScope[] }) {
  if (scopes.length === ALL_SCOPES.length) {
    return (
      <Pill shape="tag" tone="success" className="px-1.5 font-normal bg-tertiary-container/15">
        All Envs
      </Pill>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {scopes.map((scope) => (
        <Pill
          key={scope}
          shape="tag"
          tone={scope === "production" ? "primary" : "neutral"}
          className={cn(
            "px-1.5 font-normal",
            scope === "production" && "bg-primary-container/15",
          )}
        >
          {SCOPE_LABELS[scope].long}
        </Pill>
      ))}
    </div>
  );
}
