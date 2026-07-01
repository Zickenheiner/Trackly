import type {
  TransactionEntity,
  TransactionFilters,
  TransactionListResult,
} from '../entities/transaction.entity';
import type {
  CreateTransactionRequestDto,
  UpdateTransactionRequestDto,
} from '../../data/dtos/transaction.dto';

export interface TransactionRepository {
  getAll(filters?: TransactionFilters): Promise<TransactionListResult>;
  create(data: CreateTransactionRequestDto): Promise<TransactionEntity>;
  update(
    id: string,
    data: UpdateTransactionRequestDto,
  ): Promise<TransactionEntity>;
  delete(id: string): Promise<void>;
}
