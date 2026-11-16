import { Link } from "@tanstack/react-router";
import {
  ChevronsUpDown,
  LayoutGrid,
  LogOut,
  Settings,
  SquareTerminal,
} from "lucide-react";
import type React from "react";
import { useAuthStore } from "#/store/auth.ts";
import { UserAvatar } from "../shared/UserAvatar";
import { useLogoutMutation } from "#/api/auth/auth.hooks.ts";

export function SideBar() {
  return (
    <aside className="sticky top-0 self-start h-screen w-65 shrink-0 overflow-y-auto bg-surface-container-low border-r border-outline-variant/30  flex flex-col justify-between select-none">
      <div className="flex flex-col">
        <Logo />
        <Workspace />
        <nav
          className="flex flex-col gap-1"
          data-active-classes="bg-primary-container/20 text-primary border-l-2 border-primary font-medium"
        >
          <SideBarItem title="Apps" icon={<LayoutGrid size={18} />}>
            <span className="font-code-sm text-code-sm text-outline-variant">
              12
            </span>
          </SideBarItem>
          <SideBarItem title="activity" icon={<SquareTerminal size={18} />}>
            <span className="font-code-sm text-code-sm px-space-xs py-0.5 rounded-full bg-secondary-container/20 text-secondary border border-secondary-container/30">
              4 active
            </span>
          </SideBarItem>
          <SideBarItem title="Settings" icon={<Settings size={18} />} />
        </nav>
      </div>
      <SideBarFooter />
    </aside>
  );
}

function SideBarFooter() {
  return (
    <div className="flex flex-col border-t border-outline-variant/20 bg-surface-container-low/80">
      <LogoutButton />
      <CurrentUser />
    </div>
  );
}

function CurrentUser() {
  const authStore = useAuthStore();
  const currentUser = authStore.currentUser;

  if (!currentUser) return null;

  return (
    <div className="p-space-md border-t border-outline-variant/20">
      <Link
        to="/account/settings"
        className="group flex items-center justify-between p-space-xs rounded-lg hover:bg-surface-container transition-colors"
      >
        <div className="flex items-center gap-space-sm min-w-0">
          <UserAvatar
            user={{
              id: currentUser.id,
              email: currentUser.email,
              avatarUrl: currentUser.avatarUrl,
            }}
          />
          <div className="flex flex-col min-w-0">
            <span className="font-body-md text-body-md font-medium text-on-surface group-hover:text-primary transition-colors truncate">
              {currentUser.email}
            </span>
            <span className="font-code-sm text-code-sm text-outline truncate">
              edge-us-east-1
            </span>
          </div>
        </div>
        <Settings
          size={18}
          className="text-outline group-hover:text-on-surface transition-colors"
        />
      </Link>
    </div>
  );
}

function LogoutButton() {
  const { mutate, isPending } = useLogoutMutation();

  return (
    <div className="px-space-md py-space-sm">
      <button
        type="button"
        onClick={() => mutate()}
        disabled={isPending}
        className="w-full flex items-center gap-space-sm px-space-sm py-space-sm rounded text-on-surface-variant hover:bg-error-container/20 hover:text-error transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <LogOut size={18} />
        <span className="font-body-md text-body-md">
          {isPending ? "Logging out..." : "Log out"}
        </span>
      </button>
    </div>
  );
}

type SideBarItemProps = {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
};

function SideBarItem({ title, icon, children }: SideBarItemProps) {
  return (
    <Link
      className="flex items-center justify-between px-space-sm py-space-sm rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
      to="."
    >
      <div className="flex items-center gap-space-sm">
        {icon}
        <span className="font-body-md text-body-md">{title}</span>
      </div>
      {children}
    </Link>
  );
}

function Workspace() {
  return (
    <div className="p-space-md border-b border-outline-variant/20">
      <button
        className="w-full flex items-center justify-between p-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-left group"
        type="button"
      >
        <div className="flex flex-col min-w-0 pr-space-xs">
          <span className="font-label-sm text-label-sm text-on-surface-variant truncate uppercase tracking-wider">
            Workspace
          </span>
          <div className="flex items-center gap-space-xs mt-0.5">
            <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(78,222,163,0.6)] flex-shrink-0"></span>
            <span className="font-code-md text-code-md text-on-surface font-medium truncate">
              acme-corp
            </span>
          </div>
        </div>
        <ChevronsUpDown size={18} />
      </button>
    </div>
  );
}
function Logo() {
  return (
    <div className="h-14 px-space-lg flex items-center justify-between border-b  border-outline-variant/20 bg-surface-container-low/50">
      <div className="flex items-center gap-space-sm">
        <img
          alt="Launchpad Logo"
          className="h-8 w-auto object-contain"
          src="https://lh3.googleusercontent.com/aida/ALJJyrBIRVqFgBBsG8V2-B2OPv02j9Z_Hh7PGT93KWF08ploG5hMFSXX9mhoTmBv6TR97maOVA-H22-ohuv59DuHloz84rZlb8X6YjFgw4TumyGS1KC1U0mLwAEF2oGpbiHJrLWHJ8Mew51AroegdsvrQ_dA8UqKMlt5iBfsjb38YNdctr4Cpxo6m_qrU9lfFu6aW8dSvwIRFKEYeM7rHg0ixh3YGOgquGUY195Z6SxRwnnOug"
        />
        <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface font-semibold">
          HeroSan
        </span>
      </div>
      <span className="font-code-sm text-code-sm px-space-xs py-0.5 rounded bg-surface-container-highest text-on-surface-variant border border-outline-variant/40">
        v2.4.0
      </span>
    </div>
  );
}
