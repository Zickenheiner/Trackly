import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import TransactionRepositoryImpl from '../../data/repositories/transaction.repository.impl';
import type {
  CreateTransactionRequestDto,
  UpdateTransactionRequestDto,
} from '../../data/dtos/transaction.dto';
import type { TransactionFilters } from '../entities/transaction.entity';

const repository = new TransactionRepositoryImpl();

const QUERY_KEYS = {
  all: ['transactions'] as const,
  list: (filters: TransactionFilters) =>
    ['transactions', 'list', filters] as const,
};

export function useTransactionList(filters: TransactionFilters = {}) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: QUERY_KEYS.list(filters),
    queryFn: () => repository.getAll(filters),
    placeholderData: keepPreviousData,
  });

  return {
    transactions: data?.data,
    transactionsTotal: data?.total,
    transactionsPage: data?.page,
    transactionsLimit: data?.limit,
    transactionsIsLoading: isLoading,
    transactionsIsFetching: isFetching,
    transactionsError: error,
  };
}

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

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateTransactionRequestDto;
    }) => repository.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
    },
  });

  return {
    updateTransaction: mutate,
    updateTransactionAsync: mutateAsync,
    updateTransactionIsLoading: isPending,
    updateTransactionError: error,
  };
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: (id: string) => repository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
    },
  });

  return {
    deleteTransaction: mutate,
    deleteTransactionAsync: mutateAsync,
    deleteTransactionIsLoading: isPending,
    deleteTransactionError: error,
  };
}
