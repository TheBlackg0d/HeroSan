import { RegisterBox } from "#/components/register/RegisterBox.tsx";
import { AuthLayout } from "#/layout/AuthLayout.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <RegisterBox />
    </AuthLayout>
  );
}
