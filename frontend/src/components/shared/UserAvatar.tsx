import type { User } from "#/api/user/user.type.ts";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserAvatarProps = {
  user: User;
  className?: string;
};

const FALLBACK_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-sky-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-fuchsia-500",
  "bg-rose-500",
];

function colorFor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  return (
    <Avatar className={`size-8 overflow-hidden rounded-full ${className ?? ""}`}>
      {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.email} />}
      <AvatarFallback
        className={`${colorFor(user.id || user.email)} text-sm font-semibold text-white`}
      >
        {user.email.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
