import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import AuthRepositoryImpl from '../../data/repositories/auth.repository.impl';
import { setAccessToken, setRefreshToken } from '@/core/local/storage';

const repository = new AuthRepositoryImpl();

export const registerSchema = z.object({
  title: z.enum(['Mr.', 'Mrs.']),
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  age: z.coerce.number().min(18, 'Vous devez avoir au moins 18 ans'),
  email: z.string().email('Email invalide'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
  currency: z.string().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export function useRegister() {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: (data: RegisterFormData) =>
      repository.register({
        ...data,
        currency: data.currency ?? 'EUR',
      }),
    onSuccess: (auth) => {
      setAccessToken(auth.accessToken);
      setRefreshToken(auth.refreshToken);
    },
  });

  return {
    register: mutate,
    registerIsPending: isPending,
    registerError: error,
    registerIsSuccess: isSuccess,
  };
}
