import { z } from "zod";

const githubUrlPattern = /^https:\/\/github\.com\/[^/\s]+\/[^/\s]+?(\.git)?\/?$/;
const appNamePattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const envKeyPattern = /^[A-Za-z_][A-Za-z0-9_]*$/;

export const createAppSchema = z.object({
  repoUrl: z.string().trim().regex(githubUrlPattern, "Invalid GitHub URL"),
  branch: z.string().trim().min(1, "Branch is required"),
  rootDirectory: z.string().trim().min(1, "Root directory is required"),
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(63, "Name must be 63 characters or less")
    .regex(appNamePattern, "lowercase letters, numbers and hyphens only"),
  containerPort: z
    .number({ error: "Port is required" })
    .int("Port must be an integer")
    .min(1, "Port must be between 1 and 65535")
    .max(65535, "Port must be between 1 and 65535"),
  environmentVariables: z.array(
    z.object({
      key: z
        .string()
        .trim()
        .min(1, "Key is required")
        .regex(envKeyPattern, "Letters, digits and underscores only"),
      value: z.string().min(1, "Value is required"),
    }),
  ),
});

export type CreateAppFormValues = z.infer<typeof createAppSchema>;
