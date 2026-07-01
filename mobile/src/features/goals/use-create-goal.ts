import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/core/query/query-client';
import { createGoal } from './goal.api';
import type { CreateGoalPayload } from './goal.types';

export function useCreateGoal() {
  return useMutation({
    mutationFn: (payload: CreateGoalPayload) => createGoal(payload),
    onSuccess: () => {
      // Un montant initial peut affecter le solde : on rafraîchit aussi le dashboard.
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}
