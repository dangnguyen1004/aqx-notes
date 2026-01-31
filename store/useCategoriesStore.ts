import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../types';
import { DEFAULT_CATEGORIES } from '../constants';

interface CategoriesState {
  categories: Category[];
  initialized: boolean;
  initializeCategories: () => void;
  addCategory: (key: string, labelKey: string, icon: string) => void;
  getCategoryById: (id: string) => Category | undefined;
}

export const useCategoriesStore = create<CategoriesState>()(
  persist(
    (set, get) => ({
      categories: [],
      initialized: false,

      initializeCategories: () => {
        if (get().initialized) return;

        const now = Date.now();
        const defaultCategories: Category[] = DEFAULT_CATEGORIES.map((cat) => ({
          ...cat,
          createdAt: now,
        }));

        set({
          categories: defaultCategories,
          initialized: true,
        });
      },

      addCategory: (key: string, labelKey: string, icon: string) => {
        const newCategory: Category = {
          id: uuidv4(),
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
    }
  )
);
