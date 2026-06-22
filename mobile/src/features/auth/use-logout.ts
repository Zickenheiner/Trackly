import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/core/auth/auth-context';
import { queryClient } from '@/core/query/query-client';
import { logout } from './auth.api';

export function useLogout() {
  const { signOut } = useAuth();

  return useMutation({
    mutationFn: () => logout(),
    onSettled: async () => {
      await signOut();
      queryClient.clear();
    },
  });
}
