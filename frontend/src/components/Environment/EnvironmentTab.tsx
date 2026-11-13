import { useMemo, useState } from "react";
import { getEnvironmentVariables } from "#/data/environmentVariables";
import { AddVariableForm } from "./AddVariableForm";
import { EnvVariablesTable, type SortDirection } from "./EnvVariablesTable";
import { EnvVariablesToolbar, type ScopeFilter } from "./EnvVariablesToolbar";
import { EnvironmentHelpCards } from "./EnvironmentHelpCards";
import { downloadTextFile, serializeDotenv } from "./envUtils";
import { RedeployBanner } from "./RedeployBanner";
import { useEnvironmentVariables } from "./useEnvironmentVariables";

export function EnvironmentTab({ app }: { app: AppOverview }) {
  const env = useEnvironmentVariables(getEnvironmentVariables(app.id));
  const [query, setQuery] = useState("");
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>("all");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = env.variables.filter(
      (variable) =>
        (scopeFilter === "all" || variable.scopes.includes(scopeFilter)) &&
        (!needle ||
          variable.key.toLowerCase().includes(needle) ||
          (!variable.secret && variable.value.toLowerCase().includes(needle))),
    );
    const direction = sortDirection === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => a.key.localeCompare(b.key) * direction);
  }, [env.variables, query, scopeFilter, sortDirection]);

  return (
    <div className="flex flex-col gap-space-lg">
      <RedeployBanner
        pendingChanges={env.pendingChanges}
        onExport={() => downloadTextFile(`${app.name}.env`, serializeDotenv(env.variables))}
        onDiscard={env.discard}
        onSave={env.save}
      />
      <EnvVariablesToolbar
        variables={env.variables}
        query={query}
        onQueryChange={setQuery}
        scopeFilter={scopeFilter}
        onScopeFilterChange={setScopeFilter}
        onBulkApply={env.replaceAll}
      />
      <AddVariableForm
        existingKeys={env.variables.map((variable) => variable.key)}
        onAdd={env.add}
      />
      <EnvVariablesTable
        variables={visible}
        sortDirection={sortDirection}
        onToggleSort={() => setSortDirection((current) => (current === "asc" ? "desc" : "asc"))}
        onUpdate={env.update}
        onRemove={env.remove}
      />
      <EnvironmentHelpCards appName={app.name} />
    </div>
  );
}
