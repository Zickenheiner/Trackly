import { useQuery } from '@tanstack/react-query';
import { getGoal } from './goal.api';

export function useGoal(id: string) {
  return useQuery({
    queryKey: ['goals', id],
    queryFn: () => getGoal(id),
    enabled: Boolean(id),
  });
}
