import { useQuery } from '@tanstack/react-query';
import { getProfile } from './profile.api';

export const profileQueryKey = ['profile'];

export function useProfile() {
  return useQuery({
    queryKey: profileQueryKey,
    queryFn: getProfile,
  });
}
