import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import GoalRepositoryImpl from '../../data/repositories/goal.repository.impl';
import type { CreateGoalRequestDto, UpdateGoalRequestDto } from '../../data/dtos/goal.dto';
import type { AddDepositRequestDto } from '../../data/dtos/deposit.dto';

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

export function useAddDeposit() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, error, data } = useMutation({
    mutationFn: ({ goalId, data }: { goalId: string; data: AddDepositRequestDto }) =>
      repository.addDeposit(goalId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });

  return {
    addDeposit: mutate,
    addDepositAsync: mutateAsync,
    addDepositIsLoading: isPending,
    addDepositError: error,
    addDepositResult: data,
  };
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGoalRequestDto }) =>
      repository.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(id) });
    },
  });

  return {
    updateGoal: mutate,
    updateGoalAsync: mutateAsync,
    updateGoalIsLoading: isPending,
    updateGoalError: error,
  };
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: (id: string) => repository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });

  return {
    deleteGoal: mutate,
    deleteGoalAsync: mutateAsync,
    deleteGoalIsLoading: isPending,
    deleteGoalError: error,
  };
}
