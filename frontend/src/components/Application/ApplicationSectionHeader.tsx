import type React from "react";

type ApplicationSectionHeaderProps = {
  title: string;
  step: string;
  icon: React.ReactNode;
};

export function ApplicationSectionHeader({
  title,
  step,
  icon,
}: ApplicationSectionHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-space-xs">
      <div className="flex items-center gap-space-sm">
        {icon}
        <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
          {title}
        </h2>
      </div>
      <span className="font-label-sm text-label-sm uppercase px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-medium">
        Step {step}
      </span>
    </div>
  );
}
