import { useColorScheme } from 'react-native';
import { useSettingsStore } from '../store';
import { darkColors, lightColors } from '../constants';
import { ThemeColors } from '../types';

export const useTheme = (): { colors: ThemeColors; isDark: boolean } => {
  const systemColorScheme = useColorScheme();
  const theme = useSettingsStore((state) => state.theme) ?? 'auto';

  const isDark =
    theme === 'auto'
      ? systemColorScheme === 'dark'
      : theme === 'dark';

  const colors = isDark ? darkColors : lightColors;

  return { colors, isDark };
};
