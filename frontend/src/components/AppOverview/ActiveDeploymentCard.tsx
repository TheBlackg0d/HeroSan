import type { ReactNode } from "react";
import {
  Clock,
  Eye,
  GitBranch,
  GitCommitHorizontal,
  History,
  Layers,
  Split,
  Timer,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import { Panel, Pill, SectionTitle } from "./shared";

export function ActiveDeploymentCard({
  deployment,
}: {
  deployment: ActiveDeployment;
}) {
  return (
    <Panel className="relative">
      <div className="absolute -right-20 -top-20 size-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-space-md">
        <SectionTitle
          as="span"
          icon={<Layers size={20} className="text-secondary" />}
          title="Active Production Deployment"
        >
          <Pill shape="tag" tone="neutral" className="text-primary">
            {deployment.id}
          </Pill>
          <Pill tone="success" dot>
            Live
          </Pill>
        </SectionTitle>
        <DeploymentActions />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-space-md p-space-md rounded-lg bg-surface-container">
        <CommitSummary deployment={deployment} />
        <ReleaseStats deployment={deployment} />
      </div>
    </Panel>
  );
}

function DeploymentActions() {
  return (
    <div className="flex items-center gap-space-xs">
      <CardActionButton icon={<Eye />}>View Build Log</CardActionButton>
      <CardActionButton icon={<Split />}>Inspect Ingress</CardActionButton>
      <CardActionButton
        icon={<History />}
        className="text-outline hover:text-error hover:bg-error-container/20"
      >
        Rollback
      </CardActionButton>
    </div>
  );
}

function CardActionButton({
  icon,
  className,
  children,
}: {
  icon: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "rounded bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-body-sm text-(length:--text-body-sm)",
        className,
      )}
    >
      {icon}
      {children}
    </Button>
  );
}

function CommitSummary({ deployment }: { deployment: ActiveDeployment }) {
  return (
    <div className="md:col-span-7 flex items-start gap-space-sm">
      <GitCommitHorizontal
        size={20}
        className="text-primary mt-0.5 shrink-0"
      />
      <div className="flex flex-col min-w-0">
        <span className="font-body-lg text-body-lg text-on-surface font-medium leading-tight">
          {deployment.commitMessage}
        </span>
        <div className="flex flex-wrap items-center gap-space-sm mt-1 font-code-sm text-code-sm text-outline">
          <Pill shape="tag" tone="neutral" className="text-primary px-1.5">
            {deployment.commitHash}
          </Pill>
          <span className="flex items-center gap-1 text-on-surface-variant">
            <GitBranch size={14} />
            {deployment.branch}
          </span>
          <span>•</span>
          <span>{deployment.trigger}</span>
        </div>
      </div>
    </div>
  );
}

function ReleaseStats({ deployment }: { deployment: ActiveDeployment }) {
  const { author } = deployment;
  return (
    <div className="md:col-span-5 flex flex-wrap sm:flex-nowrap items-center justify-between md:justify-end gap-space-lg">
      <div className="flex items-center gap-space-sm">
        <Avatar className="shadow-sm">
          {author.avatarUrl && <AvatarImage src={author.avatarUrl} alt={author.name} />}
          <AvatarFallback className="bg-surface-container-high text-on-surface-variant font-code-sm text-(length:--text-code-sm)">
            {author.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <StatBlock value={author.name} label="Author" />
      </div>
      <StatBlock
        icon={<Timer size={16} className="text-tertiary" />}
        value={deployment.buildDuration}
        label="Build duration"
      />
      <StatBlock
        icon={<Clock size={16} className="text-secondary" />}
        value={deployment.deployedAgo}
        label={`Deployed at ${deployment.deployedAt}`}
      />
    </div>
  );
}

function StatBlock({
  icon,
  value,
  label,
}: {
  icon?: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 font-body-md text-body-md text-on-surface">
        {icon}
        <span className={icon ? "font-semibold" : "font-medium"}>{value}</span>
      </div>
      <span className="font-code-sm text-code-sm text-outline">{label}</span>
    </div>
  );
}
