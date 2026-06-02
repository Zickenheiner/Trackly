import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@features/categories/domains/dtos/category.dto';
import { CategoryEntity } from '@features/categories/domains/entities/category.entity';

export interface ICategoryService {
  findAll(): Promise<CategoryEntity[] | null>;
  create(dto: CreateCategoryDto): Promise<CategoryEntity>;
  update(id: string, dto: UpdateCategoryDto): Promise<CategoryEntity>;
  delete(id: string): Promise<void>;
}
