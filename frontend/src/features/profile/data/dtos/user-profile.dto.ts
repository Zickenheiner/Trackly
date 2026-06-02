export interface UserProfileResponseDto {
  id: string;
  title: 'Mr.' | 'Mrs.';
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  currency: string;
  createdAt: string;
}

export interface UpdateProfileRequestDto {
  title?: 'Mr.' | 'Mrs.';
  firstName?: string;
  lastName?: string;
  age?: number;
  currency?: string;
}
