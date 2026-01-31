import { ColorValue } from "react-native";

export interface Category {
  id: string;
  key: string;
  labelKey: string;
  icon: string;
  createdAt: number;
  isDefault: boolean;
}

export interface Note {
  id: string;
  content: string;
  categoryId: string;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt?: number;
}

export type ThemeMode = "light" | "dark" | "auto";
export type Language = "en" | "vi";

export interface ThemeColors {
  background: string;
  header: string;
  accent: string;
  text: string;
  textSecondary: string;
  tabBar: string;
  tabBarInactive: string;
  cardBackground: ColorValue;
  cardBorder: ColorValue;
  gradientBackgroundColors: [ColorValue, ColorValue, ...ColorValue[]];
}
