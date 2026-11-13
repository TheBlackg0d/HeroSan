import type { ReactNode } from "react";
import { Laptop, LogOut, Smartphone, SquareTerminal } from "lucide-react";
import { Pill } from "#/components/AppOverview/shared";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import { AccountSection, SectionHeading } from "./AccountSection";

const SESSION_ICONS: Record<SessionKind, ReactNode> = {
	browser: <Laptop size={22} className="text-on-surface" />,
	mobile: <Smartphone size={22} className="text-on-surface" />,
	cli: <SquareTerminal size={22} className="text-primary" />,
};

export function SessionsSection({ sessions }: { sessions: AccountSession[] }) {
	return (
		<AccountSection
			title={
				<div className="flex items-center gap-space-sm">
					<SectionHeading>Active Sessions</SectionHeading>
					<Pill tone="info" className="font-normal">
						{sessions.length} Active
					</Pill>
				</div>
			}
			description="Devices and browser sessions currently authenticated with your account."
			aside={
				<Button
					variant="ghost"
					className="self-start sm:self-auto h-auto gap-1.5 px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-error-container/20 text-error hover:text-error font-body-md text-(length:--text-body-md)"
				>
					<LogOut />
					Log out all other sessions
				</Button>
			}
		>
			<div className="flex flex-col gap-space-md">
				{sessions.map((session) => (
					<SessionCard key={session.id} session={session} />
				))}
			</div>
		</AccountSection>
	);
}

function SessionCard({ session }: { session: AccountSession }) {
	return (
		<div
			className={cn(
				"flex flex-col sm:flex-row sm:items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container transition-colors",
				session.current
					? "shadow-[0_0_0_1px_rgba(78,222,163,0.15)]"
					: "hover:bg-surface-container-high",
			)}
		>
			<div className="flex items-start gap-space-md">
				<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-highest">
					{SESSION_ICONS[session.kind]}
				</div>
				<div className="flex flex-col gap-0.5">
					<div className="flex flex-wrap items-center gap-space-sm">
						<span className="font-headline-sm text-headline-sm font-medium text-on-surface">
							{session.title}
						</span>
						<SessionTag session={session} />
					</div>
					<div className="flex flex-wrap items-center gap-space-sm font-code-sm text-code-sm text-outline">
						<span className="font-medium text-on-surface-variant">
							{session.ip}
						</span>
						<span>·</span>
						{session.token ? (
							<span>
								API Token:{" "}
								<code className="text-secondary">{session.token}</code>
							</span>
						) : (
							<span>{session.location}</span>
						)}
						<span>·</span>
						<span className={session.current ? "text-tertiary" : undefined}>
							{session.lastSeen}
						</span>
					</div>
					<div className="mt-0.5 font-code-sm text-code-sm text-outline">
						{session.detailLabel}:{" "}
						<code
							className={
								session.kind === "mobile"
									? "text-outline-variant"
									: "text-outline"
							}
						>
							{session.detailValue}
						</code>
					</div>
				</div>
			</div>

			<div className="flex items-center self-end sm:self-center">
				{session.current ? (
					<span className="px-space-md py-1.5 rounded-lg bg-surface-container-lowest font-code-sm text-code-sm text-outline select-none">
						{session.actionLabel}
					</span>
				) : (
					<Button
						variant="ghost"
						className="h-auto px-space-md py-1.5 rounded-lg bg-surface-container-lowest hover:bg-error/20 text-on-surface-variant hover:text-error font-headline-sm text-(length:--text-headline-sm)"
					>
						{session.actionLabel}
					</Button>
				)}
			</div>
		</div>
	);
}

function SessionTag({ session }: { session: AccountSession }) {
	if (session.current) {
		return (
			<Pill
				tone="success"
				dot
				pulse
				className="px-1.5 bg-tertiary/15 font-normal"
			>
				Current Session
			</Pill>
		);
	}
	if (!session.tag) return null;
	return (
		<Pill
			shape="tag"
			tone={session.kind === "cli" ? "primary" : "neutral"}
			className={cn(
				"px-1.5 font-normal",
				session.kind !== "cli" && "bg-surface-container-highest",
			)}
		>
			{session.tag}
		</Pill>
	);
}
