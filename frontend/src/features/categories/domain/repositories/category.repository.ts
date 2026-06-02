import type { CategoryEntity } from '../entities/category.entity';
import type { CreateCategoryRequestDto } from '../../data/dtos/category.dto';

export interface CategoryRepository {
  getAll(): Promise<CategoryEntity[]>;
  create(data: CreateCategoryRequestDto): Promise<CategoryEntity>;
}
