import type { MonthlyStatEntity } from '../entities/monthly-stats.entity';
import type { MonthlyStatsQueryDto } from '../../data/dtos/monthly-stats.dto';

export interface MonthlyStatsRepository {
  getMonthly(query?: MonthlyStatsQueryDto): Promise<MonthlyStatEntity[]>;
}
