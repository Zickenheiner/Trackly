import endpoints from '@/core/constants/endpoints';
import request from '@/core/config/api';
import methods from '@/core/constants/methods';
import type { QueryParams } from '@/core/types/query.type';
import type {
  CreateTransactionRequestDto,
  UpdateTransactionRequestDto,
  TransactionResponseDto,
  GetTransactionsQueryDto,
  GetTransactionsResponseDto,
} from '../dtos/transaction.dto';

class TransactionApi {
  constructor(
    private readonly transactionBaseUrl: string = endpoints.transactions.base,
  ) {}

  async getAll(
    query?: GetTransactionsQueryDto,
  ): Promise<GetTransactionsResponseDto> {
    const params: QueryParams = {};
    if (query?.type) params.type = query.type;
    if (query?.categoryId) params.categoryId = query.categoryId;
    if (query?.startDate) params.startDate = query.startDate;
    if (query?.endDate) params.endDate = query.endDate;
    if (query?.page) params.page = query.page;
    if (query?.limit) params.limit = query.limit;

    return request<GetTransactionsResponseDto>({
      url: this.transactionBaseUrl,
      method: methods.GET,
      query: Object.keys(params).length > 0 ? params : undefined,
    });
  }

  async create(
    data: CreateTransactionRequestDto,
  ): Promise<TransactionResponseDto> {
    return request<TransactionResponseDto>({
      url: this.transactionBaseUrl,
      method: methods.POST,
      data,
    });
  }

  async update(
    id: string,
    data: UpdateTransactionRequestDto,
  ): Promise<TransactionResponseDto> {
    return request<TransactionResponseDto>({
      url: endpoints.transactions.byId(id),
      method: methods.PATCH,
      data,
    });
  }

  async delete(id: string): Promise<void> {
    return request<void>({
      url: endpoints.transactions.byId(id),
      method: methods.DELETE,
    });
  }
}

export default TransactionApi;
