import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/core/ui/Button';
import { TextField } from '@/core/ui/TextField';
import { ApiError } from '@/core/api/api-error';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { CategoryPicker } from './CategoryPicker';
import { useCreateTransaction } from './use-create-transaction';
import {
  parseAmount,
  transactionFormSchema,
  type TransactionFormValues,
} from './transaction.schema';
import type { TransactionType } from './transaction.types';

/** Date du jour au format AAAA-MM-JJ (heure locale). */
function todayIso(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

const COPY: Record<
  TransactionType,
  { labelField: string; labelPlaceholder: string; submit: string; success: string }
> = {
  expense: {
    labelField: 'Libellé',
    labelPlaceholder: 'Ex : Courses du week-end',
    submit: 'Ajouter la dépense',
    success: 'Dépense ajoutée avec succès.',
  },
  income: {
    labelField: 'Source',
    labelPlaceholder: 'Ex : Salaire',
    submit: 'Ajouter le revenu',
    success: 'Revenu ajouté avec succès.',
  },
};

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 404) return 'La catégorie sélectionnée est introuvable.';
    if (error.status === 400) {
      return 'Validation échouée. Vérifiez les champs du formulaire.';
    }
  }
  return 'Une erreur est survenue. Veuillez réessayer.';
}

export function TransactionForm({ type }: { type: TransactionType }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const copy = COPY[type];
  const createMutation = useCreateTransaction();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: '',
      label: '',
      categoryId: '',
      date: todayIso(),
      note: '',
    },
  });

  const onSubmit = handleSubmit((values) => {
    createMutation.mutate(
      {
        type,
        amount: parseAmount(values.amount),
        label: values.label,
        categoryId: values.categoryId,
        date: new Date(`${values.date}T00:00:00`).toISOString(),
        note: values.note?.trim() ? values.note.trim() : undefined,
      },
      {
        onSuccess: () => {
          reset({
            amount: '',
            label: '',
            categoryId: '',
            date: todayIso(),
            note: '',
          });
        },
      },
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
        name="label"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label={copy.labelField}
            placeholder={copy.labelPlaceholder}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            maxLength={60}
            error={errors.label?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="categoryId"
        render={({ field: { value, onChange } }) => (
          <CategoryPicker
            value={value}
            onChange={onChange}
            error={errors.categoryId?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="date"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Date"
            placeholder="AAAA-MM-JJ"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            error={errors.date?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="note"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Note (optionnel)"
            placeholder="Ajoutez un détail…"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            multiline
            numberOfLines={3}
            maxLength={255}
            error={errors.note?.message}
          />
        )}
      />

      {createMutation.isError ? (
        <Text style={styles.serverError}>
          {errorMessage(createMutation.error)}
        </Text>
      ) : null}
      {createMutation.isSuccess ? (
        <Text style={styles.success}>{copy.success}</Text>
      ) : null}

      <Button
        label={copy.submit}
        onPress={onSubmit}
        loading={createMutation.isPending}
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
    success: {
      fontSize: 14,
      color: colors.success,
    },
  });
