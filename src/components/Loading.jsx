import React from "react";
import { useTranslation } from "react-i18next";

export default function Loading({ size = "medium", text = null }) {
  const { t } = useTranslation();
  
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} border-4 border-red-200 border-t-red-600 rounded-full animate-spin`}></div>
      {text && (
        <p className="mt-4 text-gray-600 text-center">{text}</p>
      )}
      {!text && (
        <p className="mt-4 text-gray-600 text-center">{t("common.loading")}</p>
      )}
    </div>
  );
}