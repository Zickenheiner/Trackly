import endpoints from '@/core/constants/endpoints';
import request from '@/core/config/api';
import methods from '@/core/constants/methods';
import type {
  CategoryResponseDto,
  CreateCategoryRequestDto,
} from '../dtos/category.dto';

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

  async create(data: CreateCategoryRequestDto): Promise<CategoryResponseDto> {
    return request<CategoryResponseDto>({
      url: this.categoryBaseUrl,
      method: methods.POST,
      data,
    });
  }
}

export default CategoryApi;
