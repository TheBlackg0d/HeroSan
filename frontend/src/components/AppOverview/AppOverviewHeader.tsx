import { Link } from "@tanstack/react-router";
import {
  Cpu,
  EllipsisVertical,
  Globe,
  Pause,
  RotateCw,
  Rocket,
  Scaling,
  SquareTerminal,
  Trash2,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#/components/ui/breadcrumb";
import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { AppTabsList } from "./AppTabs";
import { EndpointPill } from "./EndpointPill";
import { Pill } from "./shared";

type AppOverviewHeaderProps = {
  app: AppOverview;
};

export function AppOverviewHeader({ app }: AppOverviewHeaderProps) {
  return (
    <div className="flex flex-col gap-space-sm">
      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <AppBreadcrumb workspace={app.workspace} appName={app.name} />
        <AppMetaTags app={app} />
      </div>
      <AppTitleBar app={app} />
      <AppTabsList deploymentCount={app.deploymentCount} />
    </div>
  );
}

function AppBreadcrumb({
  workspace,
  appName,
}: {
  workspace: string;
  appName: string;
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-space-xs font-code-sm text-(length:--text-code-sm) text-outline">
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-on-surface">
            <Link to="/">{workspace}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-outline-variant">/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-on-surface">
            <Link to="/">Applications</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-outline-variant">/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-primary font-medium">
            {appName}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function AppMetaTags({ app }: { app: AppOverview }) {
  return (
    <div className="flex flex-wrap items-center gap-space-xs">
      <Pill shape="tag" className="px-space-sm font-normal">
        <Cpu className="text-secondary" />
        {app.framework}
      </Pill>
      <Pill shape="tag" className="px-space-sm font-normal">
        <Globe className="text-outline" />
        {app.region}
      </Pill>
      <Pill
        shape="tag"
        dot
        className="px-space-sm font-normal bg-surface-container text-tertiary"
        dotClassName="bg-tertiary"
      >
        Autoscale {app.autoscale.min}–{app.autoscale.max} pods
      </Pill>
    </div>
  );
}

const ENVIRONMENT_LABEL: Record<Environment, string> = {
  production: "Production",
  staging: "Staging",
  preview: "Preview",
};

function AppTitleBar({ app }: { app: AppOverview }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pt-space-xs">
      <div className="flex flex-col sm:flex-row sm:items-center gap-space-md min-w-0">
        <div className="flex items-center gap-space-sm">
          <div className="size-10 rounded-lg bg-surface-container-high flex items-center justify-center shadow-md">
            <SquareTerminal size={22} className="text-primary" />
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            {app.name}
          </h1>
          <Pill
            tone="success"
            dot
            pulse
            className="px-2.5"
            dotClassName="size-2 shadow-[0_0_8px_rgba(78,222,163,0.8)]"
          >
            {ENVIRONMENT_LABEL[app.environment]} · Live
          </Pill>
        </div>
        <EndpointPill url={app.endpoint} />
      </div>
      <AppHeaderActions />
    </div>
  );
}

const headerButtonClass =
  "h-auto rounded-lg px-space-md py-1.5 font-headline-sm text-(length:--text-headline-sm) [&_svg:not([class*='size-'])]:size-4.5";

function AppHeaderActions() {
  return (
    <div className="flex items-center gap-space-sm self-start md:self-auto">
      <Button
        variant="ghost"
        className={`${headerButtonClass} bg-surface-container text-on-surface hover:bg-surface-container-high hover:text-on-surface`}
      >
        <SquareTerminal />
        CLI Exec
      </Button>
      <Button
        className={`${headerButtonClass} bg-primary-container text-on-primary shadow-md hover:bg-inverse-primary active:scale-[0.99]`}
      >
        <Rocket />
        Redeploy
      </Button>
      <AppActionsMenu />
    </div>
  );
}

function AppActionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="More actions"
          className="bg-surface-container text-outline hover:text-on-surface hover:bg-surface-container-high"
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <RotateCw />
          Restart pods
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Scaling />
          Scale replicas
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Pause />
          Suspend app
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Delete app
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
