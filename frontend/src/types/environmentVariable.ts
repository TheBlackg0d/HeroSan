type EnvScope = "production" | "preview" | "development";

type EnvVariableIcon =
  | "database"
  | "public"
  | "key"
  | "token"
  | "monitoring"
  | "payment"
  | "lock";

type EnvVariable = {
  id: string;
  key: string;
  value: string;
  scopes: EnvScope[];
  secret: boolean;
  icon: EnvVariableIcon;
  updatedAgo: string;
  updatedBy: string;
};
