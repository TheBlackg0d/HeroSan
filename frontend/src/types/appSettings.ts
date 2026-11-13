type AppSettings = {
  general: {
    identifier: string;
    productionBranch: string;
    branches: string[];
    webhookLinked: boolean;
    containerPort: number;
    rootDirectory: string;
    syncedRef: string;
  };
  resources: {
    architecture: string;
    cpu: ResourceLimit & {
      guaranteed: string;
      burst: string;
    };
    memory: ResourceLimit & {
      oomThreshold: string;
      averageUsage: string;
    };
    autoscaling: {
      minReplicas: number;
      maxReplicas: number;
      cpuTarget: number;
    };
    rollingRestart: boolean;
  };
  danger: {
    deploymentCount: number;
  };
};

type ResourceLimit = {
  tier: string;
  value: number;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  unit: string;
  rangeLabel: string;
};
