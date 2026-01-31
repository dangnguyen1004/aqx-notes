import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SPACING } from "../../constants";
import { useTheme } from "../../hooks";

function FloatingActionButton({ bottomInset }: { bottomInset: number }) {
  const router = useRouter();

  return (
    <View
      style={[styles.fabContainer, { bottom: 30 + bottomInset }]}
      pointerEvents="box-none"
    >
      <Pressable style={styles.fab} onPress={() => router.push("/new-note")}>
        <Ionicons name="add" size={32} color="#ffffff" />
      </Pressable>
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.tabBarInactive,
          tabBarStyle: {
            backgroundColor: colors.tabBar,
            borderTopColor: colors.tabBar,
            height: 60 + insets.bottom,
            paddingBottom: SPACING.sm + insets.bottom,
            paddingTop: SPACING.sm,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("home.title"),
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="summary"
          options={{
            title: t("summary.title"),
            tabBarIcon: ({ color }) => (
              <Ionicons name="stats-chart-outline" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
      <FloatingActionButton bottomInset={insets.bottom} />
    </>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#e94560",
    justifyContent: "center",
    alignItems: "center",
    elevation: SPACING.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: SPACING.xs },
    shadowOpacity: 0.3,
    shadowRadius: SPACING.xs,
  },
});
