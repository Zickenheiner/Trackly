import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionEntity } from '@features/transactions/domains/entities/transaction.entity';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsISO8601,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'The type of the transaction',
    example: 'expense',
    enum: ['income', 'expense'],
  })
  @IsEnum(['income', 'expense'])
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'The amount of the transaction, must be greater than 0',
    example: 42.5,
  })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: 'The label of the transaction',
    example: 'Courses',
  })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({
    description: 'The identifier of the category of the transaction',
    example: '68b4d59919d9b7a94b4fde21',
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    description: 'The date of the transaction in ISO 8601 format',
    example: '2026-06-02T00:00:00.000Z',
  })
  @IsISO8601()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'An optional note for the transaction',
    example: 'Achat hebdomadaire',
    required: false,
  })
  @IsString()
  @IsOptional()
  note?: string;
}

export class GetTransactionsQueryDto {
  @ApiPropertyOptional({
    description: 'Filter transactions by type',
    enum: ['income', 'expense'],
    example: 'expense',
  })
  @IsOptional()
  @IsEnum(['income', 'expense'])
  type?: 'income' | 'expense';

  @ApiPropertyOptional({
    description: 'Filter transactions by category identifier',
    example: '68b4d59919d9b7a94b4fde21',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Filter transactions from this date in ISO 8601 format',
    example: '2026-06-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsISO8601()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Filter transactions up to this date in ISO 8601 format',
    example: '2026-06-30T23:59:59.999Z',
  })
  @IsOptional()
  @IsISO8601()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Page number, defaults to 1',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page, defaults to 20',
    example: 20,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}

export class UpdateTransactionDto {
  @ApiProperty({
    description: 'The amount of the transaction, must be greater than 0',
    example: 42.5,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount?: number;

  @ApiProperty({
    description: 'The label of the transaction',
    example: 'Courses',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  label?: string;

  @ApiProperty({
    description: 'The identifier of the category of the transaction',
    example: '68b4d59919d9b7a94b4fde21',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    description: 'The date of the transaction in ISO 8601 format',
    example: '2026-06-02T00:00:00.000Z',
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  date?: string;

  @ApiProperty({
    description: 'An optional note for the transaction',
    example: 'Achat hebdomadaire',
    required: false,
  })
  @IsString()
  @IsOptional()
  note?: string;
}

export class GetTransactionsResponseDto {
  @ApiProperty({
    type: [TransactionEntity],
    description: 'The list of transactions for the current page',
  })
  data: TransactionEntity[];

  @ApiProperty({
    description: 'The total number of transactions matching the filters',
    example: 42,
  })
  total: number;

  @ApiProperty({
    description: 'The current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'The number of items per page',
    example: 20,
  })
  limit: number;
}
