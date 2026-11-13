const webClientSettings: AppSettings = {
  general: {
    identifier: "web-client",
    productionBranch: "main",
    branches: ["main", "release-v2", "canary", "staging"],
    webhookLinked: true,
    containerPort: 3000,
    rootDirectory: "/",
    syncedRef: "#9f21a0d",
  },
  resources: {
    architecture: "Linux cgroups v2",
    cpu: {
      tier: "Shared Tier",
      value: 2,
      min: 0.25,
      max: 8,
      step: 0.25,
      displayValue: "2.00",
      unit: "vCPU",
      rangeLabel: "Range: 0.25 – 8.0 vCPU",
      guaranteed: "0.5 vCPU",
      burst: "Up to 4.0 vCPU",
    },
    memory: {
      tier: "Protected Swap",
      value: 4096,
      min: 256,
      max: 16384,
      step: 256,
      displayValue: "4,096",
      unit: "MB (4 GiB)",
      rangeLabel: "Max: 16,384 MB (16 GiB)",
      oomThreshold: "4,096 MB",
      averageUsage: "1,420 MB (35%)",
    },
    autoscaling: { minReplicas: 2, maxReplicas: 8, cpuTarget: 70 },
    rollingRestart: true,
  },
  danger: {
    deploymentCount: 24,
  },
};

const settingsByApp: Record<string, AppSettings> = {
  "web-client": webClientSettings,
};

export function getAppSettings(appId: string): AppSettings | undefined {
  return settingsByApp[appId];
}
