export type Civility = 'Mr.' | 'Mrs.';

export interface User {
  id: string;
  title: Civility;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  currency: string;
}

export interface RegisterPayload {
  title: Civility;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  currency?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
