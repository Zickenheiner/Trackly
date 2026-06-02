import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from '@features/dashboard/domains/schemas/transaction.schema';
import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './implementation/services/dashboard.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
  ],
  controllers: [DashboardController],
  providers: [
    {
      provide: 'IDashboardService',
      useClass: DashboardService,
    },
  ],
  exports: ['IDashboardService'],
})
export class DashboardBaseModule {}
