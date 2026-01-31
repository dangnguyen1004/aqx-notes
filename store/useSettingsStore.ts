import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, Language } from '../types';
import { changeLanguage } from '../i18n';

interface SettingsState {
  theme: ThemeMode;
  language: Language;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: Language) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'auto',
      language: 'en',

      setTheme: (theme: ThemeMode) => {
        set({ theme });
      },

      setLanguage: (language: Language) => {
        changeLanguage(language);
        set({ language });
      },
    }),
    {
      name: 'aqx-settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.language) {
          changeLanguage(state.language);
        }
      },
    }
  )
);
