const t = (text: string, tone?: RuntimeLogTone): RuntimeLogSegment => ({ text, tone });

const webClientLogs: RuntimeLogSource = {
  container: "web-client",
  process: "pid:1 (node)",
  logPath: "/var/log/launchpad/web-client.stdout",
  bufferLimit: 500,
  initial: [
    {
      secondsAgo: 4.329,
      pod: "x29k",
      level: "info",
      message: [t("Compiled client and server in 482ms (312 modules)")],
    },
    {
      secondsAgo: 3.796,
      pod: "x29k",
      level: "info",
      message: [
        t("GET", "method"),
        t(" /api/v1/products?limit=20 "),
        t("200 OK", "success"),
        t(" in 18ms "),
        t("(CF-Ray: 8a7c29e1f409-EWR)", "muted"),
      ],
    },
    {
      secondsAgo: 3.437,
      pod: "m4lp",
      level: "info",
      message: [
        t("cache: HIT", "accent"),
        t(" [tags: catalog, products] - serve from edge replica us-east-1"),
      ],
    },
    {
      secondsAgo: 2.923,
      pod: "x29k",
      level: "health",
      message: [
        t("healthcheck probe ", "muted"),
        t("/healthz"),
        t(" from 10.244.0.1: OK (200 in 1.2ms)", "muted"),
      ],
    },
    {
      secondsAgo: 2.352,
      pod: "q8pt",
      level: "info",
      message: [
        t("POST", "write"),
        t(" /api/auth/session "),
        t("200 OK", "success"),
        t(" in 42ms payload: "),
        t('{"user_id":"usr_89bc","flow":"sso_jwt"}', "muted"),
      ],
    },
    {
      secondsAgo: 1.551,
      pod: "x29k",
      level: "warn",
      message: [
        t(
          "Upstream Redis connection pool nearing 80% threshold (41/50 connections allocated to worker thread #3)",
        ),
      ],
    },
    {
      secondsAgo: 1.137,
      pod: "x29k",
      level: "error",
      message: [
        t(
          "Database query timeout (2500ms) on SELECT * FROM session_tokens WHERE expires_at > NOW()",
        ),
      ],
      stack: [
        "at PostgresClient.query (/app/node_modules/pg/lib/client.js:521:22)",
        "at async SessionService.validateToken (/app/.next/server/chunks/819.js:42:12)",
      ],
    },
    {
      secondsAgo: 1.031,
      pod: "x29k",
      level: "info",
      message: [
        t("Exponential retry scheduled [attempt 1/3] for "),
        t("query:session_tokens", "muted"),
        t(" in 150ms"),
      ],
    },
    {
      secondsAgo: 0.791,
      pod: "v19n",
      level: "debug",
      message: [
        t(
          'telemetry:metric_flush { "event": "pageview", "path": "/dashboard/inventory", "duration_ms": 24.3, "vitals": { "LCP": 840, "FID": 12, "CLS": 0.002 } }',
          "code",
        ),
      ],
    },
    {
      secondsAgo: 0.619,
      pod: "x29k",
      level: "info",
      message: [
        t("pg_pool:", "method"),
        t(" Retry succeeded on replica pool [node: pg-replica-02.us-east-1] in 14ms"),
      ],
    },
    {
      secondsAgo: 0.332,
      pod: "m4lp",
      level: "info",
      message: [
        t("GET", "method"),
        t(" /_next/static/chunks/main-app-9c8e1.js "),
        t("304 Not Modified", "success"),
        t(" (cache-control: immutable)"),
      ],
    },
  ],
};

const logsByApp: Record<string, RuntimeLogSource> = {
  "web-client": webClientLogs,
};

export function getRuntimeLogSource(appId: string): RuntimeLogSource | undefined {
  return logsByApp[appId];
}
