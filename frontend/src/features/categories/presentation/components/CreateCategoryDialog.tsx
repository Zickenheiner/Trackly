import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Loader2 } from 'lucide-react';
import { ApiError } from '@/core/errors/api.error';
import { cn } from '@/core/utils/cn';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
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
import { useCreateCategory } from '../../domain/hooks/category.hook';
import {
  createCategorySchema,
  type CreateCategoryFormData,
} from '../../domain/schemas/category.schema';

const ICON_OPTIONS = [
  '🛒',
  '🍽️',
  '🚗',
  '🏠',
  '💡',
  '🎬',
  '✈️',
  '💊',
  '🎁',
  '📚',
  '👕',
  '💰',
  '☕',
  '🐶',
  '🏋️',
  '📱',
];

const COLOR_OPTIONS = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#22c55e',
  '#14b8a6',
  '#3b82f6',
  '#6366f1',
  '#a855f7',
  '#ec4899',
  '#64748b',
];

const DEFAULT_VALUES: CreateCategoryFormData = {
  name: '',
  icon: ICON_OPTIONS[0],
  color: COLOR_OPTIONS[0],
};

export default function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);
  const { createCategoryAsync, createCategoryIsLoading } = useCreateCategory();

  const form = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!open) form.reset(DEFAULT_VALUES);
  }, [open, form]);

  const selectedIcon = form.watch('icon');
  const selectedColor = form.watch('color');
  const name = form.watch('name');

  const onSubmit = async (data: CreateCategoryFormData) => {
    try {
      await createCategoryAsync(data);
      setOpen(false);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        form.setError('name', {
          type: 'manual',
          message: 'Ce nom de catégorie est déjà utilisé.',
        });
        return;
      }
      form.setError('root', {
        type: 'manual',
        message: 'Une erreur est survenue. Veuillez réessayer.',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle catégorie
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouvelle catégorie</DialogTitle>
          <DialogDescription>
            Créez une catégorie personnalisée pour classer vos transactions.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 rounded-lg border p-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl"
            style={{ backgroundColor: `${selectedColor}1a` }}
            aria-hidden
          >
            <span>{selectedIcon}</span>
          </div>
          <span className="truncate font-medium">
            {name.trim() || 'Aperçu de la catégorie'}
          </span>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
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
                      placeholder="Ex : Courses"
                      maxLength={30}
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
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icône</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-8 gap-2">
                      {ICON_OPTIONS.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => field.onChange(icon)}
                          className={cn(
                            'flex h-9 w-9 items-center justify-center rounded-md border text-lg transition-colors hover:bg-accent',
                            field.value === icon &&
                              'border-primary ring-2 ring-primary/40',
                          )}
                          aria-label={`Icône ${icon}`}
                          aria-pressed={field.value === icon}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Couleur</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap items-center gap-2">
                      {COLOR_OPTIONS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => field.onChange(color)}
                          className={cn(
                            'h-8 w-8 rounded-full border transition-transform hover:scale-110',
                            field.value === color &&
                              'ring-2 ring-ring ring-offset-2 ring-offset-background',
                          )}
                          style={{ backgroundColor: color }}
                          aria-label={`Couleur ${color}`}
                          aria-pressed={field.value === color}
                        />
                      ))}
                      <label className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full border">
                        <span
                          className="block h-full w-full"
                          style={{ backgroundColor: field.value }}
                        />
                        <input
                          type="color"
                          value={field.value}
                          onChange={(event) =>
                            field.onChange(event.target.value)
                          }
                          className="absolute inset-0 cursor-pointer opacity-0"
                          aria-label="Couleur personnalisée"
                        />
                      </label>
                    </div>
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

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={createCategoryIsLoading}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={createCategoryIsLoading}>
                {createCategoryIsLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Créer
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
