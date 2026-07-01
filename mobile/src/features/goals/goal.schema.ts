import { z } from 'zod';

/**
 * Les montants sont saisis dans un TextInput (chaîne). On accepte la virgule
 * décimale française et on valide qu'il s'agit d'un nombre valide.
 */
const targetAmountField = z
  .string()
  .trim()
  .min(1, 'Le montant cible est requis.')
  .refine((value) => {
    const parsed = Number(value.replace(',', '.'));
    return Number.isFinite(parsed) && parsed > 0;
  }, 'Le montant cible doit être supérieur à 0.');

/** Montant initial optionnel : vide autorisé, sinon nombre >= 0. */
const initialAmountField = z
  .string()
  .trim()
  .optional()
  .refine((value) => {
    if (!value) return true;
    const parsed = Number(value.replace(',', '.'));
    return Number.isFinite(parsed) && parsed >= 0;
  }, 'Le montant initial ne peut pas être négatif.');

/** Date optionnelle au format AAAA-MM-JJ, obligatoirement dans le futur. */
const deadlineField = z
  .string()
  .trim()
  .optional()
  .refine(
    (value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
    'Date invalide (format AAAA-MM-JJ).',
  )
  .refine(
    (value) => !value || new Date(`${value}T00:00:00`) > new Date(),
    'La date limite doit être dans le futur.',
  );

export const goalFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Le nom est requis.')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères.'),
  targetAmount: targetAmountField,
  deadline: deadlineField,
  initialAmount: initialAmountField,
  description: z
    .string()
    .trim()
    .max(500, 'La description ne peut pas dépasser 500 caractères.')
    .optional(),
});

export type GoalFormValues = z.infer<typeof goalFormSchema>;

export const depositFormSchema = z.object({
  amount: z
    .string()
    .trim()
    .min(1, 'Le montant est requis.')
    .refine((value) => {
      const parsed = Number(value.replace(',', '.'));
      return Number.isFinite(parsed) && parsed > 0;
    }, 'Le montant doit être supérieur à 0.'),
  date: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
      'Date invalide (format AAAA-MM-JJ).',
    ),
});

export type DepositFormValues = z.infer<typeof depositFormSchema>;

/** Convertit un montant saisi (chaîne, virgule autorisée) en nombre. */
export function parseAmount(value: string): number {
  return Number(value.replace(',', '.'));
}
