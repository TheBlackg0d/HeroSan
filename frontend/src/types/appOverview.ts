type AppOverview = {
  id: string;
  name: string;
  workspace: string;
  framework: string;
  region: string;
  autoscale: { min: number; max: number };
  environment: Environment;
  endpoint: string;
  deploymentCount: number;
  activeDeployment: ActiveDeployment;
  pods: PodInstance[];
  stabilityScore: string;
  restartsLast24h: number;
  telemetry: ResourceTelemetry;
  recentDeployments: DeploymentRecord[];
  infrastructure: InfrastructureInfo[];
};

type ActiveDeployment = {
  id: string;
  commitHash: string;
  commitMessage: string;
  branch: string;
  trigger: string;
  author: { name: string; avatarUrl?: string };
  buildDuration: string;
  deployedAgo: string;
  deployedAt: string;
};

type PodStatus = "ready" | "pending" | "crashloop";

type PodInstance = {
  name: string;
  status: PodStatus;
  restarts: number;
  uptime: string;
  zone: string;
};

type ResourceTelemetry = {
  intervalLabel: string;
  cpu: {
    percent: number;
    allocatedCores: number;
    threshold: number;
  };
  memory: {
    usedMb: number;
    limitMb: number;
    heapMb: number;
  };
  latency: {
    p95Ms: number;
    deltaMs: number;
    history: number[];
  };
};

type DeploymentRecordStatus = "live" | "deployed" | "failed";

type DeploymentRecord = {
  number: number;
  commitHash: string;
  commitMessage: string;
  branch: string;
  status: DeploymentRecordStatus;
  exitCode?: number;
  duration: string;
  triggeredAgo: string;
};

type InfrastructureKind = "ingress" | "git" | "secrets";

type InfrastructureInfo = {
  kind: InfrastructureKind;
  title: string;
  badge: string;
  description: string;
  footerLabel: string;
  footerValue: string;
};
