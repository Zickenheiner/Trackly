export interface RegisterRequestDto {
  title: 'Mr.' | 'Mrs.';
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  currency?: string;
}

export interface AuthUserDto {
  id: string;
  title: 'Mr.' | 'Mrs.';
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  currency: string;
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: AuthUserDto;
}
