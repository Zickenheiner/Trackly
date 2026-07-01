import { request } from '@/core/api/client';
import endpoints from '@/core/api/endpoints';
import type { UpdateProfilePayload, UserProfile } from './profile.types';

export function getProfile(): Promise<UserProfile> {
  return request<UserProfile>({
    url: endpoints.users.me,
    method: 'GET',
  });
}

export function updateProfile(
  payload: UpdateProfilePayload,
): Promise<UserProfile> {
  return request<UserProfile>({
    url: endpoints.users.me,
    method: 'PATCH',
    data: payload,
  });
}
