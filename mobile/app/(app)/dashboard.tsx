import { useMemo, useState } from 'react';
import { Link } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/core/ui/Screen';
import { Card } from '@/core/ui/Card';
import { Button } from '@/core/ui/Button';
import { useTheme } from '@/core/theme/theme-context';
import { ThemeToggle } from '@/core/theme/ThemeToggle';
import type { Palette } from '@/core/theme/palettes';
import { LogoutButton } from '@/features/auth/LogoutButton';
import { useProfile } from '@/features/profile/use-profile';
import { SummaryCard } from '@/features/dashboard/SummaryCard';
import { RecentTransactionItem } from '@/features/dashboard/RecentTransactionItem';
import { PeriodSelector } from '@/features/dashboard/PeriodSelector';
import { useDashboardSummary } from '@/features/dashboard/use-dashboard-summary';
import type { DashboardPeriod } from '@/features/dashboard/dashboard.types';
import { CategoryStatsSection } from '@/features/statistics/CategoryStatsSection';

const PERIOD_LABELS: Record<DashboardPeriod, string> = {
  week: 'de la semaine',
  month: 'du mois',
  year: "de l'année",
};

export default function DashboardScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const { data: profile } = useProfile();
  const currency = profile?.currency ?? 'EUR';

  const [period, setPeriod] = useState<DashboardPeriod>('month');
  const { data: summary, isLoading, isError, error, refetch } =
    useDashboardSummary(period);

  return (
    <Screen scroll>
      <Text style={styles.title}>Tableau de bord</Text>
      <PeriodSelector value={period} onChange={setPeriod} />

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : isError || !summary ? (
        <Card style={styles.errorCard}>
          <Text style={styles.errorText}>
            {error?.message ?? 'Impossible de charger le tableau de bord.'}
          </Text>
          <Button label="Réessayer" variant="ghost" onPress={() => refetch()} />
        </Card>
      ) : (
        <>
          <SummaryCard
            title="Solde actuel"
            amount={summary.balance}
            currency={currency}
          />
          <View style={styles.row}>
            <SummaryCard
              title={`Revenus ${PERIOD_LABELS[period]}`}
              amount={summary.income}
              currency={currency}
              variant="income"
            />
            <SummaryCard
              title={`Dépenses ${PERIOD_LABELS[period]}`}
              amount={summary.expenses}
              currency={currency}
              variant="expense"
            />
          </View>

          <Card>
            <Text style={styles.sectionTitle}>Transactions récentes</Text>
            {summary.recentTransactions.length === 0 ? (
              <Text style={styles.empty}>Aucune transaction récente.</Text>
            ) : (
              summary.recentTransactions.map((transaction) => (
                <RecentTransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  currency={currency}
                />
              ))
            )}
          </Card>

          <CategoryStatsSection period={period} currency={currency} />
        </>
      )}

      <Card>
        <ThemeToggle />
        <Link href="/profile" style={styles.link}>
          Mon profil
        </Link>
      </Card>

      <View style={styles.footer}>
        <LogoutButton />
      </View>
    </Screen>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
    },
    row: {
      flexDirection: 'row',
      gap: 16,
    },
    centered: {
      paddingVertical: 40,
      alignItems: 'center',
    },
    errorCard: {
      gap: 12,
    },
    errorText: {
      fontSize: 15,
      color: colors.danger,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    empty: {
      fontSize: 14,
      color: colors.textMuted,
      paddingVertical: 12,
    },
    link: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primary,
    },
    footer: {
      marginTop: 'auto',
    },
  });
