import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ITransactionService } from '../../../interfaces/services/transaction.iservice';
import { ITransactionRepository } from '@features/transactions/interfaces/repositories/transaction.irepository';
import { ICategoryService } from '@features/categories/interfaces/services/category.iservice';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from '@features/transactions/domains/dtos/transaction.dto';
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

  async update(
    id: string,
    dto: UpdateTransactionDto,
    userId: string,
  ): Promise<TransactionEntity> {
    const ownerId = await this.transactionRepository.findOwnerId(id);
    if (!ownerId) {
      throw new NotFoundException('Transaction not found');
    }
    if (ownerId !== userId) {
      throw new ForbiddenException('Transaction belongs to another user');
    }
    if (dto.categoryId !== undefined) {
      const categories = await this.categoryService.findAll(userId);
      const category = categories?.find((c) => c.getId() === dto.categoryId);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }
    const updated = await this.transactionRepository.update(id, dto);
    if (!updated) {
      throw new NotFoundException('Transaction not found');
    }
    return updated;
  }
}
