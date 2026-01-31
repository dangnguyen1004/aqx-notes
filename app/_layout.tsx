import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCategoriesStore, useSettingsStore } from '../store';
import { ThemeProvider } from '../providers';
import { useTheme } from '../hooks';
import '../i18n';

function RootLayoutNav() {
  const { colors, isDark } = useTheme();
  const { initializeCategories } = useCategoriesStore();

  useEffect(() => {
    initializeCategories();
  }, [initializeCategories]);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="new-note"
          options={{
            presentation: 'card',
          }}
        />
        <Stack.Screen name="settings/index" />
        <Stack.Screen name="settings/trash" />
        <Stack.Screen name="note/[id]" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  // Hydrate settings store
  useSettingsStore();

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}
