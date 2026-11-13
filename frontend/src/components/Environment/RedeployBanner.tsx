import { RefreshCcw, Rocket } from "lucide-react";
import { Panel } from "#/components/AppOverview/shared";
import { Button } from "#/components/ui/button";

type RedeployBannerProps = {
  pendingChanges: number;
  onExport: () => void;
  onDiscard: () => void;
  onSave: () => void;
};

export function RedeployBanner({
  pendingChanges,
  onExport,
  onDiscard,
  onSave,
}: RedeployBannerProps) {
  const hasChanges = pendingChanges > 0;

  return (
    <Panel className="relative flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md shadow-sm">
      <div className="absolute -right-8 -top-8 size-36 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex items-center gap-space-md">
        <div className="size-9 shrink-0 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
          <RefreshCcw size={20} />
        </div>
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm font-medium text-on-surface">
            {hasChanges
              ? `${pendingChanges} unsaved ${pendingChanges === 1 ? "change" : "changes"}`
              : "Changes will trigger a redeploy"}
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Modifications to environment variables automatically deploy updated
            pods with rolling zero-downtime execution.
          </p>
        </div>
      </div>

      <div className="relative z-10 flex w-full sm:w-auto shrink-0 items-center gap-space-sm">
        {hasChanges && (
          <Button
            variant="ghost"
            onClick={onDiscard}
            className="flex-1 sm:flex-none h-auto px-space-md py-1.5 text-outline hover:text-on-surface hover:bg-surface-container font-label-md text-(length:--text-label-md)"
          >
            Discard
          </Button>
        )}
        <Button
          variant="ghost"
          onClick={onExport}
          className="flex-1 sm:flex-none h-auto px-space-md py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-md text-(length:--text-label-md)"
        >
          Export .env
        </Button>
        <Button
          onClick={onSave}
          disabled={!hasChanges}
          className="flex-1 sm:flex-none h-auto px-space-md py-1.5 bg-primary hover:bg-primary/90 text-on-primary shadow-[0_0_12px_rgba(77,142,255,0.25)] font-headline-sm text-(length:--text-headline-sm)"
        >
          <Rocket />
          Save &amp; Redeploy
        </Button>
      </div>
    </Panel>
  );
}
