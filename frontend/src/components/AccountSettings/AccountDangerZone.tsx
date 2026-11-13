import { Info, TriangleAlert } from "lucide-react";
import { Pill } from "#/components/AppOverview/shared";
import { Button } from "#/components/ui/button";
import { AccountSection } from "./AccountSection";

export function AccountDangerZone({ workspace }: { workspace: string }) {
	return (
		<AccountSection
			tone="danger"
			title={
				<div className="flex items-center gap-2 text-error">
					<TriangleAlert size={22} />
					<h2 className="font-headline-lg text-headline-lg font-semibold tracking-tight">
						Danger Zone
					</h2>
				</div>
			}
			aside={
				<Pill
					shape="tag"
					tone="error"
					className="px-2 bg-error-container/30 uppercase tracking-wider font-normal"
				>
					Irreversible Action
				</Pill>
			}
		>
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-lg p-space-lg rounded-xl bg-surface-container-lowest/80">
				<div className="flex max-w-xl flex-col gap-1">
					<span className="font-headline-sm text-headline-sm font-medium text-on-surface">
						Delete developer account
					</span>
					<p className="font-body-md text-body-md text-on-surface-variant">
						Permanently delete your personal account, personal API tokens, and
						all cryptographic identity records. Any self-hosted applications
						registered solely to your UID will undergo container teardown.
					</p>
					<div className="mt-1 flex items-center gap-space-sm font-code-sm text-code-sm text-error">
						<Info size={15} className="shrink-0" />
						<span>
							Active deployments in <code>{workspace}</code> will remain
							orphaned until reassigned.
						</span>
					</div>
				</div>
				<Button
					variant="ghost"
					className="self-start sm:self-auto shrink-0 h-auto px-space-lg py-2 rounded-lg shadow-sm bg-error-container/30 hover:bg-error text-error hover:text-on-error font-headline-sm text-(length:--text-headline-sm) active:scale-[0.98]"
				>
					Delete Account
				</Button>
			</div>
		</AccountSection>
	);
}
