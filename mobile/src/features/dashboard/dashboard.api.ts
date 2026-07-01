import { request } from '@/core/api/client';
import endpoints from '@/core/api/endpoints';
import type { DashboardSummary, DashboardSummaryQuery } from './dashboard.types';

export function getDashboardSummary(
  query: DashboardSummaryQuery = {},
): Promise<DashboardSummary> {
  const params = new URLSearchParams();
  if (query.period) params.set('period', query.period);
  if (query.date) params.set('date', query.date);

  const queryString = params.toString();
  const url = queryString
    ? `${endpoints.dashboard.summary}?${queryString}`
    : endpoints.dashboard.summary;

  return request<DashboardSummary>({ url, method: 'GET' });
}
