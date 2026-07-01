export type TransactionType = 'income' | 'expense';

export interface TransactionCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface TransactionEntity {
  id: string;
  type: TransactionType;
  amount: number;
  label: string;
  note?: string;
  category: TransactionCategory;
  date: Date;
  createdAt: Date;
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
  data: TransactionEntity[];
  total: number;
  page: number;
  limit: number;
}
