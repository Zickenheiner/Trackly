import { ApiProperty } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

export class UserEntity {
  @ApiProperty({
    example: '68b4d59919d9b7a94b4fde21',
    description: 'The unique identifier of the user',
  })
  private readonly id: User;

  private title: string;
  private firstName: string;
  private lastName: string;
  private age: number;
  private email: string;
  private password: string;
  private currency: string;
  private refreshToken: string;
  private theme: string;
  private createdAt: Date;

  constructor(_id: User) {
    this.id = _id;
  }

  getId(): string {
    return this.id.toString();
  }

  getObjectId(): User {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getAge(): number {
    return this.age;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getCurrency(): string {
    return this.currency;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  setTitle(value: string): void {
    this.title = value;
  }

  setFirstName(value: string): void {
    this.firstName = value;
  }

  setLastName(value: string): void {
    this.lastName = value;
  }

  setAge(value: number): void {
    this.age = value;
  }

  setEmail(value: string): void {
    this.email = value;
  }

  setPassword(value: string): void {
    this.password = value;
  }

  setCurrency(value: string): void {
    this.currency = value;
  }

  setRefreshToken(value: string): void {
    this.refreshToken = value;
  }

  getTheme(): string {
    return this.theme;
  }

  setTheme(value: string): void {
    this.theme = value;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setCreatedAt(value: Date): void {
    this.createdAt = value;
  }
}
