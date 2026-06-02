import { CategoryEntity } from '@features/categories/domains/entities/category.entity';
import { ICategoryService } from '@features/categories/interfaces/services/category.iservice';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('categories')
export class CategoryController {
  constructor(
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService,
  ) {}

  @ApiOperation({
    summary: 'Get all categories',
    description:
      'Retrieve the default categories and the user custom categories',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all categories',
    type: [CategoryEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthenticated',
  })
  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }
}
