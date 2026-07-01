import { request } from '@/core/api/client';
import endpoints from '@/core/api/endpoints';
import type { CreateTransactionPayload, Transaction } from './transaction.types';

export function createTransaction(
  payload: CreateTransactionPayload,
): Promise<Transaction> {
  return request<Transaction>({
    url: endpoints.transactions.base,
    method: 'POST',
    data: payload,
  });
}
