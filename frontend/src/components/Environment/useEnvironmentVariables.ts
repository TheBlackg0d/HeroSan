import { useMemo, useState } from "react";
import { ALL_SCOPES, type DotenvEntry, iconForKey, isPublicKey } from "./envUtils";

const CURRENT_USER = "you";
const JUST_NOW = "just now";

export type NewVariableInput = {
  key: string;
  value: string;
  scopes: EnvScope[];
};

export type VariableChanges = {
  value: string;
  scopes: EnvScope[];
};

export function useEnvironmentVariables(initial: EnvVariable[]) {
  const [saved, setSaved] = useState(initial);
  const [variables, setVariables] = useState(initial);

  const pendingChanges = useMemo(
    () => countChanges(saved, variables),
    [saved, variables],
  );

  const add = ({ key, value, scopes }: NewVariableInput) => {
    setVariables((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        key,
        value,
        scopes,
        secret: !isPublicKey(key),
        icon: iconForKey(key),
        updatedAgo: JUST_NOW,
        updatedBy: CURRENT_USER,
      },
    ]);
  };

  const update = (id: string, changes: VariableChanges) => {
    setVariables((current) =>
      current.map((variable) =>
        variable.id === id
          ? { ...variable, ...changes, updatedAgo: JUST_NOW, updatedBy: CURRENT_USER }
          : variable,
      ),
    );
  };

  const remove = (id: string) => {
    setVariables((current) => current.filter((variable) => variable.id !== id));
  };

  const replaceAll = (entries: DotenvEntry[]) => {
    setVariables((current) => {
      const byKey = new Map(current.map((variable) => [variable.key, variable]));
      return entries.map(({ key, value }) => {
        const existing = byKey.get(key);
        if (!existing) {
          return {
            id: crypto.randomUUID(),
            key,
            value,
            scopes: [...ALL_SCOPES],
            secret: !isPublicKey(key),
            icon: iconForKey(key),
            updatedAgo: JUST_NOW,
            updatedBy: CURRENT_USER,
          };
        }
        if (existing.value === value) return existing;
        return { ...existing, value, updatedAgo: JUST_NOW, updatedBy: CURRENT_USER };
      });
    });
  };

  const save = () => setSaved(variables);
  const discard = () => setVariables(saved);

  return { variables, pendingChanges, add, update, remove, replaceAll, save, discard };
}

function countChanges(saved: EnvVariable[], current: EnvVariable[]) {
  const savedById = new Map(saved.map((variable) => [variable.id, variable]));
  const currentIds = new Set(current.map((variable) => variable.id));

  let changes = saved.filter((variable) => !currentIds.has(variable.id)).length;
  for (const variable of current) {
    const before = savedById.get(variable.id);
    if (!before || before.value !== variable.value || !sameScopes(before.scopes, variable.scopes)) {
      changes += 1;
    }
  }
  return changes;
}

function sameScopes(a: EnvScope[], b: EnvScope[]) {
  return a.length === b.length && a.every((scope) => b.includes(scope));
}
