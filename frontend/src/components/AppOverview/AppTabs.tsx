import type { ReactNode } from "react";
import { TabsList, TabsTrigger } from "#/components/ui/tabs";

export type AppTab =
  | "overview"
  | "deployments"
  | "logs"
  | "metrics"
  | "environment"
  | "settings";

export function AppTabsList({ deploymentCount }: { deploymentCount: number }) {
  return (
    <TabsList
      variant="line"
      className="w-full justify-start gap-space-lg overflow-x-auto rounded-none p-0 pt-space-md group-data-horizontal/tabs:h-auto"
    >
      <AppTabTrigger value="overview">Overview</AppTabTrigger>
      <AppTabTrigger value="deployments">
        Deployments
        <span className="px-1.5 rounded-full bg-surface-container text-on-surface-variant font-code-sm text-code-sm">
          {deploymentCount}
        </span>
      </AppTabTrigger>
      <AppTabTrigger value="logs">
        Logs
        <span className="size-1.5 rounded-full bg-tertiary" />
      </AppTabTrigger>
      <AppTabTrigger value="metrics">Metrics</AppTabTrigger>
      <AppTabTrigger value="environment">Environment</AppTabTrigger>
      <AppTabTrigger value="settings">Settings</AppTabTrigger>
    </TabsList>
  );
}

function AppTabTrigger({
  value,
  children,
}: {
  value: AppTab;
  children: ReactNode;
}) {
  return (
    <TabsTrigger
      value={value}
      className="flex-none h-auto rounded-none border-0 px-0 pt-0 pb-space-sm font-headline-sm text-(length:--text-headline-sm) text-outline hover:text-on-surface data-active:text-primary data-active:font-semibold after:bg-primary group-data-horizontal/tabs:after:bottom-0"
    >
      {children}
    </TabsTrigger>
  );
}
