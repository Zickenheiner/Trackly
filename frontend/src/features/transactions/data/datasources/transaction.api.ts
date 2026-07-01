import endpoints from '@/core/constants/endpoints';
import request from '@/core/config/api';
import methods from '@/core/constants/methods';
import type {
  CreateTransactionRequestDto,
  UpdateTransactionRequestDto,
  TransactionResponseDto,
} from '../dtos/transaction.dto';

class TransactionApi {
  constructor(
    private readonly transactionBaseUrl: string = endpoints.transactions.base,
  ) {}

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
}

export default TransactionApi;
