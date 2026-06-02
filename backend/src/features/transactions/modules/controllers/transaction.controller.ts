import { CreateTransactionDto } from '@features/transactions/domains/dtos/transaction.dto';
import { TransactionEntity } from '@features/transactions/domains/entities/transaction.entity';
import { ITransactionService } from '@features/transactions/interfaces/services/transaction.iservice';
import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('transactions')
export class TransactionController {
  constructor(
    @Inject('ITransactionService')
    private readonly transactionService: ITransactionService,
  ) {}

  @ApiOperation({
    summary: 'Create a transaction',
    description: 'Create a new transaction for the authenticated user',
  })
  @ApiBody({
    type: CreateTransactionDto,
    description: 'The data to create a new transaction',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Transaction created',
    type: TransactionEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthenticated',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  @Post()
  async create(
    @Body() dto: CreateTransactionDto,
    @Req() req: { user: { sub: string } },
  ) {
    return this.transactionService.create(dto, req.user.sub);
  }
}
