import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ApiError } from '@/core/errors/api.error';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/core/components/ui/alert-dialog';
import { Button } from '@/core/components/ui/button';
import { useDeleteCategory } from '../../domain/hooks/category.hook';
import type { CategoryEntity } from '../../domain/entities/category.entity';

interface Props {
  category: CategoryEntity;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteCategoryDialog({
  category,
  open,
  onOpenChange,
}: Props) {
  const { deleteCategoryAsync, deleteCategoryIsLoading } = useDeleteCategory();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (open) setErrorMessage(null);
  }, [open]);

  const onConfirm = async () => {
    setErrorMessage(null);
    try {
      await deleteCategoryAsync(category.id);
      onOpenChange(false);
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        setErrorMessage(
          'Des transactions sont liées à cette catégorie. Réaffectez-les avant de la supprimer.',
        );
        return;
      }
      if (error instanceof ApiError && error.status === 404) {
        setErrorMessage('Cette catégorie est introuvable.');
        return;
      }
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer cette catégorie ?</AlertDialogTitle>
          <AlertDialogDescription>
            La catégorie « {category.name} » sera définitivement supprimée.
            Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {errorMessage && (
          <p className="text-sm text-destructive">{errorMessage}</p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteCategoryIsLoading}>
            Annuler
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={deleteCategoryIsLoading}
          >
            {deleteCategoryIsLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Supprimer
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
