type Application = {
  id: string;
  name: string;
  language: string;
  url: string;
  icon: ApplicationIcon;
  environment: Environment;
  status: DeploymentStatus;
  lastDeployed: string;
  /** Only set when status is "building" */
  build?: Build;
  /** Only set when status is "failed" */
  failure?: Failure;
  /** Only set when environment is "preview" */
  pullRequest?: number;
  versionControl: VersionControl;
  deployment: Deployment;
};

type ApplicationIcon =
  | "nextjs"
  | "shield"
  | "analytics"
  | "server"
  | "sync"
  | "rocket";

type Environment = "production" | "staging" | "preview";

type DeploymentStatus = "live" | "building" | "failed";

type Build = {
  elapsedTime: string;
  currentCompilingStatus: number;
  totalCompilingStatus: number;
  currentStep: string;
};

type Failure = {
  exitCode: number;
  reason: string;
  message: string;
};

type VersionControl = {
  repositoryName: string;
  branch: string;
  commitHash: string;
  commitMessage: string;
};

type Deployment = {
  /** Number of running pods, or a label for non-pod runtimes (e.g. "Edge CDN Static") */
  pods: number | string;
  metric: string;
  metricKind: "latency" | "throughput" | "queue" | "cache";
  action: "Logs" | "Metrics" | "Events" | "Preview" | "Terminal" | "Rollback";
};
