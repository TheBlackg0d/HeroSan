import type { ReactNode } from "react";
import { Label } from "#/components/ui/label";
import { cn } from "#/lib/utils";

type AccountFieldProps = {
	id: string;
	label: string;
	badge?: ReactNode;
	hint?: ReactNode;
	size?: "md" | "sm";
	className?: string;
	children: ReactNode;
};

export function AccountField({
	id,
	label,
	badge,
	hint,
	size = "md",
	className,
	children,
}: AccountFieldProps) {
	return (
		<div className={cn("flex flex-col gap-1.5", className)}>
			<div className="flex items-center justify-between">
				<Label
					htmlFor={id}
					className={cn(
						"text-on-surface-variant",
						size === "md"
							? "font-label-md text-(length:--text-label-md)"
							: "font-label-sm text-(length:--text-label-sm)",
					)}
				>
					{label}
				</Label>
				{badge}
			</div>
			{children}
			{hint && <p className="font-body-sm text-body-sm text-outline">{hint}</p>}
		</div>
	);
}
