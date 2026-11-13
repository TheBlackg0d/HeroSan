import type { ReactNode } from "react";
import { cn } from "#/lib/utils";

type SettingsSectionProps = {
	icon: ReactNode;
	title: string;
	description: string;
	aside?: ReactNode;
	footer?: ReactNode;
	tone?: "default" | "danger";
	children: ReactNode;
};

export function SettingsSection({
	icon,
	title,
	description,
	aside,
	footer,
	tone = "default",
	children,
}: SettingsSectionProps) {
	const danger = tone === "danger";
	return (
		<section
			className={cn(
				"flex flex-col rounded-xl shadow-sm",
				danger ? "bg-error-container/10" : "bg-surface-container-low",
			)}
		>
			<header className="flex flex-col gap-1 px-space-xl pt-space-xl pb-space-lg">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<div className="flex items-center gap-space-sm">
						{icon}
						<div className="flex flex-col">
							<h2
								className={cn(
									"font-headline-md text-headline-md font-semibold",
									danger ? "text-error" : "text-on-surface",
								)}
							>
								{title}
							</h2>
							{danger && <SectionDescription>{description}</SectionDescription>}
						</div>
					</div>
					{aside}
				</div>
				{!danger && <SectionDescription>{description}</SectionDescription>}
			</header>

			<div className="px-space-xl py-space-md">{children}</div>

			{footer ? (
				<footer className="mt-space-md flex flex-wrap items-center justify-between gap-space-md rounded-b-xl bg-surface-container px-space-xl py-space-md">
					{footer}
				</footer>
			) : (
				<div className="p-space-lg" />
			)}
		</section>
	);
}

function SectionDescription({ children }: { children: ReactNode }) {
	return (
		<p className="font-body-md text-body-md text-on-surface-variant">
			{children}
		</p>
	);
}

export const primaryActionClass =
	"h-auto px-4 py-1.5 rounded-lg bg-primary hover:bg-primary text-on-primary font-headline-sm text-(length:--text-headline-sm) font-medium shadow-[0_0_12px_rgba(173,198,255,0.35)] hover:shadow-[0_0_16px_rgba(173,198,255,0.5)] active:scale-[0.99]";

export const secondaryActionClass =
	"h-auto px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface hover:text-on-surface font-body-md text-(length:--text-body-md) font-normal";
