import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/core/query/query-client';
import { deleteTransaction } from './transaction.api';

export function useDeleteTransaction() {
  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      // La liste, le dashboard et les statistiques dépendent des
      // transactions : on les rafraîchit après suppression.
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
    },
  });
}
