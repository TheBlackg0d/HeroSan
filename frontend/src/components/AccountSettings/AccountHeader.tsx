import { Check, ExternalLink } from "lucide-react";
import { Pill } from "#/components/AppOverview/shared";
import { Button } from "#/components/ui/button";

export function AccountHeader({ profile }: { profile: AccountProfile }) {
	return (
		<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg p-space-lg rounded-xl bg-surface-container-low/40">
			<div className="flex flex-col gap-1 min-w-0">
				<div className="flex items-center gap-space-sm font-code-sm text-code-sm text-outline">
					<span>Identity &amp; Access</span>
					<span className="text-outline-variant">/</span>
					<span className="text-primary font-medium">{profile.handle}</span>
					<Pill
						shape="tag"
						tone="neutral"
						className="px-1.5 bg-surface-container-highest text-[10px] uppercase tracking-wide font-normal"
					>
						{profile.role}
					</Pill>
				</div>
				<div className="flex items-baseline gap-space-sm mt-1">
					<h1 className="font-headline-xl text-headline-xl tracking-tight font-semibold text-on-surface">
						Account Settings
					</h1>
					<span className="hidden sm:inline-block font-code-sm text-code-sm text-outline">
						UID: {profile.uid}
					</span>
				</div>
				<p className="mt-0.5 max-w-2xl font-body-md text-body-md text-on-surface-variant">
					Manage your personal developer profile, active credentials, and
					ongoing infrastructure terminal sessions.
				</p>
			</div>
			<div className="flex shrink-0 items-center gap-space-sm self-start md:self-auto">
				<Button
					variant="ghost"
					className="h-auto gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface hover:text-on-surface font-headline-sm text-(length:--text-headline-sm) active:scale-[0.98]"
				>
					<ExternalLink className="text-outline" />
					Public Profile
				</Button>
				<Button className="h-auto gap-2 px-space-lg py-2 rounded-lg bg-primary-container hover:bg-inverse-primary text-on-primary font-headline-sm text-(length:--text-headline-sm) shadow-[0_0_16px_rgba(77,142,255,0.35)] active:scale-[0.98]">
					<Check />
					Save Changes
				</Button>
			</div>
		</div>
	);
}
