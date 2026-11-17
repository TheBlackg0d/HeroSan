import type { MutationFunc } from "../types";

export type DeploymentStatus = string;

export type Deployment = {
  id: string;
  appId: string;
  status: DeploymentStatus;
  commitHash: string;
  imageTag: string;
  errorMessage?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type App = {
  id: string;
  name: string;
  repoUrl: string;
  containerPort: number;
  branch: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  deployments?: Deployment[];
  environmentVariables?: Record<string, string>;
};

export type EnvironmentVariable = {
  key: string;
  value: string;
};

export type CreateAppRequest = {
  name: string;
  repoUrl: string;
  containerPort: number;
  branch: string;
  rootDirectory: string;
  environmentVariables: EnvironmentVariable[];
};

export type UpdateAppRequest = Partial<CreateAppRequest>;

export type UpdateAppVariables = {
  id: string;
  data: UpdateAppRequest;
};

export type AppMutation = MutationFunc<App>;
