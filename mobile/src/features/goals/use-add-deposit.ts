import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/core/query/query-client';
import { addDeposit } from './goal.api';
import type { AddDepositPayload } from './goal.types';

export function useAddDeposit() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: AddDepositPayload }) =>
      addDeposit(id, payload),
    onSuccess: () => {
      // Un dépôt affecte le solde : on rafraîchit les objectifs et le dashboard.
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}
