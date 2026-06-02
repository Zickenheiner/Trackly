import type { DashboardSummaryEntity } from '../entities/dashboard-summary.entity';
import type { DashboardSummaryQueryDto } from '../../data/dtos/dashboard-summary.dto';

export interface DashboardSummaryRepository {
  getSummary(query?: DashboardSummaryQueryDto): Promise<DashboardSummaryEntity>;
}
