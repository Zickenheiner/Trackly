export interface MonthlyStatsQueryDto {
  months?: number;
  type?: 'income' | 'expense' | 'both';
}

export interface MonthlyStatDto {
  month: string;
  income: number;
  expenses: number;
}

export type MonthlyStatsResponseDto = MonthlyStatDto[];
