import { RotateCcw } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import { useCategoryList } from '@/features/categories/domain/hooks/category.hook';
import type {
  TransactionFilters as TransactionFiltersValue,
  TransactionType,
} from '../../domain/entities/transaction.entity';

const ALL_VALUE = 'all';

interface Props {
  filters: TransactionFiltersValue;
  onChange: (filters: TransactionFiltersValue) => void;
  onReset: () => void;
}

export default function TransactionFilters({
  filters,
  onChange,
  onReset,
}: Props) {
  const { categories, categoriesIsLoading } = useCategoryList();

  const hasActiveFilters = Boolean(
    filters.type || filters.categoryId || filters.startDate || filters.endDate,
  );

  const handleTypeChange = (value: string) => {
    onChange({
      ...filters,
      type: value === ALL_VALUE ? undefined : (value as TransactionType),
      page: 1,
    });
  };

  const handleCategoryChange = (value: string) => {
    onChange({
      ...filters,
      categoryId: value === ALL_VALUE ? undefined : value,
      page: 1,
    });
  };

  const handleStartDateChange = (value: string) => {
    onChange({ ...filters, startDate: value || undefined, page: 1 });
  };

  const handleEndDateChange = (value: string) => {
    onChange({ ...filters, endDate: value || undefined, page: 1 });
  };

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="filter-type">Type</Label>
          <Select
            value={filters.type ?? ALL_VALUE}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger id="filter-type" className="w-full">
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>Tous les types</SelectItem>
              <SelectItem value="income">Revenus</SelectItem>
              <SelectItem value="expense">Dépenses</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="filter-category">Catégorie</Label>
          <Select
            value={filters.categoryId ?? ALL_VALUE}
            onValueChange={handleCategoryChange}
            disabled={categoriesIsLoading}
          >
            <SelectTrigger id="filter-category" className="w-full">
              <SelectValue
                placeholder={
                  categoriesIsLoading ? 'Chargement…' : 'Toutes les catégories'
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>Toutes les catégories</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="filter-start-date">Du</Label>
          <Input
            id="filter-start-date"
            type="date"
            value={filters.startDate ?? ''}
            max={filters.endDate || undefined}
            onChange={(event) => handleStartDateChange(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="filter-end-date">Au</Label>
          <Input
            id="filter-end-date"
            type="date"
            value={filters.endDate ?? ''}
            min={filters.startDate || undefined}
            onChange={(event) => handleEndDateChange(event.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onReset}
          disabled={!hasActiveFilters}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Réinitialiser les filtres
        </Button>
      </div>
    </div>
  );
}
