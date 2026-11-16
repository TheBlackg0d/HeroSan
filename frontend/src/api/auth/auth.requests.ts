import { api } from "../api.ts";
import type { ApiResponse } from "../types.ts";
import type { User } from "../user/user.type.ts";
import type { LoginRequest, RegisterRequest } from "./auth.types.ts";

export async function login(data: LoginRequest): Promise<ApiResponse<User>> {
  const response = await api.post("/auth/login", data);
  return response.data;
}

export async function register(
  data: RegisterRequest,
): Promise<ApiResponse<User>> {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function logout() {
  const response = await api.post<ApiResponse<null>>("/auth/logout");
  return response.data;
}

export async function refreshToken() {
  const response = await api.post<ApiResponse<User>>("/auth/refresh-token");
  return response.data;
}
