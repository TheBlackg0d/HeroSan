import type { ReactNode } from "react";
import { cn } from "#/lib/utils";

type AccountSectionProps = {
	title: ReactNode;
	description?: string;
	aside?: ReactNode;
	tone?: "default" | "danger";
	className?: string;
	children: ReactNode;
};

export function AccountSection({
	title,
	description,
	aside,
	tone = "default",
	className,
	children,
}: AccountSectionProps) {
	return (
		<section
			className={cn(
				"flex flex-col gap-space-lg rounded-xl p-space-lg md:p-space-xl shadow-sm",
				tone === "danger"
					? "bg-error-container/10 gap-space-md"
					: "bg-surface-container-low",
				className,
			)}
		>
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-md">
				<div className="flex flex-col">
					{typeof title === "string" ? (
						<SectionHeading>{title}</SectionHeading>
					) : (
						title
					)}
					{description && (
						<p className="font-body-sm text-body-sm text-on-surface-variant">
							{description}
						</p>
					)}
				</div>
				{aside}
			</div>
			{children}
		</section>
	);
}

export function SectionHeading({ children }: { children: ReactNode }) {
	return (
		<h2 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
			{children}
		</h2>
	);
}

export const fieldInputClass =
	"h-auto w-full px-space-md py-2 rounded-lg border-0 shadow-inner bg-surface-container-lowest text-on-surface placeholder:text-outline focus-visible:ring-1 focus-visible:ring-primary";

export const neutralButtonClass =
	"h-auto px-space-md py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface hover:text-on-surface font-headline-sm text-(length:--text-headline-sm)";
