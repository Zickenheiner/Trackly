import type { CategoryEntity } from '../entities/category.entity';
import type {
  CreateCategoryRequestDto,
  UpdateCategoryRequestDto,
} from '../../data/dtos/category.dto';

export interface CategoryRepository {
  getAll(): Promise<CategoryEntity[]>;
  create(data: CreateCategoryRequestDto): Promise<CategoryEntity>;
  update(id: string, data: UpdateCategoryRequestDto): Promise<CategoryEntity>;
  delete(id: string): Promise<void>;
}
