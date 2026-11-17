import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type { AppMutation } from "./app.types.ts";
import {
  createApp,
  deleteApp,
  getAppById,
  getApps,
  updateApp,
} from "./app.requests.ts";

export enum AppKeys {
  APPS = "APPS",
  CREATE = "createApp",
  UPDATE = "updateApp",
  DELETE = "deleteApp",
}

export function getAppsQueryOptions() {
  return queryOptions({
    queryKey: [AppKeys.APPS],
    queryFn: getApps,
  });
}

export function getAppQueryOptions(id: string) {
  return queryOptions({
    queryKey: [AppKeys.APPS, id],
    queryFn: () => getAppById(id),
    enabled: !!id,
  });
}

export const createAppMutation = (callback: AppMutation) => {
  return mutationOptions({
    mutationKey: [AppKeys.CREATE],
    mutationFn: createApp,
    onSuccess: callback.onSuccess,
    onError: callback.onError,
    onSettled: callback.onSettled,
  });
};

export const updateAppMutation = (callback: AppMutation) => {
  return mutationOptions({
    mutationKey: [AppKeys.UPDATE],
    mutationFn: updateApp,
    onSuccess: callback.onSuccess,
    onError: callback.onError,
    onSettled: callback.onSettled,
  });
};

export const deleteAppMutation = (callback: AppMutation) => {
  return mutationOptions({
    mutationKey: [AppKeys.DELETE],
    mutationFn: deleteApp,
    onSuccess: callback.onSuccess,
    onError: callback.onError,
    onSettled: callback.onSettled,
  });
};
