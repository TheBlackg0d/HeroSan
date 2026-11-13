type RuntimeLogLevel = "info" | "debug" | "warn" | "error" | "health";

type RuntimeLogTone =
  | "plain"
  | "muted"
  | "method"
  | "write"
  | "success"
  | "accent"
  | "code";

type RuntimeLogSegment = {
  text: string;
  tone?: RuntimeLogTone;
};

type RuntimeLogEntry = {
  id: number;
  time: number;
  pod: string;
  level: RuntimeLogLevel;
  message: RuntimeLogSegment[];
  stack?: string[];
};

type RuntimeLogTemplate = Omit<RuntimeLogEntry, "id" | "time" | "pod">;

type RuntimeLogSource = {
  container: string;
  process: string;
  logPath: string;
  bufferLimit: number;
  initial: (RuntimeLogTemplate & { pod: string; secondsAgo: number })[];
};
