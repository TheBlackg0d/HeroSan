import { LayoutGrid, Search, TableProperties } from "lucide-react";

export function SubHeader() {
  return (
    <div className="w-full  bg-surface-container-low px-margin-desktop py-space-md shadow-s">
      <div className="px-7 justify-between flex flex-col  gap-space-md">
        <WorkspaceContext />
        <FilterBar />
      </div>
    </div>
  );
}

function FilterBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-space-md">
      <div className="relative flex-1 min-w-70 max-w-lg">
        <span className=" absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
          <Search size={17} />
        </span>

        <input
          className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface-variant placeholder:text-outline font-body-sm text-body-sm cursor-not-allowed opacity-75 focus:outline-none"
          disabled
          placeholder="Search deployments, repositories, or domains... (⌘K)"
          type="text"
        />
      </div>
      <div className="flex items-center gap-1.5 overflow-x-auto text-label-sm font-label-sm">
        <span className="px-2.5 py-1 rounded-full bg-primary/15 text-primary font-medium">
          All (0)
        </span>
        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-outline opacity-60">
          Production
        </span>
        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-outline opacity-60">
          Staging
        </span>
        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-outline opacity-60">
          Preview
        </span>
      </div>
    </div>
  );
}

function WorkspaceContext() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-space-md">
      <div className="flex items-center gap-space-sm">
        <div className="flex items-center gap-1.5 font-headline-sm text-headline-sm text-on-surface font-medium">
          <span className="text-on-surface-variant font-normal">acme-corp</span>
          <span className="text-outline text-[13px]">/</span>
          <span className="text-on-surface font-semibold tracking-tight">
            Applications
          </span>
        </div>
        <span className="font-code-sm text-code-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-medium">
          0 Total
        </span>
        <span className="font-code-sm text-code-sm text-outline hidden sm:inline-block">
          · 0 Live · 0 Build · 0 Alert
        </span>
      </div>
      <div className="flex items-center gap-space-sm">
        <div className="flex items-center p-0.5 rounded-lg bg-surface-container-lowest text-outline">
          <button
            aria-label="Grid layout view"
            className="p-1 rounded bg-surface-container text-primary shadow-sm"
            disabled
            type="button"
          >
            <LayoutGrid size={17} />
          </button>
          <button
            aria-label="Table list view"
            className="p-1 rounded hover:text-on-surface transition-colors opacity-50"
            disabled
            type="button"
          >
            <TableProperties size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
