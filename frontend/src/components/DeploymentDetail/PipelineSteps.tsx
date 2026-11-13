import { Check, RefreshCw, X } from "lucide-react";
import { Progress } from "#/components/ui/progress";
import { cn } from "#/lib/utils";

const STEP_STYLES: Record<
  PipelineStepState,
  { container: string; badge: string; title: string; description: string }
> = {
  done: {
    container: "bg-surface-container",
    badge: "bg-tertiary-container text-on-tertiary-container shadow-sm",
    title: "text-on-surface font-medium",
    description: "text-on-surface-variant",
  },
  active: {
    container: "bg-surface-container-high shadow-md",
    badge: "bg-secondary-container text-on-secondary-container shadow-sm",
    title: "text-secondary font-semibold",
    description: "text-on-surface",
  },
  pending: {
    container: "bg-surface-container/60 opacity-60",
    badge: "bg-surface-container-highest text-outline",
    title: "text-on-surface-variant font-medium",
    description: "text-outline",
  },
  failed: {
    container: "bg-error-container/20",
    badge: "bg-error-container text-on-error-container shadow-sm",
    title: "text-error font-semibold",
    description: "text-on-surface-variant",
  },
};

const DURATION_STYLES: Record<PipelineStepState, string> = {
  done: "text-tertiary",
  active: "text-secondary animate-pulse",
  pending: "text-outline",
  failed: "text-error",
};

export function PipelineSteps({ steps }: { steps: PipelineStep[] }) {
  return (
    <div className="rounded-xl bg-surface-container-low p-space-md shadow-sm">
      <ol className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {steps.map((step, index) => (
          <PipelineStepItem key={step.title} step={step} position={index + 1} />
        ))}
      </ol>
    </div>
  );
}

function PipelineStepItem({
  step,
  position,
}: {
  step: PipelineStep;
  position: number;
}) {
  const style = STEP_STYLES[step.state];
  return (
    <li
      aria-current={step.state === "active" ? "step" : undefined}
      className={cn("flex items-start gap-3 p-space-sm rounded-lg", style.container)}
    >
      <div
        className={cn(
          "size-7 rounded-full flex items-center justify-center shrink-0",
          style.badge,
        )}
      >
        <StepIcon state={step.state} position={position} />
      </div>
      <div className="flex flex-col min-w-0 w-full">
        <div className="flex items-center justify-between gap-1">
          <span className={cn("font-headline-sm text-headline-sm", style.title)}>
            {position}. {step.title}
          </span>
          {step.duration && (
            <span
              className={cn(
                "font-code-sm text-code-sm",
                DURATION_STYLES[step.state],
              )}
            >
              {step.duration}
            </span>
          )}
        </div>
        <span
          className={cn("font-body-sm text-body-sm truncate", style.description)}
        >
          {step.description}
        </span>
        {step.state === "active" && step.progress !== undefined && (
          <Progress
            value={step.progress}
            aria-label={`${step.title} progress`}
            className="mt-2 h-1.5 bg-surface-container-lowest *:data-[slot=progress-indicator]:bg-secondary *:data-[slot=progress-indicator]:rounded-full *:data-[slot=progress-indicator]:animate-pulse"
          />
        )}
      </div>
    </li>
  );
}

function StepIcon({
  state,
  position,
}: {
  state: PipelineStepState;
  position: number;
}) {
  switch (state) {
    case "done":
      return <Check size={16} strokeWidth={3} />;
    case "active":
      return <RefreshCw size={15} className="animate-spin" />;
    case "failed":
      return <X size={16} strokeWidth={3} />;
    default:
      return <span className="font-code-sm text-code-sm">{position}</span>;
  }
}
