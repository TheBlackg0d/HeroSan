import { AccountDangerZone } from "./AccountDangerZone";
import { AccountHeader } from "./AccountHeader";
import { ProfileSection } from "./ProfileSection";
import { SecuritySection } from "./SecuritySection";
import { SessionsSection } from "./SessionsSection";

export function AccountSettingsPage({
	account,
}: {
	account: AccountSettingsData;
}) {
	return (
		<div className="w-full max-w-6xl mx-auto px-margin md:px-margin-desktop py-space-xl flex flex-col gap-space-xl">
			<AccountHeader profile={account.profile} />
			<ProfileSection
				profile={account.profile}
				timezones={account.timezones}
				shells={account.shells}
			/>
			<SecuritySection
				lastChanged={account.passwordLastChanged}
				strength={account.passwordStrength}
			/>
			<SessionsSection sessions={account.sessions} />
			<AccountDangerZone workspace={account.profile.workspace} />
		</div>
	);
}
