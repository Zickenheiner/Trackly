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
