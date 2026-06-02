import { TrendingUp, CalendarCheck2 } from 'lucide-react';
import type { GoalEntity } from '../../domain/entities/goal.entity';

interface Props {
  goal: GoalEntity;
}

function estimateCompletionDate(goal: GoalEntity): Date | null {
  const remaining = goal.targetAmount - goal.savedAmount;
  if (remaining <= 0) return null;

  const now = new Date();
  const created = goal.createdAt;
  const msElapsed = now.getTime() - created.getTime();
  const monthsElapsed = msElapsed / (1000 * 60 * 60 * 24 * 30.44);

  if (monthsElapsed < 0.1 || goal.savedAmount <= 0) return null;

  const monthlyAverage = goal.savedAmount / monthsElapsed;
  if (monthlyAverage <= 0) return null;

  const monthsRemaining = remaining / monthlyAverage;
  const estimatedDate = new Date(now.getTime() + monthsRemaining * 30.44 * 24 * 60 * 60 * 1000);

  return estimatedDate;
}

export default function GoalProgressDetail({ goal }: Props) {
  const remaining = goal.targetAmount - goal.savedAmount;
  const estimatedDate = goal.status === 'completed' ? null : estimateCompletionDate(goal);

  const formattedRemaining = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(Math.max(0, remaining));

  const estimatedLabel = estimatedDate
    ? new Intl.DateTimeFormat('fr-FR', {
        month: 'long',
        year: 'numeric',
      }).format(estimatedDate)
    : null;

  return (
    <div className="flex flex-col gap-2">
      {goal.status !== 'completed' && remaining > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden />
            Reste à épargner
          </span>
          <span className="font-medium">{formattedRemaining}</span>
        </div>
      )}

      {estimatedLabel && (
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <CalendarCheck2 className="h-3.5 w-3.5" aria-hidden />
            Atteinte estimée
          </span>
          <span className="font-medium capitalize">{estimatedLabel}</span>
        </div>
      )}
    </div>
  );
}
