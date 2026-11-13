import { useState } from "react";
import { DeploymentsTab } from "#/components/DeploymentDetail/DeploymentsTab";
import { EnvironmentTab } from "#/components/Environment/EnvironmentTab";
import { LogsTab } from "#/components/RuntimeLogs/LogsTab";
import { SettingsTab } from "#/components/Settings/SettingsTab";
import { Tabs, TabsContent } from "#/components/ui/tabs";
import { ActiveDeploymentCard } from "./ActiveDeploymentCard";
import { AppOverviewHeader } from "./AppOverviewHeader";
import type { AppTab } from "./AppTabs";
import { InfrastructureCards } from "./InfrastructureCards";
import { PodHealthPanel } from "./PodHealthPanel";
import { RecentDeploymentsTable } from "./RecentDeploymentsTable";
import { ResourceTelemetryPanel } from "./ResourceTelemetryPanel";

export function AppOverviewPage({ app }: { app: AppOverview }) {
  const [tab, setTab] = useState<AppTab>("overview");
  const [selectedDeployment, setSelectedDeployment] = useState<number | null>(
    () => findActiveBuild(app),
  );

  const openDeployment = (deploymentNumber: number | null) => {
    setSelectedDeployment(deploymentNumber);
    setTab("deployments");
  };

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as AppTab)}
      className="w-full max-w-360 mx-auto px-margin-desktop py-space-xl gap-space-xl flex flex-col"
    >
      <AppOverviewHeader app={app} />

      <TabsContent value="overview" className="flex flex-col gap-space-xl">
        <ActiveDeploymentCard deployment={app.activeDeployment} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          <PodHealthPanel
            className="lg:col-span-7"
            pods={app.pods}
            stabilityScore={app.stabilityScore}
            restartsLast24h={app.restartsLast24h}
          />
          <ResourceTelemetryPanel
            className="lg:col-span-5"
            telemetry={app.telemetry}
          />
        </div>

        <RecentDeploymentsTable
          deployments={app.recentDeployments}
          totalCount={app.deploymentCount}
          onViewAll={() => openDeployment(null)}
          onSelect={openDeployment}
        />

        <InfrastructureCards items={app.infrastructure} />
      </TabsContent>

      <TabsContent value="deployments">
        <DeploymentsTab
          app={app}
          selectedDeployment={selectedDeployment}
          onSelectDeployment={setSelectedDeployment}
        />
      </TabsContent>

      <TabsContent
        value="environment"
        forceMount
        className="data-[state=inactive]:hidden"
      >
        <EnvironmentTab app={app} />
      </TabsContent>

      <TabsContent value="logs">
        <LogsTab app={app} />
      </TabsContent>

      <TabsContent value="settings">
        <SettingsTab app={app} />
      </TabsContent>

      {(["metrics"] as const).map((value) => (
        <TabsContent key={value} value={value}>
          <TabPlaceholder name={value} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function findActiveBuild(app: AppOverview) {
  const building = app.recentDeployments.find(
    (deployment) => deployment.status === "building",
  );
  return building?.number ?? null;
}

function TabPlaceholder({ name }: { name: string }) {
  return (
    <div className="rounded-xl bg-surface-container-low p-10 text-center font-body-md text-body-md text-outline capitalize">
      {name} — coming soon
    </div>
  );
}
