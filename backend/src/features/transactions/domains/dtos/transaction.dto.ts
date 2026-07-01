import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsPositive,
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
