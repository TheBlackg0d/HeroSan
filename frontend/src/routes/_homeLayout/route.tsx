import { refreshToken } from "#/api/auth/auth.requests.ts";
import AuthService from "#/service/auth.service.ts";
import { Header } from "#/components/dashboard/Header.tsx";
import { SideBar } from "#/components/dashboard/SideBar.tsx";
import { useAuthStore } from "#/store/auth.ts";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout")({
  component: RouteComponent,
  beforeLoad: async () => {
    const isAuthenticated = await AuthService.authenticate();

    if (!isAuthenticated) throw redirect({ to: "/login", replace: true });
  },
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
