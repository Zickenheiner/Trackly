import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IStatisticsService } from '@features/statistics/interfaces/services/statistics.iservice';
import { StatsByCategoryQueryDto, CategoryStatDto } from '@features/statistics/domains/dtos/statistics.dto';

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
}
