export interface AuthUserEntity {
  id: string;
  title: 'Mr.' | 'Mrs.';
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  currency: string;
}

export interface AuthEntity {
  accessToken: string;
  refreshToken: string;
  user: AuthUserEntity;
}
