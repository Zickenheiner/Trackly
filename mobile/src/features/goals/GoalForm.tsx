import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/core/ui/Button';
import { TextField } from '@/core/ui/TextField';
import { ApiError } from '@/core/api/api-error';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { useCreateGoal } from './use-create-goal';
import { useUpdateGoal } from './use-update-goal';
import {
  goalFormSchema,
  parseAmount,
  type GoalFormValues,
} from './goal.schema';
import type { Goal } from './goal.types';

interface GoalFormProps {
  goal?: Goal;
  onSuccess: () => void;
}

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 404) return 'Objectif introuvable.';
    if (error.status === 400) {
      return 'Validation échouée. Vérifiez les champs du formulaire.';
    }
  }
  return 'Une erreur est survenue. Veuillez réessayer.';
}

export function GoalForm({ goal, onSuccess }: GoalFormProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const isEditing = Boolean(goal);

  const createMutation = useCreateGoal();
  const updateMutation = useUpdateGoal();
  const mutation = isEditing ? updateMutation : createMutation;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalFormValues>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      name: goal?.name ?? '',
      targetAmount: goal ? String(goal.targetAmount) : '',
      deadline: goal?.deadline ? goal.deadline.slice(0, 10) : '',
      initialAmount: '',
      description: goal?.description ?? '',
    },
  });

  const onSubmit = handleSubmit((values) => {
    const deadline = values.deadline?.trim()
      ? values.deadline.trim()
      : undefined;
    const description = values.description?.trim()
      ? values.description.trim()
      : undefined;

    if (isEditing && goal) {
      updateMutation.mutate(
        {
          id: goal.id,
          payload: {
            name: values.name,
            targetAmount: parseAmount(values.targetAmount),
            deadline,
            description,
          },
        },
        { onSuccess },
      );
      return;
    }

    createMutation.mutate(
      {
        name: values.name,
        targetAmount: parseAmount(values.targetAmount),
        deadline,
        initialAmount: values.initialAmount?.trim()
          ? parseAmount(values.initialAmount)
          : undefined,
        description,
      },
      { onSuccess },
    );
  });

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Nom"
            placeholder="Ex : Vacances d'été"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            maxLength={100}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="targetAmount"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Montant cible"
            placeholder="0.00"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="decimal-pad"
            error={errors.targetAmount?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="deadline"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Échéance (optionnel)"
            placeholder="AAAA-MM-JJ"
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            error={errors.deadline?.message}
          />
        )}
      />

      {!isEditing ? (
        <Controller
          control={control}
          name="initialAmount"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              label="Montant initial (optionnel)"
              placeholder="0.00"
              value={value ?? ''}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="decimal-pad"
              error={errors.initialAmount?.message}
            />
          )}
        />
      ) : null}

      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Description (optionnel)"
            placeholder="Décrivez votre objectif…"
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            multiline
            numberOfLines={3}
            maxLength={500}
            error={errors.description?.message}
          />
        )}
      />

      {mutation.isError ? (
        <Text style={styles.serverError}>{errorMessage(mutation.error)}</Text>
      ) : null}

      <Button
        label={isEditing ? 'Enregistrer' : "Créer l'objectif"}
        onPress={onSubmit}
        loading={mutation.isPending}
      />
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    form: {
      gap: 16,
    },
    serverError: {
      fontSize: 14,
      color: colors.danger,
    },
  });
