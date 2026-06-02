import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';

export class CreateGoalDto {
  @ApiProperty({
    description: 'Name of the savings goal',
    example: 'Vacation fund',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Target amount to save (must be > 0)',
    example: 1000,
  })
  @IsNumber()
  @Min(0.01)
  targetAmount: number;

  @ApiProperty({
    description: 'Deadline for the goal in ISO 8601 format (must be in the future)',
    example: '2027-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  deadline?: string;

  @ApiProperty({
    description: 'Initial saved amount (default 0)',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  initialAmount?: number;

  @ApiProperty({
    description: 'Optional description of the goal',
    example: 'Saving for a trip to Japan',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateGoalDto {
  @ApiProperty({
    description: 'Name of the savings goal',
    example: 'Vacation fund',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Target amount to save',
    example: 1000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  targetAmount?: number;

  @ApiProperty({
    description: 'Amount already saved',
    example: 200,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  savedAmount?: number;

  @ApiProperty({
    description: 'Deadline for the goal in ISO 8601 format',
    example: '2027-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  deadline?: string;

  @ApiProperty({
    description: 'Optional description of the goal',
    example: 'Saving for a trip to Japan',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class GoalResponseDto {
  @ApiProperty({ example: '68b4d59919d9b7a94b4fde21' })
  id: string;

  @ApiProperty({ example: 'Vacation fund' })
  name: string;

  @ApiProperty({ example: 1000 })
  targetAmount: number;

  @ApiProperty({ example: 0 })
  savedAmount: number;

  @ApiProperty({ example: 0, description: 'Progress percentage 0-100' })
  progress: number;

  @ApiProperty({ example: '2027-01-01T00:00:00.000Z', required: false })
  deadline?: string;

  @ApiProperty({ example: 'Saving for a trip to Japan', required: false })
  description?: string;

  @ApiProperty({ example: 'in_progress', enum: ['in_progress', 'completed'] })
  status: string;

  @ApiProperty({ example: '2026-06-01T00:00:00.000Z' })
  createdAt: string;
}
