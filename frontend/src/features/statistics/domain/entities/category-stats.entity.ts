export interface CategoryEntity {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CategoryStatEntity {
  category: CategoryEntity;
  total: number;
  percentage: number;
}
