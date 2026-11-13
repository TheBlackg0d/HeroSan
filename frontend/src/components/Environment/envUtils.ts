export const ALL_SCOPES: EnvScope[] = ["production", "preview", "development"];

export const SCOPE_LABELS: Record<EnvScope, { long: string; short: string }> = {
  production: { long: "Production", short: "Prod" },
  preview: { long: "Preview", short: "Prev" },
  development: { long: "Development", short: "Dev" },
};

export const envFieldClass =
  "h-auto px-3 py-2 rounded-lg border-0 bg-surface-container-lowest focus-visible:bg-surface-container focus-visible:ring-0 font-code-md text-(length:--text-code-md) md:text-(length:--text-code-md) text-on-surface placeholder:text-outline/50";

const KEY_PATTERN = /^[A-Z_][A-Z0-9_]*$/;
const PUBLIC_PREFIXES = ["NEXT_PUBLIC_", "PUBLIC_", "VITE_"];

export function normalizeKey(raw: string) {
  return raw.trim().toUpperCase().replace(/\s+/g, "_");
}

export function validateKey(key: string, existingKeys: string[]) {
  if (!key) return "Variable name is required";
  if (!KEY_PATTERN.test(key)) {
    return "Use letters, digits and underscores; can't start with a digit";
  }
  if (existingKeys.includes(key)) return `${key} already exists`;
  return null;
}

export function isPublicKey(key: string) {
  return PUBLIC_PREFIXES.some((prefix) => key.startsWith(prefix));
}

export function iconForKey(key: string): EnvVariableIcon {
  return isPublicKey(key) ? "public" : "key";
}

export function serializeDotenv(variables: EnvVariable[]) {
  return variables
    .map(({ key, value }) => `${key}=${quoteIfNeeded(value)}`)
    .join("\n");
}

function quoteIfNeeded(value: string) {
  return /[\s#"'=]/.test(value) ? JSON.stringify(value) : value;
}

export type DotenvEntry = { key: string; value: string };

export type DotenvParseResult = {
  entries: DotenvEntry[];
  errors: string[];
};

export function parseDotenv(text: string): DotenvParseResult {
  const entries: DotenvEntry[] = [];
  const errors: string[] = [];

  text.split(/\r?\n/).forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) return;

    const withoutExport = line.replace(/^export\s+/, "");
    const separator = withoutExport.indexOf("=");
    if (separator <= 0) {
      errors.push(`Line ${index + 1}: expected KEY=value`);
      return;
    }

    const key = normalizeKey(withoutExport.slice(0, separator));
    if (!KEY_PATTERN.test(key)) {
      errors.push(`Line ${index + 1}: invalid variable name "${key}"`);
      return;
    }

    entries.push({ key, value: unquote(withoutExport.slice(separator + 1).trim()) });
  });

  return { entries, errors };
}

function unquote(value: string) {
  const quote = value[0];
  if ((quote === '"' || quote === "'") && value.endsWith(quote) && value.length > 1) {
    const inner = value.slice(1, -1);
    return quote === '"' ? inner.replace(/\\n/g, "\n").replace(/\\"/g, '"') : inner;
  }
  return value;
}

export function downloadTextFile(filename: string, content: string) {
  const url = URL.createObjectURL(new Blob([content], { type: "text/plain" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
