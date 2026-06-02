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
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@features/categories/domains/dtos/category.dto';

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

  async findByName(name: string): Promise<CategoryEntity | null> {
    const category = await this.categoryModel.findOne({ name }).exec();
    return category ? this.categoryMapper.toEntity(category) : null;
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const category = await this.categoryModel.findById(id).exec();
    return category ? this.categoryMapper.toEntity(category) : null;
  }

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const document = new this.categoryModel({ ...dto, isDefault: false });
    const created = await document.save();
    return this.categoryMapper.toEntity(created);
  }

  async update(
    id: string,
    dto: UpdateCategoryDto,
  ): Promise<CategoryEntity | null> {
    const updated = await this.categoryModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    return updated ? this.categoryMapper.toEntity(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
