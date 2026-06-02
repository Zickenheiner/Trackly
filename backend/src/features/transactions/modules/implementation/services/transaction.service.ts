import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITransactionService } from '../../../interfaces/services/transaction.iservice';
import { ITransactionRepository } from '@features/transactions/interfaces/repositories/transaction.irepository';
import { ICategoryService } from '@features/categories/interfaces/services/category.iservice';
import { CreateTransactionDto } from '@features/transactions/domains/dtos/transaction.dto';
import { TransactionEntity } from '@features/transactions/domains/entities/transaction.entity';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService,
  ) {}

  async create(
    dto: CreateTransactionDto,
    userId: string,
  ): Promise<TransactionEntity> {
    const categories = await this.categoryService.findAll(userId);
    const category = categories?.find((c) => c.getId() === dto.categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this.transactionRepository.create(dto, userId);
  }
}
