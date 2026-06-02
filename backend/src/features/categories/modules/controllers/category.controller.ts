import { CategoryEntity } from '@features/categories/domains/entities/category.entity';
import { ICategoryService } from '@features/categories/interfaces/services/category.iservice';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@features/categories/domains/dtos/category.dto';

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

  @ApiOperation({
    summary: 'Update a category',
    description: 'Update the name, icon or color of a custom category',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'Category updated',
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
    status: 403,
    description: 'Default category cannot be updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Delete a category',
    description: 'Delete a custom category',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 204,
    description: 'Category deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Transactions are linked to this category',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthenticated',
  })
  @ApiResponse({
    status: 403,
    description: 'Default category cannot be deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
