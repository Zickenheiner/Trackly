import endpoints from '@/core/constants/endpoints';
import request from '@/core/config/api';
import methods from '@/core/constants/methods';
import type {
  MonthlyStatsQueryDto,
  MonthlyStatsResponseDto,
} from '../dtos/monthly-stats.dto';

class MonthlyStatsApi {
  constructor(
    private readonly baseUrl: string = endpoints.statistics.monthly,
  ) {}

  async getMonthly(
    query?: MonthlyStatsQueryDto,
  ): Promise<MonthlyStatsResponseDto> {
    const params = new URLSearchParams();
    if (query?.months !== undefined) params.set('months', String(query.months));
    if (query?.type) params.set('type', query.type);
    const queryString = params.toString();
    const url = queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;

    return request<MonthlyStatsResponseDto>({
      url,
      method: methods.GET,
    });
  }
}

export default MonthlyStatsApi;
