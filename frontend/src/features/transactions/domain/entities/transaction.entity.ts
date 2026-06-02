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
