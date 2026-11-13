const webClientVariables: EnvVariable[] = [
  {
    id: "env_database_url",
    key: "DATABASE_URL",
    value: "postgres://root:p9a7c3_k2e8@pg-pool.aws:5432/web",
    scopes: ["production", "preview"],
    secret: true,
    icon: "database",
    updatedAgo: "2 days ago",
    updatedBy: "alex.dev",
  },
  {
    id: "env_next_public_api_url",
    key: "NEXT_PUBLIC_API_URL",
    value: "https://api.launchpad.internal/v1",
    scopes: ["production", "preview", "development"],
    secret: false,
    icon: "public",
    updatedAgo: "5 days ago",
    updatedBy: "alex.dev",
  },
  {
    id: "env_redis_password",
    key: "REDIS_PASSWORD",
    value: "r_auth_8820f4ae8b7c",
    scopes: ["production"],
    secret: true,
    icon: "key",
    updatedAgo: "1 week ago",
    updatedBy: "alex.dev",
  },
  {
    id: "env_jwt_secret_key",
    key: "JWT_SECRET_KEY",
    value: "jwt_sec_991f82c448bb92aa1e",
    scopes: ["production", "preview"],
    secret: true,
    icon: "token",
    updatedAgo: "2 weeks ago",
    updatedBy: "alex.dev",
  },
  {
    id: "env_sentry_dsn",
    key: "SENTRY_DSN",
    value: "https://9a12c4@o440.ingest.sentry.io/450",
    scopes: ["production", "preview"],
    secret: true,
    icon: "monitoring",
    updatedAgo: "3 weeks ago",
    updatedBy: "alex.dev",
  },
  {
    id: "env_stripe_secret_key",
    key: "STRIPE_SECRET_KEY",
    value: "sk_live_51Mz90KJH290aLv84P",
    scopes: ["production"],
    secret: true,
    icon: "payment",
    updatedAgo: "1 month ago",
    updatedBy: "alex.dev",
  },
  {
    id: "env_nextauth_secret",
    key: "NEXTAUTH_SECRET",
    value: "4b2c1d9e8f7a6b5c4d3e2f1a0b9c8d7e",
    scopes: ["production", "preview", "development"],
    secret: true,
    icon: "lock",
    updatedAgo: "1 month ago",
    updatedBy: "alex.dev",
  },
];

const variablesByApp: Record<string, EnvVariable[]> = {
  "web-client": webClientVariables,
};

export function getEnvironmentVariables(appId: string): EnvVariable[] {
  return variablesByApp[appId] ?? [];
}
