import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import GoalRepositoryImpl from '../../data/repositories/goal.repository.impl';
import type { CreateGoalRequestDto } from '../../data/dtos/goal.dto';

const repository = new GoalRepositoryImpl();

const QUERY_KEYS = {
  all: ['goals'] as const,
  detail: (id: string) => ['goals', id] as const,
};

export function useGoalList() {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.all,
    queryFn: () => repository.getAll(),
  });

  return { goals: data, goalsIsLoading: isLoading, goalsError: error };
}

export function useGoal(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.detail(id),
    queryFn: () => repository.getById(id),
    enabled: !!id,
  });

  return { goal: data, goalIsLoading: isLoading, goalError: error };
}

export function useCreateGoal() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: CreateGoalRequestDto) => repository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });

  return {
    createGoal: mutate,
    createGoalAsync: mutateAsync,
    createGoalIsLoading: isPending,
    createGoalError: error,
  };
}
