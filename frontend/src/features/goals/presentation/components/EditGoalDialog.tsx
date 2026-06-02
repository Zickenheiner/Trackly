import { useState } from 'react';
import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { Button } from '@/core/components/ui/button';
import { useUpdateGoal } from '../../domain/hooks/goal.hook';
import EditGoalForm from './EditGoalForm';
import type { UpdateGoalFormData } from '../../domain/schemas/goal.schema';
import type { GoalEntity } from '../../domain/entities/goal.entity';

interface Props {
  goal: GoalEntity;
}

export default function EditGoalDialog({ goal }: Props) {
  const [open, setOpen] = useState(false);
  const { updateGoalAsync, updateGoalIsLoading } = useUpdateGoal();

  const onSubmit = async (data: UpdateGoalFormData) => {
    try {
      await updateGoalAsync({
        id: goal.id,
        data: {
          name: data.name,
          targetAmount: data.targetAmount,
          deadline: data.deadline,
          description: data.description,
        },
      });
      setOpen(false);
    } catch {
      void 0;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Modifier l'objectif">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier l'objectif</DialogTitle>
          <DialogDescription>
            Modifiez le nom, le montant cible ou la date limite de votre objectif.
          </DialogDescription>
        </DialogHeader>
        <EditGoalForm
          goal={goal}
          onSubmit={onSubmit}
          onCancel={() => setOpen(false)}
          isLoading={updateGoalIsLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
