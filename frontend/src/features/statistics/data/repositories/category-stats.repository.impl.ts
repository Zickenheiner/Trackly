import type { CategoryStatsRepository } from '../../domain/repositories/category-stats.repository';
import type { CategoryStatEntity } from '../../domain/entities/category-stats.entity';
import type { StatsByCategoryQueryDto } from '../dtos/category-stats.dto';
import CategoryStatsApi from '../datasources/category-stats.api';
import CategoryStatsMapper from '../mappers/category-stats.mapper';

class CategoryStatsRepositoryImpl implements CategoryStatsRepository {
  constructor(
    private readonly api: CategoryStatsApi = new CategoryStatsApi(),
    private readonly mapper: CategoryStatsMapper = new CategoryStatsMapper(),
  ) {}

  async getByCategory(query?: StatsByCategoryQueryDto): Promise<CategoryStatEntity[]> {
    const dtos = await this.api.getByCategory(query);
    return this.mapper.toEntityList(dtos);
  }
}

export default CategoryStatsRepositoryImpl;
