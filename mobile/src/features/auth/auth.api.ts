import { request } from '@/core/api/client';
import endpoints from '@/core/api/endpoints';
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from './auth.types';

export function register(payload: RegisterPayload): Promise<AuthResponse> {
  return request<AuthResponse>({
    url: endpoints.auth.register,
    method: 'POST',
    data: payload,
  });
}

export function login(payload: LoginPayload): Promise<AuthResponse> {
  return request<AuthResponse>({
    url: endpoints.auth.login,
    method: 'POST',
    data: payload,
  });
}

export function logout(): Promise<void> {
  return request<void>({
    url: endpoints.auth.logout,
    method: 'POST',
  });
}
