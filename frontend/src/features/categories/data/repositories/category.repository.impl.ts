import type { CategoryRepository } from '../../domain/repositories/category.repository';
import type { CategoryEntity } from '../../domain/entities/category.entity';
import type {
  CreateCategoryRequestDto,
  UpdateCategoryRequestDto,
} from '../dtos/category.dto';
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

  async create(data: CreateCategoryRequestDto): Promise<CategoryEntity> {
    const dto = await this.categoryApi.create(data);
    return this.categoryMapper.toEntity(dto);
  }

  async update(
    id: string,
    data: UpdateCategoryRequestDto,
  ): Promise<CategoryEntity> {
    const dto = await this.categoryApi.update(id, data);
    return this.categoryMapper.toEntity(dto);
  }

  async delete(id: string): Promise<void> {
    await this.categoryApi.delete(id);
  }
}

export default CategoryRepositoryImpl;
