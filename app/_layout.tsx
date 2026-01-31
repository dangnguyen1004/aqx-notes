import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../hooks";
import "../i18n";
import { useCategoriesStore, useSettingsStore } from "../store";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  // Hydrate stores
  useSettingsStore();
  useCategoriesStore();

  const { colors, isDark } = useTheme();

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
