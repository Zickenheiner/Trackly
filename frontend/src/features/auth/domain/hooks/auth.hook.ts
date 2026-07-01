import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import AuthRepositoryImpl from '../../data/repositories/auth.repository.impl';
import {
  setAccessToken,
  setRefreshToken,
  clearTokens,
} from '@/core/local/storage';
import routes from '@/core/constants/routes';
import type { LoginRequestDto } from '../../data/dtos/auth.dto';

const repository = new AuthRepositoryImpl();

export const registerSchema = z
  .object({
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
    confirmPassword: z.string().min(1, 'La confirmation est requise'),
    currency: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function useLogin() {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: (data: LoginRequestDto) => repository.login(data),
    onSuccess: (auth) => {
      setAccessToken(auth.accessToken);
      setRefreshToken(auth.refreshToken);
    },
  });

  return {
    login: mutate,
    loginIsPending: isPending,
    loginError: error,
    loginIsSuccess: isSuccess,
  };
}

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

export function useLogout() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => repository.logout(),
    onSettled: () => {
      clearTokens();
      navigate(routes.login, { replace: true });
    },
  });

  return {
    logout: mutate,
    logoutIsPending: isPending,
  };
}
