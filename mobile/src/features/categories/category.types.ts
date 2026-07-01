export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  isDefault: boolean;
}

/** Données envoyées lors de la création d'une catégorie. */
export interface CreateCategoryPayload {
  name: string;
  icon: string;
  color: string;
}

/** Données envoyées lors de la mise à jour d'une catégorie (champs partiels). */
export interface UpdateCategoryPayload {
  name?: string;
  icon?: string;
  color?: string;
}
