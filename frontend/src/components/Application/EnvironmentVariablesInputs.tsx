import { ApplicationSectionHeader } from "./ApplicationSectionHeader";
import {
  FileUp,
  KeyRound,
  LockKeyhole,
  Plus,
  Shield,
  Trash,
} from "lucide-react";

export function EnvironmentVariableInputs() {
  return (
    <section
      className="bg-surface-container-low p-space-lg md:p-space-xl rounded-xl shadow-md flex flex-col gap-space-md"
      id="env-var-section"
    >
      <ApplicationSectionHeader
        title="Environment Variables"
        step="3 (optional)"
        icon={<KeyRound size={20} className="text-tertiary" />}
      />

      <VariableInput />
      <VariableInput />
      <AddVariableButton />
      <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-start gap-2 text-outline">
        <Shield size={16} className="text-primary mt-0.5" />
        <span className="font-body-sm text-body-sm">
          Variables are encrypted at rest with AES-256-GCM and securely injected
          into the container runtime namespace during pod initialization.
        </span>
      </div>
    </section>
  );
}

function VariableInput() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center bg-surface-container p-2 rounded-lg">
      <div className="md:col-span-4">
        <input
          className="w-full bg-surface-container-lowest text-on-surface font-code-md text-code-md px-3 py-1.5 rounded focus:outline-none focus:ring-1 focus:ring-primary shadow-inner font-mono tracking-tight"
          placeholder="KEY"
          type="text"
        />
      </div>
      <div className="md:col-span-6 relative">
        <input
          className="w-full bg-surface-container-lowest text-on-surface font-code-md text-code-md px-3 py-1.5 rounded focus:outline-none focus:ring-1 focus:ring-primary shadow-inner font-mono tracking-tight"
          placeholder="VALUE"
          type="text"
        />
      </div>
      <div className="md:col-span-2 flex items-center justify-end gap-1">
        <button
          className="p-1.5 rounded text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
          title="Lock as secret"
          type="button"
        >
          <LockKeyhole size={16} className="text-tertiary" />
        </button>
        <button
          className="p-1.5 rounded text-outline hover:text-error hover:bg-surface-container-high transition-colors"
          title="Delete row"
          type="button"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}

function AddVariableButton() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-xs">
      <button
        className="flex items-center gap-1.5 px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-label-md font-label-md font-medium transition-all self-start"
        type="button"
      >
        <Plus size={16} className="text-primary" />
        <span>Add Variable</span>
      </button>
      <button
        className="text-outline hover:text-on-surface font-code-sm text-code-sm flex items-center gap-1 transition-colors self-start sm:self-auto"
        type="button"
      >
        <FileUp size={16} />
        <span>Bulk .env import</span>
      </button>
    </div>
  );
}
