import { Eye, ShieldCheck } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { cn } from "#/lib/utils";
import { AccountField } from "./AccountField";
import {
	AccountSection,
	fieldInputClass,
	neutralButtonClass,
} from "./AccountSection";

const PASSWORD_FIELDS = [
	{
		id: "current-password",
		label: "Current Password",
		placeholder: "••••••••••••••••",
	},
	{
		id: "new-password",
		label: "New Password",
		placeholder: "Min 14 characters",
	},
	{
		id: "confirm-password",
		label: "Confirm New Password",
		placeholder: "Repeat new password",
	},
];

type SecuritySectionProps = {
	lastChanged: string;
	strength: PasswordStrength;
};

export function SecuritySection({
	lastChanged,
	strength,
}: SecuritySectionProps) {
	return (
		<AccountSection
			title="Security Credentials"
			description="Manage master authentication keyphrase and security credentials."
			aside={
				<div className="flex items-center gap-1.5 font-code-sm text-code-sm text-outline">
					<ShieldCheck size={16} className="text-tertiary" />
					<span>Encrypted via Argon2id</span>
				</div>
			}
		>
			<div className="flex flex-col gap-space-md p-space-lg rounded-xl bg-surface-container-lowest/80">
				<div className="flex items-center justify-between">
					<h3 className="font-headline-sm text-headline-sm font-medium text-on-surface">
						Update Master Password
					</h3>
					<span className="font-code-sm text-code-sm text-outline">
						Last modified {lastChanged}
					</span>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
					{PASSWORD_FIELDS.map((field) => (
						<AccountField
							key={field.id}
							id={field.id}
							label={field.label}
							size="sm"
						>
							<PasswordInput id={field.id} placeholder={field.placeholder} />
						</AccountField>
					))}
				</div>

				<StrengthMeter strength={strength} />

				<div className="mt-1 flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
					<span className="font-body-sm text-body-sm text-outline">
						Changing your password invalidates all unpinned bearer tokens.
					</span>
					<Button variant="ghost" className={neutralButtonClass}>
						Update Password
					</Button>
				</div>
			</div>
		</AccountSection>
	);
}

function PasswordInput({
	id,
	placeholder,
}: {
	id: string;
	placeholder: string;
}) {
	return (
		<div className="relative flex items-center">
			<Input
				id={id}
				type="password"
				placeholder={placeholder}
				autoComplete="off"
				className={cn(
					fieldInputClass,
					"pr-9 bg-surface-container font-code-md text-(length:--text-code-md) md:text-(length:--text-code-md)",
				)}
			/>
			<Button
				type="button"
				variant="ghost"
				size="icon-xs"
				aria-label="Show password"
				className="absolute right-1.5 text-outline hover:text-on-surface hover:bg-transparent [&_svg:not([class*='size-'])]:size-4.5"
			>
				<Eye />
			</Button>
		</div>
	);
}

function StrengthMeter({ strength }: { strength: PasswordStrength }) {
	return (
		<div className="mt-1 flex flex-col gap-1">
			<div className="flex items-center justify-between font-code-sm text-code-sm">
				<span className="text-outline">Entropy Strength</span>
				<span className="font-medium text-tertiary">{strength.label}</span>
			</div>
			<div
				className="grid h-1.5 w-full gap-1.5"
				style={{
					gridTemplateColumns: `repeat(${strength.totalSegments}, minmax(0, 1fr))`,
				}}
			>
				{Array.from(
					{ length: strength.totalSegments },
					(_, index) => index + 1,
				).map((segment) => (
					<div
						key={segment}
						className={cn(
							"rounded-full",
							segment <= strength.filledSegments
								? "bg-tertiary"
								: "bg-tertiary/30",
						)}
					/>
				))}
			</div>
		</div>
	);
}
