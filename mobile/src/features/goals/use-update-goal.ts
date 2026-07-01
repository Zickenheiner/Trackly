import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/core/query/query-client';
import { updateGoal } from './goal.api';
import type { UpdateGoalPayload } from './goal.types';

export function useUpdateGoal() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateGoalPayload }) =>
      updateGoal(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}
