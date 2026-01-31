import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { Category } from '../types';
import { DEFAULT_CATEGORIES } from '../constants';

interface CategoriesState {
  categories: Category[];
  initialized: boolean;
  addCategory: (key: string, labelKey: string, icon: string) => void;
  getCategoryById: (id: string) => Category | undefined;
}

export const useCategoriesStore = create<CategoriesState>()(
  persist(
    (set, get) => ({
      categories: [],
      initialized: false,

      addCategory: (key: string, labelKey: string, icon: string) => {
        const newCategory: Category = {
          id: Crypto.randomUUID(),
          key,
          labelKey,
          icon,
          createdAt: Date.now(),
          isDefault: false,
        };
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },

      getCategoryById: (id: string) => {
        return get().categories.find((cat) => cat.id === id);
      },
    }),
    {
      name: 'aqx-categories-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) return;

        // Initialize default categories only if not already initialized
        if (state && !state.initialized) {
          const now = Date.now();
          const defaultCategories: Category[] = DEFAULT_CATEGORIES.map((cat) => ({
            ...cat,
            createdAt: now,
          }));

          useCategoriesStore.setState({
            categories: defaultCategories,
            initialized: true,
          });
        }
      },
    }
  )
);
