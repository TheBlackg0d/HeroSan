import type { ReactNode } from "react";
import {
	CircleCheck,
	Fingerprint,
	FolderOpen,
	GitBranch,
	Lock,
	LogIn,
	SlidersHorizontal,
} from "lucide-react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { cn } from "#/lib/utils";
import {
	primaryActionClass,
	SettingsSection,
	secondaryActionClass,
} from "./SettingsSection";

const fieldClass =
	"h-auto w-full pl-9 pr-3 py-2 rounded-lg border-0 bg-surface-container-lowest text-on-surface font-code-md text-(length:--text-code-md) md:text-(length:--text-code-md) focus-visible:ring-1 focus-visible:ring-primary";

export function GeneralSettingsSection({
	general,
}: {
	general: AppSettings["general"];
}) {
	return (
		<SettingsSection
			icon={<SlidersHorizontal size={20} className="text-primary" />}
			title="General Settings"
			description="Core runtime and identity configuration for this service."
			footer={
				<>
					<div className="flex items-center gap-2 font-code-sm text-code-sm text-outline">
						<CircleCheck size={16} className="text-tertiary" />
						<span>
							Config synchronized with git ref{" "}
							<span className="text-on-surface">{general.syncedRef}</span>
						</span>
					</div>
					<div className="flex items-center gap-space-sm">
						<Button variant="ghost" className={secondaryActionClass}>
							Discard
						</Button>
						<Button className={primaryActionClass}>Save changes</Button>
					</div>
				</>
			}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl">
				<SettingsField
					id="app-identifier"
					label="Application Identifier"
					badge={
						<span className="flex items-center gap-1 font-code-sm text-code-sm text-outline">
							<Lock size={13} />
							Immutable
						</span>
					}
					icon={<Fingerprint />}
					hint="App name is permanently assigned at creation and mapped to internal DNS routing."
				>
					<Input
						id="app-identifier"
						readOnly
						defaultValue={general.identifier}
						className={cn(
							fieldClass,
							"text-on-surface-variant cursor-not-allowed focus-visible:ring-0",
						)}
					/>
				</SettingsField>

				<SettingsField
					id="production-branch"
					label="Production Branch"
					badge={
						general.webhookLinked && (
							<span className="flex items-center gap-1 font-code-sm text-code-sm text-tertiary">
								<span className="size-1.5 rounded-full bg-tertiary" />
								Webhook Linked
							</span>
						)
					}
					icon={<GitBranch />}
					hint="Deployments will trigger automatically on pushes to this branch."
				>
					<Select defaultValue={general.productionBranch}>
						<SelectTrigger
							id="production-branch"
							className={cn(fieldClass, "justify-between")}
						>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{general.branches.map((branch) => (
								<SelectItem
									key={branch}
									value={branch}
									className="font-code-md text-(length:--text-code-md)"
								>
									{branch}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</SettingsField>

				<SettingsField
					id="container-port"
					label="Container Port"
					icon={<LogIn />}
					hint="The internal port your web application listens on for HTTP traffic (default: 3000)."
				>
					<Input
						id="container-port"
						type="number"
						min={1}
						max={65535}
						defaultValue={general.containerPort}
						className={fieldClass}
					/>
				</SettingsField>

				<SettingsField
					id="root-directory"
					label="Root Directory"
					icon={<FolderOpen />}
					hint="Specify directory containing package.json or Dockerfile."
				>
					<Input
						id="root-directory"
						defaultValue={general.rootDirectory}
						className={fieldClass}
					/>
				</SettingsField>
			</div>
		</SettingsSection>
	);
}

type SettingsFieldProps = {
	id: string;
	label: string;
	badge?: ReactNode;
	icon: ReactNode;
	hint: string;
	children: ReactNode;
};

function SettingsField({
	id,
	label,
	badge,
	icon,
	hint,
	children,
}: SettingsFieldProps) {
	return (
		<div className="flex flex-col gap-space-xs">
			<div className="flex items-center justify-between">
				<Label
					htmlFor={id}
					className="font-label-md text-(length:--text-label-md) text-on-surface"
				>
					{label}
				</Label>
				{badge}
			</div>
			<div className="relative flex items-center">
				<span className="pointer-events-none absolute left-3 z-10 text-outline [&_svg]:size-4">
					{icon}
				</span>
				{children}
			</div>
			<p className="font-body-sm text-body-sm text-outline">{hint}</p>
		</div>
	);
}
