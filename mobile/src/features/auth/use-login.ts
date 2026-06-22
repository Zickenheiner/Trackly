import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/core/auth/auth-context';
import { login } from './auth.api';
import type { LoginPayload } from './auth.types';

export function useLogin() {
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (response) => signIn(response),
  });
}
