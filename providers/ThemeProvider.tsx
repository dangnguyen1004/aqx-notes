import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { useSettingsStore } from '../store';
import { darkColors, lightColors } from '../constants';
import { ThemeColors } from '../types';

interface ThemeContextType {
  colors: ThemeColors;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const { theme } = useSettingsStore();

  const isDark =
    theme === 'auto'
      ? systemColorScheme === 'dark'
      : theme === 'dark';

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
