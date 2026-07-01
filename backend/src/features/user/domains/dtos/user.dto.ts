import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class UpdatePreferencesDto {
  @ApiProperty({
    description: 'Preferred theme',
    example: 'dark',
    enum: ['light', 'dark'],
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['light', 'dark'])
  theme: 'light' | 'dark';
}

export class UserPreferencesDto {
  @ApiProperty({ example: 'dark', enum: ['light', 'dark'] })
  theme: string;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'Title of the user (e.g. Mr, Mrs)',
    example: 'Mr',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Age of the user',
    example: 25,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  age?: number;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password (minimum 8 characters)',
    example: 'P@ssw0rd!',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'Preferred currency code',
    example: 'EUR',
    required: false,
  })
  @IsString()
  @IsOptional()
  currency?: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'Title of the user',
    example: 'Mr',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description: 'Age of the user',
    example: 25,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  age?: number;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Preferred currency code',
    example: 'EUR',
    required: false,
  })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'eyJhbGciOiJSUzI1NiJ9...',
    required: false,
  })
  @IsString()
  @IsOptional()
  refreshToken?: string | null;
}

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Title of the user',
    example: 'Mr.',
    required: false,
    enum: ['Mr.', 'Mrs.'],
  })
  @IsString()
  @IsIn(['Mr.', 'Mrs.'])
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description: 'Age of the user',
    example: 25,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  age?: number;

  @ApiProperty({
    description: 'Preferred currency ISO 4217 code',
    example: 'EUR',
    required: false,
  })
  @IsString()
  @IsOptional()
  currency?: string;
}

export class UserProfileDto {
  @ApiProperty({ example: '68b4d59919d9b7a94b4fde21' })
  id: string;

  @ApiProperty({ example: 'Mr.', enum: ['Mr.', 'Mrs.'] })
  title: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 25 })
  age: number;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'EUR' })
  currency: string;

  @ApiProperty({ example: '2026-06-02T08:00:00.000Z' })
  createdAt: string;
}
