import { useQuery } from '@tanstack/react-query';
import { getGoals } from './goal.api';

export const goalsQueryKey = ['goals'];

export function useGoalList() {
  return useQuery({
    queryKey: goalsQueryKey,
    queryFn: getGoals,
  });
}
