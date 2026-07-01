import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/core/ui/Screen';
import { Card } from '@/core/ui/Card';
import { Button } from '@/core/ui/Button';
import { FormModal } from '@/core/ui/FormModal';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { useProfile } from '@/features/profile/use-profile';
import { useTransactionList } from '@/features/transactions/use-transactions';
import { useDeleteTransaction } from '@/features/transactions/use-delete-transaction';
import { TransactionItem } from '@/features/transactions/TransactionItem';
import { TransactionFilters } from '@/features/transactions/TransactionFilters';
import { TransactionForm } from '@/features/transactions/TransactionForm';
import type {
  Transaction,
  TransactionFilters as TransactionFiltersValue,
  TransactionType,
} from '@/features/transactions/transaction.types';

const PAGE_LIMIT = 20;

const TYPE_TABS: { type: TransactionType; label: string }[] = [
  { type: 'expense', label: 'Dépense' },
  { type: 'income', label: 'Revenu' },
];

export default function TransactionsScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const { data: profile } = useProfile();
  const currency = profile?.currency ?? 'EUR';

  const [filters, setFilters] = useState<TransactionFiltersValue>({
    page: 1,
    limit: PAGE_LIMIT,
  });

  const { data, isLoading, isFetching, isError, refetch } =
    useTransactionList(filters);

  const deleteMutation = useDeleteTransaction();

  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [formType, setFormType] = useState<TransactionType>('expense');

  const openCreate = () => {
    setEditing(null);
    setFormType('expense');
    setCreating(true);
  };

  const openEdit = (transaction: Transaction) => {
    setCreating(false);
    setFormType(transaction.type);
    setEditing(transaction);
  };

  const closeModal = () => {
    setCreating(false);
    setEditing(null);
  };

  const confirmDelete = () => {
    if (!editing) return;
    Alert.alert(
      'Supprimer la transaction',
      `Voulez-vous vraiment supprimer « ${editing.label} » ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () =>
            deleteMutation.mutate(editing.id, { onSuccess: closeModal }),
        },
      ],
    );
  };

  const page = data?.page ?? 1;
  const total = data?.total ?? 0;
  const limit = data?.limit ?? PAGE_LIMIT;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const goToPage = (next: number) => {
    setFilters((prev) => ({ ...prev, page: next }));
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <Pressable style={styles.addButton} onPress={openCreate} hitSlop={8}>
          <Ionicons name="add" size={22} color={colors.primaryText} />
        </Pressable>
      </View>

      <TransactionFilters filters={filters} onChange={setFilters} />

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : isError || !data ? (
        <Pressable style={styles.centered} onPress={() => refetch()}>
          <Text style={styles.error}>
            Impossible de charger les transactions. Touchez pour réessayer.
          </Text>
        </Pressable>
      ) : data.data.length === 0 ? (
        <Text style={styles.empty}>
          Aucune transaction ne correspond à ces filtres.
        </Text>
      ) : (
        <>
          <Card>
            {data.data.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                currency={currency}
                onPress={openEdit}
              />
            ))}
          </Card>

          <View style={styles.pagination}>
            <Pressable
              style={styles.pageButton}
              disabled={page <= 1}
              onPress={() => goToPage(page - 1)}
              hitSlop={8}
            >
              <Ionicons
                name="chevron-back"
                size={20}
                color={page <= 1 ? colors.textMuted : colors.primary}
              />
            </Pressable>
            <Text style={styles.pageLabel}>
              Page {page} / {totalPages}
              {isFetching ? ' …' : ''}
            </Text>
            <Pressable
              style={styles.pageButton}
              disabled={page >= totalPages}
              onPress={() => goToPage(page + 1)}
              hitSlop={8}
            >
              <Ionicons
                name="chevron-forward"
                size={20}
                color={page >= totalPages ? colors.textMuted : colors.primary}
              />
            </Pressable>
          </View>
        </>
      )}

      <FormModal
        visible={creating || editing !== null}
        onClose={closeModal}
        title={editing ? 'Modifier la transaction' : 'Nouvelle transaction'}
      >
        <View style={styles.segmented}>
          {TYPE_TABS.map((tab) => {
            const active = formType === tab.type;
            return (
              <Pressable
                key={tab.type}
                onPress={() => setFormType(tab.type)}
                style={[styles.segment, active ? styles.segmentActive : null]}
              >
                <Text
                  style={active ? styles.segmentTextActive : styles.segmentText}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <TransactionForm
          key={`${editing?.id ?? 'new'}-${formType}`}
          type={formType}
          transaction={editing ?? undefined}
          onSuccess={closeModal}
        />

        {editing ? (
          <Button
            label="Supprimer"
            variant="ghost"
            onPress={confirmDelete}
            loading={deleteMutation.isPending}
          />
        ) : null}
      </FormModal>
    </Screen>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
    },
    addButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
    },
    centered: {
      paddingVertical: 40,
      alignItems: 'center',
    },
    error: {
      fontSize: 15,
      color: colors.danger,
      textAlign: 'center',
    },
    empty: {
      fontSize: 14,
      color: colors.textMuted,
      paddingVertical: 24,
      textAlign: 'center',
    },
    pagination: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
    },
    pageButton: {
      padding: 4,
    },
    pageLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    segmented: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      overflow: 'hidden',
    },
    segment: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      backgroundColor: colors.surface,
    },
    segmentActive: {
      backgroundColor: colors.primary,
    },
    segmentText: {
      color: colors.text,
      fontWeight: '600',
    },
    segmentTextActive: {
      color: colors.primaryText,
      fontWeight: '600',
    },
  });
