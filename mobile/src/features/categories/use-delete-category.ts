import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/core/query/query-client';
import { deleteCategory } from './category.api';
import { categoriesQueryKey } from './use-categories';

export function useDeleteCategory() {
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      // La suppression retire la catégorie de la liste et peut affecter les
      // transactions/stats/dashboard qui la référençaient.
      queryClient.invalidateQueries({ queryKey: categoriesQueryKey });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
    },
  });
}
