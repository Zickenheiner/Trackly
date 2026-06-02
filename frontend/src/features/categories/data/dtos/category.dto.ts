export interface CategoryResponseDto {
  id: string;
  name: string;
  icon: string;
  color: string;
  isDefault: boolean;
}

export type GetCategoriesResponseDto = CategoryResponseDto[];

export interface CreateCategoryRequestDto {
  name: string;
  icon: string;
  color: string;
}

export interface UpdateCategoryRequestDto {
  name?: string;
  icon?: string;
  color?: string;
}
