import { Header } from "#/components/dashboard/Header.tsx";
import { SideBar } from "#/components/dashboard/SideBar.tsx";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className=" flex bg-surface-container-lowest text-on-surface font-body-md text-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
      <SideBar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <Outlet />
      </div>
    </main>
  );
}
