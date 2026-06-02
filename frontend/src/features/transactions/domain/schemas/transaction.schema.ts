import { z } from 'zod';

export const createExpenseSchema = z.object({
  amount: z
    .number({ message: 'Le montant est requis.' })
    .positive('Le montant doit être supérieur à 0.'),
  label: z
    .string()
    .trim()
    .min(1, 'Le libellé est requis.')
    .max(60, 'Le libellé ne peut pas dépasser 60 caractères.'),
  categoryId: z.string().trim().min(1, 'Choisissez une catégorie.'),
  date: z.string().trim().min(1, 'La date est requise.'),
  note: z
    .string()
    .trim()
    .max(255, 'La note ne peut pas dépasser 255 caractères.')
    .optional(),
});

export type CreateExpenseFormData = z.infer<typeof createExpenseSchema>;
