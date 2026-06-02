import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { Button } from '@/core/components/ui/button';
import { ApiError } from '@/core/errors/api.error';
import ExpenseForm from './ExpenseForm';
import { useCreateTransaction } from '../../domain/hooks/transaction.hook';
import type { CreateExpenseFormData } from '../../domain/schemas/transaction.schema';

export default function CreateTransactionDialog() {
  const [open, setOpen] = useState(false);
  const { createTransactionAsync, createTransactionIsLoading } =
    useCreateTransaction();

  const handleSubmit = async (data: CreateExpenseFormData) => {
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
      if (error instanceof ApiError && error.status === 404) {
        toast.error('La catégorie sélectionnée est introuvable.');
        return;
      }
      if (error instanceof ApiError && error.status === 400) {
        toast.error('Validation échouée. Vérifiez les champs du formulaire.');
        return;
      }
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle dépense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouvelle dépense</DialogTitle>
          <DialogDescription>
            Renseignez le montant, la catégorie et la date pour suivre vos
            sorties d'argent.
          </DialogDescription>
        </DialogHeader>

        <ExpenseForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isSubmitting={createTransactionIsLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
