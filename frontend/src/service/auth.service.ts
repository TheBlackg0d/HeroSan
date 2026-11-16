import { refreshToken } from "#/api/auth/auth.requests.ts";
import type { User } from "#/api/user/user.type.ts";
import { useAuthStore } from "#/store/auth.ts";
import { redirect } from "@tanstack/react-router";

class AuthService {
  static async refreshSession(): Promise<boolean> {
    const response = await refreshToken();

    if (response.data) {
      AuthService.setSession(response.data);
      return true;
    }

    return !!response.data;
  }

  static setSession(user: User): void {
    useAuthStore.getState().setCurrentUser(user);
    useAuthStore.getState().setIsAuthenticated(true);
  }

  static clearSession(): void {
    useAuthStore.getState().setCurrentUser(null);
    useAuthStore.getState().setIsAuthenticated(false);
  }

  static async authenticate(): Promise<boolean> {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    let sessionRefreshed = false;

    if (isAuthenticated) {
      return Promise.resolve(true);
    }

    sessionRefreshed = await AuthService.refreshSession();

    return Promise.resolve(sessionRefreshed);
  }
}

export default AuthService;
