import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../../../interfaces/repositories/transaction.irepository';
import { TransactionMapper } from '../mappers/transaction.mapper';
import {
  Transaction,
  TransactionDocument,
} from '@features/transactions/domains/schemas/transaction.schema';
import { Model } from 'mongoose';
import { CreateTransactionDto } from '@features/transactions/domains/dtos/transaction.dto';
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
}
