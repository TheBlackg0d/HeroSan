import { type ReactNode, useState } from "react";
import {
  Bug,
  Check,
  Copy,
  CreditCard,
  Database,
  Eye,
  EyeOff,
  Globe,
  Key,
  KeyRound,
  Lock,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "#/components/ui/button";
import { TableCell, TableRow } from "#/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import { useCopyToClipboard } from "#/hooks/useCopyToClipboard";
import { cn } from "#/lib/utils";
import { envFieldClass } from "./envUtils";
import { ScopeBadges, ScopeToggleGroup } from "./ScopeControls";
import { SecretInput } from "./SecretInput";
import type { VariableChanges } from "./useEnvironmentVariables";

const ICONS: Record<EnvVariableIcon, ReactNode> = {
  database: <Database size={15} className="text-secondary" />,
  public: <Globe size={15} className="text-primary" />,
  key: <KeyRound size={15} className="text-outline" />,
  token: <Key size={15} className="text-outline" />,
  monitoring: <Bug size={15} className="text-outline" />,
  payment: <CreditCard size={15} className="text-outline" />,
  lock: <Lock size={15} className="text-outline" />,
};

const MIN_MASK = 16;
const MAX_MASK = 44;

export const envCellClass = "py-3 px-space-lg first:pl-space-lg";

type EnvVariableRowProps = {
  variable: EnvVariable;
  striped: boolean;
  onUpdate: (changes: VariableChanges) => void;
  onRemove: () => void;
};

export function EnvVariableRow({ variable, striped, onUpdate, onRemove }: EnvVariableRowProps) {
  const [editing, setEditing] = useState(false);

  return (
    <TableRow
      className={cn(
        "group border-0 hover:bg-surface-container",
        striped && "bg-surface-container-lowest/40",
      )}
    >
      <TableCell className={cn(envCellClass, "max-w-0 w-1/4")}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="shrink-0">{ICONS[variable.icon]}</span>
          <span
            className={cn(
              "font-code-md text-code-md font-medium truncate",
              variable.secret ? "text-on-surface" : "text-primary",
            )}
          >
            {variable.key}
          </span>
        </div>
      </TableCell>

      {editing ? (
        <EditCells
          variable={variable}
          onCancel={() => setEditing(false)}
          onSave={(changes) => {
            onUpdate(changes);
            setEditing(false);
          }}
        />
      ) : (
        <>
          <TableCell className={cn(envCellClass, "max-w-0 w-1/3")}>
            <ValueCell variable={variable} />
          </TableCell>
          <TableCell className={cn(envCellClass, "hidden lg:table-cell")}>
            <ScopeBadges scopes={variable.scopes} />
          </TableCell>
          <TableCell className={envCellClass}>
            <div className="flex flex-col">
              <span className="font-body-sm text-body-sm text-on-surface">
                {variable.updatedAgo}
              </span>
              <span className="font-code-sm text-code-sm text-outline">
                {variable.updatedBy}
              </span>
            </div>
          </TableCell>
          <TableCell className={cn(envCellClass, "text-right")}>
            <div className="flex items-center justify-end gap-1">
              <RowAction label={`Edit ${variable.key}`} onClick={() => setEditing(true)}>
                <Pencil />
              </RowAction>
              <RowAction
                label={`Delete ${variable.key}`}
                onClick={onRemove}
                className="hover:text-error"
              >
                <Trash2 />
              </RowAction>
            </div>
          </TableCell>
        </>
      )}
    </TableRow>
  );
}

function ValueCell({ variable }: { variable: EnvVariable }) {
  const [revealed, setRevealed] = useState(!variable.secret);
  const { copied, copy } = useCopyToClipboard();
  const mask = "•".repeat(Math.min(Math.max(variable.value.length, MIN_MASK), MAX_MASK));

  return (
    <div className="flex items-center gap-2 min-w-0">
      <span
        className={cn(
          "font-code-md text-code-md truncate",
          revealed ? "text-on-surface" : "text-outline tracking-wider",
        )}
      >
        {revealed ? variable.value : mask}
      </span>
      {variable.secret && (
        <RowAction
          label={revealed ? "Hide secret" : "Reveal secret"}
          onClick={() => setRevealed((current) => !current)}
        >
          {revealed ? <EyeOff /> : <Eye />}
        </RowAction>
      )}
      <RowAction
        label={copied ? "Copied!" : "Copy value"}
        onClick={() => copy(variable.value)}
        className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
      >
        {copied ? <Check className="text-tertiary" /> : <Copy />}
      </RowAction>
    </div>
  );
}

function EditCells({
  variable,
  onCancel,
  onSave,
}: {
  variable: EnvVariable;
  onCancel: () => void;
  onSave: (changes: VariableChanges) => void;
}) {
  const [value, setValue] = useState(variable.value);
  const [scopes, setScopes] = useState(variable.scopes);
  const canSave = value.trim() !== "" && scopes.length > 0;

  const save = () => {
    if (canSave) onSave({ value: value.trim(), scopes });
  };

  return (
    <>
      <TableCell className={cn(envCellClass, "max-w-0 w-1/3")}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            save();
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") onCancel();
          }}
        >
          <SecretInput
            value={value}
            onChange={setValue}
            aria-label={`New value for ${variable.key}`}
            invalid={value.trim() === ""}
            autoFocus
            className={cn(envFieldClass, "py-1.5")}
          />
        </form>
      </TableCell>
      <TableCell className={cn(envCellClass, "hidden lg:table-cell")}>
        <ScopeToggleGroup value={scopes} onChange={setScopes} />
      </TableCell>
      <TableCell className={cn(envCellClass, "font-code-sm text-code-sm text-outline")}>
        Editing…
      </TableCell>
      <TableCell className={cn(envCellClass, "text-right")}>
        <div className="flex items-center justify-end gap-1">
          <RowAction
            label="Save changes"
            onClick={save}
            disabled={!canSave}
            className="text-tertiary hover:text-tertiary"
          >
            <Check />
          </RowAction>
          <RowAction label="Cancel editing" onClick={onCancel}>
            <X />
          </RowAction>
        </div>
      </TableCell>
    </>
  );
}

function RowAction({
  label,
  onClick,
  disabled,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={label}
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "shrink-0 rounded text-outline hover:text-on-surface hover:bg-surface-container-high",
            className,
          )}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
