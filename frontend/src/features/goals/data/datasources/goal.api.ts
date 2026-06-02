import endpoints from '@/core/constants/endpoints';
import request from '@/core/config/api';
import methods from '@/core/constants/methods';
import type { CreateGoalRequestDto, GoalResponseDto } from '../dtos/goal.dto';
import type { AddDepositRequestDto } from '../dtos/deposit.dto';

class GoalApi {
  constructor(private readonly baseUrl: string = endpoints.goals.base) {}

  async getAll(): Promise<GoalResponseDto[]> {
    return request<GoalResponseDto[]>({
      url: this.baseUrl,
      method: methods.GET,
    });
  }

  async getById(id: string): Promise<GoalResponseDto> {
    return request<GoalResponseDto>({
      url: endpoints.goals.byId(id),
      method: methods.GET,
    });
  }

  async create(data: CreateGoalRequestDto): Promise<GoalResponseDto> {
    return request<GoalResponseDto>({
      url: this.baseUrl,
      method: methods.POST,
      data,
    });
  }

  async addDeposit(goalId: string, data: AddDepositRequestDto): Promise<GoalResponseDto> {
    return request<GoalResponseDto>({
      url: endpoints.goals.deposits(goalId),
      method: methods.POST,
      data,
    });
  }
}

export default GoalApi;
