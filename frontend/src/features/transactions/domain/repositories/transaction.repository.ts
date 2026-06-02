import type { TransactionEntity } from '../entities/transaction.entity';
import type { CreateTransactionRequestDto } from '../../data/dtos/transaction.dto';

export interface TransactionRepository {
  create(data: CreateTransactionRequestDto): Promise<TransactionEntity>;
}
