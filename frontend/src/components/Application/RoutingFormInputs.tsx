import { ApplicationSectionHeader } from "./ApplicationSectionHeader";
import { CircleX, Globe, GraphHub } from "lucide-react";
import { ErrorMessage, useFormContext } from "react-hook-form";
import { InputError } from "../shared/InputError";
import type { CreateAppFormValues } from "#/validations/app.create.validation.ts";

const inputErrorStyling = "ring-1 ring-error focus:ring-error";

export function RoutingFormInputs() {
  return (
    <section className="bg-surface-container-low p-space-lg md:p-space-xl rounded-xl shadow-md flex flex-col gap-space-lg">
      <ApplicationSectionHeader
        title="Service Identity & Routing"
        step="2"
        icon={<GraphHub size={20} className="text-primary" />}
      />
      <AppNameInput />
      <PortContainerInput />
    </section>
  );
}

function AppNameInput() {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext<CreateAppFormValues>();
  const name = watch("name");

  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="font-label-md text-label-md font-medium text-on-surface flex items-center gap-space-xs"
        htmlFor="app-name"
      >
        <span>App Name</span>
        <span className="text-error font-code-sm text-code-sm">*</span>
      </label>
      <div className="relative flex items-center">
        <input
          aria-describedby="app-name-error"
          aria-invalid={!!errors.name}
          className={`w-full bg-surface-container-lowest text-on-surface font-code-md text-code-md px-3.5 py-2.5 rounded-lg focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary placeholder:text-outline shadow-inner transition-all pr-10 ${errors.name ? inputErrorStyling : ""}`}
          id="app-name"
          type="text"
          placeholder="my-app"
          {...register("name")}
        />
        {errors.name && (
          <div className="absolute right-3 flex items-center pointer-events-none text-error">
            <CircleX size={20} />
          </div>
        )}
      </div>
      <div id="app-name-error">
        <ErrorMessage
          control={control}
          name="name"
          render={({ message }) => <InputError message={message} />}
        />
      </div>
      <div className="bg-surface-container p-space-sm rounded-lg mt-space-xs flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-outline" />
          <span className="font-label-sm text-label-sm uppercase tracking-wide text-outline font-medium">
            Deployment Ingress:
          </span>
          <code className="font-code-md text-code-md text-primary font-medium tracking-tight">
            https://{name?.trim() || "my-app"}.localtest.me
          </code>
        </div>
        <span className="font-code-sm text-code-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
          Edge Wildcard
        </span>
      </div>
    </div>
  );
}

function PortContainerInput() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateAppFormValues>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
      <div className="flex flex-col gap-1.5">
        <label
          className="font-label-md text-label-md font-medium text-on-surface flex items-center gap-space-xs"
          htmlFor="container-port"
        >
          <span>Container Port</span>
          <span className="text-error font-code-sm text-code-sm">*</span>
        </label>
        <div className="relative flex items-center">
          <input
            className={`w-full bg-surface-container-lowest text-on-surface font-code-md text-code-md px-3.5 py-2.5 rounded-lg focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-inner transition-all font-mono ${errors.containerPort ? inputErrorStyling : ""}`}
            id="container-port"
            type="number"
            inputMode="numeric"
            min={1}
            max={65535}
            aria-invalid={!!errors.containerPort}
            {...register("containerPort", { valueAsNumber: true })}
          />
          <span className="absolute right-3 font-code-sm text-code-sm text-outline pointer-events-none">
            TCP
          </span>
        </div>
        <ErrorMessage
          control={control}
          name="containerPort"
          render={({ message }) => <InputError message={message} />}
        />
        <span className="font-body-sm text-body-sm text-outline">
          Internal HTTP port exposed by your Dockerfile or buildpack (e.g. 3000,
          8080).
        </span>
      </div>
    </div>
  );
}
