import { Inject, Injectable } from '@nestjs/common';
import { ICategoryService } from '../../../interfaces/services/category.iservice';
import { ICategoryRepository } from '@features/categories/interfaces/repositories/category.irepository';
import { CategoryEntity } from '@features/categories/domains/entities/category.entity';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async findAll(): Promise<CategoryEntity[] | null> {
    return this.categoryRepository.findAll();
  }
}
