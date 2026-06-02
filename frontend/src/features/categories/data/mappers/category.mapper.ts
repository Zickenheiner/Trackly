import type { CategoryEntity } from '../../domain/entities/category.entity';
import type { CategoryResponseDto } from '../dtos/category.dto';

class CategoryMapper {
  toEntity(dto: CategoryResponseDto): CategoryEntity {
    return {
      id: dto.id,
      name: dto.name,
      icon: dto.icon,
      color: dto.color,
      isDefault: dto.isDefault,
    };
  }

  toEntityList(dtos: CategoryResponseDto[]): CategoryEntity[] {
    return dtos.map((dto) => this.toEntity(dto));
  }
}

export default CategoryMapper;
