import type { ReactNode } from "react";
import { ArrowLeftRight, Cpu } from "lucide-react";
import { Panel, Pill } from "#/components/AppOverview/shared";

export function EnvironmentHelpCards({ appName }: { appName: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
      <HelpCard
        icon={<Cpu size={18} className="text-primary" />}
        title="Encrypted In-Memory Injection"
      >
        Secrets are decrypted in isolated memory partitions during container pod
        boot and never persisted to container images or flushed to stdout logs.
      </HelpCard>
      <HelpCard
        icon={<ArrowLeftRight size={18} className="text-tertiary" />}
        title="CLI Local Synchronization"
        badge="CLI"
      >
        Pull these variables securely into your local developer workstation via{" "}
        <code className="font-code-sm text-code-sm text-secondary bg-surface-container px-1 py-0.5 rounded">
          launchpad env pull {appName}
        </code>
        .
      </HelpCard>
    </div>
  );
}

function HelpCard({
  icon,
  title,
  badge,
  children,
}: {
  icon: ReactNode;
  title: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <Panel className="flex-row items-start gap-space-md shadow-sm">
      <div className="size-8 shrink-0 rounded-lg bg-surface-container flex items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-headline-sm text-headline-sm font-medium text-on-surface">
            {title}
          </span>
          {badge && (
            <Pill shape="tag" tone="neutral" className="px-1.5 font-normal bg-surface-container-highest">
              {badge}
            </Pill>
          )}
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">{children}</p>
      </div>
    </Panel>
  );
}
