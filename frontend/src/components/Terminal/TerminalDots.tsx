import { cn } from "#/lib/utils";

export function TerminalDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5", className)} aria-hidden="true">
      <span className="size-[1em] rounded-full bg-status-failed-foreground/70" />
      <span className="size-[1em] rounded-full bg-status-building-foreground/70" />
      <span className="size-[1em] rounded-full bg-status-healthy-foreground/70" />
    </div>
  );
}
