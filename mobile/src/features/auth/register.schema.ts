import { z } from 'zod';

export const registerSchema = z.object({
  title: z.enum(['Mr.', 'Mrs.']),
  firstName: z.string().min(1, 'Prénom requis'),
  lastName: z.string().min(1, 'Nom requis'),
  age: z
    .string()
    .min(1, 'Âge requis')
    .refine((value) => /^\d+$/.test(value), 'Âge invalide')
    .refine((value) => Number(value) >= 18, 'Vous devez avoir au moins 18 ans'),
  email: z.string().email('Email invalide'),
  password: z
    .string()
    .min(8, '8 caractères minimum')
    .regex(/[A-Z]/, 'Au moins une majuscule')
    .regex(/[0-9]/, 'Au moins un chiffre'),
  currency: z.string().min(1, 'Devise requise'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
