import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/core/query/query-client';
import { createTransaction } from './transaction.api';
import type { CreateTransactionPayload } from './transaction.types';

export function useCreateTransaction() {
  return useMutation({
    mutationFn: (payload: CreateTransactionPayload) =>
      createTransaction(payload),
    onSuccess: () => {
      // La liste, le dashboard (solde, transactions récentes) et les
      // statistiques dépendent des transactions : on les rafraîchit après
      // création.
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
    },
  });
}
