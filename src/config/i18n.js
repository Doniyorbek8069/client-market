import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import uzTrans from '../languages/uz.json';
import uzKrTrans from '../languages/uz_kr.json';
import ruTrans from '../languages/ru.json';

const resources = {
  uz: { translation: uzTrans },
  uz_kr: { translation: uzKrTrans },
  ru: { translation: ruTrans },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
