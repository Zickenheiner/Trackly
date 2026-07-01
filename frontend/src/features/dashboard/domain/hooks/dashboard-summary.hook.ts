import { useQuery } from '@tanstack/react-query';
import DashboardSummaryRepositoryImpl from '../../data/repositories/dashboard-summary.repository.impl';
import type { DashboardSummaryQueryDto } from '../../data/dtos/dashboard-summary.dto';

const repository = new DashboardSummaryRepositoryImpl();

const QUERY_KEYS = {
  summary: (query?: DashboardSummaryQueryDto) =>
    ['dashboard', 'summary', query] as const,
};

export function useDashboardSummary(query?: DashboardSummaryQueryDto) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.summary(query),
    queryFn: () => repository.getSummary(query),
  });

  return {
    summary: data,
    summaryIsLoading: isLoading,
    summaryError: error,
    refetchSummary: refetch,
  };
}
