import type { MutationFunc } from "../types";
import type { User } from "../user/user.type";

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export type AuthMutation = MutationFunc<User>;
