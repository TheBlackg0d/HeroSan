import { Box, ChartNoAxesCombined, Cpu, GraphStar } from "lucide-react";

export function TelemetryList() {
  return (
    <div className="w-full bg-surface-container-lowest  py-space-sm flex justify-center">
      <div className=" w-full flex  gap-5 px-32">
        <TelemetryBox title="Compute Allocated" icon={<Cpu size={16} />} />
        <TelemetryBox
          title="Edge Ingress (24h)"
          icon={<ChartNoAxesCombined size={16} />}
        />
        <TelemetryBox title="Managed Replicas" icon={<Box size={16} />} />
        <TelemetryBox title="Service Mesh" icon={<GraphStar size={16} />} />
      </div>
    </div>
  );
}

type TelemetryBoxProps = {
  title: string;
  icon: React.ReactNode;
};

function TelemetryBox({ title, icon }: TelemetryBoxProps) {
  return (
    <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col  grow  justify-between">
      <div className="flex items-center justify-between text-outline">
        <span className="font-label-sm text-label-sm uppercase tracking-wider">
          {title}
        </span>
        <span className="text-outline">{icon}</span>
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="font-code-lg text-code-lg font-semibold text-on-surface">
          0
        </span>
        <span className="font-code-sm text-code-sm text-outline">
          / 32 vCPU
        </span>
      </div>
    </div>
  );
}
