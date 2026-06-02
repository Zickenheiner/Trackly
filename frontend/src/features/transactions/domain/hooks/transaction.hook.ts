import { useMutation, useQueryClient } from '@tanstack/react-query';
import TransactionRepositoryImpl from '../../data/repositories/transaction.repository.impl';
import type { CreateTransactionRequestDto } from '../../data/dtos/transaction.dto';

const repository = new TransactionRepositoryImpl();

const QUERY_KEYS = {
  all: ['transactions'] as const,
};

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: CreateTransactionRequestDto) => repository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });

  return {
    createTransaction: mutate,
    createTransactionAsync: mutateAsync,
    createTransactionIsLoading: isPending,
    createTransactionError: error,
  };
}
