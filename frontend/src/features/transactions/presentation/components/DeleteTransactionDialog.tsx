import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/core/components/ui/alert-dialog';
import { ApiError } from '@/core/errors/api.error';
import { useDeleteTransaction } from '../../domain/hooks/transaction.hook';
import type { TransactionEntity } from '../../domain/entities/transaction.entity';

interface Props {
  transaction: TransactionEntity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteTransactionDialog({
  transaction,
  open,
  onOpenChange,
}: Props) {
  const { deleteTransactionAsync, deleteTransactionIsLoading } =
    useDeleteTransaction();

  const isIncome = transaction?.type === 'income';

  const handleConfirm = async () => {
    if (!transaction) return;

    try {
      await deleteTransactionAsync(transaction.id);
      toast.success(
        isIncome
          ? 'Revenu supprimé avec succès.'
          : 'Dépense supprimée avec succès.',
      );
      onOpenChange(false);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        toast.error('Cette transaction est introuvable.');
        onOpenChange(false);
        return;
      }
      if (error instanceof ApiError && error.status === 403) {
        toast.error("Vous n'avez pas accès à cette transaction.");
        return;
      }
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <Trash2 />
          </AlertDialogMedia>
          <AlertDialogTitle>
            {isIncome ? 'Supprimer ce revenu ?' : 'Supprimer cette dépense ?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {transaction ? (
              <>
                La transaction «&nbsp;{transaction.label}&nbsp;» sera
                définitivement supprimée. Cette action est irréversible.
              </>
            ) : (
              'Cette action est irréversible.'
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteTransactionIsLoading}>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={deleteTransactionIsLoading}
            onClick={(event) => {
              event.preventDefault();
              handleConfirm();
            }}
          >
            {deleteTransactionIsLoading ? 'Suppression…' : 'Supprimer'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
