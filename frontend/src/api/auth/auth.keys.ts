import { mutationOptions } from "@tanstack/react-query";
import type { AuthMutation } from "./auth.types";
import { login, logout, register, refreshToken } from "./auth.requests";

export enum AuthKeys {
  LOGIN = "login",
  LOGOUT = "logout",
  REGISTER = "register",
  REFRESH_TOKEN = "refreshToken",
}

export const loginMutation = (callback: AuthMutation) => {
  return mutationOptions({
    mutationKey: [AuthKeys.LOGIN],
    mutationFn: login,
    onSuccess: callback.onSuccess,
    onError: callback.onError,
    onSettled: callback.onSettled,
  });
};

export const registerMutation = (callback: AuthMutation) => {
  return mutationOptions({
    mutationKey: [AuthKeys.REGISTER],
    mutationFn: register,
    onSuccess: callback.onSuccess,
    onError: callback.onError,
    onSettled: callback.onSettled,
  });
};

export const logoutMutation = () => {
  return mutationOptions({
    mutationKey: [AuthKeys.LOGOUT],
    mutationFn: logout,
  });
};

export const refreshTokenMutation =(callback: AuthMutation) => {
  return mutationOptions({
    mutationKey: [AuthKeys.REFRESH_TOKEN],
    mutationFn: refreshToken,
    onSuccess: callback.onSuccess,
    onError: callback.onError,
    onSettled: callback.onSettled,
  });
};
