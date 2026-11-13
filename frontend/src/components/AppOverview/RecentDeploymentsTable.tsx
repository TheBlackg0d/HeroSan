import type { ReactNode } from "react";
import {
  ArrowRight,
  Bug,
  CircleX,
  Ellipsis,
  GitBranch,
  History,
  SquareTerminal,
} from "lucide-react";
import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import { cn } from "#/lib/utils";
import { Pill, SectionTitle } from "./shared";

const COLUMNS = [
  "Deployment",
  "Commit / Message",
  "Branch",
  "Status",
  "Duration",
  "Triggered",
] as const;

type RecentDeploymentsTableProps = {
  deployments: DeploymentRecord[];
  totalCount: number;
  title?: string;
  onViewAll?: () => void;
  onSelect?: (deploymentNumber: number) => void;
};

export function RecentDeploymentsTable({
  deployments,
  totalCount,
  title = "Recent Deployments",
  onViewAll,
  onSelect,
}: RecentDeploymentsTableProps) {
  return (
    <section className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <SectionTitle
          icon={<History size={20} className="text-primary" />}
          title={title}
        >
          <Pill className="font-normal">{totalCount} total</Pill>
        </SectionTitle>
        {onViewAll && (
          <Button
            variant="link"
            onClick={onViewAll}
            className="h-auto p-0 font-headline-sm text-(length:--text-headline-sm) text-primary hover:text-primary-fixed hover:no-underline"
          >
            View all {totalCount} deployments
            <ArrowRight />
          </Button>
        )}
      </div>

      <div className="rounded-xl bg-surface-container-low shadow-md overflow-hidden">
        <Table className="font-body-md text-(length:--text-body-md)">
          <TableHeader className="[&_tr]:border-0">
            <TableRow className="bg-surface-container/60 hover:bg-surface-container/60">
              {COLUMNS.map((column) => (
                <HeaderCell key={column}>{column}</HeaderCell>
              ))}
              <HeaderCell className="text-right">Actions</HeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deployments.map((deployment) => (
              <DeploymentRow
                key={deployment.number}
                deployment={deployment}
                onSelect={onSelect}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

function HeaderCell({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <TableHead
      className={cn(
        "h-auto py-space-sm px-space-md font-code-sm text-code-sm font-medium uppercase text-outline",
        className,
      )}
    >
      {children}
    </TableHead>
  );
}

const ROW_STYLES: Record<
  DeploymentRecordStatus,
  { hash: string; message: string }
> = {
  building: {
    hash: "text-secondary",
    message: "text-on-surface group-hover:text-secondary",
  },
  live: {
    hash: "text-primary",
    message: "text-on-surface group-hover:text-primary",
  },
  deployed: {
    hash: "text-outline",
    message: "text-on-surface-variant group-hover:text-on-surface",
  },
  failed: {
    hash: "text-error",
    message: "text-on-surface-variant group-hover:text-error",
  },
};

const cellClass = "py-space-md px-space-md";

type DeploymentRowProps = {
  deployment: DeploymentRecord;
  onSelect?: (deploymentNumber: number) => void;
};

function DeploymentRow({ deployment, onSelect }: DeploymentRowProps) {
  const styles = ROW_STYLES[deployment.status];
  const select = onSelect ? () => onSelect(deployment.number) : undefined;
  return (
    <TableRow
      onClick={select}
      className={cn(
        "group border-0 hover:bg-surface-container/40",
        select && "cursor-pointer",
      )}
    >
      <TableCell className={cellClass}>
        <div className="flex items-center gap-space-xs font-code-sm text-code-sm">
          <span className="text-on-surface font-semibold">
            #{deployment.number}
          </span>
          <Pill
            shape="tag"
            className={cn("px-1.5 font-normal", styles.hash)}
          >
            {deployment.commitHash}
          </Pill>
        </div>
      </TableCell>
      <TableCell className={cn(cellClass, "max-w-md min-w-70 whitespace-normal")}>
        <span
          className={cn(
            "font-medium line-clamp-1 transition-colors",
            styles.message,
          )}
        >
          {deployment.commitMessage}
        </span>
      </TableCell>
      <TableCell className={cellClass}>
        <Pill shape="tag" className="px-1.5 font-normal">
          <GitBranch />
          {deployment.branch}
        </Pill>
      </TableCell>
      <TableCell className={cellClass}>
        <DeploymentStatusPill deployment={deployment} />
      </TableCell>
      <TableCell className={cn(cellClass, "font-code-sm text-code-sm text-on-surface")}>
        {deployment.duration}
      </TableCell>
      <TableCell className={cn(cellClass, "font-code-sm text-code-sm text-outline")}>
        {deployment.triggeredAgo}
      </TableCell>
      <TableCell className={cn(cellClass, "text-right")}>
        <div className="flex items-center justify-end gap-1">
          <DeploymentRowActions deployment={deployment} onViewLogs={select} />
        </div>
      </TableCell>
    </TableRow>
  );
}

function DeploymentStatusPill({ deployment }: { deployment: DeploymentRecord }) {
  switch (deployment.status) {
    case "building":
      return (
        <Pill tone="info" dot pulse className="px-2.5">
          Building
        </Pill>
      );
    case "live":
      return (
        <Pill tone="success" dot pulse className="px-2.5">
          Live
        </Pill>
      );
    case "failed":
      return (
        <Pill tone="error" dot className="px-2.5">
          Failed
          {deployment.exitCode !== undefined &&
            ` (Exit code ${deployment.exitCode})`}
        </Pill>
      );
    default:
      return (
        <Pill tone="neutral" dot className="px-2.5 font-normal">
          Deployed
        </Pill>
      );
  }
}

function DeploymentRowActions({
  deployment,
  onViewLogs,
}: {
  deployment: DeploymentRecord;
  onViewLogs?: () => void;
}) {
  const logsAction = (
    <RowIconButton label="View build logs" onClick={onViewLogs}>
      <SquareTerminal />
    </RowIconButton>
  );

  if (deployment.status === "building") {
    return (
      <>
        {logsAction}
        <RowIconButton
          label="Cancel build"
          className="text-error hover:text-error hover:bg-error-container/20"
        >
          <CircleX />
        </RowIconButton>
      </>
    );
  }

  if (deployment.status === "live") {
    return (
      <>
        {logsAction}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              onClick={(event) => event.stopPropagation()}
              variant="ghost"
              size="icon-xs"
              aria-label="Deployment options"
              className="rounded text-outline hover:text-on-surface hover:bg-surface-container"
            >
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem>Redeploy</DropdownMenuItem>
            <DropdownMenuItem>Promote to staging</DropdownMenuItem>
            <DropdownMenuItem>Copy deployment ID</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }

  if (deployment.status === "failed") {
    return (
      <>
        <RowIconButton
          label="Inspect failure stack trace"
          className="text-error hover:text-error hover:bg-error-container/20"
        >
          <Bug />
        </RowIconButton>
        {logsAction}
      </>
    );
  }

  return (
    <>
      <RowIconButton label={`Rollback to #${deployment.number}`}>
        <History />
      </RowIconButton>
      {logsAction}
    </>
  );
}

function RowIconButton({
  label,
  className,
  onClick,
  children,
}: {
  label: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={label}
          onClick={(event) => {
            event.stopPropagation();
            onClick?.();
          }}
          className={cn(
            "rounded text-outline hover:text-on-surface hover:bg-surface-container",
            className,
          )}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
