import { getAppSettings } from "#/data/appSettings";
import { DangerZoneSection } from "./DangerZoneSection";
import { GeneralSettingsSection } from "./GeneralSettingsSection";
import { ResourceLimitsSection } from "./ResourceLimitsSection";

export function SettingsTab({ app }: { app: AppOverview }) {
	const settings = getAppSettings(app.id);

	if (!settings) {
		return (
			<div className="rounded-xl bg-surface-container-low p-10 text-center font-body-md text-body-md text-outline">
				No settings available for {app.name}.
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-space-xl">
			<GeneralSettingsSection general={settings.general} />
			<ResourceLimitsSection resources={settings.resources} />
			<DangerZoneSection
				appName={app.name}
				deploymentCount={settings.danger.deploymentCount}
			/>
		</div>
	);
}
