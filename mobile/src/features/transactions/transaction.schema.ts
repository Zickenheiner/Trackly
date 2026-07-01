import { z } from 'zod';

/**
 * Le montant est saisi dans un TextInput (chaîne). On accepte la virgule
 * décimale française et on valide qu'il s'agit d'un nombre strictement positif.
 */
const amountField = z
  .string()
  .trim()
  .min(1, 'Le montant est requis.')
  .refine((value) => {
    const parsed = Number(value.replace(',', '.'));
    return Number.isFinite(parsed) && parsed > 0;
  }, 'Le montant doit être supérieur à 0.');

export const transactionFormSchema = z.object({
  amount: amountField,
  label: z
    .string()
    .trim()
    .min(1, 'Le libellé est requis.')
    .max(60, 'Le libellé ne peut pas dépasser 60 caractères.'),
  categoryId: z.string().trim().min(1, 'Choisissez une catégorie.'),
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date invalide (format AAAA-MM-JJ).'),
  note: z
    .string()
    .trim()
    .max(255, 'La note ne peut pas dépasser 255 caractères.')
    .optional(),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;

/** Convertit le montant saisi (chaîne, virgule autorisée) en nombre. */
export function parseAmount(value: string): number {
  return Number(value.replace(',', '.'));
}
