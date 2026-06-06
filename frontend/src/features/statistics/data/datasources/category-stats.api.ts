import endpoints from '@/core/constants/endpoints';
import request from '@/core/config/api';
import methods from '@/core/constants/methods';
import type { StatsByCategoryQueryDto, StatsByCategoryResponseDto } from '../dtos/category-stats.dto';

class CategoryStatsApi {
  constructor(private readonly baseUrl: string = endpoints.statistics.byCategory) {}

  async getByCategory(query?: StatsByCategoryQueryDto): Promise<StatsByCategoryResponseDto> {
    const params = new URLSearchParams();
    if (query?.period) params.set('period', query.period);
    if (query?.date) params.set('date', query.date);
    const queryString = params.toString();
    const url = queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;

    return request<StatsByCategoryResponseDto>({
      url,
      method: methods.GET,
    });
  }
}

export default CategoryStatsApi;
