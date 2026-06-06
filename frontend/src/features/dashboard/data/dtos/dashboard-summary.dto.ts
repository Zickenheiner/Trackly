export interface DashboardSummaryQueryDto {
  period?: 'week' | 'month' | 'year';
  date?: string;
}

export interface TransactionDto {
  id: string;
  amount: number;
  label: string;
  type: 'income' | 'expense';
  categoryId?: string;
  categoryName?: string;
  date: string;
  createdAt: string;
}

export interface DashboardSummaryResponseDto {
  balance: number;
  income: number;
  expenses: number;
  period: {
    start: string;
    end: string;
  };
  recentTransactions: TransactionDto[];
}
