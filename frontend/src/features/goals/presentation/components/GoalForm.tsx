import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form';
import { Input } from '@/core/components/ui/input';
import { Button } from '@/core/components/ui/button';
import {
  createGoalSchema,
  type CreateGoalFormData,
} from '../../domain/schemas/goal.schema';

interface Props {
  onSubmit: (data: CreateGoalFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const DEFAULT_VALUES: CreateGoalFormData = {
  name: '',
  targetAmount: 0,
  deadline: undefined,
  initialAmount: undefined,
  description: undefined,
};

export default function GoalForm({
  onSubmit,
  onCancel,
  isLoading = false,
}: Props) {
  const form = useForm<CreateGoalFormData>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: DEFAULT_VALUES,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex : Vacances d'été"
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
          name="targetAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Montant cible (€)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0.01}
                  step={0.01}
                  placeholder="Ex : 2000"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="initialAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Montant initial (€, optionnel)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="Ex : 500"
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ''
                        ? undefined
                        : e.target.valueAsNumber,
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date limite (optionnel)</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optionnel)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Décrivez votre objectif..."
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-sm text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Créer
          </Button>
        </div>
      </form>
    </Form>
  );
}
