import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "np" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md transition-all duration-200 text-sm font-medium"
      title={i18n.language === "en" ? "Switch to Nepali" : "Switch to English"}
    >
      <span className="text-md">🌐</span>
      <span className="hidden sm:inline">
        {i18n.language === "en" ? "ने" : "En"}
      </span>
      <span className="sm:hidden">
        {i18n.language === "en" ? "NP" : "EN"}
      </span>
    </button>
  );
}