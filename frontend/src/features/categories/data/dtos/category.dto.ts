export interface CategoryResponseDto {
  id: string;
  name: string;
  icon: string;
  color: string;
  isDefault: boolean;
}

export type GetCategoriesResponseDto = CategoryResponseDto[];
