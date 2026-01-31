import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useTheme } from "../hooks";
import "../i18n";
import { useCategoriesStore, useSettingsStore } from "../store";

export default function RootLayout() {
  // Hydrate settings store
  useSettingsStore();

  const { colors, isDark } = useTheme();
  const { initializeCategories } = useCategoriesStore();

  useEffect(() => {
    initializeCategories();
  }, [initializeCategories]);

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="new-note" />
        <Stack.Screen name="settings/index" />
        <Stack.Screen name="settings/trash" />
        <Stack.Screen name="note/[id]" />
      </Stack>
    </>
  );
}
