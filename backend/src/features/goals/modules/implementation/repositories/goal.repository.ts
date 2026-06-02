import { Injectable } from '@nestjs/common';
import { IGoalRepository } from '../../../interfaces/repositories/goal.irepository';
import { GoalMapper } from '../mappers/goal.mapper';
import { Goal, GoalDocument } from '@features/goals/domains/schemas/goal.schema';
import { Model } from 'mongoose';
import { AddDepositDto, CreateGoalDto, UpdateGoalDto } from '@features/goals/domains/dtos/goal.dto';
import { GoalEntity } from '@features/goals/domains/entities/goal.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class GoalRepository implements IGoalRepository {
  constructor(
    @InjectModel(Goal.name)
    private readonly goalModel: Model<GoalDocument>,
    private readonly goalMapper: GoalMapper,
  ) {}

  async findAll(userId: string): Promise<GoalEntity[] | null> {
    const goals = await this.goalModel.find({ userId: new mongoose.Types.ObjectId(userId) }).exec();
    return goals ? goals.map((doc) => this.goalMapper.toEntity(doc)) : null;
  }

  async findById(id: string): Promise<GoalEntity | null> {
    const goal = await this.goalModel.findById(id).exec();
    return goal ? this.goalMapper.toEntity(goal) : null;
  }

  async create(dto: CreateGoalDto, userId: string): Promise<GoalEntity | null> {
    const document = new this.goalModel({
      userId: new mongoose.Types.ObjectId(userId),
      name: dto.name,
      targetAmount: dto.targetAmount,
      savedAmount: dto.initialAmount ?? 0,
      deadline: dto.deadline ? new Date(dto.deadline) : undefined,
      description: dto.description,
      status: 'in_progress',
    });
    const created = await document.save();
    return created ? this.goalMapper.toEntity(created) : null;
  }

  async update(id: string, dto: UpdateGoalDto): Promise<GoalEntity | null> {
    const updatePayload: Partial<UpdateGoalDto> & { status?: string } = {};
    if (dto.name !== undefined) updatePayload.name = dto.name;
    if (dto.targetAmount !== undefined) updatePayload.targetAmount = dto.targetAmount;
    if (dto.deadline !== undefined) updatePayload.deadline = dto.deadline;
    if (dto.description !== undefined) updatePayload.description = dto.description;

    const updatedGoal = await this.goalModel
      .findByIdAndUpdate(id, { $set: updatePayload }, { new: true })
      .exec();
    return updatedGoal ? this.goalMapper.toEntity(updatedGoal) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.goalModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async addDeposit(id: string, dto: AddDepositDto): Promise<GoalEntity | null> {
    const goal = await this.goalModel.findById(id).exec();
    if (!goal) return null;

    const newSavedAmount = (goal.savedAmount ?? 0) + dto.amount;
    const newStatus = newSavedAmount >= goal.targetAmount ? 'completed' : goal.status;

    const updated = await this.goalModel
      .findByIdAndUpdate(
        id,
        { savedAmount: newSavedAmount, status: newStatus },
        { new: true },
      )
      .exec();
    return updated ? this.goalMapper.toEntity(updated) : null;
  }
}
