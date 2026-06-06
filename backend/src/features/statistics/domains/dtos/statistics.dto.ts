import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

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

export class MonthlyStatsQueryDto {
  @ApiPropertyOptional({
    description: 'Number of months to display (default 6)',
    example: 6,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  months?: number;

  @ApiPropertyOptional({
    description: 'Type of transactions to include',
    enum: ['income', 'expense', 'both'],
    example: 'both',
  })
  @IsOptional()
  @IsString()
  @IsIn(['income', 'expense', 'both'])
  type?: 'income' | 'expense' | 'both';
}

export class MonthlyStatDto {
  @ApiProperty({
    description: 'Month in YYYY-MM format',
    example: '2026-03',
  })
  month: string;

  @ApiProperty({
    description: 'Total income for the month',
    example: 2000,
  })
  income: number;

  @ApiProperty({
    description: 'Total expenses for the month',
    example: 1500.5,
  })
  expenses: number;
}
