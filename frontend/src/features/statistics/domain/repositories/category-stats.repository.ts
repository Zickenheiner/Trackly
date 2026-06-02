import type { CategoryStatEntity } from '../entities/category-stats.entity';
import type { StatsByCategoryQueryDto } from '../../data/dtos/category-stats.dto';

export interface CategoryStatsRepository {
  getByCategory(query?: StatsByCategoryQueryDto): Promise<CategoryStatEntity[]>;
}
