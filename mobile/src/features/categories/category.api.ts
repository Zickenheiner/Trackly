import { request } from '@/core/api/client';
import endpoints from '@/core/api/endpoints';
import type { Category } from './category.types';

export function getCategories(): Promise<Category[]> {
  return request<Category[]>({
    url: endpoints.categories.list,
    method: 'GET',
  });
}
