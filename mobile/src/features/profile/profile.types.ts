import type { Civility } from '@/features/auth/auth.types';

export interface UserProfile {
  id: string;
  title: Civility;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  currency: string;
  createdAt: string;
}

export interface UpdateProfilePayload {
  title?: Civility;
  firstName?: string;
  lastName?: string;
  age?: number;
  currency?: string;
}
