import { useRegisterMutation } from "#/api/auth/auth.hooks.ts";
import { useForm, type UseFormSetError } from "react-hook-form";
import type { AuthMutation, RegisterRequest } from "#/api/auth/auth.types";
import type { AxiosError } from "axios";
import type { ApiResonse } from "#/api/types";
import authSchema from "#/validations/auth.validation.ts";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";

const callbacks = (
  setError: UseFormSetError<RegisterRequest>,
): AuthMutation => {
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

export function useRegister() {
  const { register, handleSubmit, setError, control } =
    useForm<RegisterRequest>({
      resolver: zodResolver(authSchema.register),
      criteriaMode: "all",
      defaultValues: {
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
      },
    });

  const registerMutation = useRegisterMutation(callbacks(setError));

  const onSubmit = (data: RegisterRequest) => {
    registerMutation.mutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setError,
    control,
  };
}
