import { useQuery } from '@tanstack/react-query';
import { getDashboardSummary } from './dashboard.api';
import type { DashboardPeriod } from './dashboard.types';

export const dashboardSummaryQueryKey = (period: DashboardPeriod) => [
  'dashboard',
  'summary',
  period,
];

export function useDashboardSummary(period: DashboardPeriod) {
  return useQuery({
    queryKey: dashboardSummaryQueryKey(period),
    queryFn: () => getDashboardSummary({ period }),
  });
}
