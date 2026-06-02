import endpoints from '@/core/constants/endpoints';
import request from '@/core/config/api';
import methods from '@/core/constants/methods';
import type { CategoryResponseDto } from '../dtos/category.dto';

class CategoryApi {
  constructor(
    private readonly categoryBaseUrl: string = endpoints.categories,
  ) {}

  async getAll(): Promise<CategoryResponseDto[]> {
    return request<CategoryResponseDto[]>({
      url: this.categoryBaseUrl,
      method: methods.GET,
    });
  }
}

export default CategoryApi;
