import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/core/query/query-client';
import { createCategory } from './category.api';
import { categoriesQueryKey } from './use-categories';
import type { CreateCategoryPayload } from './category.types';

export function useCreateCategory() {
  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) => createCategory(payload),
    onSuccess: () => {
      // La liste des catégories change ; les transactions/stats/dashboard
      // affichent des catégories, on les rafraîchit aussi.
      queryClient.invalidateQueries({ queryKey: categoriesQueryKey });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
    },
  });
}
