import type { TransactionRepository } from '../../domain/repositories/transaction.repository';
import type { TransactionEntity } from '../../domain/entities/transaction.entity';
import type {
  CreateTransactionRequestDto,
  UpdateTransactionRequestDto,
} from '../dtos/transaction.dto';
import TransactionApi from '../datasources/transaction.api';
import TransactionMapper from '../mappers/transaction.mapper';

class TransactionRepositoryImpl implements TransactionRepository {
  constructor(
    private readonly transactionApi: TransactionApi = new TransactionApi(),
    private readonly transactionMapper: TransactionMapper = new TransactionMapper(),
  ) {}

  async create(data: CreateTransactionRequestDto): Promise<TransactionEntity> {
    const dto = await this.transactionApi.create(data);
    return this.transactionMapper.toEntity(dto);
  }

  async update(
    id: string,
    data: UpdateTransactionRequestDto,
  ): Promise<TransactionEntity> {
    const dto = await this.transactionApi.update(id, data);
    return this.transactionMapper.toEntity(dto);
  }

  async delete(id: string): Promise<void> {
    await this.transactionApi.delete(id);
  }
}

export default TransactionRepositoryImpl;
