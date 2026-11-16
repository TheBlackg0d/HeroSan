import { useMutation } from "@tanstack/react-query";
import type {
  LoginRequest,
  RegisterRequest,
  AuthMutation,
} from "./auth.types";
import { loginMutation, registerMutation } from "./auth.keys";
import { useNavigate } from "@tanstack/react-router";
import type { ApiResonse } from "../types";
import type { AxiosError } from "axios";
import type { User } from "../user/user.type";

export function useRegisterMutation(callbacks: AuthMutation) {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const redirectTo = searchParams.get("redirectTo");

  const onSuccess = (data: any) => {
    console.log("Registration successful", data);
    navigate({
      to:
        redirectTo?.startsWith("/") && !redirectTo.startsWith("//")
          ? redirectTo
          : "/",
    });
  };

  callbacks.onSuccess = onSuccess;

  return useMutation<User, AxiosError<ApiResonse>, RegisterRequest>(
    registerMutation(callbacks),
  );
}

export function useLoginMutation(callbacks: AuthMutation) {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const redirectTo = searchParams.get("redirectTo");

  const onSuccess = () => {
    navigate({
      to:
        redirectTo?.startsWith("/") && !redirectTo.startsWith("//")
          ? redirectTo
          : "/",
    });
  };

  callbacks.onSuccess = onSuccess;

  return useMutation<User, AxiosError<ApiResonse>, LoginRequest>(
    loginMutation(callbacks),
  );
}
