import { getUserQueryOptions } from "#/api/user/user.keys.ts";
import { LoginBox } from "#/components/login/LoginBox.tsx";
import { AuthLayout } from "#/layout/AuthLayout.tsx";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const res = await context.queryClient
      .query(getUserQueryOptions())
      .catch(() => null);
    if (res?.ok) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return (
    <AuthLayout>
      <LoginBox />
    </AuthLayout>
  );
}
