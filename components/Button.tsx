import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { RADIUS, SPACING } from "../constants";
import { useTheme } from "../hooks";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<PressableProps, "style"> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = true,
  loading = false,
  disabled,
  style,
  ...pressableProps
}) => {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return colors.textSecondary;
    switch (variant) {
      case "primary":
        return colors.accent;
      case "secondary":
        return colors.background;
      case "ghost":
        return "transparent";
      case "danger":
        return "#666666";
      default:
        return colors.accent;
    }
  };

  const getTextColor = () => {
    if (disabled && variant !== "ghost") return "#ffffff";
    switch (variant) {
      case "primary":
      case "danger":
        return "#ffffff";
      case "secondary":
        return colors.textSecondary;
      case "ghost":
        return colors.accent;
      default:
        return "#ffffff";
    }
  };

  const getPadding = () => {
    switch (size) {
      case "sm":
        return { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md };
      case "md":
        return { paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg };
      case "lg":
        return { paddingVertical: SPACING.lg, paddingHorizontal: SPACING.xl };
      default:
        return { paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "sm":
        return 14;
      case "md":
        return 16;
      case "lg":
        return 18;
      default:
        return 16;
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return 16;
      case "md":
        return 20;
      case "lg":
        return 24;
      default:
        return 20;
    }
  };

  const backgroundColor = getBackgroundColor();
  const textColor = getTextColor();
  const padding = getPadding();
  const fontSize = getFontSize();
  const iconSize = getIconSize();

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={textColor} size="small" />;
    }

    const iconElement = icon && (
      <Ionicons name={icon} size={iconSize} color={textColor} />
    );

    return (
      <>
        {icon && iconPosition === "left" && iconElement}
        <Text
          style={[
            styles.text,
            { color: textColor, fontSize },
            icon && { marginLeft: iconPosition === "left" ? SPACING.sm : 0 },
            icon && { marginRight: iconPosition === "right" ? SPACING.sm : 0 },
          ]}
        >
          {title}
        </Text>
        {icon && iconPosition === "right" && iconElement}
      </>
    );
  };

  return (
    <Pressable
      {...pressableProps}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor },
        padding,
        fullWidth && styles.fullWidth,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {renderContent()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.md,
  },
  fullWidth: {
    width: "100%",
  },
  text: {
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.7,
  },
});
