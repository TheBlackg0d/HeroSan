import { LoginBox } from "#/components/login/LoginBox.tsx";
import { AuthLayout } from "#/layout/AuthLayout.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <LoginBox />
    </AuthLayout>
  );
}
