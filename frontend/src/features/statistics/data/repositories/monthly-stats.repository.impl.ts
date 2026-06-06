import type { MonthlyStatsRepository } from '../../domain/repositories/monthly-stats.repository';
import type { MonthlyStatEntity } from '../../domain/entities/monthly-stats.entity';
import type { MonthlyStatsQueryDto } from '../dtos/monthly-stats.dto';
import MonthlyStatsApi from '../datasources/monthly-stats.api';
import MonthlyStatsMapper from '../mappers/monthly-stats.mapper';

class MonthlyStatsRepositoryImpl implements MonthlyStatsRepository {
  constructor(
    private readonly api: MonthlyStatsApi = new MonthlyStatsApi(),
    private readonly mapper: MonthlyStatsMapper = new MonthlyStatsMapper(),
  ) {}

  async getMonthly(query?: MonthlyStatsQueryDto): Promise<MonthlyStatEntity[]> {
    const dtos = await this.api.getMonthly(query);
    return this.mapper.toEntityList(dtos);
  }
}

export default MonthlyStatsRepositoryImpl;
