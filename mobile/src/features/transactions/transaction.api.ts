import { request } from '@/core/api/client';
import endpoints from '@/core/api/endpoints';
import type {
  CreateTransactionPayload,
  Transaction,
  TransactionFilters,
  TransactionListResult,
  UpdateTransactionPayload,
} from './transaction.types';

export function createTransaction(
  payload: CreateTransactionPayload,
): Promise<Transaction> {
  return request<Transaction>({
    url: endpoints.transactions.base,
    method: 'POST',
    data: payload,
  });
}

export function getTransactions(
  filters: TransactionFilters,
): Promise<TransactionListResult> {
  // On ne transmet que les filtres réellement définis.
  const params = new URLSearchParams();
  if (filters.type) params.append('type', filters.type);
  if (filters.categoryId) params.append('categoryId', filters.categoryId);
  if (filters.startDate) params.append('startDate', filters.startDate);
  if (filters.endDate) params.append('endDate', filters.endDate);
  if (filters.page !== undefined) params.append('page', String(filters.page));
  if (filters.limit !== undefined)
    params.append('limit', String(filters.limit));

  const query = params.toString();
  const url = query
    ? `${endpoints.transactions.base}?${query}`
    : endpoints.transactions.base;

  return request<TransactionListResult>({ url, method: 'GET' });
}

export function updateTransaction(
  id: string,
  payload: UpdateTransactionPayload,
): Promise<Transaction> {
  return request<Transaction>({
    url: endpoints.transactions.byId(id),
    method: 'PATCH',
    data: payload,
  });
}

export function deleteTransaction(id: string): Promise<void> {
  return request<void>({
    url: endpoints.transactions.byId(id),
    method: 'DELETE',
  });
}
