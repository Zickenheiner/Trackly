import { useQuery } from '@tanstack/react-query';
import CategoryStatsRepositoryImpl from '../../data/repositories/category-stats.repository.impl';
import type { StatsByCategoryQueryDto } from '../../data/dtos/category-stats.dto';

const repository = new CategoryStatsRepositoryImpl();

const QUERY_KEYS = {
  byCategory: (query?: StatsByCategoryQueryDto) =>
    ['statistics', 'by-category', query] as const,
};

export function useCategoryStats(query?: StatsByCategoryQueryDto) {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.byCategory(query),
    queryFn: () => repository.getByCategory(query),
  });

  return {
    categoryStats: data,
    categoryStatsIsLoading: isLoading,
    categoryStatsError: error,
  };
}
