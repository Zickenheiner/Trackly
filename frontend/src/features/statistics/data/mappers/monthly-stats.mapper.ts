import type { MonthlyStatEntity } from '../../domain/entities/monthly-stats.entity';
import type { MonthlyStatDto } from '../dtos/monthly-stats.dto';

class MonthlyStatsMapper {
  toEntity(dto: MonthlyStatDto): MonthlyStatEntity {
    return {
      month: dto.month,
      income: dto.income,
      expenses: dto.expenses,
    };
  }

  toEntityList(dtos: MonthlyStatDto[]): MonthlyStatEntity[] {
    return dtos.map((dto) => this.toEntity(dto));
  }
}

export default MonthlyStatsMapper;
