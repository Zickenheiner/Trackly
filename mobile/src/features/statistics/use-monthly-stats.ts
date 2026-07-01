import { useQuery } from '@tanstack/react-query';
import { getMonthlyStats } from './monthly-stats.api';
import type { MonthlyStatsType } from './statistics.types';

export const monthlyStatsQueryKey = (months: number, type: MonthlyStatsType) => [
  'statistics',
  'monthly',
  months,
  type,
];

export function useMonthlyStats(months: number, type: MonthlyStatsType) {
  return useQuery({
    queryKey: monthlyStatsQueryKey(months, type),
    queryFn: () => getMonthlyStats({ months, type }),
  });
}
