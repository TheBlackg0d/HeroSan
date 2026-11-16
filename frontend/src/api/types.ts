import type { AxiosError } from "axios";

export type MutationFunc<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError<ApiResonse<T>>) => void;
  onSettled?: () => void;
};

export type ApiResonse<T> = {
  ok: boolean;
  data?: T;
  message: string;
};
