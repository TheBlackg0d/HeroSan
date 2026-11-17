import { useForm, type UseFormSetError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import {
  createAppSchema,
  type CreateAppFormValues,
} from "#/validations/app.create.validation.ts";
import { useCreateAppMutation } from "#/api/app/app.hooks.ts";
import type { AppMutation } from "#/api/app/app.types.ts";

const callbacks = (
  setError: UseFormSetError<CreateAppFormValues>,
  onSuccess: () => void,
): AppMutation => {
  return {
    onSuccess,
    onError: (error) => {
      const data = error.response?.data;
      if (!data) {
        setError("root.server", {
          type: "server",
          message: "Unable to reach the server",
        });
        return;
      }

      if ("errors" in data && data.errors) {
        Object.entries(data.errors).forEach(([field, messages]) => {
          messages.forEach((message) => {
            setError(field as keyof CreateAppFormValues, {
              type: "server",
              message,
            });
          });
        });
        return;
      }

      if (data.message) {
        setError("root.server", { type: "server", message: data.message });
      }
    },
  };
};

export function useCreateApp() {
  const navigate = useNavigate();

  const form = useForm<CreateAppFormValues>({
    resolver: zodResolver(createAppSchema),
    mode: "onTouched",
    defaultValues: {
      repoUrl: "",
      branch: "main",
      rootDirectory: "./",
      name: "",
      containerPort: 3000,
      environmentVariables: [],
    },
  });

  const createAppMutation = useCreateAppMutation(
    callbacks(form.setError, () => navigate({ to: "/" })),
  );

  const onSubmit = form.handleSubmit((data) => {
    createAppMutation.mutate(data);
  });

  return { form, onSubmit, isPending: createAppMutation.isPending };
}
