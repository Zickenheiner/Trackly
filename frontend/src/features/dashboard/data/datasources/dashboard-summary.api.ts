import endpoints from '@/core/constants/endpoints';
import request from '@/core/config/api';
import methods from '@/core/constants/methods';
import type { DashboardSummaryQueryDto, DashboardSummaryResponseDto } from '../dtos/dashboard-summary.dto';

class DashboardSummaryApi {
  constructor(private readonly baseUrl: string = endpoints.dashboard.summary) {}

  async getSummary(query?: DashboardSummaryQueryDto): Promise<DashboardSummaryResponseDto> {
    return request<DashboardSummaryResponseDto>({
      url: this.baseUrl,
      method: methods.GET,
      query: query as Record<string, string | number | boolean>,
    });
  }
}

export default DashboardSummaryApi;
