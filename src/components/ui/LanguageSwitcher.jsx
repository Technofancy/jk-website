import React from "react";
import { useTranslation } from "react-i18next";
import Button from "./Button";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "np" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      title={i18n.language === "en" ? "Switch to Nepali" : "Switch to English"}
    >
      <span className="hidden sm:inline">
        {i18n.language === "en" ? "ने" : "En"}
      </span>
      <span className="sm:hidden">
        {i18n.language === "en" ? "ने" : "EN"}
      </span>
    </Button>
  );
}