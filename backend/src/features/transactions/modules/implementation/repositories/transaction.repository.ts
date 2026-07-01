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
}
