import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStatisticsService } from '@features/statistics/interfaces/services/statistics.iservice';
import { StatsByCategoryQueryDto, CategoryStatDto } from '@features/statistics/domains/dtos/statistics.dto';
import { Transaction, TransactionDocument } from '@features/dashboard/domains/schemas/transaction.schema';
import { Category, CategoryDocument } from '@features/categories/domains/schemas/category.schema';

@Injectable()
export class StatisticsService implements IStatisticsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async getStatsByCategory(userId: string, query: StatsByCategoryQueryDto): Promise<CategoryStatDto[]> {
    const period = query.period ?? 'month';
    const referenceDate = query.date ? new Date(query.date) : new Date();

    const { start, end } = this.computePeriodBounds(period, referenceDate);

    const transactions = await this.transactionModel
      .find({
        userId,
        type: 'expense',
        date: { $gte: start, $lte: end },
      })
      .exec();

    const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);

    if (totalExpenses === 0) {
      return [];
    }

    const categoryTotals = new Map<string, number>();

    for (const tx of transactions) {
      const catId = tx.categoryId ? tx.categoryId.toString() : 'uncategorized';
      const current = categoryTotals.get(catId) ?? 0;
      categoryTotals.set(catId, current + tx.amount);
    }

    const categoryIds = [...categoryTotals.keys()].filter((id) => id !== 'uncategorized');

    const categories = await this.categoryModel
      .find({ _id: { $in: categoryIds } })
      .exec();

    const categoryMap = new Map(
      categories.map((cat) => [cat._id.toString(), cat]),
    );

    const result: CategoryStatDto[] = [];

    for (const [catId, total] of categoryTotals.entries()) {
      const cat = categoryMap.get(catId);

      if (!cat) {
        continue;
      }

      result.push({
        category: {
          id: cat._id.toString(),
          name: cat.name,
          icon: cat.icon,
          color: cat.color,
        },
        total,
        percentage: Math.round((total / totalExpenses) * 10000) / 100,
      });
    }

    return result.sort((a, b) => b.total - a.total);
  }

  private computePeriodBounds(period: string, referenceDate: Date): { start: Date; end: Date } {
    const start = new Date(referenceDate);
    const end = new Date(referenceDate);

    if (period === 'week') {
      const day = start.getDay();
      const diffToMonday = day === 0 ? -6 : 1 - day;
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
