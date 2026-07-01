import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@features/categories/domains/dtos/category.dto';
import { CategoryEntity } from '@features/categories/domains/entities/category.entity';

export interface ICategoryService {
  findAll(userId: string): Promise<CategoryEntity[] | null>;
  create(dto: CreateCategoryDto, userId: string): Promise<CategoryEntity>;
  update(
    id: string,
    dto: UpdateCategoryDto,
    userId: string,
  ): Promise<CategoryEntity>;
  delete(id: string, userId: string): Promise<void>;
}
