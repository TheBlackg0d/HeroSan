const webClientOverview: AppOverview = {
  id: "web-client",
  name: "web-client",
  workspace: "acme-corp",
  framework: "Next.js 14.2.3",
  region: "edge-us-east-1",
  autoscale: { min: 2, max: 8 },
  environment: "production",
  endpoint: "https://web-client.launchpad.internal",
  deploymentCount: 24,
  activeDeployment: {
    id: "dep_8f92a1c",
    commitHash: "c4190ea",
    commitMessage: "feat: add instant edge cache prefetching for catalog routes",
    branch: "main",
    trigger: "triggered via GitHub Webhook",
    author: { name: "alex.dev" },
    buildDuration: "48s",
    deployedAgo: "3m ago",
    deployedAt: "14:32:10",
  },
  pods: [
    {
      name: "pod-web-client-7f89b-x29k",
      status: "ready",
      restarts: 0,
      uptime: "24m",
      zone: "us-east-1a",
    },
    {
      name: "pod-web-client-7f89b-m4lp",
      status: "ready",
      restarts: 0,
      uptime: "24m",
      zone: "us-east-1b",
    },
    {
      name: "pod-web-client-7f89b-q8pt",
      status: "ready",
      restarts: 0,
      uptime: "24m",
      zone: "us-east-1c",
    },
    {
      name: "pod-web-client-7f89b-v19n",
      status: "ready",
      restarts: 0,
      uptime: "24m",
      zone: "us-east-1a",
    },
  ],
  stabilityScore: "99.98%",
  restartsLast24h: 0,
  telemetry: {
    intervalLabel: "Live 5s interval",
    cpu: { percent: 34, allocatedCores: 1.0, threshold: 80 },
    memory: { usedMb: 382, limitMb: 1024, heapMb: 218 },
    latency: {
      p95Ms: 24,
      deltaMs: -3,
      history: [32, 35, 33, 38, 37, 42, 39, 44, 41, 45],
    },
  },
  recentDeployments: [
    {
      number: 42,
      commitHash: "c4190ea",
      commitMessage:
        "feat: add instant edge cache prefetching for catalog routes",
      branch: "main",
      status: "live",
      duration: "48s",
      triggeredAgo: "3m ago",
    },
    {
      number: 41,
      commitHash: "b8201cd",
      commitMessage: "fix: prevent SSR hydration mismatch on auth modal",
      branch: "main",
      status: "deployed",
      duration: "52s",
      triggeredAgo: "4h ago",
    },
    {
      number: 40,
      commitHash: "a19f43e",
      commitMessage: "chore: bump next to 14.2.3 and tailwindcss",
      branch: "main",
      status: "deployed",
      duration: "1m 04s",
      triggeredAgo: "1d ago",
    },
    {
      number: 39,
      commitHash: "9e771b2",
      commitMessage: "test: e2e checkout flow load testing",
      branch: "staging",
      status: "deployed",
      duration: "45s",
      triggeredAgo: "2d ago",
    },
    {
      number: 38,
      commitHash: "8d3302a",
      commitMessage: "feat: experiment with rust wasm image decoder",
      branch: "feat/wasm-decoder",
      status: "failed",
      exitCode: 1,
      duration: "18s",
      triggeredAgo: "3d ago",
    },
  ],
  infrastructure: [
    {
      kind: "ingress",
      title: "Edge Traffic Balancing",
      badge: "TLS v1.3",
      description:
        "BGP Anycast routing enabled with Cloudflare Argo tunnel fallback and SSL automation.",
      footerLabel: "Active Edge Points",
      footerValue: "32 Points of Presence",
    },
    {
      kind: "git",
      title: "Git CI/CD Pipeline",
      badge: "Sync Active",
      description:
        "Automatic preview deployments configured for PR branches matching feat/*.",
      footerLabel: "Repository",
      footerValue: "acme-corp/web-client",
    },
    {
      kind: "secrets",
      title: "Secret & Environment Store",
      badge: "Encrypted",
      description:
        "18 secrets synchronized from Vault at runtime. Zero plaintext exposed to container logs.",
      footerLabel: "Last Secret Rotation",
      footerValue: "Yesterday, 18:40",
    },
  ],
};

const overviews: Record<string, AppOverview> = {
  [webClientOverview.id]: webClientOverview,
};

export function getAppOverview(appId: string): AppOverview | undefined {
  return overviews[appId];
}
