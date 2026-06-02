import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ICategoryService } from '../../../interfaces/services/category.iservice';
import { ICategoryRepository } from '@features/categories/interfaces/repositories/category.irepository';
import { CategoryEntity } from '@features/categories/domains/entities/category.entity';
import { CreateCategoryDto } from '@features/categories/domains/dtos/category.dto';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async findAll(): Promise<CategoryEntity[] | null> {
    return this.categoryRepository.findAll();
  }

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const existing = await this.categoryRepository.findByName(dto.name);
    if (existing) {
      throw new ConflictException('Category name already used');
    }
    return this.categoryRepository.create(dto);
  }
}
