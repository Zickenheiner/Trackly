import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from '@features/transactions/domains/dtos/transaction.dto';
import { TransactionEntity } from '@features/transactions/domains/entities/transaction.entity';

export interface ITransactionRepository {
  create(dto: CreateTransactionDto, userId: string): Promise<TransactionEntity>;
  findOwnerId(id: string): Promise<string | null>;
  update(
    id: string,
    dto: UpdateTransactionDto,
  ): Promise<TransactionEntity | null>;
  delete(id: string): Promise<boolean>;
}
