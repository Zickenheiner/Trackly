import { ApiProperty } from '@nestjs/swagger';
import { Goal } from '../schemas/goal.schema';
import mongoose from 'mongoose';

export class GoalEntity {
  @ApiProperty({
    example: '68b4d59919d9b7a94b4fde21',
    description: 'The unique identifier of the goal',
  })
  private readonly id: Goal;

  private userId: mongoose.Types.ObjectId;
  private name: string;
  private targetAmount: number;
  private savedAmount: number;
  private deadline: Date;
  private description: string;
  private status: string;
  private createdAt: Date;

  constructor(_id: Goal) {
    this.id = _id;
  }

  // ———————GETTER———————

  getId(): string {
    return this.id.toString();
  }

  getObjectId(): Goal {
    return this.id;
  }

  getUserId(): mongoose.Types.ObjectId {
    return this.userId;
  }

  getName(): string {
    return this.name;
  }

  getTargetAmount(): number {
    return this.targetAmount;
  }

  getSavedAmount(): number {
    return this.savedAmount;
  }

  getProgress(): number {
    if (!this.targetAmount || this.targetAmount === 0) return 0;
    return Math.min(100, Math.round((this.savedAmount / this.targetAmount) * 100));
  }

  getDeadline(): Date {
    return this.deadline;
  }

  getDescription(): string {
    return this.description;
  }

  getStatus(): string {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  // ———————SETTER———————

  setUserId(value: mongoose.Types.ObjectId): void {
    this.userId = value;
  }

  setName(value: string): void {
    this.name = value;
  }

  setTargetAmount(value: number): void {
    this.targetAmount = value;
  }

  setSavedAmount(value: number): void {
    this.savedAmount = value;
  }

  setDeadline(value: Date): void {
    this.deadline = value;
  }

  setDescription(value: string): void {
    this.description = value;
  }

  setStatus(value: string): void {
    this.status = value;
  }

  setCreatedAt(value: Date): void {
    this.createdAt = value;
  }
}
