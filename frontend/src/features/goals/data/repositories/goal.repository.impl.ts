import type { GoalRepository } from '../../domain/repositories/goal.repository';
import type { GoalEntity } from '../../domain/entities/goal.entity';
import type {
  CreateGoalRequestDto,
  UpdateGoalRequestDto,
} from '../dtos/goal.dto';
import type { AddDepositRequestDto } from '../dtos/deposit.dto';
import GoalApi from '../datasources/goal.api';
import GoalMapper from '../mappers/goal.mapper';

class GoalRepositoryImpl implements GoalRepository {
  constructor(
    private readonly api: GoalApi = new GoalApi(),
    private readonly mapper: GoalMapper = new GoalMapper(),
  ) {}

  async getAll(): Promise<GoalEntity[]> {
    const dtos = await this.api.getAll();
    return this.mapper.toEntityList(dtos);
  }

  async getById(id: string): Promise<GoalEntity> {
    const dto = await this.api.getById(id);
    return this.mapper.toEntity(dto);
  }

  async create(data: CreateGoalRequestDto): Promise<GoalEntity> {
    const dto = await this.api.create(data);
    return this.mapper.toEntity(dto);
  }

  async addDeposit(
    goalId: string,
    data: AddDepositRequestDto,
  ): Promise<GoalEntity> {
    const dto = await this.api.addDeposit(goalId, data);
    return this.mapper.toEntity(dto);
  }

  async update(id: string, data: UpdateGoalRequestDto): Promise<GoalEntity> {
    const dto = await this.api.update(id, data);
    return this.mapper.toEntity(dto);
  }

  async delete(id: string): Promise<void> {
    await this.api.delete(id);
  }
}

export default GoalRepositoryImpl;
