import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';

export class DashboardSummaryQueryDto {
  @ApiPropertyOptional({
    description: 'Period for the summary',
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

export class TransactionDto {
  @ApiProperty({
    description: 'Transaction unique identifier',
    example: '68b4d59919d9b7a94b4fde21',
  })
  id: string;

  @ApiProperty({
    description: 'Transaction type',
    enum: ['income', 'expense'],
    example: 'expense',
  })
  type: string;

  @ApiProperty({
    description: 'Transaction amount',
    example: 49.99,
  })
  amount: number;

  @ApiProperty({
    description: 'Transaction label',
    example: 'Courses Lidl',
  })
  label: string;

  @ApiProperty({
    description: 'Transaction date in ISO 8601 format',
    example: '2026-06-01T10:00:00.000Z',
  })
  date: string;

  @ApiPropertyOptional({
    description: 'Optional note for the transaction',
    example: 'Achats de la semaine',
  })
  note?: string;

  @ApiPropertyOptional({
    description: 'Category identifier',
    example: '68b4d59919d9b7a94b4fde22',
  })
  categoryId?: string;
}

export class PeriodDto {
  @ApiProperty({
    description: 'Start of the period in ISO 8601 format',
    example: '2026-06-01T00:00:00.000Z',
  })
  start: string;

  @ApiProperty({
    description: 'End of the period in ISO 8601 format',
    example: '2026-06-30T23:59:59.999Z',
  })
  end: string;
}

export class DashboardSummaryResponseDto {
  @ApiProperty({
    description: 'Current balance (all-time income minus all-time expenses)',
    example: 1250.5,
  })
  balance: number;

  @ApiProperty({
    description: 'Total income for the period',
    example: 2500.0,
  })
  income: number;

  @ApiProperty({
    description: 'Total expenses for the period',
    example: 1249.5,
  })
  expenses: number;

  @ApiProperty({
    description: 'Period start and end dates',
    type: PeriodDto,
  })
  period: PeriodDto;

  @ApiProperty({
    description: 'Most recent transactions',
    type: [TransactionDto],
  })
  recentTransactions: TransactionDto[];
}
