import { Link } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { Input } from "../ui/input";

export function Header() {
  return (
    <header className="sticky top-0 h-14 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/20 z-40 flex items-center justify-between px-space-xl">
      <HeaderStats />
      <HeaderActions />
    </header>
  );
}

function HeaderStats() {
  return (
    <div className="flex items-center gap-space-lg font-code-sm text-code-sm text-on-surface-variant">
      <div className="flex items-center gap-space-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
        <span className="text-on-surface font-medium">3 Nodes Online</span>
      </div>
      <span className="text-outline-variant">·</span>
      <span>12 Containers</span>
      <span className="text-outline-variant">·</span>
      <div className="flex items-center gap-1.5">
        <span>CPU</span>
        <span className="text-secondary font-medium">24%</span>
      </div>
      <span className="text-outline-variant">·</span>
      <div className="flex items-center gap-1.5">
        <span>RAM</span>
        <span className="text-on-surface font-medium">8.4GB</span>
        <span className="text-outline">/ 32GB</span>
      </div>
    </div>
  );
}

function HeaderActions() {
  return (
    <div className="flex items-center gap-space-md">
      <button
        className="flex items-center gap-space-sm px-space-md py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface-variant hover:border-outline hover:text-on-surface transition-all"
        type="button"
      >
        <Search size={18} />
        <Input
          className="font-body-sm text-body-sm"
          placeholder="Search architecture..."
        />

        <kbd className="font-code-sm text-code-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-outline border border-outline-variant/40">
          ⌘K
        </kbd>
      </button>
      <Link
        className="flex items-center gap-1.5 px-space-md py-1.5 rounded-lg bg-primary-container hover:bg-inverse-primary text-on-primary font-headline-sm text-headline-sm transition-all shadow-[0_0_12px_rgba(77,142,255,0.35)] hover:shadow-[0_0_16px_rgba(77,142,255,0.5)] active:scale-[0.99]"
        data-path="new-app"
        to="."
      >
        <Plus size={18} />
        <span>New App</span>
      </Link>
    </div>
  );
}
