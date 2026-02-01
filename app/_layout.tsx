import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "../hooks";
import "../i18n";
import { useCategoriesStore, useSettingsStore } from "../store";

export default function RootLayout() {
  // Hydrate stores
  useSettingsStore();
  useCategoriesStore();

  const { colors, isDark } = useTheme();

  return (
    <GestureHandlerRootView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
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
          <Stack.Screen name="category/[id]" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
