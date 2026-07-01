import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Title of the user (e.g. Mr, Mrs)',
    example: 'Mr',
    required: false,
  })
  @IsString()
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
    description: 'Email address',
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
  currency?: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'Email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'P@ssw0rd!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class TokensDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiJ9...',
  })
  refreshToken: string;
}

export class AuthUserDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: '68b4d59919d9b7a94b4fde21',
  })
  id: string;

  @ApiProperty({
    description: 'Title of the user',
    example: 'Mr.',
    enum: ['Mr.', 'Mrs.'],
  })
  title: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'Age of the user',
    example: 30,
  })
  age: number;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Preferred currency code',
    example: 'EUR',
  })
  currency: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiJ9...',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Authenticated user data',
    type: AuthUserDto,
  })
  user: AuthUserDto;
}
