import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslation from "./locales/en/translation.json";
import npTranslation from "./locales/np/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "np",
    resources: {
      np: { translation: npTranslation },
      en: { translation: enTranslation }
    },
    interpolation: { escapeValue: false }
  });

export default i18n;
