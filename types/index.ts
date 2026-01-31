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

export type ThemeMode = 'light' | 'dark' | 'auto';
export type Language = 'en' | 'vi';

export interface ThemeColors {
  background: string;
  card: string;
  accent: string;
  text: string;
  textSecondary: string;
  border: string;
  tabBar: string;
  tabBarInactive: string;
}
