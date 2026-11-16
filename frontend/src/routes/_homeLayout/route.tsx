import { Header } from "#/components/dashboard/Header.tsx";
import { SideBar } from "#/components/dashboard/SideBar.tsx";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { getUserQueryOptions } from "#/api/user/user.keys.ts";

export const Route = createFileRoute("/_homeLayout")({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    try {
      const user = await context.queryClient.query(getUserQueryOptions());
      if (!user) {
        throw redirect({
          to: "/login",
          search: {
            redirect: location.href,
          },
        });
      }
    } catch (error) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
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
