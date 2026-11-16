import { useAuthStore } from "#/store/auth.ts";
import AuthService from "#/service/auth.service.ts";
import { LoginBox } from "#/components/login/LoginBox.tsx";
import { AuthLayout } from "#/layout/AuthLayout.tsx";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: async () => {
    const isAuthenticated = await AuthService.authenticate();

    if (isAuthenticated) {
      throw redirect({ to: "/", replace: true });
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
