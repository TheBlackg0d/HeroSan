import { useRef, type ChangeEvent } from "react";
import { ApplicationSectionHeader } from "./ApplicationSectionHeader";
import { FileUp, KeyRound, LockKeyhole, Plus, Shield, Trash } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { InputError } from "../shared/InputError";
import type { CreateAppFormValues } from "#/validations/app.create.validation.ts";

const inputErrorStyling = "ring-1 ring-error focus:ring-error";

function parseEnvFile(content: string) {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.replace(/^export\s+/, ""))
    .map((line) => {
      const index = line.indexOf("=");
      if (index === -1) return null;
      const key = line.slice(0, index).trim();
      let value = line.slice(index + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      return key ? { key, value } : null;
    })
    .filter((entry): entry is { key: string; value: string } => !!entry);
}

export function EnvironmentVariableInputs() {
  const { control, getValues, setValue } =
    useFormContext<CreateAppFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "environmentVariables",
  });

  const importEntries = (entries: { key: string; value: string }[]) => {
    const current = getValues("environmentVariables");
    const toAppend: { key: string; value: string }[] = [];
    entries.forEach((entry) => {
      const existingIndex = current.findIndex((v) => v.key === entry.key);
      if (existingIndex === -1) {
        toAppend.push(entry);
      } else {
        setValue(`environmentVariables.${existingIndex}.value`, entry.value, {
          shouldValidate: true,
        });
      }
    });
    if (toAppend.length) append(toAppend);
  };

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

      {fields.length === 0 && (
        <p className="font-body-sm text-body-sm text-outline">
          No environment variables defined.
        </p>
      )}

      {fields.map((field, index) => (
        <VariableInput
          key={field.id}
          index={index}
          onRemove={() => remove(index)}
        />
      ))}

      <AddVariableButton
        onAdd={() => append({ key: "", value: "" })}
        onImport={importEntries}
      />
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

type VariableInputProps = {
  index: number;
  onRemove: () => void;
};

function VariableInput({ index, onRemove }: VariableInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateAppFormValues>();
  const fieldErrors = errors.environmentVariables?.[index];

  return (
    <div className="flex flex-col gap-1 bg-surface-container p-2 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
        <div className="md:col-span-4">
          <input
            className={`w-full bg-surface-container-lowest text-on-surface font-code-md text-code-md px-3 py-1.5 rounded focus:outline-none focus:ring-1 focus:ring-primary shadow-inner font-mono tracking-tight ${fieldErrors?.key ? inputErrorStyling : ""}`}
            placeholder="KEY"
            type="text"
            autoComplete="off"
            aria-invalid={!!fieldErrors?.key}
            {...register(`environmentVariables.${index}.key`)}
          />
        </div>
        <div className="md:col-span-6 relative">
          <input
            className={`w-full bg-surface-container-lowest text-on-surface font-code-md text-code-md px-3 py-1.5 rounded focus:outline-none focus:ring-1 focus:ring-primary shadow-inner font-mono tracking-tight ${fieldErrors?.value ? inputErrorStyling : ""}`}
            placeholder="VALUE"
            type="text"
            autoComplete="off"
            aria-invalid={!!fieldErrors?.value}
            {...register(`environmentVariables.${index}.value`)}
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
            onClick={onRemove}
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
      <InputError message={fieldErrors?.key?.message} />
      <InputError message={fieldErrors?.value?.message} />
    </div>
  );
}

type AddVariableButtonProps = {
  onAdd: () => void;
  onImport: (entries: { key: string; value: string }[]) => void;
};

function AddVariableButton({ onAdd, onImport }: AddVariableButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onImport(parseEnvFile(await file.text()));
    event.target.value = "";
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-xs">
      <button
        className="flex items-center gap-1.5 px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-label-md font-label-md font-medium transition-all self-start"
        type="button"
        onClick={onAdd}
      >
        <Plus size={16} className="text-primary" />
        <span>Add Variable</span>
      </button>
      <button
        className="text-outline hover:text-on-surface font-code-sm text-code-sm flex items-center gap-1 transition-colors self-start sm:self-auto"
        type="button"
        onClick={() => fileInputRef.current?.click()}
      >
        <FileUp size={16} />
        <span>Bulk .env import</span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".env,text/plain"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
