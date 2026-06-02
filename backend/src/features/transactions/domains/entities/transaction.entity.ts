import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from '../schemas/transaction.schema';

export class TransactionCategoryEntity {
  @ApiProperty({
    example: '68b4d59919d9b7a94b4fde21',
    description: 'The unique identifier of the category',
  })
  id: string;

  @ApiProperty({
    example: 'Alimentation',
    description: 'The name of the category',
  })
  name: string;

  @ApiProperty({
    example: '🍔',
    description: 'The emoji icon of the category',
  })
  icon: string;

  @ApiProperty({
    example: '#FF5733',
    description: 'The hex color of the category',
  })
  color: string;
}

export class TransactionEntity {
  @ApiProperty({
    example: '68b4d59919d9b7a94b4fde21',
    description: 'The unique identifier of the transaction',
  })
  private readonly id: Transaction;

  @ApiProperty({
    example: 'expense',
    description: 'The type of the transaction',
    enum: ['income', 'expense'],
  })
  private type: string;

  @ApiProperty({
    example: 42.5,
    description: 'The amount of the transaction',
  })
  private amount: number;

  @ApiProperty({
    example: 'Courses',
    description: 'The label of the transaction',
  })
  private label: string;

  @ApiProperty({
    example: 'Achat hebdomadaire',
    description: 'An optional note for the transaction',
    nullable: true,
  })
  private note: string | null;

  @ApiProperty({
    type: TransactionCategoryEntity,
    description: 'The category of the transaction',
  })
  private category: TransactionCategoryEntity;

  @ApiProperty({
    example: '2026-06-02T00:00:00.000Z',
    description: 'The date of the transaction in ISO 8601 format',
  })
  private date: Date;

  @ApiProperty({
    example: '2026-06-02T08:19:00.000Z',
    description: 'The creation date of the transaction in ISO 8601 format',
  })
  private createdAt: Date;

  constructor(_id: Transaction) {
    this.id = _id;
  }

  // ———————GETTER———————

  getId(): string {
    return this.id.toString();
  }

  getObjectId(): Transaction {
    return this.id;
  }

  getType(): string {
    return this.type;
  }

  getAmount(): number {
    return this.amount;
  }

  getLabel(): string {
    return this.label;
  }

  getNote(): string | null {
    return this.note;
  }

  getCategory(): TransactionCategoryEntity {
    return this.category;
  }

  getDate(): Date {
    return this.date;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  //———————SETTER———————

  setType(value: string): void {
    this.type = value;
  }

  setAmount(value: number): void {
    this.amount = value;
  }

  setLabel(value: string): void {
    this.label = value;
  }

  setNote(value: string | null): void {
    this.note = value;
  }

  setCategory(value: TransactionCategoryEntity): void {
    this.category = value;
  }

  setDate(value: Date): void {
    this.date = value;
  }

  setCreatedAt(value: Date): void {
    this.createdAt = value;
  }
}
