import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './implementation/services/transaction.service';
import { TransactionRepository } from './implementation/repositories/transaction.repository';
import { TransactionMapper } from './implementation/mappers/transaction.mapper';
import {
  Transaction,
  TransactionSchema,
} from '@features/transactions/domains/schemas/transaction.schema';
import {
  Category,
  CategorySchema,
} from '@features/categories/domains/schemas/category.schema';
import { CategoryBaseModule } from '@features/categories/modules/category.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
    CategoryBaseModule,
  ],
  controllers: [TransactionController],
  providers: [
    TransactionMapper,
    {
      provide: 'ITransactionService',
      useClass: TransactionService,
    },
    {
      provide: 'ITransactionRepository',
      useClass: TransactionRepository,
    },
  ],
  exports: ['ITransactionService'],
})
export class TransactionBaseModule {}
