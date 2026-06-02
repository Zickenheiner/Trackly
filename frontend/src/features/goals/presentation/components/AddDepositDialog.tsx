import { useState } from 'react';
import { PlusCircle, Loader2, Trophy } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  addDepositSchema,
  type AddDepositFormData,
} from '../../domain/schemas/deposit.schema';
import { useAddDeposit } from '../../domain/hooks/goal.hook';

interface Props {
  goalId: string;
  goalName: string;
}

export default function AddDepositDialog({ goalId, goalName }: Props) {
  const [open, setOpen] = useState(false);
  const { addDepositAsync, addDepositIsLoading } = useAddDeposit();

  const form = useForm<AddDepositFormData>({
    resolver: zodResolver(addDepositSchema),
    defaultValues: {
      amount: 0,
      date: undefined,
    },
  });

  const onSubmit = async (data: AddDepositFormData) => {
    try {
      const result = await addDepositAsync({
        goalId,
        data: {
          amount: data.amount,
          date: data.date,
        },
      });
      form.reset();
      setOpen(false);
      if (result.status === 'completed') {
        toast.success('Objectif atteint !', {
          description: `Félicitations ! Vous avez atteint votre objectif « ${goalName} ».`,
          icon: <Trophy className="h-5 w-5 text-yellow-500" />,
          duration: 6000,
        });
      }
    } catch {
      void 0;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter un versement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Ajouter un versement</DialogTitle>
          <DialogDescription>
            Ajoutez un versement à votre objectif « {goalName} ».
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant (€)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0.01}
                      step={0.01}
                      placeholder="Ex : 100"
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date (optionnel)</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) =>
                        field.onChange(e.target.value || undefined)
                      }
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
                onClick={() => setOpen(false)}
                disabled={addDepositIsLoading}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={addDepositIsLoading}>
                {addDepositIsLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Valider
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
