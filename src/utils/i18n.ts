import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../public/locales/en.json';
import jp from '../../public/locales/jp.json';
import zh from '../../public/locales/zh.json';

const resources = {
  en: {
    translation: en,
  },
  jp: {
    translation: jp,
  },
  zh: {
    translation: zh,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', //預設語言
  fallbackLng: 'en', //如果當前切換的語言沒有對應的翻譯則使用這個語言，
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
