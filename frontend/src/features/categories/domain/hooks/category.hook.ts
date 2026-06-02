import { useQuery } from '@tanstack/react-query';
import CategoryRepositoryImpl from '../../data/repositories/category.repository.impl';

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
