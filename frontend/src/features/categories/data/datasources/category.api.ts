import endpoints from '@/core/constants/endpoints';
import request from '@/core/config/api';
import methods from '@/core/constants/methods';
import type {
  CategoryResponseDto,
  CreateCategoryRequestDto,
  UpdateCategoryRequestDto,
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

  async update(
    id: string,
    data: UpdateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    return request<CategoryResponseDto>({
      url: endpoints.categoryById(id),
      method: methods.PATCH,
      data,
    });
  }

  async delete(id: string): Promise<void> {
    return request<void>({
      url: endpoints.categoryById(id),
      method: methods.DELETE,
    });
  }
}

export default CategoryApi;
