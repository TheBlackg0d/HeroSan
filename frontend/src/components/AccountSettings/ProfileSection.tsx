import { Camera, Lock, Trash2 } from "lucide-react";
import { Pill } from "#/components/AppOverview/shared";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { cn } from "#/lib/utils";
import { AccountField } from "./AccountField";
import {
	AccountSection,
	fieldInputClass,
	neutralButtonClass,
} from "./AccountSection";

type ProfileSectionProps = {
	profile: AccountProfile;
	timezones: SelectOption[];
	shells: SelectOption[];
};

export function ProfileSection({
	profile,
	timezones,
	shells,
}: ProfileSectionProps) {
	return (
		<AccountSection
			title="Personal Profile"
			description="Public identity for workspace activity logs, audit trails, and commits."
			aside={
				<span className="font-code-sm text-code-sm text-outline">
					Profile Synced: Git Config
				</span>
			}
		>
			<AvatarUploader profile={profile} />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
				<AccountField
					id="full-name"
					label="Full Name"
					badge={
						<span className="font-code-sm text-code-sm text-outline">
							Required
						</span>
					}
					hint="Used for container attributions and billing invoices."
				>
					<Input
						id="full-name"
						defaultValue={profile.fullName}
						placeholder="Your full name"
						className={cn(
							fieldInputClass,
							"font-body-md text-(length:--text-body-md) md:text-(length:--text-body-md)",
						)}
					/>
				</AccountField>

				<AccountField
					id="username"
					label="Handle / Username"
					badge={
						<span className="font-code-sm text-code-sm text-outline">
							Immutable
						</span>
					}
					hint="Namespaces your personal registries and micro-deployments."
				>
					<div className="relative flex items-center">
						<span className="absolute left-3 font-code-md text-code-md text-outline">
							@
						</span>
						<Input
							id="username"
							readOnly
							defaultValue={profile.handle}
							className={cn(
								fieldInputClass,
								"pl-7 pr-9 shadow-none bg-surface-container text-on-surface-variant cursor-not-allowed focus-visible:ring-0 font-code-md text-(length:--text-code-md) md:text-(length:--text-code-md)",
							)}
						/>
						<Lock
							size={16}
							className="absolute right-3 text-outline"
							aria-label="Contact workspace admin to modify handle"
						/>
					</div>
				</AccountField>

				<AccountField
					id="primary-email"
					label="Primary System Email"
					className="md:col-span-2"
					badge={
						<div className="flex items-center gap-2">
							{profile.emailVerified && (
								<Pill
									tone="success"
									dot
									className="px-1.5 bg-tertiary/10 font-normal"
								>
									Verified
								</Pill>
							)}
							<Pill shape="tag" className="px-1.5 text-outline font-normal">
								Primary
							</Pill>
						</div>
					}
					hint={
						<span className="text-on-surface-variant">
							Critical telemetry alerts, cluster node restarts, and continuous
							deployment failure pings are dispatched to this address.
						</span>
					}
				>
					<Input
						id="primary-email"
						type="email"
						defaultValue={profile.email}
						className={cn(
							fieldInputClass,
							"font-body-md text-(length:--text-body-md) md:text-(length:--text-body-md)",
						)}
					/>
				</AccountField>

				<AccountField id="user-timezone" label="Telemetry Timezone">
					<OptionSelect
						id="user-timezone"
						defaultValue={profile.timezone}
						options={timezones}
					/>
				</AccountField>

				<AccountField id="user-shell" label="Web Terminal Shell">
					<OptionSelect
						id="user-shell"
						defaultValue={profile.shell}
						options={shells}
					/>
				</AccountField>
			</div>
		</AccountSection>
	);
}

function AvatarUploader({ profile }: { profile: AccountProfile }) {
	const initials = profile.fullName
		.split(" ")
		.map((part) => part[0])
		.join("")
		.slice(0, 2);

	return (
		<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container">
			<div className="flex items-center gap-space-md">
				<div className="relative group">
					<Avatar className="size-16 shadow-[0_0_12px_rgba(0,0,0,0.6)]">
						{profile.avatarUrl && (
							<AvatarImage
								src={profile.avatarUrl}
								alt={`${profile.fullName} avatar`}
							/>
						)}
						<AvatarFallback className="bg-surface-container-highest text-on-surface font-headline-md text-(length:--text-headline-md)">
							{initials}
						</AvatarFallback>
					</Avatar>
					<div className="absolute inset-0 flex items-center justify-center rounded-full bg-surface-container-lowest/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
						<Camera size={20} className="text-on-surface" />
					</div>
				</div>
				<div className="flex flex-col">
					<span className="font-headline-sm text-headline-sm font-medium text-on-surface">
						Profile Image
					</span>
					<span className="font-body-sm text-body-sm text-outline">
						JPG, GIF, WebP or PNG. Max size 2MB.
					</span>
					<span className="mt-0.5 font-code-sm text-code-sm text-tertiary">
						Recommended 400x400px
					</span>
				</div>
			</div>
			<div className="flex items-center gap-space-xs self-start sm:self-center">
				<Button variant="ghost" className={neutralButtonClass}>
					Change avatar
				</Button>
				<Button
					variant="ghost"
					size="icon"
					aria-label="Remove avatar"
					className="rounded-lg text-outline hover:text-error hover:bg-surface-container-highest [&_svg:not([class*='size-'])]:size-4.5"
				>
					<Trash2 />
				</Button>
			</div>
		</div>
	);
}

function OptionSelect({
	id,
	defaultValue,
	options,
}: {
	id: string;
	defaultValue: string;
	options: SelectOption[];
}) {
	return (
		<Select defaultValue={defaultValue}>
			<SelectTrigger
				id={id}
				className={cn(
					fieldInputClass,
					"shadow-none justify-between font-code-md text-(length:--text-code-md)",
				)}
			>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem
						key={option.value}
						value={option.value}
						className="font-code-md text-(length:--text-code-md)"
					>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
