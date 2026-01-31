import { Tabs } from 'expo-router';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks';
import { Ionicons } from '@expo/vector-icons';

function TabBarIcon({
  name,
  color,
  size = 24,
}: {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size?: number;
}) {
  return <Ionicons name={name} size={size} color={color} />;
}

function FloatingActionButton() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={styles.fabContainer}>
      <Pressable
        style={[styles.fab, { backgroundColor: colors.accent }]}
        onPress={() => router.push('/new-note')}
      >
        <Ionicons name="add" size={32} color="#ffffff" />
      </Pressable>
    </View>
  );
}

export default function TabLayout() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.tabBarInactive,
          tabBarStyle: {
            backgroundColor: colors.tabBar,
            borderTopColor: colors.border,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t('home.title'),
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="home-outline" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="summary"
          options={{
            title: t('summary.title'),
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="stats-chart-outline" color={color} />
            ),
          }}
        />
      </Tabs>
      <FloatingActionButton />
    </View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
