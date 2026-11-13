import { createFileRoute } from "@tanstack/react-router";
import { CreateApplicationForm } from "#/components/Application/CreateApplicationForm";

export const Route = createFileRoute("/_homeLayout/app/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateApplicationForm />;
}
