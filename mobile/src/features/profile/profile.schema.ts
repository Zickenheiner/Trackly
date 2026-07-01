import { z } from 'zod';

export const profileSchema = z.object({
  title: z.enum(['Mr.', 'Mrs.']),
  firstName: z.string().min(1, 'Prénom requis'),
  lastName: z.string().min(1, 'Nom requis'),
  age: z
    .string()
    .min(1, 'Âge requis')
    .refine((value) => /^\d+$/.test(value), 'Âge invalide')
    .refine((value) => Number(value) >= 18, 'Vous devez avoir au moins 18 ans'),
  currency: z.string().min(1, 'Devise requise'),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
