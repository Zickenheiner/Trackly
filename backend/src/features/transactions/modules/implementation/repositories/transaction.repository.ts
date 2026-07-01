import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../../../interfaces/repositories/transaction.irepository';
import { TransactionMapper } from '../mappers/transaction.mapper';
import {
  Transaction,
  TransactionDocument,
} from '@features/transactions/domains/schemas/transaction.schema';
import { Model } from 'mongoose';
import {
  CreateTransactionDto,
  GetTransactionsQueryDto,
  UpdateTransactionDto,
} from '@features/transactions/domains/dtos/transaction.dto';
import { TransactionEntity } from '@features/transactions/domains/entities/transaction.entity';
import {
  Category,
  CategoryDocument,
} from '@features/categories/domains/schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    private readonly transactionMapper: TransactionMapper,
  ) {}

  async create(
    dto: CreateTransactionDto,
    userId: string,
  ): Promise<TransactionEntity> {
    const document = new this.transactionModel({
      type: dto.type,
      amount: dto.amount,
      label: dto.label,
      note: dto.note ?? null,
      categoryId: dto.categoryId,
      date: new Date(dto.date),
      userId,
    });
    const created = await document.save();
    const category = await this.categoryModel
      .findById(created.categoryId)
      .exec();
    return this.transactionMapper.toEntity(
      created,
      category as CategoryDocument,
    );
  }

  async findByFilters(
    userId: string,
    query: GetTransactionsQueryDto,
    page: number,
    limit: number,
  ): Promise<{ data: TransactionEntity[]; total: number }> {
    const filter: {
      userId: string;
      type?: string;
      categoryId?: string;
      date?: { $gte?: Date; $lte?: Date };
    } = { userId };
    if (query.type !== undefined) {
      filter.type = query.type;
    }
    if (query.categoryId !== undefined) {
      filter.categoryId = query.categoryId;
    }
    if (query.startDate !== undefined || query.endDate !== undefined) {
      filter.date = {};
      if (query.startDate !== undefined) {
        filter.date.$gte = new Date(query.startDate);
      }
      if (query.endDate !== undefined) {
        filter.date.$lte = new Date(query.endDate);
      }
    }

    const total = await this.transactionModel.countDocuments(filter).exec();
    const transactions = await this.transactionModel
      .find(filter)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const categoryIds = transactions.map(
      (transaction) => transaction.categoryId,
    );
    const categories = await this.categoryModel
      .find({ _id: { $in: categoryIds } })
      .exec();
    const categoryMap = new Map(
      categories.map((category) => [category._id.toString(), category]),
    );

    const data = transactions.map((transaction) =>
      this.transactionMapper.toEntity(
        transaction,
        categoryMap.get(transaction.categoryId.toString()) as CategoryDocument,
      ),
    );

    return { data, total };
  }

  async findOwnerId(id: string): Promise<string | null> {
    const transaction = await this.transactionModel.findById(id).exec();
    return transaction ? transaction.userId.toString() : null;
  }

  async update(
    id: string,
    dto: UpdateTransactionDto,
  ): Promise<TransactionEntity | null> {
    const updateData: {
      amount?: number;
      label?: string;
      categoryId?: string;
      date?: Date;
      note?: string | null;
    } = {};
    if (dto.amount !== undefined) {
      updateData.amount = dto.amount;
    }
    if (dto.label !== undefined) {
      updateData.label = dto.label;
    }
    if (dto.categoryId !== undefined) {
      updateData.categoryId = dto.categoryId;
    }
    if (dto.date !== undefined) {
      updateData.date = new Date(dto.date);
    }
    if (dto.note !== undefined) {
      updateData.note = dto.note;
    }
    const updated = await this.transactionModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updated) {
      return null;
    }
    const category = await this.categoryModel
      .findById(updated.categoryId)
      .exec();
    return this.transactionMapper.toEntity(
      updated,
      category as CategoryDocument,
    );
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.transactionModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
