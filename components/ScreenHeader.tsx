import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { RADIUS, SPACING } from "../constants";
import { useTheme } from "../hooks";

interface ScreenHeaderProps {
  title: string;
  showBack?: boolean;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
}

export function ScreenHeader({
  title,
  showBack = false,
  leftAction,
  rightAction,
}: ScreenHeaderProps) {
  const { colors } = useTheme();
  const router = useRouter();

  if (showBack || leftAction) {
    return (
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        {leftAction ? (
          leftAction
        ) : (
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text} />
            <Text style={[styles.backText, { color: colors.text }]}>
              {title}
            </Text>
          </Pressable>
        )}
        {rightAction}
      </View>
    );
  }

  return (
    <View style={[styles.headerTitle, { backgroundColor: colors.header }]}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {rightAction}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderBottomLeftRadius: RADIUS.lg,
    borderBottomRightRadius: RADIUS.lg,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: SPACING.xs,
  },
  headerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderBottomLeftRadius: RADIUS.lg,
    borderBottomRightRadius: RADIUS.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
