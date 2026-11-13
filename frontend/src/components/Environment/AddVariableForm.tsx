import { type FormEvent, useState } from "react";
import { CirclePlus, Plus } from "lucide-react";
import { Panel } from "#/components/AppOverview/shared";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { cn } from "#/lib/utils";
import { envFieldClass, normalizeKey, validateKey } from "./envUtils";
import { ScopeToggleGroup } from "./ScopeControls";
import { SecretInput } from "./SecretInput";
import type { NewVariableInput } from "./useEnvironmentVariables";

const DEFAULT_SCOPES: EnvScope[] = ["production", "preview"];

type FormError = { field: "key" | "value" | "scopes"; message: string };

type AddVariableFormProps = {
  existingKeys: string[];
  onAdd: (input: NewVariableInput) => void;
};

export function AddVariableForm({ existingKeys, onAdd }: AddVariableFormProps) {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [scopes, setScopes] = useState<EnvScope[]>(DEFAULT_SCOPES);
  const [error, setError] = useState<FormError | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const normalizedKey = normalizeKey(key);
    const trimmedValue = value.trim();

    const keyError = validateKey(normalizedKey, existingKeys);
    if (keyError) return setError({ field: "key", message: keyError });
    if (!trimmedValue) return setError({ field: "value", message: "Value is required" });
    if (scopes.length === 0) {
      return setError({ field: "scopes", message: "Pick at least one environment" });
    }

    onAdd({ key: normalizedKey, value: trimmedValue, scopes });
    setKey("");
    setValue("");
    setScopes(DEFAULT_SCOPES);
    setError(null);
  };

  return (
    <Panel size="sm" className="gap-space-sm px-space-md shadow-sm">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-label-sm text-label-sm uppercase tracking-wider text-outline">
          <CirclePlus size={14} className="text-secondary" />
          Add Environment Variable
        </span>
        <span className="font-code-sm text-code-sm text-outline-variant">
          Auto-trimmed whitespace
        </span>
      </div>

      <form
        onSubmit={submit}
        noValidate
        className="grid grid-cols-1 md:grid-cols-12 items-center gap-space-sm"
      >
        <Input
          value={key}
          onChange={(event) => {
            setKey(event.target.value);
            setError(null);
          }}
          placeholder="VARIABLE_NAME"
          aria-label="Variable name"
          aria-invalid={error?.field === "key" || undefined}
          autoComplete="off"
          spellCheck={false}
          className={cn(envFieldClass, "md:col-span-4 uppercase tracking-wide")}
        />
        <SecretInput
          value={value}
          onChange={(next) => {
            setValue(next);
            setError(null);
          }}
          placeholder="Value or secret string"
          aria-label="Variable value"
          invalid={error?.field === "value"}
          className={envFieldClass}
          wrapperClassName="md:col-span-4"
        />
        <ScopeToggleGroup
          value={scopes}
          onChange={(next) => {
            setScopes(next);
            setError(null);
          }}
          className="md:col-span-3"
        />
        <Button
          type="submit"
          variant="ghost"
          aria-label="Add variable"
          className="md:col-span-1 h-full py-2 px-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high text-primary hover:text-on-surface font-headline-sm text-(length:--text-headline-sm)"
        >
          <Plus />
          <span className="md:hidden">Add</span>
        </Button>
      </form>

      {error && (
        <p role="alert" className="font-code-sm text-code-sm text-error">
          {error.message}
        </p>
      )}
    </Panel>
  );
}
