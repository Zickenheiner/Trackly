import { Inject, Injectable } from '@nestjs/common';
import { IGoalService } from '../../../interfaces/services/goal.iservice';
import { IGoalRepository } from '@features/goals/interfaces/repositories/goal.irepository';
import {
  AddDepositDto,
  CreateGoalDto,
  UpdateGoalDto,
} from '@features/goals/domains/dtos/goal.dto';
import { GoalEntity } from '@features/goals/domains/entities/goal.entity';

@Injectable()
export class GoalService implements IGoalService {
  constructor(
    @Inject('IGoalRepository')
    private readonly goalRepository: IGoalRepository,
  ) {}

  async findAll(userId: string): Promise<GoalEntity[] | null> {
    return this.goalRepository.findAll(userId);
  }

  async findById(id: string): Promise<GoalEntity | null> {
    return this.goalRepository.findById(id);
  }

  async create(dto: CreateGoalDto, userId: string): Promise<GoalEntity | null> {
    return this.goalRepository.create(dto, userId);
  }

  async update(id: string, dto: UpdateGoalDto): Promise<GoalEntity | null> {
    return this.goalRepository.update(id, dto);
  }

  async delete(id: string): Promise<boolean> {
    return this.goalRepository.delete(id);
  }

  async addDeposit(id: string, dto: AddDepositDto): Promise<GoalEntity | null> {
    return this.goalRepository.addDeposit(id, dto);
  }
}
