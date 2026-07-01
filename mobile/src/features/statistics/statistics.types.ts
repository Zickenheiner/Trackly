export type StatsPeriod = 'week' | 'month' | 'year';

export interface StatsByCategoryQuery {
  period?: StatsPeriod;
  date?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CategoryStat {
  category: CategoryInfo;
  total: number;
  percentage: number;
}

export type MonthlyStatsType = 'income' | 'expense' | 'both';

export interface MonthlyStatsQuery {
  months?: number;
  type?: MonthlyStatsType;
}

export interface MonthlyStat {
  month: string; // format 'YYYY-MM'
  income: number;
  expenses: number;
}
