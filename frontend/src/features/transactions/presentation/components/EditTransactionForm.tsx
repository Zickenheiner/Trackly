import { Loader2, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form';
import { Input } from '@/core/components/ui/input';
import { Textarea } from '@/core/components/ui/textarea';
import { Button } from '@/core/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import { useCategoryList } from '@/features/categories/domain/hooks/category.hook';
import {
  updateTransactionSchema,
  type UpdateTransactionFormData,
} from '../../domain/schemas/transaction.schema';
import type { TransactionEntity } from '../../domain/entities/transaction.entity';

interface Props {
  transaction: TransactionEntity;
  onSubmit: (data: UpdateTransactionFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

function todayIso(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

function toDateInput(date: Date): string {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

export default function EditTransactionForm({
  transaction,
  onSubmit,
  onCancel,
  isSubmitting,
}: Props) {
  const { categories, categoriesIsLoading, categoriesError } =
    useCategoryList();

  const isIncome = transaction.type === 'income';

  const form = useForm<UpdateTransactionFormData>({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      amount: transaction.amount,
      label: transaction.label,
      categoryId: transaction.category.id,
      date: toDateInput(transaction.date),
      note: transaction.note ?? '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Montant</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="pr-8"
                    value={Number.isNaN(field.value) ? '' : field.value}
                    onChange={(event) =>
                      field.onChange(event.target.valueAsNumber)
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                    €
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isIncome ? 'Source' : 'Libellé'}</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    isIncome
                      ? 'Ex : Salaire de juin'
                      : 'Ex : Courses du week-end'
                  }
                  maxLength={60}
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              {categoriesError ? (
                <div className="flex items-center gap-2 rounded-md border border-destructive/40 p-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  Impossible de charger les catégories.
                </div>
              ) : (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={categoriesIsLoading || !categories?.length}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          categoriesIsLoading
                            ? 'Chargement…'
                            : 'Sélectionnez une catégorie'
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" max={todayIso()} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note (optionnel)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    isIncome
                      ? 'Ajoutez un détail sur ce revenu…'
                      : 'Ajoutez un détail sur cette dépense…'
                  }
                  maxLength={255}
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className={
              isIncome
                ? 'bg-success text-success-foreground hover:bg-success/90'
                : undefined
            }
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enregistrer les modifications
          </Button>
        </div>
      </form>
    </Form>
  );
}
