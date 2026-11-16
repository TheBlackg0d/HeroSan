import { useLoginMutation } from "#/api/auth/auth.hooks.ts";
import { useForm, type UseFormSetError } from "react-hook-form";
import type { AuthMutation, LoginRequest } from "#/api/auth/auth.types";
import type { AxiosError } from "axios";
import type { ApiResonse } from "#/api/types";
import authSchema from "#/validations/auth.validation.ts";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";

const callbacks = (setError: UseFormSetError<LoginRequest>): AuthMutation => {
  return {
    onError: (error: AxiosError<ApiResonse>) => {
      if (error.response?.data?.message) {
        setError("root.server", {
          type: "server",
          message: error.response?.data?.message,
        });
      }
    },
  };
};

export function useLogin() {
  const { register, handleSubmit, setError, control } = useForm<LoginRequest>(
    {
      resolver: zodResolver(authSchema.login),
      criteriaMode: "all",
      defaultValues: {
        email: "",
        password: "",
      },
    },
  );

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
