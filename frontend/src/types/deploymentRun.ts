type DeploymentRun = {
  number: number;
  id: string;
  appName: string;
  status: DeploymentRecordStatus;
  commitHash: string;
  commitSha: string;
  commitMessage: string;
  commitUrl: string;
  branch: string;
  author: { name: string; avatarUrl?: string };
  trigger: string;
  triggeredAgo: string;
  elapsedSeconds: number;
  steps: PipelineStep[];
  terminal: BuildTerminal;
  context: BuildContextItem[];
};

type PipelineStepState = "done" | "active" | "pending" | "failed";

type PipelineStep = {
  title: string;
  description: string;
  state: PipelineStepState;
  duration?: string;
  progress?: number;
};

type LogSource =
  | "init"
  | "git"
  | "nixpacks"
  | "cache"
  | "deps"
  | "turbo"
  | "next"
  | "warn"
  | "error"
  | "docker"
  | "build";

type LogLevel = "default" | "muted" | "success" | "warn" | "error";

type LogCategory = "build" | "container";

type LogLine = {
  timestamp?: string;
  source: LogSource;
  category: LogCategory;
  message: string;
  code?: string;
  level?: LogLevel;
  preformatted?: boolean;
};

type BuildTerminal = {
  worker: string;
  streaming: boolean;
  lines: LogLine[];
  process: {
    pid: number;
    name: string;
    exitCode: number | null;
    memoryUsedMb: number;
    memoryLimitMb: number;
    encoding: string;
    shell: string;
  };
};

type BuildContextKind = "worker" | "engine" | "image" | "ingress";

type BuildContextItem = {
  kind: BuildContextKind;
  label: string;
  value: string;
  detail: string;
  title?: string;
};
