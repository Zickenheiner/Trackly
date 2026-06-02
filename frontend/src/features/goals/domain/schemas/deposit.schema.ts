import { z } from 'zod';

export const addDepositSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'Le montant doit être un nombre' })
    .positive('Le montant doit être supérieur à 0'),
  date: z
    .string()
    .optional()
    .refine(
      (val) => !val || !isNaN(Date.parse(val)),
      'La date doit être une date valide',
    ),
});

export type AddDepositFormData = z.infer<typeof addDepositSchema>;
