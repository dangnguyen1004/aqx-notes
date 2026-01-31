import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { changeLanguage } from "../i18n";
import { Language, ThemeMode } from "../types";

interface SettingsState {
  theme: ThemeMode;
  language: Language;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: Language) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "dark",
      language: "en",

      setTheme: (theme: ThemeMode) => {
        set({ theme });
      },

      setLanguage: (language: Language) => {
        changeLanguage(language);
        set({ language });
      },
    }),
    {
      name: "aqx-settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.language) {
          changeLanguage(state.language);
        }
      },
    }
  )
);
