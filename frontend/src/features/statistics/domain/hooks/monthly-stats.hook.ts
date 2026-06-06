import { useQuery } from '@tanstack/react-query';
import MonthlyStatsRepositoryImpl from '../../data/repositories/monthly-stats.repository.impl';
import type { MonthlyStatsQueryDto } from '../../data/dtos/monthly-stats.dto';

const repository = new MonthlyStatsRepositoryImpl();

const QUERY_KEYS = {
  monthly: (query?: MonthlyStatsQueryDto) =>
    ['statistics', 'monthly', query] as const,
};

export function useMonthlyStats(query?: MonthlyStatsQueryDto) {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.monthly(query),
    queryFn: () => repository.getMonthly(query),
  });

  return {
    monthlyStats: data,
    monthlyStatsIsLoading: isLoading,
    monthlyStatsError: error,
  };
}
