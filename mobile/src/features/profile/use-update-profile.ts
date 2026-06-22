import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/core/auth/auth-context';
import { queryClient } from '@/core/query/query-client';
import { updateProfile } from './profile.api';
import { profileQueryKey } from './use-profile';
import type { UpdateProfilePayload } from './profile.types';

export function useUpdateProfile() {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: (profile) => {
      queryClient.setQueryData(profileQueryKey, profile);
      setUser(profile);
    },
  });
}
