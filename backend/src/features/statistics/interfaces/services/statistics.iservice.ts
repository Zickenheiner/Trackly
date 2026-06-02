import { StatsByCategoryQueryDto, CategoryStatDto } from '@features/statistics/domains/dtos/statistics.dto';

export interface IStatisticsService {
  getStatsByCategory(userId: string, query: StatsByCategoryQueryDto): Promise<CategoryStatDto[]>;
}
