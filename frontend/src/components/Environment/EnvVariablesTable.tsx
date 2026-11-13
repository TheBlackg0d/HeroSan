import type { ReactNode } from "react";
import { ArrowDownAZ, ArrowUpZA } from "lucide-react";
import { Button } from "#/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui/table";
import { cn } from "#/lib/utils";
import { EnvVariableRow, envCellClass } from "./EnvVariableRow";
import type { VariableChanges } from "./useEnvironmentVariables";

export type SortDirection = "asc" | "desc";

type EnvVariablesTableProps = {
  variables: EnvVariable[];
  sortDirection: SortDirection;
  onToggleSort: () => void;
  onUpdate: (id: string, changes: VariableChanges) => void;
  onRemove: (id: string) => void;
};

export function EnvVariablesTable({
  variables,
  sortDirection,
  onToggleSort,
  onUpdate,
  onRemove,
}: EnvVariablesTableProps) {
  const SortIcon = sortDirection === "asc" ? ArrowDownAZ : ArrowUpZA;

  return (
    <div className="rounded-xl bg-surface-container-low shadow-sm overflow-hidden">
      <Table className="table-fixed">
        <TableHeader className="[&_tr]:border-0">
          <TableRow className="bg-surface-container hover:bg-surface-container">
            <HeaderCell className="w-1/4">
              <Button
                variant="ghost"
                onClick={onToggleSort}
                aria-label={`Sort by key, ${sortDirection === "asc" ? "descending" : "ascending"}`}
                className="h-auto p-0 gap-1.5 uppercase tracking-wider text-outline hover:text-on-surface hover:bg-transparent font-label-sm text-(length:--text-label-sm)"
              >
                Key
                <SortIcon className="size-3.5" />
              </Button>
            </HeaderCell>
            <HeaderCell className="w-1/3">Value</HeaderCell>
            <HeaderCell className="hidden lg:table-cell">Scope</HeaderCell>
            <HeaderCell>Last Updated</HeaderCell>
            <HeaderCell className="w-20 text-right">Actions</HeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variables.length === 0 ? (
            <TableRow className="border-0 hover:bg-transparent">
              <TableCell
                colSpan={5}
                className="py-10 text-center font-body-md text-body-md text-outline"
              >
                No variables match your filters.
              </TableCell>
            </TableRow>
          ) : (
            variables.map((variable, index) => (
              <EnvVariableRow
                key={variable.id}
                variable={variable}
                striped={index % 2 === 1}
                onUpdate={(changes) => onUpdate(variable.id, changes)}
                onRemove={() => onRemove(variable.id)}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function HeaderCell({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <TableHead
      className={cn(
        envCellClass,
        "h-auto py-2.5 font-label-sm text-label-sm uppercase tracking-wider text-outline select-none",
        className,
      )}
    >
      {children}
    </TableHead>
  );
}
