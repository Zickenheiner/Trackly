export type TransactionType = 'income' | 'expense';

export interface CreateTransactionRequestDto {
  type: TransactionType;
  amount: number;
  label: string;
  categoryId: string;
  date: string;
  note?: string;
}

export interface UpdateTransactionRequestDto {
  amount?: number;
  label?: string;
  categoryId?: string;
  date?: string;
  note?: string;
}

export interface TransactionCategoryDto {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface TransactionResponseDto {
  id: string;
  type: TransactionType;
  amount: number;
  label: string;
  note?: string;
  category: TransactionCategoryDto;
  date: string;
  createdAt: string;
}

export interface GetTransactionsQueryDto {
  type?: TransactionType;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface GetTransactionsResponseDto {
  data: TransactionResponseDto[];
  total: number;
  page: number;
  limit: number;
}
