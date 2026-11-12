import { Dashboard } from "#/components/dashboard/Dashboard.tsx";
import { Header } from "#/components/dashboard/Header.tsx";
import { SideBar } from "#/components/dashboard/SideBar.tsx";
import { SubHeader } from "#/components/dashboard/SubHeader.tsx";
import { TelemetryList } from "#/components/dashboard/TelemetryList.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className=" flex bg-surface-container-lowest text-on-surface font-body-md text-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
      <SideBar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <section className="w-full bg-surface-container-lowest min-h-screen">
          <div className="flex flex-col w-full gap-2">
            <SubHeader />
            <TelemetryList />
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
              <Dashboard />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
