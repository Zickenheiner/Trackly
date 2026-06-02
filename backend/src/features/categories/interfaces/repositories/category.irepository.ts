import { CategoryEntity } from '@features/categories/domains/entities/category.entity';

export interface ICategoryRepository {
  findAll(): Promise<CategoryEntity[] | null>;
}
