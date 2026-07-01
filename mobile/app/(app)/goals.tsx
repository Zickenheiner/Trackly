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
import { FormModal } from '@/core/ui/FormModal';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { useProfile } from '@/features/profile/use-profile';
import { useGoalList } from '@/features/goals/use-goals';
import { useDeleteGoal } from '@/features/goals/use-delete-goal';
import { GoalCard } from '@/features/goals/GoalCard';
import { GoalForm } from '@/features/goals/GoalForm';
import { DepositForm } from '@/features/goals/DepositForm';
import type { Goal } from '@/features/goals/goal.types';

export default function GoalsScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const { data: profile } = useProfile();
  const currency = profile?.currency ?? 'EUR';

  const { data: goals, isLoading, isError, refetch } = useGoalList();
  const deleteMutation = useDeleteGoal();

  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Goal | null>(null);
  const [depositing, setDepositing] = useState<Goal | null>(null);

  const closeModal = () => {
    setCreating(false);
    setEditing(null);
    setDepositing(null);
  };

  const confirmDelete = (goal: Goal) => {
    Alert.alert(
      "Supprimer l'objectif",
      `Voulez-vous vraiment supprimer « ${goal.name} » ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => deleteMutation.mutate(goal.id),
        },
      ],
    );
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>Objectifs</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => setCreating(true)}
          hitSlop={8}
        >
          <Ionicons name="add" size={22} color={colors.primaryText} />
        </Pressable>
      </View>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : isError || !goals ? (
        <Pressable style={styles.centered} onPress={() => refetch()}>
          <Text style={styles.error}>
            Impossible de charger les objectifs. Touchez pour réessayer.
          </Text>
        </Pressable>
      ) : goals.length === 0 ? (
        <Text style={styles.empty}>
          Aucun objectif d'épargne. Créez-en un avec le bouton +.
        </Text>
      ) : (
        goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            currency={currency}
            onEdit={setEditing}
            onDelete={confirmDelete}
            onAddDeposit={setDepositing}
          />
        ))
      )}

      <FormModal
        visible={creating || editing !== null}
        onClose={closeModal}
        title={editing ? "Modifier l'objectif" : 'Nouvel objectif'}
      >
        <GoalForm goal={editing ?? undefined} onSuccess={closeModal} />
      </FormModal>

      <FormModal
        visible={depositing !== null}
        onClose={closeModal}
        title="Ajouter un dépôt"
      >
        {depositing ? (
          <DepositForm goal={depositing} onSuccess={closeModal} />
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
  });
