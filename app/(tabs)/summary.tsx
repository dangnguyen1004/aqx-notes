import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import {
  CategorySummary,
  GradientBackground,
  ScreenHeader,
} from "../../components";
import { SPACING } from "../../constants";
import { useCategoriesStore } from "../../store";

export default function SummaryScreen() {
  const { t } = useTranslation();
  const { categories } = useCategoriesStore();

  return (
    <GradientBackground edges={["top"]}>
      <ScreenHeader title={t("summary.title")} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category) => (
          <CategorySummary key={category.id} category={category} />
        ))}
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.xl,
    paddingBottom: 30,
  },
});
