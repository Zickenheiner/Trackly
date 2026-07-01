import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/core/ui/Card';
import { Button } from '@/core/ui/Button';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { formatCurrency } from '@/core/format/currency';
import type { Goal } from './goal.types';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
  onAddDeposit: (goal: Goal) => void;
  currency?: string;
}

/** Borne la progression entre 0 et 100 pour la largeur de la barre. */
function clampProgress(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

export function GoalCard({
  goal,
  onEdit,
  onDelete,
  onAddDeposit,
  currency = 'EUR',
}: GoalCardProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const isCompleted = goal.status === 'completed';
  const progress = clampProgress(goal.progress);

  const deadlineLabel = goal.deadline
    ? new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(goal.deadline))
    : null;

  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={1}>
          {goal.name}
        </Text>
        <View style={styles.headerActions}>
          <View style={[styles.badge, isCompleted ? styles.badgeDone : null]}>
            <Text
              style={[
                styles.badgeText,
                isCompleted ? styles.badgeTextDone : null,
              ]}
            >
              {isCompleted ? 'Atteint' : 'En cours'}
            </Text>
          </View>
          <Pressable
            hitSlop={8}
            onPress={() => onEdit(goal)}
            accessibilityLabel="Modifier l'objectif"
          >
            <Ionicons
              name="create-outline"
              size={20}
              color={colors.textMuted}
            />
          </Pressable>
          <Pressable
            hitSlop={8}
            onPress={() => onDelete(goal)}
            accessibilityLabel="Supprimer l'objectif"
          >
            <Ionicons name="trash-outline" size={20} color={colors.danger} />
          </Pressable>
        </View>
      </View>

      <View style={styles.progressBlock}>
        <View style={styles.progressRow}>
          <Text style={styles.muted}>Progression</Text>
          <Text style={styles.progressValue}>{Math.round(goal.progress)}%</Text>
        </View>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%` },
              isCompleted ? styles.progressFillDone : null,
            ]}
          />
        </View>
      </View>

      <View style={styles.amountRow}>
        <Text style={styles.muted}>Épargné</Text>
        <Text style={styles.amount}>
          {formatCurrency(goal.savedAmount, currency)}
        </Text>
      </View>
      <View style={styles.amountRow}>
        <Text style={styles.muted}>Objectif</Text>
        <Text style={styles.amount}>
          {formatCurrency(goal.targetAmount, currency)}
        </Text>
      </View>

      {deadlineLabel ? (
        <View style={styles.deadlineRow}>
          <Ionicons
            name="calendar-outline"
            size={14}
            color={colors.textMuted}
          />
          <Text style={styles.deadlineText}>Échéance : {deadlineLabel}</Text>
        </View>
      ) : null}

      {goal.description ? (
        <Text style={styles.description} numberOfLines={2}>
          {goal.description}
        </Text>
      ) : null}

      {!isCompleted ? (
        <Button
          label="Ajouter un dépôt"
          variant="ghost"
          onPress={() => onAddDeposit(goal)}
        />
      ) : null}
    </Card>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    name: {
      flex: 1,
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    badge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
      backgroundColor: colors.surface,
    },
    badgeDone: {
      backgroundColor: colors.success,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textMuted,
    },
    badgeTextDone: {
      color: colors.primaryText,
    },
    progressBlock: {
      gap: 6,
    },
    progressRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    progressValue: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    progressTrack: {
      height: 8,
      borderRadius: 999,
      backgroundColor: colors.surface,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 999,
      backgroundColor: colors.primary,
    },
    progressFillDone: {
      backgroundColor: colors.success,
    },
    amountRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    muted: {
      fontSize: 14,
      color: colors.textMuted,
    },
    amount: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    deadlineRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    deadlineText: {
      fontSize: 13,
      color: colors.textMuted,
    },
    description: {
      fontSize: 14,
      color: colors.textMuted,
    },
  });
