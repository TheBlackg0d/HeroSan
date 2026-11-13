import type { ReactNode } from "react";
import { CloudUpload, Package, Server, Split } from "lucide-react";
import { Panel } from "#/components/AppOverview/shared";
import { cn } from "#/lib/utils";

const KIND_STYLES: Record<
  BuildContextKind,
  { icon: ReactNode; detail: string }
> = {
  worker: {
    icon: <Server size={16} className="text-tertiary" />,
    detail: "font-body-sm text-body-sm text-on-surface-variant",
  },
  engine: {
    icon: <Package size={16} className="text-secondary" />,
    detail: "font-body-sm text-body-sm text-on-surface-variant",
  },
  image: {
    icon: <CloudUpload size={16} className="text-primary" />,
    detail: "font-code-sm text-code-sm text-primary truncate",
  },
  ingress: {
    icon: <Split size={16} className="text-secondary-container" />,
    detail: "font-body-sm text-body-sm text-tertiary",
  },
};

export function BuildContextCards({ items }: { items: BuildContextItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
      {items.map((item) => (
        <BuildContextCard key={item.kind} item={item} />
      ))}
    </div>
  );
}

function BuildContextCard({ item }: { item: BuildContextItem }) {
  const style = KIND_STYLES[item.kind];
  return (
    <Panel size="sm" className="gap-2 px-space-md shadow-sm">
      <div className="flex items-center justify-between text-outline">
        <span className="font-label-sm text-label-sm uppercase tracking-wider">
          {item.label}
        </span>
        {style.icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span
          title={item.title}
          className="font-headline-sm text-headline-sm font-mono font-medium text-on-surface truncate"
        >
          {item.value}
        </span>
        <span className={cn(style.detail)}>{item.detail}</span>
      </div>
    </Panel>
  );
}
