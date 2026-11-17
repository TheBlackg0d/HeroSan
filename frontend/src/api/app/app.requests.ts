import { api } from "../api.ts";
import type {
  App,
  CreateAppRequest,
  UpdateAppVariables,
} from "./app.types.ts";

export async function getApps() {
  const response = await api.get<App[]>("/apps");
  return response.data;
}

export async function getAppById(id: string) {
  const response = await api.get<App>(`/apps/${id}`);
  return response.data;
}

export async function createApp(data: CreateAppRequest) {
  const response = await api.post<App>("/apps", data);
  return response.data;
}

export async function updateApp({ id, data }: UpdateAppVariables) {
  const response = await api.put<App>(`/apps/${id}`, data);
  return response.data;
}

export async function deleteApp(id: string) {
  const response = await api.delete<App>(`/apps/${id}`);
  return response.data;
}
