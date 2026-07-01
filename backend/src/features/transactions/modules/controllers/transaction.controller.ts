import {
  CreateTransactionDto,
  GetTransactionsQueryDto,
  GetTransactionsResponseDto,
  UpdateTransactionDto,
} from '@features/transactions/domains/dtos/transaction.dto';
import { TransactionEntity } from '@features/transactions/domains/entities/transaction.entity';
import { ITransactionService } from '@features/transactions/interfaces/services/transaction.iservice';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('transactions')
export class TransactionController {
  constructor(
    @Inject('ITransactionService')
    private readonly transactionService: ITransactionService,
  ) {}

  @ApiOperation({
    summary: 'List transactions',
    description:
      'List transactions of the authenticated user with optional filters and pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of transactions',
    type: GetTransactionsResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthenticated',
  })
  @Get()
  async findAll(
    @Query() query: GetTransactionsQueryDto,
    @Req() req: { user: { sub: string } },
  ) {
    return this.transactionService.findAll(req.user.sub, query);
  }

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

  @ApiOperation({
    summary: 'Update a transaction',
    description:
      'Update an existing transaction owned by the authenticated user',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The unique identifier of the transaction to update',
  })
  @ApiBody({
    type: UpdateTransactionDto,
    description: 'The data to update the transaction',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Transaction updated',
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
    status: 403,
    description: 'Transaction belongs to another user',
  })
  @ApiResponse({
    status: 404,
    description: 'Transaction not found',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTransactionDto,
    @Req() req: { user: { sub: string } },
  ) {
    return this.transactionService.update(id, dto, req.user.sub);
  }

  @ApiOperation({
    summary: 'Delete a transaction',
    description:
      'Delete an existing transaction owned by the authenticated user',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The unique identifier of the transaction to delete',
  })
  @ApiResponse({
    status: 204,
    description: 'Transaction deleted',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthenticated',
  })
  @ApiResponse({
    status: 403,
    description: 'Transaction belongs to another user',
  })
  @ApiResponse({
    status: 404,
    description: 'Transaction not found',
  })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string, @Req() req: { user: { sub: string } }) {
    return this.transactionService.delete(id, req.user.sub);
  }
}
