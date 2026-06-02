import type { DashboardSummaryRepository } from '../../domain/repositories/dashboard-summary.repository';
import type { DashboardSummaryEntity } from '../../domain/entities/dashboard-summary.entity';
import type { DashboardSummaryQueryDto } from '../dtos/dashboard-summary.dto';
import DashboardSummaryApi from '../datasources/dashboard-summary.api';
import DashboardSummaryMapper from '../mappers/dashboard-summary.mapper';

class DashboardSummaryRepositoryImpl implements DashboardSummaryRepository {
  constructor(
    private readonly api: DashboardSummaryApi = new DashboardSummaryApi(),
    private readonly mapper: DashboardSummaryMapper = new DashboardSummaryMapper(),
  ) {}

  async getSummary(query?: DashboardSummaryQueryDto): Promise<DashboardSummaryEntity> {
    const dto = await this.api.getSummary(query);
    return this.mapper.toEntity(dto);
  }
}

export default DashboardSummaryRepositoryImpl;
