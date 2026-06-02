import endpoints from '@/core/constants/endpoints';
import request from '@/core/config/api';
import methods from '@/core/constants/methods';
import type {
  CreateTransactionRequestDto,
  TransactionResponseDto,
} from '../dtos/transaction.dto';

class TransactionApi {
  constructor(
    private readonly transactionBaseUrl: string = endpoints.transactions,
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
}

export default TransactionApi;
