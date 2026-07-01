export interface TransactionEntity {
  id: string;
  amount: number;
  label: string;
  type: 'income' | 'expense';
  categoryId?: string;
  categoryName?: string;
  date: Date;
  createdAt: Date;
}

export interface DashboardSummaryEntity {
  balance: number;
  income: number;
  expenses: number;
  period: {
    start: Date;
    end: Date;
  };
  recentTransactions: TransactionEntity[];
}
