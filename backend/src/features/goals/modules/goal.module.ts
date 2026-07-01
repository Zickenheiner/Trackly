import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Goal, GoalSchema } from '@features/goals/domains/schemas/goal.schema';
import { GoalController } from './controllers/goal.controller';
import { GoalService } from './implementation/services/goal.service';
import { GoalRepository } from './implementation/repositories/goal.repository';
import { GoalMapper } from './implementation/mappers/goal.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Goal.name, schema: GoalSchema }]),
  ],
  controllers: [GoalController],
  providers: [
    GoalMapper,
    {
      provide: 'IGoalService',
      useClass: GoalService,
    },
    {
      provide: 'IGoalRepository',
      useClass: GoalRepository,
    },
  ],
  exports: ['IGoalService'],
})
export class GoalBaseModule {}
