import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/core/auth/auth-context';
import { ApiError } from '@/core/api/api-error';
import { login } from './auth.api';
import type { LoginPayload } from './auth.types';

export function useLogin() {
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      try {
        return await login(payload);
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          throw new ApiError('Email ou mot de passe invalide', error.status);
        }
        throw error;
      }
    },
    onSuccess: (response) => signIn(response),
  });
}
