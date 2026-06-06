import { StatsByCategoryQueryDto, CategoryStatDto, MonthlyStatsQueryDto, MonthlyStatDto } from '@features/statistics/domains/dtos/statistics.dto';

export interface IStatisticsService {
  getStatsByCategory(userId: string, query: StatsByCategoryQueryDto): Promise<CategoryStatDto[]>;
  getMonthlyStats(userId: string, query: MonthlyStatsQueryDto): Promise<MonthlyStatDto[]>;
}
