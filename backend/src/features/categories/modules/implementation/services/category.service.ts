import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICategoryService } from '../../../interfaces/services/category.iservice';
import { ICategoryRepository } from '@features/categories/interfaces/repositories/category.irepository';
import { CategoryEntity } from '@features/categories/domains/entities/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@features/categories/domains/dtos/category.dto';

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

  async update(id: string, dto: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    if (category.getIsDefault()) {
      throw new ForbiddenException('Default category cannot be updated');
    }
    if (dto.name) {
      const existing = await this.categoryRepository.findByName(dto.name);
      if (existing && existing.getId() !== id) {
        throw new ConflictException('Category name already used');
      }
    }
    const updated = await this.categoryRepository.update(id, dto);
    if (!updated) {
      throw new NotFoundException('Category not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    if (category.getIsDefault()) {
      throw new ForbiddenException('Default category cannot be deleted');
    }
    await this.categoryRepository.delete(id);
  }
}
