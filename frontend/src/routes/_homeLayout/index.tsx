import { Dashboard } from "#/components/dashboard/Dashboard.tsx";
import { SubHeader } from "#/components/dashboard/SubHeader.tsx";
import { TelemetryList } from "#/components/dashboard/TelemetryList.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout/")({ component: Home });

function Home() {
  return (
    <section className="w-full bg-surface-container-lowest min-h-screen">
      <div className="flex flex-col w-full gap-2">
        <SubHeader />
        <TelemetryList />

        <Dashboard />
      </div>
    </section>
  );
}
