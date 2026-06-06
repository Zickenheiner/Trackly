import type { DashboardSummaryEntity, TransactionEntity } from '../../domain/entities/dashboard-summary.entity';
import type { DashboardSummaryResponseDto, TransactionDto } from '../dtos/dashboard-summary.dto';

class DashboardSummaryMapper {
  private toTransactionEntity(dto: TransactionDto): TransactionEntity {
    return {
      id: dto.id,
      amount: dto.amount,
      label: dto.label,
      type: dto.type,
      categoryId: dto.categoryId,
      categoryName: dto.categoryName,
      date: new Date(dto.date),
      createdAt: new Date(dto.createdAt),
    };
  }

  toEntity(dto: DashboardSummaryResponseDto): DashboardSummaryEntity {
    return {
      balance: dto.balance,
      income: dto.income,
      expenses: dto.expenses,
      period: {
        start: new Date(dto.period.start),
        end: new Date(dto.period.end),
      },
      recentTransactions: dto.recentTransactions.map((t) => this.toTransactionEntity(t)),
    };
  }
}

export default DashboardSummaryMapper;
