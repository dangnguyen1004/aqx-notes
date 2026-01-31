import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks';

interface SettingsLinkProps {
  icon?: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  showArrow?: boolean;
  rightElement?: React.ReactNode;
}

export const SettingsLink: React.FC<SettingsLinkProps> = ({
  icon,
  label,
  onPress,
  showArrow = true,
  rightElement,
}) => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colors.card, opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={onPress}
    >
      <View style={styles.leftSection}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={colors.text}
            style={styles.icon}
          />
        )}
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      </View>
      {rightElement ? (
        rightElement
      ) : showArrow ? (
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 16,
  },
});
