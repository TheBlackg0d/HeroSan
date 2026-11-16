import type { AxiosError } from "axios";

export type ErrorResponse = ValidationError | ApiResponse<null>;

export type MutationFunc<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError<ErrorResponse>) => void;
  onSettled?: () => void;
};

export type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  message: string;
};

export type ValidationError = {
  ok: boolean;
  errors?: Record<string, string[]>;
  message: string;
};
