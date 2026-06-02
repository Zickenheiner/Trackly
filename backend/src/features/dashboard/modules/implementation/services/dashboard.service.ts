import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDashboardService } from '@features/dashboard/interfaces/services/dashboard.iservice';
import { DashboardSummaryQueryDto, DashboardSummaryResponseDto, TransactionDto } from '@features/dashboard/domains/dtos/dashboard.dto';
import { Transaction, TransactionDocument } from '@features/dashboard/domains/schemas/transaction.schema';

@Injectable()
export class DashboardService implements IDashboardService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async getSummary(userId: string, query: DashboardSummaryQueryDto): Promise<DashboardSummaryResponseDto> {
    const period = query.period ?? 'month';
    const referenceDate = query.date ? new Date(query.date) : new Date();

    const { start, end } = this.computePeriodBounds(period, referenceDate);

    const allTransactions = await this.transactionModel
      .find({ userId })
      .sort({ date: -1 })
      .exec();

    let totalIncome = 0;
    let totalExpenses = 0;

    for (const tx of allTransactions) {
      if (tx.type === 'income') {
        totalIncome += tx.amount;
      } else if (tx.type === 'expense') {
        totalExpenses += tx.amount;
      }
    }

    const balance = totalIncome - totalExpenses;

    const periodTransactions = await this.transactionModel
      .find({
        userId,
        date: { $gte: start, $lte: end },
      })
      .sort({ date: -1 })
      .exec();

    let periodIncome = 0;
    let periodExpenses = 0;

    for (const tx of periodTransactions) {
      if (tx.type === 'income') {
        periodIncome += tx.amount;
      } else if (tx.type === 'expense') {
        periodExpenses += tx.amount;
      }
    }

    const recentTransactions = allTransactions.slice(0, 10).map(
      (tx): TransactionDto => ({
        id: tx._id.toString(),
        type: tx.type,
        amount: tx.amount,
        label: tx.label ?? '',
        date: tx.date instanceof Date ? tx.date.toISOString() : new Date(tx.date).toISOString(),
        note: tx.note,
        categoryId: tx.categoryId?.toString(),
      }),
    );

    return {
      balance,
      income: periodIncome,
      expenses: periodExpenses,
      period: {
        start: start.toISOString(),
        end: end.toISOString(),
      },
      recentTransactions,
    };
  }

  private computePeriodBounds(period: string, referenceDate: Date): { start: Date; end: Date } {
    const start = new Date(referenceDate);
    const end = new Date(referenceDate);

    if (period === 'week') {
      const day = start.getDay();
      const diffToMonday = (day === 0 ? -6 : 1 - day);
      start.setDate(start.getDate() + diffToMonday);
      start.setHours(0, 0, 0, 0);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
    } else if (period === 'month') {
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      end.setMonth(end.getMonth() + 1);
      end.setDate(0);
      end.setHours(23, 59, 59, 999);
    } else if (period === 'year') {
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      end.setMonth(11, 31);
      end.setHours(23, 59, 59, 999);
    }

    return { start, end };
  }
}
