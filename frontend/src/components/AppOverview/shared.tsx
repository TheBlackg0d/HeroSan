import type { ComponentProps, ReactNode } from "react";
import { Badge } from "#/components/ui/badge";
import { Card } from "#/components/ui/card";
import { cn } from "#/lib/utils";

export type PillTone = "success" | "info" | "primary" | "neutral" | "error" | "muted";

const TONE_CLASSES: Record<PillTone, { pill: string; dot: string }> = {
  success: { pill: "bg-tertiary-container/20 text-tertiary", dot: "bg-tertiary" },
  info: { pill: "bg-secondary-container/20 text-secondary", dot: "bg-secondary" },
  primary: { pill: "bg-primary-container/20 text-primary", dot: "bg-primary" },
  neutral: {
    pill: "bg-surface-container-high text-on-surface-variant",
    dot: "bg-outline",
  },
  error: { pill: "bg-error-container/20 text-error", dot: "bg-error" },
  muted: {
    pill: "bg-surface-container text-on-surface-variant",
    dot: "bg-outline",
  },
};

type PillProps = Omit<ComponentProps<typeof Badge>, "variant"> & {
  tone?: PillTone;
  shape?: "pill" | "tag";
  dot?: boolean;
  pulse?: boolean;
  dotClassName?: string;
};

export function Pill({
  tone = "muted",
  shape = "pill",
  dot = false,
  pulse = false,
  dotClassName,
  className,
  children,
  ...props
}: PillProps) {
  const toneClasses = TONE_CLASSES[tone];
  return (
    <Badge
      className={cn(
        "h-auto gap-1.5 px-2 py-0.5 font-code-sm text-(length:--text-code-sm) font-medium [&>svg]:size-3.5!",
        shape === "pill" ? "rounded-full" : "rounded",
        toneClasses.pill,
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "size-1.5 rounded-full",
            toneClasses.dot,
            pulse && "animate-pulse",
            dotClassName,
          )}
        />
      )}
      {children}
    </Badge>
  );
}

export function Panel({ className, ...props }: ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        "bg-surface-container-low text-on-surface ring-0 shadow-md gap-space-md px-space-lg",
        className,
      )}
      {...props}
    />
  );
}

type SectionTitleProps = {
  icon: ReactNode;
  title: string;
  as?: "h2" | "h3" | "span";
  children?: ReactNode;
};

export function SectionTitle({
  icon,
  title,
  as: Heading = "h2",
  children,
}: SectionTitleProps) {
  return (
    <div className="flex flex-wrap items-center gap-space-sm">
      {icon}
      <Heading className="font-headline-md text-headline-md font-semibold text-on-surface">
        {title}
      </Heading>
      {children}
    </div>
  );
}
