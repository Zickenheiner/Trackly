import { z } from 'zod';

export const createGoalSchema = z.object({
  name: z.string().min(1, 'Le nom est requis').max(100, 'Le nom ne doit pas dépasser 100 caractères'),
  targetAmount: z
    .number({ invalid_type_error: 'Le montant cible doit être un nombre' })
    .positive('Le montant cible doit être supérieur à 0'),
  deadline: z
    .string()
    .optional()
    .refine(
      (val) => !val || new Date(val) > new Date(),
      'La date limite doit être dans le futur',
    ),
  initialAmount: z
    .number({ invalid_type_error: 'Le montant initial doit être un nombre' })
    .min(0, 'Le montant initial ne peut pas être négatif')
    .optional(),
  description: z.string().max(500, 'La description ne doit pas dépasser 500 caractères').optional(),
});

export type CreateGoalFormData = z.infer<typeof createGoalSchema>;
