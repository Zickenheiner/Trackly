import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../../../interfaces/repositories/category.irepository';
import { CategoryMapper } from '../mappers/category.mapper';
import {
  Category,
  CategoryDocument,
} from '@features/categories/domains/schemas/category.schema';
import { Model } from 'mongoose';
import { CategoryEntity } from '@features/categories/domains/entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    private readonly categoryMapper: CategoryMapper,
  ) {}

  async findAll(): Promise<CategoryEntity[] | null> {
    const categories = await this.categoryModel.find().exec();
    return categories
      ? categories.map((doc) => this.categoryMapper.toEntity(doc))
      : null;
  }
}
