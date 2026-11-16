import { api } from "../api.ts";
import type { User } from "./user.type.ts";
import type { ApiResonse } from "../types.ts";

export async function getUser() {
  const response = await api.get<ApiResonse<User>>("/user/me");
  return response.data;
}
