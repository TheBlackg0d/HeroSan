import { ApplicationSectionHeader } from "./ApplicationSectionHeader";
import { CircleX, GraphHub, X } from "lucide-react";

const inputErrorStyling = "ring-1 ring-error";

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
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="font-label-md text-label-md font-medium text-on-surface flex items-center gap-space-xs"
        htmlFor="app-name"
      >
        <span>App Name</span>
        <span className="text-error font-code-sm text-code-sm">*</span>
      </label>

      {/* Input with validation error styling applied */}
      <div className="relative flex items-center">
        <input
          aria-describedby="app-name-error"
          aria-invalid="true"
          className="w-full bg-surface-container-lowest text-on-surface font-code-md text-code-md px-3.5 py-2.5 rounded-lg focus:outline-none  placeholder:text-outline shadow-inner transition-all pr-10"
          id="app-name"
          type="text"
          placeholder="my-app"
        />
        {/* <div className="absolute right-3 flex items-center pointer-events-none text-error">
          <CircleX size={20} />
        </div> */}
      </div>
      {/* Explicit validation error message directly underneath */}
      {/* <div
        className="flex items-center gap-1.5 text-error mt-0.5"
        id="app-name-error"
      >
        <X size={14} />
        <span className="font-label-sm text-label-sm font-medium">
          lowercase letters, numbers and hyphens only
        </span>
      </div> */}

      <div className="bg-surface-container p-space-sm rounded-lg mt-space-xs flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-outline">
            public
          </span>
          <span className="font-label-sm text-label-sm uppercase tracking-wide text-outline font-medium">
            Deployment Ingress:
          </span>
          <code className="font-code-md text-code-md text-primary font-medium tracking-tight">
            https://payment-service.localtest.me
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
      <div className="flex flex-col gap-1.5">
        <label
          className="font-label-md text-label-md font-medium text-on-surface flex items-center justify-between"
          htmlFor="container-port"
        ></label>
        <div className="relative flex items-center">
          <input
            className="w-full bg-surface-container-lowest text-on-surface font-code-md text-code-md px-3.5 py-2.5 rounded-lg focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-inner transition-all font-mono"
            id="container-port"
            type="text"
            value="3000"
          />
          <span className="absolute right-3 font-code-sm text-code-sm text-outline">
            TCP
          </span>
        </div>
        <span className="font-body-sm text-body-sm text-outline">
          Internal HTTP port exposed by your Dockerfile or buildpack (e.g. 3000,
          8080).
        </span>
      </div>
      {/* <div className="flex flex-col gap-1.5">
        <label className="font-label-md text-label-md font-medium text-on-surface flex items-center justify-between">
          <span>Build Strategy</span>
          <span className="font-code-sm text-code-sm text-tertiary">
            Auto-detected
          </span>
        </label>
        <div className="bg-surface-container-lowest rounded-lg p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              layers
            </span>
            <span className="font-code-md text-code-md text-on-surface font-medium">
              Nixpacks / Node.js 20
            </span>
          </div>
          <span className="material-symbols-outlined text-outline text-[18px] cursor-pointer hover:text-on-surface transition-colors">
            settings_suggest
          </span>
        </div>
        <span className="font-body-sm text-body-sm text-outline">
          Container will compile via cloud-native buildpack without manual
          Dockerfile.
        </span>
      </div> */}
    </div>
  );
}
