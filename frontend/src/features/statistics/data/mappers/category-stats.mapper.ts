import type { CategoryStatEntity } from '../../domain/entities/category-stats.entity';
import type { CategoryStatDto } from '../dtos/category-stats.dto';

class CategoryStatsMapper {
  toEntity(dto: CategoryStatDto): CategoryStatEntity {
    return {
      category: {
        id: dto.category.id,
        name: dto.category.name,
        icon: dto.category.icon,
        color: dto.category.color,
      },
      total: dto.total,
      percentage: dto.percentage,
    };
  }

  toEntityList(dtos: CategoryStatDto[]): CategoryStatEntity[] {
    return dtos.map((dto) => this.toEntity(dto));
  }
}

export default CategoryStatsMapper;
