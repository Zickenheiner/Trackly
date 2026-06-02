import { CreateTransactionDto } from '@features/transactions/domains/dtos/transaction.dto';
import { TransactionEntity } from '@features/transactions/domains/entities/transaction.entity';

export interface ITransactionRepository {
  create(dto: CreateTransactionDto, userId: string): Promise<TransactionEntity>;
}
