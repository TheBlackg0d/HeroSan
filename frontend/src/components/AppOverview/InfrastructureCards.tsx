import type { ReactNode } from "react";
import { FolderGit2, Route, ShieldCheck } from "lucide-react";
import { Panel, Pill, type PillTone } from "./shared";

const KIND_STYLES: Record<
  InfrastructureKind,
  { icon: ReactNode; tone: PillTone; monoValue?: boolean }
> = {
  ingress: { icon: <Route size={22} className="text-secondary" />, tone: "info" },
  git: {
    icon: <FolderGit2 size={22} className="text-primary" />,
    tone: "primary",
    monoValue: true,
  },
  secrets: {
    icon: <ShieldCheck size={22} className="text-tertiary" />,
    tone: "success",
  },
};

export function InfrastructureCards({ items }: { items: InfrastructureInfo[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
      {items.map((item) => (
        <InfrastructureCard key={item.kind} item={item} />
      ))}
    </div>
  );
}

function InfrastructureCard({ item }: { item: InfrastructureInfo }) {
  const style = KIND_STYLES[item.kind];
  return (
    <Panel className="justify-between">
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          {style.icon}
          <Pill shape="tag" tone={style.tone} className="px-1.5">
            {item.badge}
          </Pill>
        </div>
        <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
          {item.title}
        </span>
        <p className="font-body-sm text-body-sm text-outline">
          {item.description}
        </p>
      </div>
      <div className="flex items-center justify-between pt-space-xs font-code-sm text-code-sm text-on-surface-variant">
        <span>{item.footerLabel}</span>
        <span className={style.monoValue ? "text-on-surface" : "text-on-surface font-semibold"}>
          {item.footerValue}
        </span>
      </div>
    </Panel>
  );
}
