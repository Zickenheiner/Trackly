import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
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
import IncomeForm from './IncomeForm';
import { useCreateTransaction } from '../../domain/hooks/transaction.hook';
import type { CreateIncomeFormData } from '../../domain/schemas/transaction.schema';

export default function CreateIncomeDialog() {
  const [open, setOpen] = useState(false);
  const { createTransactionAsync, createTransactionIsLoading } =
    useCreateTransaction();

  const handleSubmit = async (data: CreateIncomeFormData) => {
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
        <Button className="bg-success text-success-foreground hover:bg-success/90">
          <TrendingUp className="mr-2 h-4 w-4" />
          Nouveau revenu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouveau revenu</DialogTitle>
          <DialogDescription>
            Renseignez le montant, la source et la date pour suivre vos entrées
            d'argent.
          </DialogDescription>
        </DialogHeader>

        <IncomeForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isSubmitting={createTransactionIsLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
