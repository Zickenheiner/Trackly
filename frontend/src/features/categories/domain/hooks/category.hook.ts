import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CategoryRepositoryImpl from '../../data/repositories/category.repository.impl';
import type { CreateCategoryRequestDto } from '../../data/dtos/category.dto';

const repository = new CategoryRepositoryImpl();

const QUERY_KEYS = {
  all: ['categories'] as const,
};

export function useCategoryList() {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.all,
    queryFn: () => repository.getAll(),
  });

  return {
    categories: data,
    categoriesIsLoading: isLoading,
    categoriesError: error,
  };
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: CreateCategoryRequestDto) => repository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });

  return {
    createCategory: mutate,
    createCategoryAsync: mutateAsync,
    createCategoryIsLoading: isPending,
    createCategoryError: error,
  };
}
