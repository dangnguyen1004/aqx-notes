import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryCard, ScreenHeader } from "../../components";
import { useTheme } from "../../hooks";
import { useCategoriesStore } from "../../store";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();
  const { categories } = useCategoriesStore();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <ScreenHeader
        title={t("home.title")}
        rightAction={
          <Pressable
            onPress={() => router.push("/settings")}
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          >
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </Pressable>
        }
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Ionicons
              name="time-outline"
              size={16}
              color={colors.textSecondary}
            />
            <Text style={[styles.recentText, { color: colors.textSecondary }]}>
              {t("home.recentlyCreated")}
            </Text>
          </View>
        </View>

        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  recentSection: {
    marginBottom: 32,
  },
  recentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  recentText: {
    fontSize: 14,
  },
});
