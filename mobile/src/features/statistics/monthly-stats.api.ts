import { request } from '@/core/api/client';
import endpoints from '@/core/api/endpoints';
import type { MonthlyStat, MonthlyStatsQuery } from './statistics.types';

export function getMonthlyStats(
  query: MonthlyStatsQuery = {},
): Promise<MonthlyStat[]> {
  const params = new URLSearchParams();
  if (query.months) params.set('months', String(query.months));
  if (query.type) params.set('type', query.type);

  const queryString = params.toString();
  const url = queryString
    ? `${endpoints.statistics.monthly}?${queryString}`
    : endpoints.statistics.monthly;

  return request<MonthlyStat[]>({ url, method: 'GET' });
}
