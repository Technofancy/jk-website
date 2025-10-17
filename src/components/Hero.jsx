import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import fourFoundationPillarImg from "../assets/fourFoundationPillar.jpg";

export default function Hero() {
  const { t, i18n } = useTranslation();

  return (
    <section className="w-screen bg-gradient-to-r from-red-700 via-red-500 to-orange-400 text-white min-h-[90vh] -mx-4 sm:-mx-6 lg:-mx-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center min-h-[90vh]">
    {/* Left content */}
    <div className="flex-1 text-center md:text-left space-y-6" data-aos="fade-right">
      <h1 className="text-4xl md:text-6xl mt-2">
        {i18n.language === "np" ? (
          <span>
            स्वागत गर्दछौँ{" "}
            <span className="text-yellow-300 dark:text-yellow-200 font-bold text-3xl md:text-5xl">
              {t("hero.title")}
            </span>
          </span>
        ) : (
          <span>
            Welcome to{" "}
            <span className="text-yellow-300 dark:text-yellow-200 font-bold text-3xl md:text-5xl">
              {t("hero.title")}
            </span>
          </span>
        )}
      </h1>

      <p className="text-lg md:text-xl max-w-lg text-gray-100 dark:text-gray-200">
        {i18n.language === "np"
          ? "२०७४ सालदेखि मौलिक रैथाने शिक्षा अनुसन्धान अन्वेषण, संस्कृति संरक्षण र सहृदयतामार्फत् समाजको पुनर्जागरण परिलक्षित ।"
          : t("hero.description")}
      </p>

      <div className="text-center md:text-left">
        <p className="text-sm md:text-base italic opacity-90 mb-6 text-gray-200 dark:text-gray-300">
          "{t("hero.subtitle")}"
        </p>
      </div>

      <div className="flex justify-center md:justify-start gap-4">
        <Link
          to="/programs"
          className="bg-yellow-300 text-red-700 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-400 dark:hover:bg-yellow-300 transition-colors duration-200"
        >
          {i18n.language === "np" ? "कार्यहरु हेर्नुहोस्" : t("hero.explore")}
        </Link>
        <Link
          to="/about"
          className="border-2 border-yellow-300 text-yellow-300 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 dark:hover:bg-yellow-200 hover:text-red-700 dark:hover:text-red-800 transition-colors duration-200"
        >
          {i18n.language === "np" ? "थप जानकारी" : t("hero.cta")}
        </Link>
      </div>
    </div>

    {/* Right image */}
    <div className="flex-1 mt-10 md:mt-0 flex justify-center" data-aos="fade-left">
      <img
        src={fourFoundationPillarImg}
        alt={i18n.language === "np" ? "जरो किलो" : "Jaro Kilo"}
        className="max-w-sm md:max-w-md lg:max-w-lg rounded-xl shadow-2xl animate-fadeIn"
      />
    </div>
  </div>
</section>

  );
}
