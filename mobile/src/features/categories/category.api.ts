import { request } from '@/core/api/client';
import endpoints from '@/core/api/endpoints';
import type {
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from './category.types';

export function getCategories(): Promise<Category[]> {
  return request<Category[]>({
    url: endpoints.categories.list,
    method: 'GET',
  });
}

export function createCategory(
  payload: CreateCategoryPayload,
): Promise<Category> {
  return request<Category>({
    url: endpoints.categories.list,
    method: 'POST',
    data: payload,
  });
}

export function updateCategory(
  id: string,
  payload: UpdateCategoryPayload,
): Promise<Category> {
  return request<Category>({
    url: endpoints.categories.byId(id),
    method: 'PATCH',
    data: payload,
  });
}

export function deleteCategory(id: string): Promise<void> {
  return request<void>({
    url: endpoints.categories.byId(id),
    method: 'DELETE',
  });
}
