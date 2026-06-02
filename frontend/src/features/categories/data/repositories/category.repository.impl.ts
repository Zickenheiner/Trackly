import type { CategoryRepository } from '../../domain/repositories/category.repository';
import type { CategoryEntity } from '../../domain/entities/category.entity';
import CategoryApi from '../datasources/category.api';
import CategoryMapper from '../mappers/category.mapper';

class CategoryRepositoryImpl implements CategoryRepository {
  constructor(
    private readonly categoryApi: CategoryApi = new CategoryApi(),
    private readonly categoryMapper: CategoryMapper = new CategoryMapper(),
  ) {}

  async getAll(): Promise<CategoryEntity[]> {
    const dtos = await this.categoryApi.getAll();
    return this.categoryMapper.toEntityList(dtos);
  }
}

export default CategoryRepositoryImpl;
