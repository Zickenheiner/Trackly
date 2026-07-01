import { type ReactNode, useMemo } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Modal as RNModal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme/theme-context';
import type { Palette } from '@/core/theme/palettes';

interface FormModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/**
 * Modale en feuille basse réutilisée pour les formulaires (création / édition),
 * équivalent des Dialog de l'app web.
 *
 * KeyboardAvoidingView fait remonter la feuille au-dessus du clavier afin que
 * le bouton de validation reste accessible (le clavier numérique iOS n'ayant
 * pas de touche pour se fermer). Un appui sur le fond ferme la modale.
 */
export function FormModal({
  visible,
  onClose,
  title,
  children,
}: FormModalProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleClose = () => {
    Keyboard.dismiss();
    onClose();
  };

  return (
    <RNModal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable style={styles.backdrop} onPress={handleClose} />
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={handleClose} hitSlop={8}>
              <Ionicons name="close" size={24} color={colors.textMuted} />
            </Pressable>
          </View>
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            {children}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    sheet: {
      maxHeight: '88%',
      backgroundColor: colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 8,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
    },
    content: {
      paddingHorizontal: 24,
      paddingBottom: 32,
      gap: 16,
    },
  });
