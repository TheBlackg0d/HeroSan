import axios from "axios";
import { refreshToken } from "./auth/auth.requests";
import { useAuthStore } from "#/store/auth.ts";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const AUTH_ENDPOINTS = ["/auth/refresh-token", "/auth/login", "/auth/register"];

let refreshPromise: Promise<unknown> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthEndpoint = AUTH_ENDPOINTS.some((url) =>
      originalRequest?.url?.includes(url),
    );
    if (error.response?.status === 401 && !isAuthEndpoint) {
      if (originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          refreshPromise ??= refreshToken().finally(() => {
            refreshPromise = null;
          });
          await refreshPromise;
          return api(originalRequest);
        } catch (refreshError) {
          useAuthStore.setState({ isAuthenticated: false, currentUser: null });

          const publicPaths = ["/login", "/register"];
          if (!publicPaths.includes(window.location.pathname)) {
            window.location.href = "/login";
          }

          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);
