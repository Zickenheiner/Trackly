import { AddDepositDto, CreateGoalDto, UpdateGoalDto } from '@features/goals/domains/dtos/goal.dto';
import { GoalEntity } from '@features/goals/domains/entities/goal.entity';

export interface IGoalService {
  findAll(userId: string): Promise<GoalEntity[] | null>;
  findById(id: string): Promise<GoalEntity | null>;
  create(dto: CreateGoalDto, userId: string): Promise<GoalEntity | null>;
  update(id: string, dto: UpdateGoalDto): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  addDeposit(id: string, dto: AddDepositDto): Promise<GoalEntity | null>;
}
