import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  AppKeys,
  createAppMutation,
  deleteAppMutation,
  getAppQueryOptions,
  getAppsQueryOptions,
  updateAppMutation,
} from "./app.keys.ts";
import type { App, AppMutation } from "./app.types.ts";

export function useAppsQuery() {
  return useQuery(getAppsQueryOptions());
}

export function useAppQuery(id: string) {
  return useQuery(getAppQueryOptions(id));
}

export function useCreateAppMutation(callbacks: AppMutation = {}) {
  const queryClient = useQueryClient();

  return useMutation(
    createAppMutation({
      ...callbacks,
      onSuccess: (app: App) => {
        queryClient.invalidateQueries({ queryKey: [AppKeys.APPS] });
        callbacks.onSuccess?.(app);
      },
    }),
  );
}

export function useUpdateAppMutation(callbacks: AppMutation = {}) {
  const queryClient = useQueryClient();

  return useMutation(
    updateAppMutation({
      ...callbacks,
      onSuccess: (app: App) => {
        queryClient.setQueryData([AppKeys.APPS, app.id], app);
        queryClient.invalidateQueries({ queryKey: [AppKeys.APPS] });
        callbacks.onSuccess?.(app);
      },
    }),
  );
}

export function useDeleteAppMutation(callbacks: AppMutation = {}) {
  const queryClient = useQueryClient();

  return useMutation(
    deleteAppMutation({
      ...callbacks,
      onSuccess: (app: App) => {
        queryClient.removeQueries({ queryKey: [AppKeys.APPS, app.id] });
        queryClient.invalidateQueries({ queryKey: [AppKeys.APPS] });
        callbacks.onSuccess?.(app);
      },
    }),
  );
}
