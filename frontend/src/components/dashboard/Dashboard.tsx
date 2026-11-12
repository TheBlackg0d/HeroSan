import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Container,
  GitFork,
  LayoutTemplate,
  Plus,
} from "lucide-react";

export function Dashboard() {
  return (
    <div className="relative w-full rounded-xl bg-surface-container-low p-space-xl md:p-10 shadow-xl overflow-hidden text-center flex flex-col items-center">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-container/10 blur-[100px] pointer-events-none rounded-full"></div>
      <div className="absolute -bottom-20 right-10 w-72 h-72 bg-secondary-container/10 blur-[80px] pointer-events-none rounded-full"></div>
      <RocketIcon />
      <Heading />
      <CallToActionSection />
      <DeploymentChannelsGrid />
      <TerminalHelperStrip />
    </div>
  );
}

function DeploymentChannelsGrid() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-space-md text-left pt-6">
      <DeploymentItem
        icon={<GitFork size={20} />}
        title="Import Git Repository"
        description="Automatic CI/CD webhooks with zero-downtime rolling updates."
        footer="GitHub / GitLab / Gitea"
      />
      <DeploymentItem
        icon={<Container size={20} />}
        title="Deploy Docker Image"
        description="Pull a pre-built image from any registry and run it instantly."
        footer="Docker Hub / GHCR / ECR"
      />
      <DeploymentItem
        icon={<LayoutTemplate size={20} />}
        title="Launch a Template"
        description="Start from an official template with sensible defaults."
        footer="Postgres / Redis / Next.js"
      />
    </div>
  );
}

type DeploymentItemProps = {
  icon: ReactNode;
  title: string;
  description: string;
  footer?: string;
};

function DeploymentItem({
  icon,
  title,
  description,
  footer,
}: DeploymentItemProps) {
  return (
    <Link
      className="p-space-lg rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors group flex flex-col justify-between"
      to="."
    >
      <div>
        <div className="w-9 h-9 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary mb-3">
          {icon}
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-medium mb-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="font-body-sm text-body-sm text-outline">{description}</p>
      </div>
      <div className="mt-4 flex items-center gap-2 font-code-sm text-code-sm text-on-surface-variant">
        <span>{footer}</span>
        <span className="material-symbols-outlined text-[14px] text-outline group-hover:translate-x-0.5 transition-transform">
          chevron_right
        </span>
      </div>
    </Link>
  );
}

function TerminalHelperStrip() {
  return (
    <div className="mt-8 w-full max-w-lg rounded-lg bg-surface-container-lowest p-2.5 flex items-center justify-between shadow-inner">
      <div className="flex items-center gap-space-sm pl-2 overflow-x-auto min-w-0">
        <span className="text-tertiary font-code-sm text-code-sm select-none">
          $
        </span>
        <span className="font-code-md text-code-md text-on-surface font-mono tracking-tight whitespace-nowrap">
          launchpad init &amp;&amp; launchpad deploy
        </span>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <>
      <h2 className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight mb-space-xs">
        Deploy your first app
      </h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mb-space-xl">
        Connect a Git repository, push a pre-built Dockerfile, or launch an
        official template directly to your cluster bare-metal ingress.
      </p>
    </>
  );
}

function CallToActionSection() {
  return (
    <div className="flex items-center gap-space-md mb-8">
      <Link
        className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary-container hover:bg-inverse-primary text-on-primary font-headline-sm text-headline-sm font-medium transition-all shadow-[0_0_18px_rgba(77,142,255,0.4)] hover:shadow-[0_0_24px_rgba(77,142,255,0.6)] active:scale-[0.98]"
        data-path="new-app"
        to="."
      >
        <Plus size={19} />
        <span>Deploy App</span>
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}

function RocketIcon() {
  return (
    <div className="relative mb-6 w-36 h-36 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-surface-container-lowest/80 shadow-inner flex items-center justify-center"></div>
      <svg
        className="relative w-28 h-28"
        fill="none"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="fill-outline"
          cx="20"
          cy="30"
          opacity="0.3"
          r="1.5"
        ></circle>
        <circle
          className="fill-outline"
          cx="95"
          cy="24"
          opacity="0.4"
          r="1.5"
        ></circle>
        <circle
          className="fill-outline"
          cx="104"
          cy="78"
          opacity="0.3"
          r="1.5"
        ></circle>
        <circle
          className="fill-outline"
          cx="16"
          cy="85"
          opacity="0.35"
          r="1.5"
        ></circle>
        <line
          className="text-outline-variant"
          opacity="0.4"
          stroke="currentColor"
          stroke-dasharray="2 2"
          stroke-width="0.75"
          x1="20"
          x2="35"
          y1="30"
          y2="45"
        ></line>
        <line
          className="text-outline-variant"
          opacity="0.4"
          stroke="currentColor"
          stroke-dasharray="2 2"
          stroke-width="0.75"
          x1="85"
          x2="95"
          y1="34"
          y2="24"
        ></line>
        <path
          className="text-secondary"
          d="M60 82L60 108"
          opacity="0.6"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="2"
        ></path>
        <path
          className="text-primary-container"
          d="M56 86L52 102"
          opacity="0.4"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="1.5"
        ></path>
        <path
          className="text-primary-container"
          d="M64 86L68 102"
          opacity="0.4"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="1.5"
        ></path>
        <circle
          className="fill-secondary animate-pulse"
          cx="60"
          cy="112"
          r="2.5"
        ></circle>
        <path
          className="text-outline-variant"
          d="M60 18C52 28 47 48 47 68L73 68C73 48 68 28 60 18Z"
          stroke="currentColor"
          stroke-width="1.5"
        ></path>
        <path
          className="fill-surface-variant/40"
          d="M60 18C60 18 60 48 60 68L73 68C73 48 68 28 60 18Z"
        ></path>
        <circle
          className="text-secondary"
          cx="60"
          cy="42"
          r="5"
          stroke="currentColor"
          stroke-width="1.2"
        ></circle>
        <circle className="fill-secondary" cx="60" cy="42" r="2.5"></circle>
        <path
          className="text-outline-variant"
          d="M47 56L36 68L36 78L47 72Z"
          stroke="currentColor"
          stroke-width="1.2"
        ></path>
        <path
          className="text-outline-variant"
          d="M73 56L84 68L84 78L73 72Z"
          stroke="currentColor"
          stroke-width="1.2"
        ></path>
        <path
          className="text-primary"
          d="M52 68L54 75L66 75L68 68Z"
          stroke="currentColor"
          stroke-width="1"
        ></path>
        <path
          className="fill-primary-container"
          d="M56 75C56 75 58 84 60 86C62 84 64 75 64 75Z"
        ></path>
        <ellipse
          className="text-outline-variant"
          cx="60"
          cy="60"
          opacity="0.3"
          rx="46"
          ry="14"
          stroke="currentColor"
          stroke-dasharray="4 3"
          stroke-width="0.8"
          transform="rotate(-25 60 60)"
        ></ellipse>
      </svg>
    </div>
  );
}
