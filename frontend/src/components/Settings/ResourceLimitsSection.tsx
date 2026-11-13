import { Fragment } from "react";
import { ArrowLeftRight, Cpu, Gauge } from "lucide-react";
import { Pill } from "#/components/AppOverview/shared";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { Label } from "#/components/ui/label";
import { Slider } from "#/components/ui/slider";
import { cn } from "#/lib/utils";
import { primaryActionClass, SettingsSection } from "./SettingsSection";

export function ResourceLimitsSection({
	resources,
}: {
	resources: AppSettings["resources"];
}) {
	const { cpu, memory, autoscaling } = resources;

	return (
		<SettingsSection
			icon={<Cpu size={20} className="text-secondary" />}
			title="Resources & Limits"
			description="Set per-container compute constraints and autoscaling boundaries."
			aside={
				<Pill
					shape="tag"
					dot
					tone="muted"
					dotClassName="bg-secondary"
					className="px-2.5 py-1 font-normal"
				>
					Architecture: {resources.architecture}
				</Pill>
			}
			footer={
				<>
					<div className="flex items-center gap-2">
						<Checkbox
							id="rolling-restart"
							defaultChecked={resources.rollingRestart}
							className="size-4 border-0 bg-surface-container-lowest"
						/>
						<Label
							htmlFor="rolling-restart"
							className="font-body-sm text-(length:--text-body-sm) font-normal text-on-surface cursor-pointer"
						>
							Perform rolling restart on limit application (zero downtime)
						</Label>
					</div>
					<Button className={primaryActionClass}>Update limits</Button>
				</>
			}
		>
			<div className="flex flex-col gap-space-xl">
				<ResourceSlider
					title="Compute Limit (vCPU)"
					limit={cpu}
					accent="secondary"
					tierClassName="text-primary"
					details={[
						{ dot: "bg-tertiary", label: "Guaranteed", value: cpu.guaranteed },
						{ dot: "bg-secondary", label: "Burst headroom", value: cpu.burst },
					]}
				/>
				<ResourceSlider
					title="Memory Limit (RAM)"
					limit={memory}
					accent="tertiary"
					tierClassName="text-tertiary"
					details={[
						{
							dot: "bg-error",
							label: "OOM threshold",
							value: memory.oomThreshold,
							mono: true,
						},
						{
							dot: "bg-tertiary",
							label: "Current avg usage",
							value: memory.averageUsage,
							mono: true,
						},
					]}
				/>
				<AutoscalingSummary autoscaling={autoscaling} />
			</div>
		</SettingsSection>
	);
}

const ACCENT_STYLES = {
	secondary: {
		value: "text-secondary",
		slider:
			"**:data-[slot=slider-range]:bg-secondary **:data-[slot=slider-thumb]:border-secondary **:data-[slot=slider-thumb]:ring-secondary/40",
	},
	tertiary: {
		value: "text-tertiary",
		slider:
			"**:data-[slot=slider-range]:bg-tertiary **:data-[slot=slider-thumb]:border-tertiary **:data-[slot=slider-thumb]:ring-tertiary/40",
	},
} as const;

type ResourceSliderProps = {
	title: string;
	limit: ResourceLimit;
	accent: keyof typeof ACCENT_STYLES;
	tierClassName: string;
	details: DetailProps[];
};

function ResourceSlider({
	title,
	limit,
	accent,
	tierClassName,
	details,
}: ResourceSliderProps) {
	const styles = ACCENT_STYLES[accent];
	return (
		<div className="flex flex-col gap-space-sm p-space-lg rounded-xl bg-surface-container-lowest">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<div className="flex items-center gap-2">
					<span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
						{title}
					</span>
					<Pill
						shape="tag"
						tone="neutral"
						className={cn("font-medium", tierClassName)}
					>
						{limit.tier}
					</Pill>
				</div>
				<div className="flex items-baseline gap-1.5">
					<span
						className={cn(
							"font-headline-lg text-headline-lg font-bold font-mono",
							styles.value,
						)}
					>
						{limit.displayValue}
					</span>
					<span className="font-code-md text-code-md text-outline">
						{limit.unit}
					</span>
				</div>
			</div>

			<Slider
				aria-label={title}
				defaultValue={[limit.value]}
				min={limit.min}
				max={limit.max}
				step={limit.step}
				className={cn(
					"py-2 **:data-[slot=slider-track]:h-2 **:data-[slot=slider-track]:bg-surface-container-highest **:data-[slot=slider-thumb]:size-4",
					styles.slider,
				)}
			/>

			<div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-code-sm text-code-sm text-outline">
				{details.map((detail, index) => (
					<Fragment key={detail.label}>
						{index > 0 && <span>•</span>}
						<Detail {...detail} />
					</Fragment>
				))}
				<span>•</span>
				<span className="text-on-surface-variant">{limit.rangeLabel}</span>
			</div>
		</div>
	);
}

type DetailProps = {
	dot: string;
	label: string;
	value: string;
	mono?: boolean;
};

function Detail({ dot, label, value, mono = false }: DetailProps) {
	return (
		<span className="flex items-center gap-1.5">
			<span className={cn("size-1.5 rounded-full", dot)} />
			<span>
				{label}:{" "}
				<strong className={cn("text-on-surface", mono && "font-mono")}>
					{value}
				</strong>
			</span>
		</span>
	);
}

function AutoscalingSummary({
	autoscaling,
}: {
	autoscaling: AppSettings["resources"]["autoscaling"];
}) {
	return (
		<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md p-space-lg rounded-xl bg-surface-container">
			<div className="flex items-center gap-space-md">
				<div className="flex items-center justify-center p-2.5 rounded-lg bg-surface-container-high text-secondary">
					<Gauge size={24} />
				</div>
				<div className="flex flex-col">
					<span className="font-headline-sm text-headline-sm font-medium text-on-surface">
						Autoscaling Topology
					</span>
					<span className="font-body-sm text-body-sm text-on-surface-variant">
						Target metrics scale instances automatically between Min and Max
						ceilings.
					</span>
				</div>
			</div>
			<div className="flex items-center gap-space-sm px-3 py-1.5 rounded-lg bg-surface-container-lowest text-secondary font-code-md text-code-md">
				<ArrowLeftRight size={16} />
				<span>
					Range:{" "}
					<strong>
						{autoscaling.minReplicas} – {autoscaling.maxReplicas} replicas
					</strong>{" "}
					active on <strong>{autoscaling.cpuTarget}% CPU</strong>
				</span>
			</div>
		</div>
	);
}
