import type { ReactNode } from "react";
import {
  Check,
  Copy,
  GitBranch,
  GitCommitHorizontal,
  Network,
  Timer,
} from "lucide-react";
import { Panel } from "#/components/AppOverview/shared";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import { useCopyToClipboard } from "#/hooks/useCopyToClipboard";
import { formatElapsed, useElapsedTime } from "#/hooks/useElapsedTime";
import { RunStatusChip } from "./RunStatusChip";

export function DeploymentSummaryCard({ run }: { run: DeploymentRun }) {
  return (
    <Panel className="relative flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
      <div className="absolute -left-12 -top-12 size-48 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-space-sm min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="flex items-center gap-3 font-headline-lg text-headline-lg tracking-tight text-on-surface font-semibold">
            <span>{run.appName}</span>
            <span className="font-code-md text-code-md text-outline font-normal">
              #{run.number} ({run.id})
            </span>
          </h2>
          <RunStatusChip status={run.status} />
        </div>
        <CommitLine run={run} />
        <RunMetadata run={run} />
      </div>

      {/* <ElapsedBlock run={run} /> */}
    </Panel>
  );
}

function CommitLine({ run }: { run: DeploymentRun }) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <div className="flex flex-wrap items-center gap-2 text-on-surface">
      <GitCommitHorizontal size={18} className="text-outline" />
      <span className="font-body-md text-body-md font-medium">
        {run.commitMessage}
      </span>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => copy(run.commitSha)}
            className="group/sha h-auto rounded px-1.5 py-0.5 bg-surface-container-highest hover:bg-surface-bright text-primary hover:text-primary font-code-sm text-(length:--text-code-sm)"
          >
            {run.commitHash}
            {copied ? (
              <Check className="text-tertiary" />
            ) : (
              <Copy className="text-outline group-hover/sha:text-primary" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {copied ? "Copied!" : "Copy commit SHA"}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

function RunMetadata({ run }: { run: DeploymentRun }) {
  return (
    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1 font-code-sm text-code-sm text-on-surface-variant">
      <div className="flex items-center gap-1.5">
        <Avatar className="size-4">
          {run.author.avatarUrl && (
            <AvatarImage src={run.author.avatarUrl} alt={run.author.name} />
          )}
          <AvatarFallback className="bg-surface-container-high text-on-surface-variant text-[8px]">
            {run.author.name.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-on-surface font-medium">{run.author.name}</span>
      </div>
      <MetaSeparator />
      <MetaItem icon={<GitBranch size={15} />}>
        <span className="text-on-surface font-medium">{run.branch}</span>
      </MetaItem>
      <MetaSeparator />
      <MetaItem icon={<Network size={15} />}>{run.trigger}</MetaItem>
      <MetaSeparator />
      <span className="text-outline">Triggered {run.triggeredAgo}</span>
    </div>
  );
}

function MetaItem({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-outline">{icon}</span>
      {children}
    </div>
  );
}

function MetaSeparator() {
  return <span className="text-outline-variant">·</span>;
}

// function ElapsedBlock({ run }: { run: DeploymentRun }) {
//   const running = run.status === "building";
//   const seconds = useElapsedTime(run.elapsedSeconds, running);
//   const activeIndex = run.steps.findIndex((step) => step.state === "active");
//   const doneCount = run.steps.filter((step) => step.state === "done").length;
//   const currentStep = activeIndex >= 0 ? activeIndex + 1 : doneCount;

//   return (
//     <div className="relative z-10 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-1 px-space-md py-space-sm rounded-lg bg-surface-container">
//       <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
//         Duration
//       </span>
//       <div className="flex items-center gap-2">
//         <Timer
//           size={18}
//           className={running ? "text-secondary animate-pulse" : "text-outline"}
//         />
//         <span className="font-code-lg text-code-lg font-medium text-on-surface tracking-wider tabular-nums">
//           {formatElapsed(seconds)}
//         </span>
//       </div>
//       <span className="font-code-sm text-code-sm text-tertiary">
//         Step {currentStep} of {run.steps.length}
//       </span>
//     </div>
//   );
// }
