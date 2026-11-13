import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChartLine,
  Cpu,
  Database,
  Gauge,
} from "lucide-react";
import { Progress } from "#/components/ui/progress";
import { cn } from "#/lib/utils";
import { Panel, SectionTitle } from "./shared";

type ResourceTelemetryPanelProps = {
  telemetry: ResourceTelemetry;
  className?: string;
};

export function ResourceTelemetryPanel({
  telemetry,
  className,
}: ResourceTelemetryPanelProps) {
  const { cpu, memory, latency } = telemetry;
  const memoryPercent = Math.round((memory.usedMb / memory.limitMb) * 100);

  return (
    <Panel className={className}>
      <div className="flex items-center justify-between">
        <SectionTitle
          icon={<ChartLine size={20} className="text-primary" />}
          title="Resource Telemetry"
        />
        <span className="font-code-sm text-code-sm text-outline">
          {telemetry.intervalLabel}
        </span>
      </div>

      <div className="flex flex-col gap-space-md">
        <UsageMeter
          icon={<Cpu size={15} className="text-secondary" />}
          label="CPU Usage"
          percent={cpu.percent}
          value={`${cpu.percent}%`}
          detail={`of ${cpu.allocatedCores.toFixed(1)} vCPU`}
          colorClassName="text-secondary"
          indicatorClassName="*:data-[slot=progress-indicator]:bg-secondary"
          footer={[
            `Threshold: ${cpu.threshold}%`,
            `Cores allocated: ${cpu.allocatedCores.toFixed(1)}`,
          ]}
        />
        <UsageMeter
          icon={<Database size={15} className="text-tertiary" />}
          label="Memory Usage"
          percent={memoryPercent}
          value={`${memory.usedMb} MB`}
          detail={`of ${memory.limitMb} MB (${memoryPercent}%)`}
          colorClassName="text-tertiary"
          indicatorClassName="*:data-[slot=progress-indicator]:bg-tertiary"
          footer={[`OOM limit: ${memory.limitMb}MB`, `Heap: ${memory.heapMb}MB`]}
        />
        <LatencyCard latency={latency} />
      </div>
    </Panel>
  );
}

type UsageMeterProps = {
  icon: ReactNode;
  label: string;
  percent: number;
  value: string;
  detail: string;
  colorClassName: string;
  indicatorClassName: string;
  footer: [string, string];
};

function UsageMeter({
  icon,
  label,
  percent,
  value,
  detail,
  colorClassName,
  indicatorClassName,
  footer,
}: UsageMeterProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between font-body-sm text-body-sm">
        <span className="text-on-surface font-medium flex items-center gap-1.5">
          {icon}
          {label}
        </span>
        <div className="flex items-center gap-1 font-code-sm text-code-sm">
          <span className={cn("font-medium", colorClassName)}>{value}</span>
          <span className="text-outline">{detail}</span>
        </div>
      </div>
      <Progress
        value={percent}
        aria-label={label}
        className={cn(
          "h-2 rounded bg-surface-container *:data-[slot=progress-indicator]:rounded *:data-[slot=progress-indicator]:duration-500",
          indicatorClassName,
        )}
      />
      <div className="flex items-center justify-between font-code-sm text-code-sm text-outline">
        <span>{footer[0]}</span>
        <span>{footer[1]}</span>
      </div>
    </div>
  );
}

function LatencyCard({ latency }: { latency: ResourceTelemetry["latency"] }) {
  const improved = latency.deltaMs <= 0;
  const DeltaIcon = improved ? ArrowDown : ArrowUp;

  return (
    <div className="p-space-sm rounded-lg bg-surface-container flex items-center justify-between">
      <div className="flex flex-col">
        <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
          <Gauge size={15} className="text-primary" />
          Ingress Latency (p95)
        </span>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="font-headline-lg text-headline-lg font-semibold text-on-surface">
            {latency.p95Ms}ms
          </span>
          <span
            className={cn(
              "font-code-sm text-code-sm flex items-center",
              improved ? "text-tertiary" : "text-error",
            )}
          >
            <DeltaIcon size={13} />
            {improved ? "" : "+"}
            {latency.deltaMs}ms
          </span>
        </div>
      </div>
      <Sparkline values={latency.history} className="w-36 h-10" />
    </div>
  );
}

const SPARK_WIDTH = 140;
const SPARK_HEIGHT = 36;
const SPARK_PADDING = 4;

function Sparkline({
  values,
  className,
}: {
  values: number[];
  className?: string;
}) {
  if (values.length < 2) return null;

  const min = Math.min(...values);
  const range = Math.max(...values) - min || 1;
  const points = values.map((v, i) => ({
    x: (i / (values.length - 1)) * SPARK_WIDTH,
    y:
      SPARK_HEIGHT -
      SPARK_PADDING -
      ((v - min) / range) * (SPARK_HEIGHT - SPARK_PADDING * 2),
  }));
  const line = points.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");
  const area = `${line} L${SPARK_WIDTH},${SPARK_HEIGHT} L0,${SPARK_HEIGHT} Z`;
  const last = points[points.length - 1];

  return (
    <svg
      className={cn("stroke-primary fill-none overflow-visible", className)}
      viewBox={`0 0 ${SPARK_WIDTH} ${SPARK_HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={area} className="fill-primary/10 stroke-none" />
      <path
        d={line}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
      <circle
        className="fill-primary stroke-surface-container"
        strokeWidth={2}
        cx={last.x}
        cy={last.y}
        r={3}
      />
    </svg>
  );
}
