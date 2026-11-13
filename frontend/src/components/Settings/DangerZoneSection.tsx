import type { ReactNode } from "react";
import { Trash2, TriangleAlert } from "lucide-react";
import { Button } from "#/components/ui/button";
import { SettingsSection, secondaryActionClass } from "./SettingsSection";

type DangerZoneSectionProps = {
	appName: string;
	deploymentCount: number;
};

export function DangerZoneSection({
	appName,
	deploymentCount,
}: DangerZoneSectionProps) {
	return (
		<SettingsSection
			tone="danger"
			icon={
				<div className="flex items-center justify-center p-2 rounded-lg bg-error-container/20 text-error">
					<TriangleAlert size={20} />
				</div>
			}
			title="Danger Zone"
			description="Irreversible and destructive actions for this application."
		>
			<div className="flex flex-col gap-space-lg">
				<DangerAction
					title="Rebuild cache & prune artifacts"
					description="Flushes transient build layers, node_modules cache, and intermediate OCI container images."
					action={
						<Button variant="ghost" className={secondaryActionClass}>
							Prune Cache
						</Button>
					}
				/>
				<DangerAction
					title="Transfer service namespace"
					description={
						<>
							Move <span className="text-on-surface font-mono">{appName}</span>{" "}
							to another workspace or team cluster. Routing will migrate
							seamlessly.
						</>
					}
					action={
						<Button variant="ghost" className={secondaryActionClass}>
							Transfer Ownership
						</Button>
					}
				/>
				<DeleteApplicationCard deploymentCount={deploymentCount} />
			</div>
		</SettingsSection>
	);
}

function DangerAction({
	title,
	description,
	action,
}: {
	title: string;
	description: ReactNode;
	action: ReactNode;
}) {
	return (
		<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md p-space-md rounded-lg bg-surface-container-lowest">
			<div className="flex flex-col min-w-0 pr-space-md">
				<span className="font-headline-sm text-headline-sm font-medium text-on-surface">
					{title}
				</span>
				<span className="font-body-sm text-body-sm text-outline">
					{description}
				</span>
			</div>
			<div className="self-start md:self-center shrink-0">{action}</div>
		</div>
	);
}

function DeleteApplicationCard({
	deploymentCount,
}: {
	deploymentCount: number;
}) {
	return (
		<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md p-space-lg rounded-lg bg-error-container/20">
			<div className="flex flex-col gap-1 min-w-0 pr-space-md">
				<div className="flex items-center gap-2 text-error">
					<Trash2 size={18} />
					<span className="font-headline-sm text-headline-sm font-semibold">
						Delete this application
					</span>
				</div>
				<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
					Once deleted, all deployments ({deploymentCount} versions),
					environment variables, custom domains, and associated container
					workloads will be permanently destroyed. This action cannot be undone.
				</p>
			</div>
			<Button className="self-start md:self-center h-auto px-4 py-2 rounded-lg gap-1.5 bg-error hover:bg-error hover:opacity-90 text-on-error font-headline-sm text-(length:--text-headline-sm) font-semibold whitespace-nowrap shadow-[0_0_12px_rgba(255,180,171,0.3)] active:scale-[0.99]">
				<Trash2 className="size-4.5" />
				Delete Application
			</Button>
		</div>
	);
}
