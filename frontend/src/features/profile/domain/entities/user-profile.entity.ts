export interface UserProfileEntity {
  id: string;
  title: 'Mr.' | 'Mrs.';
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  currency: string;
  createdAt: Date;
}
