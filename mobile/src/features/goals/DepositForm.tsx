import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/core/ui/Button';
import { TextField } from '@/core/ui/TextField';
import { ApiError } from '@/core/api/api-error';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { useAddDeposit } from './use-add-deposit';
import {
  depositFormSchema,
  parseAmount,
  type DepositFormValues,
} from './goal.schema';
import type { Goal } from './goal.types';

interface DepositFormProps {
  goal: Goal;
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

export function DepositForm({ goal, onSuccess }: DepositFormProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const addDepositMutation = useAddDeposit();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DepositFormValues>({
    resolver: zodResolver(depositFormSchema),
    defaultValues: {
      amount: '',
      date: '',
    },
  });

  const onSubmit = handleSubmit((values) => {
    addDepositMutation.mutate(
      {
        id: goal.id,
        payload: {
          amount: parseAmount(values.amount),
          date: values.date?.trim() ? values.date.trim() : undefined,
        },
      },
      { onSuccess },
    );
  });

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="amount"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Montant"
            placeholder="0.00"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="decimal-pad"
            error={errors.amount?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="date"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Date (optionnel)"
            placeholder="AAAA-MM-JJ"
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            error={errors.date?.message}
          />
        )}
      />

      {addDepositMutation.isError ? (
        <Text style={styles.serverError}>
          {errorMessage(addDepositMutation.error)}
        </Text>
      ) : null}

      <Button
        label="Ajouter le dépôt"
        onPress={onSubmit}
        loading={addDepositMutation.isPending}
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
