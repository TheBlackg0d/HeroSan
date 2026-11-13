import { createFileRoute } from "@tanstack/react-router";
import { AccountSettingsPage } from "#/components/AccountSettings/AccountSettingsPage";
import { accountSettings } from "#/data/account";

export const Route = createFileRoute("/_homeLayout/account/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AccountSettingsPage account={accountSettings} />;
}
