import { BuildContextCards } from "./BuildContextCards";
import { BuildLogTerminal } from "./BuildLogTerminal";
import { DeploymentDetailToolbar } from "./DeploymentDetailToolbar";
import { DeploymentSummaryCard } from "./DeploymentSummaryCard";
import { PipelineSteps } from "./PipelineSteps";

type DeploymentDetailProps = {
  run: DeploymentRun;
  onBack: () => void;
};

export function DeploymentDetail({ run, onBack }: DeploymentDetailProps) {
  return (
    <div className="flex flex-col gap-space-lg">
      <DeploymentDetailToolbar run={run} onBack={onBack} />
      <DeploymentSummaryCard run={run} />
      <PipelineSteps steps={run.steps} />
      <BuildLogTerminal terminal={run.terminal} downloadName={run.id} />
      <BuildContextCards items={run.context} />
    </div>
  );
}
