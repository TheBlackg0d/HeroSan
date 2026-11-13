import { ArrowLeft } from "lucide-react";
import { RecentDeploymentsTable } from "#/components/AppOverview/RecentDeploymentsTable";
import { Button } from "#/components/ui/button";
import { getDeploymentRun } from "#/data/deploymentRuns";
import { DeploymentDetail } from "./DeploymentDetail";

type DeploymentsTabProps = {
  app: AppOverview;
  selectedDeployment: number | null;
  onSelectDeployment: (deploymentNumber: number | null) => void;
};

export function DeploymentsTab({
  app,
  selectedDeployment,
  onSelectDeployment,
}: DeploymentsTabProps) {
  const showList = () => onSelectDeployment(null);

  if (selectedDeployment === null) {
    return (
      <RecentDeploymentsTable
        title="All Deployments"
        deployments={app.recentDeployments}
        totalCount={app.deploymentCount}
        onSelect={onSelectDeployment}
      />
    );
  }

  const run = getDeploymentRun(app.id, selectedDeployment);
  if (!run) {
    return <MissingRun deploymentNumber={selectedDeployment} onBack={showList} />;
  }

  return <DeploymentDetail run={run} onBack={showList} />;
}

function MissingRun({
  deploymentNumber,
  onBack,
}: {
  deploymentNumber: number;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-space-md rounded-xl bg-surface-container-low p-10 text-center">
      <p className="font-body-md text-body-md text-outline">
        Build logs for deployment #{deploymentNumber} are no longer available.
      </p>
      <Button
        variant="link"
        onClick={onBack}
        className="h-auto p-0 text-primary hover:text-primary-fixed hover:no-underline font-body-sm text-(length:--text-body-sm)"
      >
        <ArrowLeft />
        Back to all deployments
      </Button>
    </div>
  );
}
