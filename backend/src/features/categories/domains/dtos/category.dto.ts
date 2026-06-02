import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category, unique per user, max 30 characters',
    example: 'Loisirs',
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @ApiProperty({
    description: 'The emoji icon of the category',
    example: '🎮',
  })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({
    description: 'The hex color of the category',
    example: '#FF5733',
  })
  @IsString()
  @IsNotEmpty()
  color: string;
}

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'The name of the category, unique per user, max 30 characters',
    example: 'Loisirs',
    maxLength: 30,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The emoji icon of the category',
    example: '🎮',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  icon?: string;

  @ApiProperty({
    description: 'The hex color of the category',
    example: '#FF5733',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  color?: string;
}
