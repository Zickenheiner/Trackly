import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { ApiError } from '@/core/errors/api.error';
import EditTransactionForm from './EditTransactionForm';
import { useUpdateTransaction } from '../../domain/hooks/transaction.hook';
import type { UpdateTransactionFormData } from '../../domain/schemas/transaction.schema';
import type { TransactionEntity } from '../../domain/entities/transaction.entity';

interface Props {
  transaction: TransactionEntity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditTransactionDialog({
  transaction,
  open,
  onOpenChange,
}: Props) {
  const { updateTransactionAsync, updateTransactionIsLoading } =
    useUpdateTransaction();

  const isIncome = transaction?.type === 'income';

  const handleSubmit = async (data: UpdateTransactionFormData) => {
    if (!transaction) return;

    try {
      await updateTransactionAsync({
        id: transaction.id,
        data: {
          amount: data.amount,
          label: data.label,
          categoryId: data.categoryId,
          date: new Date(data.date).toISOString(),
          note: data.note?.trim() ? data.note.trim() : undefined,
        },
      });
      toast.success(
        isIncome
          ? 'Revenu modifié avec succès.'
          : 'Dépense modifiée avec succès.',
      );
      onOpenChange(false);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        toast.error('Cette transaction est introuvable.');
        return;
      }
      if (error instanceof ApiError && error.status === 403) {
        toast.error("Vous n'avez pas accès à cette transaction.");
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isIncome ? 'Modifier le revenu' : 'Modifier la dépense'}
          </DialogTitle>
          <DialogDescription>
            Mettez à jour les informations de cette transaction. Les
            modifications sont appliquées immédiatement.
          </DialogDescription>
        </DialogHeader>

        {transaction && (
          <EditTransactionForm
            transaction={transaction}
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
            isSubmitting={updateTransactionIsLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
