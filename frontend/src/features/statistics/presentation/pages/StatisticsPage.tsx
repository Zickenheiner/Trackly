import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, PieChart, TrendingUp } from 'lucide-react';
import { useCategoryStats } from '../../domain/hooks/category-stats.hook';
import { useMonthlyStats } from '../../domain/hooks/monthly-stats.hook';
import CategoryPieChart from '../components/CategoryPieChart';
import CategoryLegend from '../components/CategoryLegend';
import PeriodSelector from '../components/PeriodSelector';
import MonthlyBarChart from '../components/MonthlyBarChart';
import MonthsSelector from '../components/MonthsSelector';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { Skeleton } from '@/core/components/ui/skeleton';
import { Button } from '@/core/components/ui/button';
import { Separator } from '@/core/components/ui/separator';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/core/components/ui/toggle-group';

type Period = 'week' | 'month' | 'year';
type MonthsCount = 6 | 12;
type MonthlyType = 'income' | 'expense' | 'both';

function StatisticsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-80 w-full rounded-xl" />
      <Skeleton className="h-80 w-full rounded-xl" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

function StatisticsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-4 min-h-[50vh]">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <p className="text-muted-foreground text-center">
        Impossible de charger les statistiques. Vérifiez votre connexion.
      </p>
      <Button variant="outline" onClick={onRetry}>
        Réessayer
      </Button>
    </div>
  );
}

function StatisticsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[30vh]">
      <PieChart className="h-12 w-12 text-muted-foreground" />
      <p className="text-muted-foreground text-center">
        Aucune dépense enregistrée pour cette période.
      </p>
      <p className="text-sm text-muted-foreground text-center">
        Ajoutez des transactions pour voir la répartition par catégorie.
      </p>
    </div>
  );
}

function MonthlyEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[20vh]">
      <TrendingUp className="h-10 w-10 text-muted-foreground" />
      <p className="text-muted-foreground text-center text-sm">
        Aucune donnée disponible pour cette période.
      </p>
    </div>
  );
}

export default function StatisticsPage() {
  const [period, setPeriod] = useState<Period>('month');
  const [months, setMonths] = useState<MonthsCount>(6);
  const [monthlyType, setMonthlyType] = useState<MonthlyType>('both');

  const { categoryStats, categoryStatsIsLoading, categoryStatsError } =
    useCategoryStats({
      period,
    });

  const { monthlyStats, monthlyStatsIsLoading, monthlyStatsError } =
    useMonthlyStats({
      months,
      type: monthlyType,
    });

  if (categoryStatsIsLoading || monthlyStatsIsLoading)
    return <StatisticsSkeleton />;
  if (categoryStatsError || monthlyStatsError)
    return <StatisticsError onRetry={() => window.location.reload()} />;

  const totalExpenses =
    categoryStats?.reduce((sum, stat) => sum + stat.total, 0) ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6"
    >
      <h1 className="text-2xl font-semibold">Statistiques</h1>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">
                Évolution mois par mois
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Visualisez vos revenus et dépenses dans le temps
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ToggleGroup
                type="single"
                value={monthlyType}
                onValueChange={(v) => {
                  if (v) setMonthlyType(v as MonthlyType);
                }}
                size="sm"
              >
                <ToggleGroupItem value="both">Les deux</ToggleGroupItem>
                <ToggleGroupItem value="income">Revenus</ToggleGroupItem>
                <ToggleGroupItem value="expense">Dépenses</ToggleGroupItem>
              </ToggleGroup>
              <MonthsSelector value={months} onChange={setMonths} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {monthlyStats && monthlyStats.length > 0 ? (
            <MonthlyBarChart stats={monthlyStats} type={monthlyType} />
          ) : (
            <MonthlyEmpty />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">
                Répartition des dépenses par catégorie
              </CardTitle>
              {categoryStats && categoryStats.length > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  Total :{' '}
                  <span className="font-medium text-foreground">
                    {totalExpenses.toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                    })}
                  </span>
                </p>
              )}
            </div>
            <PeriodSelector value={period} onChange={setPeriod} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {categoryStats && categoryStats.length > 0 ? (
            <>
              <CategoryPieChart stats={categoryStats} />
              <Separator />
              <CategoryLegend stats={categoryStats} />
            </>
          ) : (
            <StatisticsEmpty />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
