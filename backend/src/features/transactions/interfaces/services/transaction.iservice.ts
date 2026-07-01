import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from '@features/transactions/domains/dtos/transaction.dto';
import { TransactionEntity } from '@features/transactions/domains/entities/transaction.entity';

export interface ITransactionService {
  create(dto: CreateTransactionDto, userId: string): Promise<TransactionEntity>;
  update(
    id: string,
    dto: UpdateTransactionDto,
    userId: string,
  ): Promise<TransactionEntity>;
  delete(id: string, userId: string): Promise<void>;
}
