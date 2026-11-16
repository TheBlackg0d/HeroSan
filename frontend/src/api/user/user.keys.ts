import { queryOptions } from "@tanstack/react-query";
import { getUser } from "./user.requests.ts";

export enum Userkey {
  USER = "USER",
}

export function getUserQueryOptions() {
  return queryOptions({
    queryKey: [Userkey.USER],
    queryFn: getUser,
    staleTime: Infinity,
  });
}
