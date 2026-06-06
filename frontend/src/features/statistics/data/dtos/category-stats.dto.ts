export interface StatsByCategoryQueryDto {
  period?: 'week' | 'month' | 'year';
  date?: string;
}

export interface CategoryStatDto {
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
  total: number;
  percentage: number;
}

export type StatsByCategoryResponseDto = CategoryStatDto[];
