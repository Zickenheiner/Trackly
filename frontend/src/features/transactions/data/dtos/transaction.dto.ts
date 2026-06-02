export type TransactionType = 'income' | 'expense';

export interface CreateTransactionRequestDto {
  type: TransactionType;
  amount: number;
  label: string;
  categoryId: string;
  date: string;
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
