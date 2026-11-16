import { mutationOptions } from "@tanstack/react-query";
import type { AuthMutation } from "./auth.types";
import { login, register } from "./auth.requests";

export enum AuthKeys {
  LOGIN = "login",
  REGISTER = "register",
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
