import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from '@/Languages/en';
import { bn } from '@/Languages/bn';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: en,
      bn: bn,
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
