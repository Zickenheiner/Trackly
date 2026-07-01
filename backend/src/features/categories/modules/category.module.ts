import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './implementation/services/category.service';
import { CategoryRepository } from './implementation/repositories/category.repository';
import { CategoryMapper } from './implementation/mappers/category.mapper';
import {
  Category,
  CategorySchema,
} from '@features/categories/domains/schemas/category.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [
    CategoryMapper,
    {
      provide: 'ICategoryService',
      useClass: CategoryService,
    },
    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepository,
    },
  ],
  exports: ['ICategoryService'],
})
export class CategoryBaseModule {}
