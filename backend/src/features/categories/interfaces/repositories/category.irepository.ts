import { CreateCategoryDto } from '@features/categories/domains/dtos/category.dto';
import { CategoryEntity } from '@features/categories/domains/entities/category.entity';

export interface ICategoryRepository {
  findAll(): Promise<CategoryEntity[] | null>;
  findByName(name: string): Promise<CategoryEntity | null>;
  create(dto: CreateCategoryDto): Promise<CategoryEntity>;
}
