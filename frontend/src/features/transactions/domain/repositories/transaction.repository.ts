import type { TransactionEntity } from '../entities/transaction.entity';
import type {
  CreateTransactionRequestDto,
  UpdateTransactionRequestDto,
} from '../../data/dtos/transaction.dto';

export interface TransactionRepository {
  create(data: CreateTransactionRequestDto): Promise<TransactionEntity>;
  update(
    id: string,
    data: UpdateTransactionRequestDto,
  ): Promise<TransactionEntity>;
}
