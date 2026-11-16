import type { User } from "#/api/user/user.type.ts";
import { create } from "zustand/react";

interface AuthStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  currentUser: null,
  setCurrentUser: (user: User | null) => set({ currentUser: user }),
}));

export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);

export const useCurrentUser = () => useAuthStore((state) => state.currentUser);

export const useSetIsAuthenticated = () =>
  useAuthStore((state) => state.setIsAuthenticated);

export const useSetCurrentUser = () =>
  useAuthStore((state) => state.setCurrentUser);
