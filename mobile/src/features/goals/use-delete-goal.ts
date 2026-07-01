import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/core/query/query-client';
import { deleteGoal } from './goal.api';

export function useDeleteGoal() {
  return useMutation({
    mutationFn: (id: string) => deleteGoal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}
