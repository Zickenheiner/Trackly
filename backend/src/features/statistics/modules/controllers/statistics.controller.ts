import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IStatisticsService } from '@features/statistics/interfaces/services/statistics.iservice';
import {
  StatsByCategoryQueryDto,
  CategoryStatDto,
  MonthlyStatsQueryDto,
  MonthlyStatDto,
} from '@features/statistics/domains/dtos/statistics.dto';

@ApiTags('statistics')
@ApiBearerAuth('AccessToken')
@Controller('statistics')
export class StatisticsController {
  constructor(
    @Inject('IStatisticsService')
    private readonly statisticsService: IStatisticsService,
  ) {}

  @ApiOperation({ summary: 'Get expense breakdown by category for a given period' })
  @ApiResponse({ status: 200, type: [CategoryStatDto], description: 'Category statistics' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('by-category')
  async getStatsByCategory(
    @Query() query: StatsByCategoryQueryDto,
    @Req() req: { user: { sub: string } },
  ): Promise<CategoryStatDto[]> {
    return this.statisticsService.getStatsByCategory(req.user.sub, query);
  }

  @ApiOperation({ summary: 'Get monthly income and expense evolution' })
  @ApiResponse({ status: 200, type: [MonthlyStatDto], description: 'Monthly statistics' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('monthly')
  async getMonthlyStats(
    @Query() query: MonthlyStatsQueryDto,
    @Req() req: { user: { sub: string } },
  ): Promise<MonthlyStatDto[]> {
    return this.statisticsService.getMonthlyStats(req.user.sub, query);
  }
}
