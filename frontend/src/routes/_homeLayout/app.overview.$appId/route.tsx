import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppOverviewPage } from "#/components/AppOverview/AppOverview";
import { getAppOverview } from "#/data/appOverview";

export const Route = createFileRoute("/_homeLayout/app/overview/$appId")({
  loader: ({ params }) => {
    const app = getAppOverview(params.appId);
    if (!app) throw notFound();
    return app;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const app = Route.useLoaderData();
  return <AppOverviewPage app={app} />;
}
