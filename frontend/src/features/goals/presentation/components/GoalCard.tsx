import { Target, CalendarClock, Trophy } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { Badge } from '@/core/components/ui/badge';
import { Progress } from '@/core/components/ui/progress';
import { cn } from '@/core/utils/cn';
import type { GoalEntity } from '../../domain/entities/goal.entity';
import AddDepositDialog from './AddDepositDialog';
import GoalProgressDetail from './GoalProgressDetail';
import EditGoalDialog from './EditGoalDialog';
import DeleteGoalDialog from './DeleteGoalDialog';

interface Props {
  goal: GoalEntity;
}

export default function GoalCard({ goal }: Props) {
  const isCompleted = goal.status === 'completed';

  const formattedTarget = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(goal.targetAmount);

  const formattedSaved = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(goal.savedAmount);

  const deadlineLabel = goal.deadline
    ? new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(goal.deadline)
    : null;

  return (
    <Card
      className={cn(
        'overflow-hidden transition-shadow hover:shadow-md',
        isCompleted &&
          'border-green-500/60 bg-green-50/30 dark:bg-green-950/10',
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            {isCompleted ? (
              <Trophy
                className="h-5 w-5 shrink-0 text-yellow-500"
                aria-hidden
              />
            ) : (
              <Target className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            )}
            <CardTitle className="truncate text-base">{goal.name}</CardTitle>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Badge
              variant={isCompleted ? 'default' : 'secondary'}
              className={cn(isCompleted && 'bg-green-600 hover:bg-green-700')}
            >
              {isCompleted ? 'Atteint' : 'En cours'}
            </Badge>
            <EditGoalDialog goal={goal} />
            <DeleteGoalDialog goalId={goal.id} goalName={goal.name} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progression</span>
            <span className="font-medium">{goal.progress}%</span>
          </div>
          <Progress value={goal.progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Épargné</span>
          <span className="font-semibold">{formattedSaved}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Objectif</span>
          <span className="font-semibold">{formattedTarget}</span>
        </div>

        {deadlineLabel && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarClock className="h-3.5 w-3.5" aria-hidden />
            <span>Échéance : {deadlineLabel}</span>
          </div>
        )}

        {goal.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {goal.description}
          </p>
        )}

        <GoalProgressDetail goal={goal} />
      </CardContent>
      {goal.status !== 'completed' && (
        <CardFooter className="pt-0">
          <AddDepositDialog goalId={goal.id} goalName={goal.name} />
        </CardFooter>
      )}
    </Card>
  );
}
