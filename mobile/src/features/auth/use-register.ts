import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/core/auth/auth-context';
import { register } from './auth.api';
import type { RegisterPayload } from './auth.types';

export function useRegister() {
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: (response) => signIn(response),
  });
}
