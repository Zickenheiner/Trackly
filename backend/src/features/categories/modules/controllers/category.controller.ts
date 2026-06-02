import { CategoryEntity } from '@features/categories/domains/entities/category.entity';
import { ICategoryService } from '@features/categories/interfaces/services/category.iservice';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCategoryDto } from '@features/categories/domains/dtos/category.dto';

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

  @ApiOperation({
    summary: 'Create a category',
    description: 'Create a custom category for the user',
  })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Category created',
    type: CategoryEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthenticated',
  })
  @ApiResponse({
    status: 409,
    description: 'Category name already used',
  })
  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }
}
