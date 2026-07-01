import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../schemas/category.schema';

export class CategoryEntity {
  @ApiProperty({
    example: '68b4d59919d9b7a94b4fde21',
    description: 'The unique identifier of the category',
  })
  private readonly id: Category;

  @ApiProperty({
    example: 'Alimentation',
    description: 'The name of the category',
  })
  private name: string;

  @ApiProperty({
    example: '🍔',
    description: 'The emoji icon of the category',
  })
  private icon: string;

  @ApiProperty({
    example: '#FF5733',
    description: 'The hex color of the category',
  })
  private color: string;

  @ApiProperty({
    example: true,
    description: 'Whether the category is a default category',
  })
  private isDefault: boolean;

  @ApiProperty({
    example: '68b4d59919d9b7a94b4fde21',
    description:
      'The identifier of the user owning the category, null if default',
    nullable: true,
  })
  private userId: string | null;

  constructor(_id: Category) {
    this.id = _id;
  }

  // ———————GETTER———————

  getId(): string {
    return this.id.toString();
  }

  getObjectId(): Category {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getIcon(): string {
    return this.icon;
  }

  getColor(): string {
    return this.color;
  }

  getIsDefault(): boolean {
    return this.isDefault;
  }

  getUserId(): string | null {
    return this.userId;
  }

  //———————SETTER———————

  setName(value: string): void {
    this.name = value;
  }

  setIcon(value: string): void {
    this.icon = value;
  }

  setColor(value: string): void {
    this.color = value;
  }

  setIsDefault(value: boolean): void {
    this.isDefault = value;
  }

  setUserId(value: string | null): void {
    this.userId = value;
  }
}
