import { CategoryEntity } from '@features/categories/domains/entities/category.entity';

export interface ICategoryService {
  findAll(): Promise<CategoryEntity[] | null>;
}
