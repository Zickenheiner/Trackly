import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@features/categories/domains/dtos/category.dto';
import { CategoryEntity } from '@features/categories/domains/entities/category.entity';

export interface ICategoryRepository {
  findAll(userId: string): Promise<CategoryEntity[] | null>;
  findByName(name: string, userId: string): Promise<CategoryEntity | null>;
  findById(id: string): Promise<CategoryEntity | null>;
  create(dto: CreateCategoryDto, userId: string): Promise<CategoryEntity>;
  update(id: string, dto: UpdateCategoryDto): Promise<CategoryEntity | null>;
  delete(id: string): Promise<boolean>;
}
