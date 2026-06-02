import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from '@features/dashboard/domains/schemas/transaction.schema';
import { Category, CategorySchema } from '@features/categories/domains/schemas/category.schema';
import { StatisticsController } from './controllers/statistics.controller';
import { StatisticsService } from './implementation/services/statistics.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [StatisticsController],
  providers: [
    {
      provide: 'IStatisticsService',
      useClass: StatisticsService,
    },
  ],
  exports: ['IStatisticsService'],
})
export class StatisticsBaseModule {}
