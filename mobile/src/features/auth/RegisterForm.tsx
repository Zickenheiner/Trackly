import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from '@/core/ui/Button';
import { TextField } from '@/core/ui/TextField';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { useRegister } from './use-register';
import { registerSchema, type RegisterFormValues } from './register.schema';
import type { Civility } from './auth.types';

const CIVILITIES: Civility[] = ['Mr.', 'Mrs.'];

export function RegisterForm() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const registerMutation = useRegister();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      title: 'Mr.',
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      password: '',
      currency: 'EUR',
    },
  });

  const onSubmit = handleSubmit((values) => {
    registerMutation.mutate({ ...values, age: Number(values.age) });
  });

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange } }) => (
          <View style={styles.civility}>
            <Text style={styles.label}>Civilité</Text>
            <View style={styles.segmented}>
              {CIVILITIES.map((option) => {
                const active = value === option;
                return (
                  <Pressable
                    key={option}
                    onPress={() => onChange(option)}
                    style={[styles.segment, active ? styles.segmentActive : null]}
                  >
                    <Text
                      style={active ? styles.segmentTextActive : styles.segmentText}
                    >
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}
      />

      <Controller
        control={control}
        name="firstName"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Prénom"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="words"
            error={errors.firstName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Nom"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="words"
            error={errors.lastName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="age"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Âge"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="number-pad"
            error={errors.age?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Mot de passe"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="currency"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Devise"
            value={value}
            onChangeText={(text) => onChange(text.toUpperCase())}
            onBlur={onBlur}
            autoCapitalize="characters"
            maxLength={3}
            error={errors.currency?.message}
          />
        )}
      />

      {registerMutation.isError ? (
        <Text style={styles.serverError}>{registerMutation.error.message}</Text>
      ) : null}

      <Button
        label="Créer mon compte"
        onPress={onSubmit}
        loading={registerMutation.isPending}
      />
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    form: {
      gap: 16,
    },
    civility: {
      gap: 6,
    },
    label: {
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
    serverError: {
      color: colors.danger,
      fontSize: 14,
    },
  });
