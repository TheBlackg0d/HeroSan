import {
  Check,
  Copy,
  FolderArchive,
  FolderCode,
  GitFork,
  Terminal,
} from "lucide-react";
import { ErrorMessage, useFormContext } from "react-hook-form";
import { ApplicationSectionHeader } from "./ApplicationSectionHeader";
import { InputError } from "../shared/InputError";
import type { CreateAppFormValues } from "#/validations/app.create.validation.ts";
import { useCopyToClipboard } from "#/hooks/useCopyToClipboard.ts";

const inputErrorStyling = "ring-1 ring-error focus:ring-error";

export function RepositoryFormInputs() {
  return (
    <section className="bg-surface-container-low p-space-lg md:p-space-xl rounded-xl shadow-md flex flex-col gap-space-lg">
      <ApplicationSectionHeader
        title="Repository Source"
        step="1"
        icon={<FolderCode size={20} className="text-primary" />}
      />
      <RepositoryUrlInput />
      <div className="flex flex-col md:flex-row gap-space-md">
        <BranchInput />
        <RootDirectoryInput />
      </div>
    </section>
  );
}

function RepositoryUrlInput() {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext<CreateAppFormValues>();
  const repoUrl = watch("repoUrl");
  const { copied, copy } = useCopyToClipboard();

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
          className={`w-full bg-surface-container-lowest text-on-surface font-code-md text-code-md pl-10 pr-24 py-2.5 rounded-lg focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-inner transition-all placeholder:text-outline ${errors.repoUrl ? inputErrorStyling : ""}`}
          id="git-repo-url"
          placeholder="https://github.com/user/project.git"
          type="text"
          aria-invalid={!!errors.repoUrl}
          {...register("repoUrl")}
        />
        <div className="absolute right-2 flex items-center gap-1">
          <button
            className="px-2 py-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1 font-code-sm text-code-sm disabled:opacity-50"
            title="Copy to clipboard"
            type="button"
            disabled={!repoUrl}
            onClick={() => copy(repoUrl)}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>
      <ErrorMessage
        control={control}
        name="repoUrl"
        render={({ message }) => <InputError message={message} />}
      />
      <span className="font-body-sm text-body-sm text-outline">
        HTTPS clone URL. Public repositories under GitHub
      </span>
    </div>
  );
}

function BranchInput() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateAppFormValues>();

  return (
    <div className="flex flex-col gap-1.5 grow">
      <label
        className="font-label-md text-label-md font-medium text-on-surface flex items-center gap-space-xs"
        htmlFor="git-branch"
      >
        <GitFork size={16} />
        <span>Production Branch</span>
      </label>
      <div className="relative flex items-center">
        <input
          className={`w-full bg-surface-container-lowest text-on-surface font-code-md text-code-md pl-3 pr-24 py-2 rounded-lg focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-inner transition-all ${errors.branch ? inputErrorStyling : ""}`}
          id="git-branch"
          type="text"
          aria-invalid={!!errors.branch}
          {...register("branch")}
        />
        <span className="absolute right-2 font-code-sm text-code-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-medium">
          HEAD (Auto)
        </span>
      </div>
      <ErrorMessage
        control={control}
        name="branch"
        render={({ message }) => <InputError message={message} />}
      />
      <span className="font-body-sm text-body-sm text-outline">
        Continuous deployment triggers automatically on webhook pushes to this
        branch.
      </span>
    </div>
  );
}

function RootDirectoryInput() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateAppFormValues>();

  return (
    <div className="flex flex-col gap-1.5 grow-3">
      <label
        className="font-label-md text-label-md font-medium text-on-surface flex items-center gap-space-xs"
        htmlFor="root-directory"
      >
        <FolderArchive size={16} />
        <span>Root Directory</span>
      </label>
      <input
        className={`w-full bg-surface-container-lowest text-on-surface font-code-md text-code-md px-3 py-2 rounded-lg focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-inner transition-all font-mono ${errors.rootDirectory ? inputErrorStyling : ""}`}
        id="root-directory"
        type="text"
        aria-invalid={!!errors.rootDirectory}
        {...register("rootDirectory")}
      />
      <ErrorMessage
        control={control}
        name="rootDirectory"
        render={({ message }) => <InputError message={message} />}
      />
      <span className="font-body-sm text-body-sm text-outline">
        Workspace base directory.
      </span>
    </div>
  );
}
