import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
} from 'react-native';
import { colors } from './colors';

interface ButtonProps extends PressableProps {
  label: string;
  loading?: boolean;
  variant?: 'primary' | 'ghost';
}

export function Button({
  label,
  loading = false,
  variant = 'primary',
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' ? styles.primary : styles.ghost,
        pressed && !isDisabled ? styles.pressed : null,
        isDisabled ? styles.disabled : null,
      ]}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={colors.primaryText} />
      ) : (
        <Text
          style={variant === 'primary' ? styles.primaryLabel : styles.ghostLabel}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  primaryLabel: {
    color: colors.primaryText,
    fontSize: 16,
    fontWeight: '600',
  },
  ghostLabel: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
});
