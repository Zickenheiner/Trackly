import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/core/query/query-client';
import { updateCategory } from './category.api';
import { categoriesQueryKey } from './use-categories';
import type { UpdateCategoryPayload } from './category.types';

export function useUpdateCategory() {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateCategoryPayload;
    }) => updateCategory(id, payload),
    onSuccess: () => {
      // Une catégorie modifiée impacte son affichage dans les transactions,
      // le dashboard et les statistiques : on rafraîchit tout.
      queryClient.invalidateQueries({ queryKey: categoriesQueryKey });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
    },
  });
}
