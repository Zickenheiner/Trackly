import { useMemo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export function TextField({
  label,
  error,
  style,
  secureTextEntry,
  ...props
}: TextFieldProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            secureTextEntry ? styles.inputWithIcon : null,
            error ? styles.inputError : null,
            style,
          ]}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...props}
        />
        {secureTextEntry ? (
          <Pressable
            style={styles.toggleIcon}
            onPress={() => setIsPasswordVisible((prev) => !prev)}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={colors.textMuted}
            />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    container: {
      gap: 6,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    inputWrapper: {
      justifyContent: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.background,
    },
    inputWithIcon: {
      paddingRight: 44,
    },
    inputError: {
      borderColor: colors.danger,
    },
    toggleIcon: {
      position: 'absolute',
      right: 12,
      height: '100%',
      justifyContent: 'center',
    },
    error: {
      fontSize: 13,
      color: colors.danger,
    },
  });
