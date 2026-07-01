export type DashboardPeriod = 'week' | 'month' | 'year';

export interface DashboardSummaryQuery {
  period?: DashboardPeriod;
  date?: string;
}

export interface DashboardTransaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  label: string;
  date: string;
  note?: string;
  categoryId?: string;
}

export interface DashboardPeriodRange {
  start: string;
  end: string;
}

export interface DashboardSummary {
  balance: number;
  income: number;
  expenses: number;
  period: DashboardPeriodRange;
  recentTransactions: DashboardTransaction[];
}
