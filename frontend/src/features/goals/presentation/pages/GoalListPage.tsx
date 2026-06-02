import { motion } from 'motion/react';
import { AlertCircle, Inbox } from 'lucide-react';
import { useGoalList } from '../../domain/hooks/goal.hook';
import GoalCard from '../components/GoalCard';
import CreateGoalDialog from '../components/CreateGoalDialog';
import { Skeleton } from '@/core/components/ui/skeleton';
import { Button } from '@/core/components/ui/button';

function GoalListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <Skeleton className="mb-6 h-8 w-48" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function GoalListError() {
  return (
    <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-6">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <p className="text-muted-foreground">
        Impossible de charger les objectifs.
      </p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Réessayer
      </Button>
    </div>
  );
}

function GoalListEmpty() {
  return (
    <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-6">
      <Inbox className="h-12 w-12 text-muted-foreground" />
      <p className="text-muted-foreground">
        Aucun objectif d'épargne pour l'instant.
      </p>
      <CreateGoalDialog />
    </div>
  );
}

function GoalListHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Objectifs d'épargne</h1>
        <p className="text-sm text-muted-foreground">
          Suivez vos objectifs financiers et leur progression.
        </p>
      </div>
      <CreateGoalDialog />
    </div>
  );
}

export default function GoalListPage() {
  const { goals, goalsIsLoading, goalsError } = useGoalList();

  if (goalsIsLoading) return <GoalListSkeleton />;
  if (goalsError) return <GoalListError />;
  if (!goals?.length) return <GoalListEmpty />;

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <GoalListHeader />
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {goals.map((goal) => (
          <motion.div
            key={goal.id}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <GoalCard goal={goal} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
