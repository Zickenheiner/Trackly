import { CreateGoalDto, GoalResponseDto, UpdateGoalDto } from '@features/goals/domains/dtos/goal.dto';
import { GoalEntity } from '@features/goals/domains/entities/goal.entity';
import { IGoalService } from '@features/goals/interfaces/services/goal.iservice';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('goals')
@ApiBearerAuth('AccessToken')
@Controller('goals')
export class GoalController {
  constructor(
    @Inject('IGoalService')
    private readonly goalService: IGoalService,
  ) {}

  @ApiOperation({ summary: 'Create a savings goal' })
  @ApiBody({ type: CreateGoalDto })
  @ApiResponse({ status: 201, type: GoalResponseDto, description: 'Goal created' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() dto: CreateGoalDto,
    @Req() req: { user: { sub: string } },
  ): Promise<GoalResponseDto> {
    const entity = await this.goalService.create(dto, req.user.sub);
    if (!entity) {
      throw new NotFoundException('Failed to create goal');
    }
    return this.toResponseDto(entity);
  }

  @ApiOperation({ summary: 'Get all goals' })
  @ApiResponse({ status: 200, type: [GoalResponseDto] })
  @Get()
  async findAll(): Promise<GoalResponseDto[]> {
    const entities = await this.goalService.findAll();
    return (entities ?? []).map((e) => this.toResponseDto(e));
  }

  @ApiOperation({ summary: 'Get goal by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: GoalResponseDto })
  @ApiResponse({ status: 404, description: 'Goal not found' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<GoalResponseDto> {
    const entity = await this.goalService.findById(id);
    if (!entity) {
      throw new NotFoundException('Goal not found');
    }
    return this.toResponseDto(entity);
  }

  @ApiOperation({ summary: 'Update a goal' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateGoalDto })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 404, description: 'Goal not found' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateGoalDto): Promise<boolean> {
    return this.goalService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete a goal' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 404, description: 'Goal not found' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.goalService.delete(id);
  }

  private toResponseDto(entity: GoalEntity): GoalResponseDto {
    return {
      id: entity.getId(),
      name: entity.getName(),
      targetAmount: entity.getTargetAmount(),
      savedAmount: entity.getSavedAmount(),
      progress: entity.getProgress(),
      deadline: entity.getDeadline()?.toISOString(),
      description: entity.getDescription(),
      status: entity.getStatus(),
      createdAt: entity.getCreatedAt()?.toISOString(),
    };
  }
}
