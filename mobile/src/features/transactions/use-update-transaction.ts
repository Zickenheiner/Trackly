import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/core/query/query-client';
import { updateTransaction } from './transaction.api';
import type { UpdateTransactionPayload } from './transaction.types';

export function useUpdateTransaction() {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateTransactionPayload;
    }) => updateTransaction(id, payload),
    onSuccess: () => {
      // La liste, le dashboard et les statistiques dépendent des
      // transactions : on les rafraîchit après mise à jour.
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
    },
  });
}
