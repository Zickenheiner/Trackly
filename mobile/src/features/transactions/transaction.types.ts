export type TransactionType = 'income' | 'expense';

export interface CreateTransactionPayload {
  type: TransactionType;
  amount: number;
  label: string;
  categoryId: string;
  date: string;
  note?: string;
}

export interface TransactionCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface UpdateTransactionPayload {
  type?: TransactionType;
  amount?: number;
  label?: string;
  categoryId?: string;
  date?: string;
  note?: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  label: string;
  note?: string;
  category: TransactionCategory;
  date: string;
  createdAt: string;
}

export interface TransactionFilters {
  type?: TransactionType;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface TransactionListResult {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
}
