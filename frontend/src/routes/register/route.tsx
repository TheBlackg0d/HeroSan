import { AuthLayout } from "#/layout/AuthLayout.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <main>
        <h1> Hello World</h1>
      </main>
    </AuthLayout>
  );
}
