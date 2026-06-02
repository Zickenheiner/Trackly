import { AlertCircle, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { useDashboardSummary } from '../../domain/hooks/dashboard-summary.hook';
import SummaryCard from '../components/SummaryCard';
import RecentTransactionItem from '../components/RecentTransactionItem';
import { Skeleton } from '@/core/components/ui/skeleton';
import { Button } from '@/core/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import { Separator } from '@/core/components/ui/separator';

function DashboardSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      <Skeleton className="h-8 w-40" />
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
  const { summary, summaryIsLoading, summaryError, refetchSummary } = useDashboardSummary({
    period: 'month',
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">Tableau de bord</h1>
        {summary && (
          <p className="text-sm text-muted-foreground">
            {new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(
              summary.period.start,
            )}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          title="Solde actuel"
          amount={summary?.balance ?? 0}
          icon={Wallet}
          variant="default"
          index={0}
        />
        <SummaryCard
          title="Revenus du mois"
          amount={summary?.income ?? 0}
          icon={TrendingUp}
          variant="income"
          index={1}
        />
        <SummaryCard
          title="Dépenses du mois"
          amount={summary?.expenses ?? 0}
          icon={TrendingDown}
          variant="expense"
          index={2}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Transactions récentes</CardTitle>
        </CardHeader>
        <CardContent>
          {!summary?.recentTransactions?.length ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Aucune transaction récente.
            </p>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
              }}
            >
              {summary.recentTransactions.map((transaction, index) => (
                <div key={transaction.id}>
                  <RecentTransactionItem transaction={transaction} index={index} />
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
