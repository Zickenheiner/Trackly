import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CategoryRepositoryImpl from '../../data/repositories/category.repository.impl';
import type {
  CreateCategoryRequestDto,
  UpdateCategoryRequestDto,
} from '../../data/dtos/category.dto';

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

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateCategoryRequestDto;
    }) => repository.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });

  return {
    updateCategory: mutate,
    updateCategoryAsync: mutateAsync,
    updateCategoryIsLoading: isPending,
    updateCategoryError: error,
  };
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: (id: string) => repository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });

  return {
    deleteCategory: mutate,
    deleteCategoryAsync: mutateAsync,
    deleteCategoryIsLoading: isPending,
    deleteCategoryError: error,
  };
}
