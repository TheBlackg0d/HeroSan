import { BadgeCheck, Server } from "lucide-react";
import { cn } from "#/lib/utils";
import { Panel, Pill, type PillTone, SectionTitle } from "./shared";

const POD_STATUS: Record<
  PodStatus,
  { label: string; tone: PillTone; dot: string }
> = {
  ready: {
    label: "Ready",
    tone: "success",
    dot: "bg-tertiary shadow-[0_0_6px_rgba(78,222,163,0.7)]",
  },
  pending: { label: "Pending", tone: "info", dot: "bg-secondary" },
  crashloop: { label: "CrashLoop", tone: "error", dot: "bg-error" },
};

type PodHealthPanelProps = {
  pods: PodInstance[];
  stabilityScore: string;
  restartsLast24h: number;
  className?: string;
};

export function PodHealthPanel({
  pods,
  stabilityScore,
  restartsLast24h,
  className,
}: PodHealthPanelProps) {
  const healthy = pods.filter((pod) => pod.status === "ready").length;
  const allHealthy = healthy === pods.length;

  return (
    <Panel className={className}>
      <div className="flex items-center justify-between">
        <SectionTitle
          icon={<Server size={20} className="text-secondary" />}
          title="Runtime & Pod Health"
        />
        <Pill tone={allHealthy ? "success" : "error"} dot className="px-2.5">
          {allHealthy
            ? `All ${pods.length} Pods Healthy`
            : `${healthy}/${pods.length} Pods Healthy`}
        </Pill>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
        {pods.map((pod) => (
          <PodCard key={pod.name} pod={pod} />
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between p-space-sm rounded-lg bg-surface-container">
        <div className="flex items-center gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
          <BadgeCheck size={18} className="text-tertiary" />
          <span>
            Cluster stability score:{" "}
            <strong className="text-on-surface font-semibold">
              {stabilityScore}
            </strong>
          </span>
        </div>
        <Pill shape="tag" tone={restartsLast24h === 0 ? "success" : "error"}>
          {restartsLast24h} restarts in 24h
        </Pill>
      </div>
    </Panel>
  );
}

function PodCard({ pod }: { pod: PodInstance }) {
  const status = POD_STATUS[pod.status];
  return (
    <div className="p-space-sm rounded-lg bg-surface-container flex flex-col gap-space-xs hover:bg-surface-container-high transition-colors">
      <div className="flex items-center justify-between gap-space-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className={cn("size-2 rounded-full shrink-0", status.dot)} />
          <span className="font-code-sm text-code-sm text-on-surface font-medium truncate">
            {pod.name}
          </span>
        </div>
        <Pill shape="tag" tone={status.tone} className="px-1.5 py-0 font-normal">
          {status.label}
        </Pill>
      </div>
      <div className="flex items-center justify-between font-code-sm text-code-sm text-outline">
        <span>{pod.restarts} restarts</span>
        <span>{pod.uptime} uptime</span>
        <span className="text-secondary">Zone: {pod.zone}</span>
      </div>
    </div>
  );
}
