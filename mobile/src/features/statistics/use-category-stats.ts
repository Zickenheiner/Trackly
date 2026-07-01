import { useQuery } from '@tanstack/react-query';
import { getStatsByCategory } from './statistics.api';
import type { StatsPeriod } from './statistics.types';

export const categoryStatsQueryKey = (period: StatsPeriod) => [
  'statistics',
  'by-category',
  period,
];

export function useCategoryStats(period: StatsPeriod) {
  return useQuery({
    queryKey: categoryStatsQueryKey(period),
    queryFn: () => getStatsByCategory({ period }),
  });
}
