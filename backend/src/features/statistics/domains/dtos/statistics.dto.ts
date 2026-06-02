import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';

export class StatsByCategoryQueryDto {
  @ApiPropertyOptional({
    description: 'Period for the statistics',
    enum: ['week', 'month', 'year'],
    example: 'month',
  })
  @IsOptional()
  @IsString()
  @IsIn(['week', 'month', 'year'])
  period?: 'week' | 'month' | 'year';

  @ApiPropertyOptional({
    description: 'Reference date in ISO 8601 format, defaults to today',
    example: '2026-06-01',
  })
  @IsOptional()
  @IsDateString()
  date?: string;
}

export class CategoryInfoDto {
  @ApiProperty({
    description: 'Category unique identifier',
    example: '68b4d59919d9b7a94b4fde21',
  })
  id: string;

  @ApiProperty({
    description: 'Category name',
    example: 'Alimentation',
  })
  name: string;

  @ApiProperty({
    description: 'Category emoji icon',
    example: '🍔',
  })
  icon: string;

  @ApiProperty({
    description: 'Category hex color',
    example: '#FF5733',
  })
  color: string;
}

export class CategoryStatDto {
  @ApiProperty({
    description: 'Category information',
    type: CategoryInfoDto,
  })
  category: CategoryInfoDto;

  @ApiProperty({
    description: 'Total expenses for this category in the period',
    example: 150.5,
  })
  total: number;

  @ApiProperty({
    description: 'Percentage of total expenses (0-100)',
    example: 25.3,
  })
  percentage: number;
}
