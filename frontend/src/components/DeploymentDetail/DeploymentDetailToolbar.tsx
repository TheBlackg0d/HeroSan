import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, CircleX, Code, History } from "lucide-react";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";

type DeploymentDetailToolbarProps = {
  run: DeploymentRun;
  onBack: () => void;
};

export function DeploymentDetailToolbar({
  run,
  onBack,
}: DeploymentDetailToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-space-md">
      <Button
        variant="link"
        onClick={onBack}
        className="group/back h-auto p-0 gap-1.5 text-primary hover:text-primary-fixed hover:no-underline font-body-sm text-(length:--text-body-sm) font-medium"
      >
        <ArrowLeft className="group-hover/back:-translate-x-0.5 transition-transform" />
        Back to all deployments
      </Button>

      <div className="flex items-center gap-space-sm">
        <ToolbarButton asLink={run.commitUrl}>
          <Code className="text-outline group-hover/tb:text-primary transition-colors" />
          View on GitHub
          <ArrowUpRight className="size-3.5 text-outline group-hover/tb:text-on-surface" />
        </ToolbarButton>
        <ToolbarButton>
          <History className="text-outline" />
          Re-run
        </ToolbarButton>
        {run.status === "building" && (
          <ToolbarButton className="bg-error-container/20 hover:bg-error-container/40 text-error hover:text-error">
            <CircleX />
            Cancel build
          </ToolbarButton>
        )}
      </div>
    </div>
  );
}

function ToolbarButton({
  asLink,
  className,
  children,
}: {
  asLink?: string;
  className?: string;
  children: ReactNode;
}) {
  const classes = cn(
    "group/tb h-auto rounded-lg px-3 py-1.5 shadow-sm bg-surface-container hover:bg-surface-container-high text-on-surface hover:text-on-surface font-body-sm text-(length:--text-body-sm)",
    className,
  );

  if (asLink) {
    return (
      <Button asChild variant="ghost" className={classes}>
        <a href={asLink} target="_blank" rel="noreferrer">
          {children}
        </a>
      </Button>
    );
  }

  return (
    <Button variant="ghost" className={classes}>
      {children}
    </Button>
  );
}
