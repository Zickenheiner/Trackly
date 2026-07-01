import type {
  TransactionEntity,
  TransactionListResult,
} from '../../domain/entities/transaction.entity';
import type {
  GetTransactionsResponseDto,
  TransactionResponseDto,
} from '../dtos/transaction.dto';

class TransactionMapper {
  toEntity(dto: TransactionResponseDto): TransactionEntity {
    return {
      id: dto.id,
      type: dto.type,
      amount: dto.amount,
      label: dto.label,
      note: dto.note,
      category: {
        id: dto.category.id,
        name: dto.category.name,
        icon: dto.category.icon,
        color: dto.category.color,
      },
      date: new Date(dto.date),
      createdAt: new Date(dto.createdAt),
    };
  }

  toEntityList(dtos: TransactionResponseDto[]): TransactionEntity[] {
    return dtos.map((dto) => this.toEntity(dto));
  }

  toListResult(dto: GetTransactionsResponseDto): TransactionListResult {
    return {
      data: this.toEntityList(dto.data),
      total: dto.total,
      page: dto.page,
      limit: dto.limit,
    };
  }
}

export default TransactionMapper;
