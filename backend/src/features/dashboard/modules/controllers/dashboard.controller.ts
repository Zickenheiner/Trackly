import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IDashboardService } from '@features/dashboard/interfaces/services/dashboard.iservice';
import { DashboardSummaryQueryDto, DashboardSummaryResponseDto } from '@features/dashboard/domains/dtos/dashboard.dto';

@ApiTags('dashboard')
@ApiBearerAuth('AccessToken')
@Controller('dashboard')
export class DashboardController {
  constructor(
    @Inject('IDashboardService')
    private readonly dashboardService: IDashboardService,
  ) {}

  @ApiOperation({ summary: 'Get dashboard summary (balance, income, expenses, recent transactions)' })
  @ApiResponse({ status: 200, type: DashboardSummaryResponseDto, description: 'Dashboard summary' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('summary')
  async getSummary(
    @Query() query: DashboardSummaryQueryDto,
    @Req() req: { user: { sub: string } },
  ): Promise<DashboardSummaryResponseDto> {
    return this.dashboardService.getSummary(req.user.sub, query);
  }
}
