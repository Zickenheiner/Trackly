import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Le nom est requis.')
    .max(30, 'Le nom ne peut pas dépasser 30 caractères.'),
  icon: z.string().trim().min(1, 'Choisissez une icône.'),
  color: z
    .string()
    .trim()
    .regex(/^#([0-9a-fA-F]{6})$/, 'Choisissez une couleur valide.'),
});

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createCategorySchema;

export type UpdateCategoryFormData = z.infer<typeof updateCategorySchema>;
