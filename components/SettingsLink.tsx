import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { RADIUS, SPACING } from "../constants";
import { useTheme } from "../hooks";

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
        { backgroundColor: colors.cardBackground, opacity: pressed ? 0.7 : 1 },
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
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.textSecondary}
        />
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: SPACING.md,
  },
  label: {
    fontSize: 16,
  },
});
