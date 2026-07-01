import { useQuery } from '@tanstack/react-query';
import { getCategories } from './category.api';

export const categoriesQueryKey = ['categories'];

export function useCategories() {
  return useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  });
}
