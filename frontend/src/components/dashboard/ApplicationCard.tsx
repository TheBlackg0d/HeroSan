import type { ReactNode } from "react";
import {
  ArrowLeftRight,
  ArrowRight,
  ArrowUpDown,
  CircleAlert,
  Ellipsis,
  ExternalLink,
  Gauge,
  GitCommitHorizontal,
  RefreshCw,
  RotateCcw,
  Rocket,
  Server,
  ShieldUser,
  Split,
  SquareTerminal,
  ChartNoAxesCombined,
} from "lucide-react";
import { cn } from "#/lib/utils";

type ApplicationCardProps = {
  application: Application;
};

export function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <div
      className="app-card group relative bg-surface-container-low hover:bg-surface-container rounded-xl p-space-lg flex flex-col justify-between text-left transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
      data-env={application.environment}
    >
      <div className="flex flex-col gap-space-md">
        <ApplicationCardHeader
          icon={application.icon}
          name={application.name}
          language={application.language}
          url={application.url}
        />
        <StatusRow application={application} />
        <VersionControlBox versionControl={application.versionControl} />
      </div>
      <ApplicationCardFooter application={application} />
    </div>
  );
}

/* ---------------------------------- Header --------------------------------- */

const ICONS: Record<ApplicationIcon, ReactNode> = {
  nextjs: <NextJsLogo />,
  shield: <ShieldUser size={22} className="text-secondary" />,
  analytics: <ChartNoAxesCombined size={22} className="text-error" />,
  server: <Server size={22} className="text-tertiary" />,
  sync: <ArrowLeftRight size={22} className="text-secondary" />,
  rocket: <Rocket size={22} className="text-primary" />,
};

type ApplicationCardHeaderProps = Pick<
  Application,
  "icon" | "name" | "language" | "url"
>;

function ApplicationCardHeader({
  icon,
  name,
  language,
  url,
}: ApplicationCardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-space-sm">
      <div className="flex items-center gap-space-sm min-w-0">
        <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 group-hover:bg-surface-bright transition-colors">
          {ICONS[icon]}
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
              {name}
            </h3>
            <span className="font-code-sm text-code-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-medium whitespace-nowrap">
              {language}
            </span>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-on-surface-variant hover:text-secondary transition-colors mt-0.5 min-w-0"
          >
            <span className="font-code-sm text-code-sm truncate">{url}</span>
            <ExternalLink size={13} className="shrink-0" />
          </a>
        </div>
      </div>
      <button
        aria-label="Menu"
        className="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
        type="button"
      >
        <Ellipsis size={18} />
      </button>
    </div>
  );
}

/* ---------------------------------- Status --------------------------------- */

function StatusRow({ application }: { application: Application }) {
  const { status, build, failure, lastDeployed } = application;

  if (status === "building" && build) {
    return (
      <div className="flex items-center justify-between gap-space-xs">
        <StatusBadge
          className="bg-secondary-container/20 text-secondary"
          dotClassName="w-2 h-2 bg-secondary animate-ping shadow-[0_0_10px_rgba(123,208,255,0.9)]"
          label={`Building · ${build.elapsedTime} elapsed`}
        />
      </div>
    );
  }

  if (status === "failed" && failure) {
    return (
      <div className="flex items-center justify-between gap-space-xs">
        <StatusBadge
          className="bg-error-container/30 text-error"
          dotClassName="bg-error shadow-[0_0_8px_rgba(255,180,171,0.8)]"
          label={`Failed · Exit ${failure.exitCode} (${failure.reason})`}
        />
        <span className="font-code-sm text-code-sm text-error">
          {lastDeployed}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-space-xs">
      <LiveBadge application={application} />
      <span className="font-code-sm text-code-sm text-outline">
        {lastDeployed}
      </span>
    </div>
  );
}

function LiveBadge({ application }: { application: Application }) {
  switch (application.environment) {
    case "staging":
      return (
        <StatusBadge
          className="bg-secondary-container/20 text-secondary"
          dotClassName="bg-secondary"
          label="Staging · Live"
        />
      );
    case "preview":
      return (
        <StatusBadge
          className="bg-primary-container/20 text-primary"
          dotClassName="bg-primary shadow-[0_0_8px_rgba(173,198,255,0.8)]"
          label={`Preview · PR #${application.pullRequest}`}
        />
      );
    default:
      return (
        <StatusBadge
          className="bg-tertiary-container/20 text-tertiary"
          dotClassName="bg-tertiary shadow-[0_0_8px_rgba(78,222,163,0.8)]"
          label="Production · Live"
        />
      );
  }
}

type StatusBadgeProps = {
  className: string;
  dotClassName: string;
  label: string;
};

function StatusBadge({ className, dotClassName, label }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full",
        className,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", dotClassName)} />
      <span className="font-code-sm text-code-sm font-medium">{label}</span>
    </div>
  );
}

/* ------------------------------ Version control ----------------------------- */

function VersionControlBox({
  versionControl,
}: Pick<Application, "versionControl">) {
  return (
    <div className="bg-surface-container-lowest p-space-sm rounded-lg flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2 text-on-surface-variant font-code-sm text-code-sm">
        <div className="flex items-center gap-1 min-w-0">
          <GitCommitHorizontal size={14} className="shrink-0 text-outline" />
          <span className="truncate">{versionControl.repositoryName}</span>
        </div>
        <div className="flex items-center gap-1 text-primary min-w-0">
          <Split size={13} className="shrink-0" />
          <span className="font-medium truncate">{versionControl.branch}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-code-sm text-code-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface font-medium select-all">
          {versionControl.commitHash}
        </span>
        <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
          {versionControl.commitMessage}
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------- Footer --------------------------------- */

function ApplicationCardFooter({ application }: { application: Application }) {
  const { status, build, failure, deployment, environment } = application;

  if (status === "building" && build) {
    return (
      <FooterRow className="text-outline">
        <div className="flex items-center gap-2 text-secondary">
          <RefreshCw size={15} className="animate-spin" />
          <span>{build.currentStep}</span>
        </div>
        <a
          className="text-secondary hover:text-primary transition-colors flex items-center gap-1 font-medium"
          href="#"
        >
          <span>Terminal</span>
          <SquareTerminal size={14} />
        </a>
      </FooterRow>
    );
  }

  if (status === "failed" && failure) {
    return (
      <FooterRow>
        <div className="flex items-center gap-1 text-error">
          <CircleAlert size={15} />
          <span>{failure.message}</span>
        </div>
        <button
          type="button"
          className="px-2 py-0.5 rounded bg-error-container/30 text-error hover:bg-error-container/50 transition-colors flex items-center gap-1 font-medium"
        >
          <span>Rollback</span>
          <RotateCcw size={14} />
        </button>
      </FooterRow>
    );
  }

  const podDotColor =
    environment === "staging" ? "bg-secondary" : "bg-tertiary";
  const podsLabel =
    typeof deployment.pods === "number"
      ? `${deployment.pods} pods`
      : deployment.pods;

  return (
    <FooterRow className="text-outline">
      <div className="flex items-center gap-space-md min-w-0">
        <span className="flex items-center gap-1 text-on-surface-variant whitespace-nowrap">
          <span className={cn("w-2 h-2 rounded-full", podDotColor)} />
          {podsLabel}
        </span>
        <span className="flex items-center gap-1 whitespace-nowrap">
          <MetricIcon kind={deployment.metricKind} />
          {deployment.metric}
        </span>
      </div>
      <a
        className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
        href="#"
      >
        <span>{deployment.action}</span>
        <ArrowRight size={14} />
      </a>
    </FooterRow>
  );
}

function MetricIcon({ kind }: { kind: Deployment["metricKind"] }) {
  if (kind === "latency") return <Gauge size={13} />;
  if (kind === "throughput") return <ArrowUpDown size={13} />;
  return null;
}

function FooterRow({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mt-space-md pt-space-sm flex items-center justify-between gap-2 font-code-sm text-code-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

function NextJsLogo() {
  return (
    <svg className="w-5 h-5 text-on-surface" fill="none" viewBox="0 0 180 180">
      <path
        clipRule="evenodd"
        d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180ZM143.5 143.5L78.2 54H61V126H75.5V72.4L132.8 151.7C136.6 149.3 140.2 146.5 143.5 143.5ZM119 54H104.5V106.8L119 126.8V54Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
