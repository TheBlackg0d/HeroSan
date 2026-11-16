import { useMutation } from "@tanstack/react-query";
import type { AuthMutation } from "./auth.types";
import {
  loginMutation,
  logoutMutation,
  refreshTokenMutation,
  registerMutation,
} from "./auth.keys";
import { useNavigate } from "@tanstack/react-router";

import type { ApiResponse } from "../types";
import type { User } from "../user/user.type";
import { useAuthStore } from "#/store/auth.ts";
import AuthService from "#/service/auth.service.ts";

export function useRegisterMutation(callbacks: AuthMutation) {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const searchParams = new URLSearchParams(window.location.search);
  const redirectTo = searchParams.get("redirectTo");

  const onSuccess = (response: ApiResponse<User>) => {
    authStore.setCurrentUser(response.data ?? null);
    authStore.setIsAuthenticated(true);
    console.log("Registration successful", response);
    navigate({
      to:
        redirectTo?.startsWith("/") && !redirectTo.startsWith("//")
          ? redirectTo
          : "/",
    });
  };

  callbacks.onSuccess = onSuccess;

  return useMutation(registerMutation(callbacks));
}

export function useLoginMutation(callbacks: AuthMutation) {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const searchParams = new URLSearchParams(window.location.search);
  const redirectTo = searchParams.get("redirectTo");

  const onSuccess = (response: ApiResponse<User>) => {
    authStore.setCurrentUser(response.data ?? null);
    authStore.setIsAuthenticated(true);
    navigate({
      to:
        redirectTo?.startsWith("/") && !redirectTo.startsWith("//")
          ? redirectTo
          : "/",
    });
  };

  callbacks.onSuccess = onSuccess;

  return useMutation(loginMutation(callbacks));
}

export function useLogoutMutation() {
  const navigate = useNavigate();

  return useMutation({
    ...logoutMutation(),
    onSettled: () => {
      AuthService.clearSession();
      navigate({ to: "/login" });
    },
  });
}

export function useRefreshTokenMutation() {
  return useMutation(refreshTokenMutation({}));
}
