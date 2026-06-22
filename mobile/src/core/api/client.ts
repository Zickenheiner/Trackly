import { API_URL } from '../config/env';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setTokens,
} from '../auth/token-storage';
import { ApiError } from './api-error';
import endpoints from './endpoints';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface RequestConfig {
  url: string;
  method: Method;
  data?: unknown;
  headers?: Record<string, string>;
}

let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null): void {
  onUnauthorized = handler;
}

function buildHeaders(
  token: string | null,
  extra?: Record<string, string>,
): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    ...extra,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

let isRefreshing = false;

async function tryRefresh(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${API_URL}${endpoints.auth.refresh}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    if (!response.ok) return null;

    const json = await response.json();
    if (json.refreshToken) {
      await setTokens(json.accessToken, json.refreshToken);
    } else {
      await setAccessToken(json.accessToken);
    }
    return json.accessToken as string;
  } catch {
    return null;
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

async function toError(response: Response): Promise<ApiError> {
  const json = await response.json().catch(() => null);
  return new ApiError(json?.message ?? 'Erreur inconnue', response.status);
}

export async function request<T = unknown>(
  config: RequestConfig,
): Promise<T> {
  const token = await getAccessToken();

  const init: RequestInit = {
    method: config.method,
    headers: buildHeaders(token, config.headers),
    body: config.data !== undefined ? JSON.stringify(config.data) : undefined,
  };

  const response = await fetch(`${API_URL}${config.url}`, init);

  if (response.status === 401 && token && !isRefreshing) {
    isRefreshing = true;
    const newToken = await tryRefresh();
    isRefreshing = false;

    if (!newToken) {
      await clearTokens();
      onUnauthorized?.();
      throw new ApiError('Session expirée', 401);
    }

    const retry = await fetch(`${API_URL}${config.url}`, {
      ...init,
      headers: buildHeaders(newToken, config.headers),
    });

    if (!retry.ok) throw await toError(retry);
    return parseResponse<T>(retry);
  }

  if (!response.ok) throw await toError(response);
  return parseResponse<T>(response);
}
