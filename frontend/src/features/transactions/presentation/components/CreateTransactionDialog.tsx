import { useState } from 'react';
import { Plus, TrendingDown, TrendingUp } from 'lucide-react';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/core/components/ui/tabs';
import { Button } from '@/core/components/ui/button';
import { ApiError } from '@/core/errors/api.error';
import ExpenseForm from './ExpenseForm';
import IncomeForm from './IncomeForm';
import { useCreateTransaction } from '../../domain/hooks/transaction.hook';
import type {
  CreateExpenseFormData,
  CreateIncomeFormData,
} from '../../domain/schemas/transaction.schema';

export default function CreateTransactionDialog() {
  const [open, setOpen] = useState(false);
  const { createTransactionAsync, createTransactionIsLoading } =
    useCreateTransaction();

  const handleError = (error: unknown) => {
    if (error instanceof ApiError && error.status === 404) {
      toast.error('La catégorie sélectionnée est introuvable.');
      return;
    }
    if (error instanceof ApiError && error.status === 400) {
      toast.error('Validation échouée. Vérifiez les champs du formulaire.');
      return;
    }
    toast.error('Une erreur est survenue. Veuillez réessayer.');
  };

  const handleSubmitExpense = async (data: CreateExpenseFormData) => {
    try {
      await createTransactionAsync({
        type: 'expense',
        amount: data.amount,
        label: data.label,
        categoryId: data.categoryId,
        date: new Date(data.date).toISOString(),
        note: data.note?.trim() ? data.note.trim() : undefined,
      });
      toast.success('Dépense ajoutée avec succès.');
      setOpen(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleSubmitIncome = async (data: CreateIncomeFormData) => {
    try {
      await createTransactionAsync({
        type: 'income',
        amount: data.amount,
        label: data.label,
        categoryId: data.categoryId,
        date: new Date(data.date).toISOString(),
        note: data.note?.trim() ? data.note.trim() : undefined,
      });
      toast.success('Revenu ajouté avec succès.');
      setOpen(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouvelle transaction</DialogTitle>
          <DialogDescription>
            Choisissez le type, puis renseignez le montant, la catégorie et la
            date.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="expense">
          <TabsList className="w-full">
            <TabsTrigger
              value="expense"
              className="data-[state=active]:bg-destructive/10 data-[state=active]:text-destructive dark:data-[state=active]:bg-destructive/20 dark:data-[state=active]:text-destructive"
            >
              <TrendingDown className="h-4 w-4" />
              Dépense
            </TabsTrigger>
            <TabsTrigger
              value="income"
              className="data-[state=active]:bg-success/10 data-[state=active]:text-success dark:data-[state=active]:bg-success/20 dark:data-[state=active]:text-success"
            >
              <TrendingUp className="h-4 w-4" />
              Revenu
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expense" className="mt-4">
            <ExpenseForm
              onSubmit={handleSubmitExpense}
              onCancel={() => setOpen(false)}
              isSubmitting={createTransactionIsLoading}
            />
          </TabsContent>

          <TabsContent value="income" className="mt-4">
            <IncomeForm
              onSubmit={handleSubmitIncome}
              onCancel={() => setOpen(false)}
              isSubmitting={createTransactionIsLoading}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
