import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/core/components/ui/alert-dialog';
import { Button } from '@/core/components/ui/button';
import { useDeleteGoal } from '../../domain/hooks/goal.hook';

interface Props {
  goalId: string;
  goalName: string;
}

export default function DeleteGoalDialog({ goalId, goalName }: Props) {
  const [open, setOpen] = useState(false);
  const { deleteGoalAsync, deleteGoalIsLoading } = useDeleteGoal();

  const onConfirm = async () => {
    try {
      await deleteGoalAsync(goalId);
      setOpen(false);
    } catch {
      void 0;
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Supprimer l'objectif">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer l'objectif</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer l'objectif{' '}
            <span className="font-semibold">{goalName}</span> ? Les versements associés seront
            conservés dans l'historique. Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteGoalIsLoading}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={deleteGoalIsLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
