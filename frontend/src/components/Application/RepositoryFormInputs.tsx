import {
  Copy,
  FolderArchive,
  FolderCode,
  GitFork,
  Terminal,
} from "lucide-react";
import { ApplicationSectionHeader } from "./ApplicationSectionHeader";

export function RepositoryFormInputs() {
  return (
    <section className="bg-surface-container-low p-space-lg md:p-space-xl rounded-xl shadow-md flex flex-col gap-space-lg">
      <ApplicationSectionHeader
        title="Repository Source"
        step="1"
        icon={<FolderCode size={20} className="text-primary" />}
      />
      {/* <!-- Field 1: Git Repository URL --> */}
      <RepositoryUrlInput />
      {/* <!-- Field 2: Git Branch & Trigger Config --> */}
      <div className="flex gap-space-md">
        <BranchInput />
        {/* <!-- Field 3: Root Directory --> */}
        <RootDirectoryInput />
      </div>
    </section>
  );
}

function RepositoryUrlInput() {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="font-label-md text-label-md font-medium text-on-surface flex items-center gap-space-xs"
        htmlFor="git-repo-url"
      >
        <span>Git Repository URL</span>
        <span className="text-secondary font-code-sm text-code-sm">*</span>
      </label>
      <div className="relative flex items-center">
        <div className="absolute left-3 flex items-center pointer-events-none text-outline">
          <Terminal size={16} />
        </div>
        <input
          className="w-full bg-surface-container-lowest text-on-surface font-code-md text-code-md pl-10 pr-24 py-2.5 rounded-lg focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-inner transition-all placeholder:text-outline"
          id="git-repo-url"
          placeholder="https://github.com/user/project.git"
          type="text"
          value="https://github.com/acme-corp/payment-service.git"
        />
        <div className="absolute right-2 flex items-center gap-1">
          <button
            className="px-2 py-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1 font-code-sm text-code-sm"
            title="Copy to clipboard"
            type="button"
          >
            <Copy size={14} />
          </button>
        </div>
      </div>
      <span className="font-body-sm text-body-sm text-outline">
        HTTPS clone URL. Public repositories under GitHub
      </span>
    </div>
  );
}

function BranchInput() {
  return (
    <div className="flex flex-col gap-1.5 md:col-span-2 grow">
      <label
        className="font-label-md text-label-md font-medium text-on-surface flex items-center gap-space-xs"
        htmlFor="git-branch"
      >
        <GitFork size={16} />
        <span>Production Branch</span>
      </label>
      <div className="relative flex items-center">
        <input
          className="w-full bg-surface-container-lowest text-on-surface font-code-md text-code-md pl-3 pr-24 py-2 rounded-lg focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-inner transition-all"
          id="git-branch"
          type="text"
          value="main"
        />
        <span className="absolute right-2 font-code-sm text-code-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-medium">
          HEAD (Auto)
        </span>
      </div>
      <span className="font-body-sm text-body-sm text-outline">
        Continuous deployment triggers automatically on webhook pushes to this
        branch.
      </span>
    </div>
  );
}

function RootDirectoryInput() {
  return (
    <div className="flex flex-col gap-1.5  grow-3">
      <label className="font-label-md text-label-md font-medium text-on-surface flex items-center gap-space-xs">
        <FolderArchive size={16} />
        <span>Root Directory</span>
      </label>
      <input
        className="w-full bg-surface-container-lowest text-on-surface font-code-md text-code-md px-3 py-2 rounded-lg focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-inner transition-all font-mono"
        type="text"
        value="./"
      />
      <span className="font-body-sm text-body-sm text-outline">
        Workspace base directory.
      </span>
    </div>
  );
}
