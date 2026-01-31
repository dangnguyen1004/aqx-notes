import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from './locales/en.json';
import vi from './locales/vi.json';

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

const deviceLanguage = getLocales()[0]?.languageCode ?? 'en';
const initialLanguage = deviceLanguage === 'vi' ? 'vi' : 'en';

i18next.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v4',
});

export const changeLanguage = (lng: 'en' | 'vi') => {
  i18next.changeLanguage(lng);
};

export default i18next;
