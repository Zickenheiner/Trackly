import { request } from '@/core/api/client';
import endpoints from '@/core/api/endpoints';
import type { CategoryStat, StatsByCategoryQuery } from './statistics.types';

export function getStatsByCategory(
  query: StatsByCategoryQuery = {},
): Promise<CategoryStat[]> {
  const params = new URLSearchParams();
  if (query.period) params.set('period', query.period);
  if (query.date) params.set('date', query.date);

  const queryString = params.toString();
  const url = queryString
    ? `${endpoints.statistics.byCategory}?${queryString}`
    : endpoints.statistics.byCategory;

  return request<CategoryStat[]>({ url, method: 'GET' });
}
