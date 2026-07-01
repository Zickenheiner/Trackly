import { DashboardSummaryQueryDto, DashboardSummaryResponseDto } from '@features/dashboard/domains/dtos/dashboard.dto';

export interface IDashboardService {
  getSummary(userId: string, query: DashboardSummaryQueryDto): Promise<DashboardSummaryResponseDto>;
}
