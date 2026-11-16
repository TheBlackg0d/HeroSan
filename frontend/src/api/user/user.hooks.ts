import { useQuery } from "@tanstack/react-query";
import { getUserQueryOptions } from "./user.keys.ts";

export function useUserQuery() {
  return useQuery(getUserQueryOptions());
}
