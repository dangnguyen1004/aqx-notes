import { LinearGradient } from "expo-linear-gradient";
import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { useTheme } from "../hooks/useTheme";

interface GradientBackgroundProps
  extends PropsWithChildren<SafeAreaViewProps> {}

export function GradientBackground({
  children,
  ...safeAreaViewProps
}: GradientBackgroundProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      {...safeAreaViewProps}
    >
      <LinearGradient
        colors={[...colors.gradientBackgroundColors]}
        locations={[0.1445, 0.4917, 0.7482, 1.0]}
        start={{ x: 0.9, y: 0 }}
        end={{ x: 0.1, y: 1 }}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});
