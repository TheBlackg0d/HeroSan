import { cn } from "#/lib/utils";

const STATUS_STYLES: Record<
  DeploymentRecordStatus,
  { label: string; text: string; dot: string; ping: boolean }
> = {
  building: {
    label: "Building",
    text: "text-secondary",
    dot: "bg-secondary",
    ping: true,
  },
  live: { label: "Live", text: "text-tertiary", dot: "bg-tertiary", ping: true },
  deployed: {
    label: "Deployed",
    text: "text-on-surface-variant",
    dot: "bg-outline",
    ping: false,
  },
  failed: { label: "Failed", text: "text-error", dot: "bg-error", ping: false },
};

export function RunStatusChip({ status }: { status: DeploymentRecordStatus }) {
  const style = STATUS_STYLES[status];
  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container-highest shadow-sm">
      <span className="relative flex size-2">
        {style.ping && (
          <span
            className={cn(
              "absolute inline-flex size-full rounded-full opacity-75 animate-ping",
              style.dot,
            )}
          />
        )}
        <span className={cn("relative inline-flex size-2 rounded-full", style.dot)} />
      </span>
      <span
        className={cn(
          "font-code-sm text-code-sm font-semibold uppercase tracking-wider",
          style.text,
        )}
      >
        {style.label}
      </span>
    </div>
  );
}
