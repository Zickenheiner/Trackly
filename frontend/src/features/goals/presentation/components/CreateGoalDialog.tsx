import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { Button } from '@/core/components/ui/button';
import { useCreateGoal } from '../../domain/hooks/goal.hook';
import GoalForm from './GoalForm';
import type { CreateGoalFormData } from '../../domain/schemas/goal.schema';

export default function CreateGoalDialog() {
  const [open, setOpen] = useState(false);
  const { createGoalAsync, createGoalIsLoading } = useCreateGoal();

  const onSubmit = async (data: CreateGoalFormData) => {
    try {
      await createGoalAsync({
        name: data.name,
        targetAmount: data.targetAmount,
        deadline: data.deadline,
        initialAmount: data.initialAmount,
        description: data.description,
      });
      setOpen(false);
    } catch {
      void 0;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel objectif
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouvel objectif d'épargne</DialogTitle>
          <DialogDescription>
            Définissez un objectif financier avec un montant cible et une date
            limite.
          </DialogDescription>
        </DialogHeader>
        <GoalForm
          onSubmit={onSubmit}
          onCancel={() => setOpen(false)}
          isLoading={createGoalIsLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
