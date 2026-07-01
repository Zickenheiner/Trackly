import { useState } from 'react';
import { AlertCircle, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { useDashboardSummary } from '../../domain/hooks/dashboard-summary.hook';
import SummaryCard from '../components/SummaryCard';
import RecentTransactionItem from '../components/RecentTransactionItem';
import PeriodSelector from '../components/PeriodSelector';
import { Skeleton } from '@/core/components/ui/skeleton';
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { Separator } from '@/core/components/ui/separator';

type Period = 'week' | 'month' | 'year';

const PERIOD_LABELS: Record<Period, string> = {
  week: 'la semaine',
  month: 'le mois',
  year: "l'année",
};

const PERIOD_HEADER_LABELS: Record<Period, string> = {
  week: 'semaine',
  month: 'mois',
  year: 'année',
};

function DashboardSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-9 w-48" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}

function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-4 min-h-[50vh]">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <p className="text-muted-foreground text-center">
        Impossible de charger le tableau de bord. Vérifiez votre connexion.
      </p>
      <Button variant="outline" onClick={onRetry}>
        Réessayer
      </Button>
    </div>
  );
}

export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>('month');
  const { summary, summaryIsLoading, summaryError, refetchSummary } =
    useDashboardSummary({
      period,
    });

  if (summaryIsLoading) return <DashboardSkeleton />;
  if (summaryError) return <DashboardError onRetry={() => refetchSummary()} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Tableau de bord</h1>
        <PeriodSelector value={period} onChange={setPeriod} />
      </div>

      <motion.div
        key={period}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <SummaryCard
          title="Solde actuel"
          amount={summary?.balance ?? 0}
          icon={Wallet}
          variant="default"
          index={0}
        />
        <SummaryCard
          title={`Revenus de ${PERIOD_LABELS[period]}`}
          amount={summary?.income ?? 0}
          icon={TrendingUp}
          variant="income"
          index={1}
        />
        <SummaryCard
          title={`Dépenses de ${PERIOD_LABELS[period]}`}
          amount={summary?.expenses ?? 0}
          icon={TrendingDown}
          variant="expense"
          index={2}
        />
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Transactions récentes — {PERIOD_HEADER_LABELS[period]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!summary?.recentTransactions?.length ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Aucune transaction récente.
            </p>
          ) : (
            <motion.div
              key={period}
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
              }}
            >
              {summary.recentTransactions.map((transaction, index) => (
                <div key={transaction.id}>
                  <RecentTransactionItem
                    transaction={transaction}
                    index={index}
                  />
                  {index < summary.recentTransactions.length - 1 && (
                    <Separator />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
