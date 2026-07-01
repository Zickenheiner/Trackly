import {
  CreateTransactionDto,
  GetTransactionsQueryDto,
  UpdateTransactionDto,
} from '@features/transactions/domains/dtos/transaction.dto';
import { TransactionEntity } from '@features/transactions/domains/entities/transaction.entity';

export interface ITransactionRepository {
  create(dto: CreateTransactionDto, userId: string): Promise<TransactionEntity>;
  findByFilters(
    userId: string,
    query: GetTransactionsQueryDto,
    page: number,
    limit: number,
  ): Promise<{ data: TransactionEntity[]; total: number }>;
  findOwnerId(id: string): Promise<string | null>;
  update(
    id: string,
    dto: UpdateTransactionDto,
  ): Promise<TransactionEntity | null>;
  delete(id: string): Promise<boolean>;
}
