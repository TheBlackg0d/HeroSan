import { Rocket } from "lucide-react";
import { EnvironmentVariableInputs } from "./EnvironmentVariablesInputs";
import { RepositoryFormInputs } from "./RepositoryFormInputs";
import { RoutingFormInputs } from "./RoutingFormInputs";

export function CreateApplicationForm() {
  return (
    <div className="w-full max-w-6xl mx-auto py-space-xl md:px-margin-desktop">
      <CreateFormHeader />
      <form className="flex flex-col gap-space-lg">
        <RepositoryFormInputs />
        <RoutingFormInputs />
        <EnvironmentVariableInputs />
        <CreateFormFooter />
      </form>
    </div>
  );
}

function CreateFormHeader() {
  return (
    <header className="flex flex-col gap-space-xs mb-space-xl">
      <div className="flex items-center gap-space-sm">
        <span className="px-space-xs py-0.5 rounded bg-primary-container/20 text-primary font-code-sm text-code-sm font-medium tracking-wide">
          INGRESS // v1beta2
        </span>
        <span className="text-outline text-label-sm font-label-sm font-mono tracking-widest uppercase">
          Target: edge-us-east-1
        </span>
      </div>
      <h1 className="font-headline-xl text-headline-xl tracking-tight text-on-surface">
        Deploy New Application
      </h1>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
        Configure your service deployment spec, Git upstream branch
        synchronization, and container networking ingress routes.
      </p>
    </header>
  );
}

function CreateFormFooter() {
  return (
    <footer className="bg-surface-container-low p-space-md md:p-space-lg rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
      <div className="flex items-center gap-space-sm text-on-surface-variant font-code-sm text-code-sm">
        <span className="w-2 h-2 rounded-full bg-secondary"></span>
        <span>
          Target namespace:
          <code className="text-on-surface font-semibold">default</code>
          (cluster-prod)
        </span>
      </div>
      <div className="flex items-center gap-space-md w-full sm:w-auto justify-end">
        <a
          className="px-space-md py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-headline-sm text-headline-sm transition-colors text-center"
          data-path="apps"
          href="#"
        >
          Cancel
        </a>
        <button
          className="flex items-center justify-center gap-2 px-space-lg py-2 rounded-lg bg-primary hover:bg-primary-fixed-dim text-on-primary font-headline-sm text-headline-sm font-semibold transition-all shadow-[0_0_16px_rgba(77,142,255,0.4)] hover:shadow-[0_0_24px_rgba(77,142,255,0.6)] active:scale-[0.99] cursor-pointer"
          type="submit"
        >
          <Rocket size={18} />
          <span>Create and deploy</span>
        </button>
      </div>
    </footer>
  );
}
