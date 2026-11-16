import { useLoginMutation } from "#/api/auth/auth.hooks.ts";
import { useForm, type UseFormSetError } from "react-hook-form";
import type { AuthMutation, LoginRequest } from "#/api/auth/auth.types";
import { AxiosError } from "axios";

import authSchema from "#/validations/auth.validation.ts";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import type { ErrorResponse } from "#/api/types.ts";

const callbacks = (setError: UseFormSetError<LoginRequest>): AuthMutation => {
  return {
    onError: (error: AxiosError<ErrorResponse>) => {
      const data = error.response?.data;
      if (!data) return;

      if ("errors" in data && data.errors) {
        Object.entries(data.errors).forEach(([field, messages]) => {
          messages.forEach((message) => {
            setError(field as keyof LoginRequest, {
              type: "server",
              message,
            });
          });
        });
        return;
      }

      if (data.message) {
        setError("root.server", {
          type: "server",
          message: data.message,
        });
      }
    },
  };
};

export function useLogin() {
  const { register, handleSubmit, setError, control } = useForm<LoginRequest>({
    resolver: zodResolver(authSchema.login),
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLoginMutation(callbacks(setError));

  const onSubmit = (data: LoginRequest) => {
    loginMutation.mutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setError,
    control,
  };
}
