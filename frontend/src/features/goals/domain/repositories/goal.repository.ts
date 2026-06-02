import type { GoalEntity } from '../entities/goal.entity';
import type { CreateGoalRequestDto, UpdateGoalRequestDto } from '../../data/dtos/goal.dto';
import type { AddDepositRequestDto } from '../../data/dtos/deposit.dto';

export interface GoalRepository {
  getAll(): Promise<GoalEntity[]>;
  getById(id: string): Promise<GoalEntity>;
  create(data: CreateGoalRequestDto): Promise<GoalEntity>;
  addDeposit(goalId: string, data: AddDepositRequestDto): Promise<GoalEntity>;
  update(id: string, data: UpdateGoalRequestDto): Promise<GoalEntity>;
  delete(id: string): Promise<void>;
}
