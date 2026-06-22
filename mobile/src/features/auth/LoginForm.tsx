import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/core/ui/Button';
import { TextField } from '@/core/ui/TextField';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';
import { useLogin } from './use-login';
import { loginSchema, type LoginFormValues } from './login.schema';

export function LoginForm() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const loginMutation = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit((values) => {
    loginMutation.mutate(values);
  });

  return (
    <View style={styles.form}>
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

      {loginMutation.isError ? (
        <Text style={styles.serverError}>{loginMutation.error.message}</Text>
      ) : null}

      <Button
        label="Se connecter"
        onPress={onSubmit}
        loading={loginMutation.isPending}
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
      color: colors.danger,
      fontSize: 14,
    },
  });
