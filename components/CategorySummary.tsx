import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { RADIUS, SPACING } from "../constants";
import { useTheme } from "../hooks";
import { useNotesStore } from "../store";
import { Category } from "../types";

interface CategorySummaryProps {
  category: Category;
}

export const CategorySummary: React.FC<CategorySummaryProps> = ({
  category,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { getNotesCountByCategory } = useNotesStore();

  const count = getNotesCountByCategory(category.id);

  const onPress = () => {
    // TODO: Navigate to category details screen
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.cardBackground }]}
    >
      <View style={styles.leftSection}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <Text style={styles.icon}>{category.icon}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t(category.labelKey)}
          </Text>
          <Text style={[styles.count, { color: colors.textSecondary }]}>
            {t("summary.totalRecords", { count })}
          </Text>
        </View>
      </View>
      <Pressable
        style={[styles.detailButton, { backgroundColor: colors.accent }]}
        onPress={onPress}
      >
        <Text style={styles.detailText}>{t("common.detail")}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.xxl,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: SPACING.xs,
  },
  count: {
    fontSize: 12,
  },
  detailButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.xl,
  },
  detailText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
});
