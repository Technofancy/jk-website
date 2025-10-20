import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import fourFoundationPillarImg from "../../assets/fourFoundationPillar.jpg";
import Button from "../ui/Button";

export default function Hero() {
  const { t, i18n } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="w-screen bg-surface-default text-text-default min-h-[90vh] -mx-4 sm:-mx-6 lg:-mx-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center min-h-[90vh]">
        {/* Left content */}
        <motion.div
          className="flex-1 text-center md:text-left space-y-6"
          variants={itemVariants}
        >
          <motion.h1
            className="text-4xl md:text-6xl mt-2"
            variants={itemVariants}
          >
            {i18n.language === "np" ? (
              <span>
                स्वागत गर्दछौँ{" "}
                <span className="text-primary-default font-bold text-3xl md:text-5xl">
                  {t("hero.title")}
                </span>
              </span>
            ) : (
              <span>
                Welcome to{" "}
                <span className="text-primary-default font-bold text-3xl md:text-5xl">
                  {t("hero.title")}
                </span>
              </span>
            )}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl max-w-lg text-text-muted"
            variants={itemVariants}
          >
            {i18n.language === "np"
              ? "२०७४ सालदेखि मौलिक रैथाने शिक्षा अनुसन्धान अन्वेषण, संस्कृति संरक्षण र सहृदयतामार्फत् समाजको पुनर्जागरण परिलक्षित ।"
              : t("hero.description")}
          </motion.p>

          <motion.div
            className="text-center md:text-left"
            variants={itemVariants}
          >
            <p className="text-sm md:text-base italic opacity-90 mb-6 text-text-muted">
              "{t("hero.subtitle")}"
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center md:justify-start gap-4"
            variants={itemVariants}
          >
            <Link to="/programs">
              <Button variant="primary">
                {i18n.language === "np"
                  ? "कार्यहरु हेर्नुहोस्"
                  : t("hero.explore")}
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="secondary">
                {i18n.language === "np" ? "थप जानकारी" : t("hero.cta")}
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right image */}
        <motion.div
          className="flex-1 mt-10 md:mt-0 flex justify-center"
          variants={itemVariants}
        >
          <motion.img
            src={fourFoundationPillarImg}
            alt={i18n.language === "np" ? "जरो किलो" : "Jaro Kilo"}
            className="max-w-sm md:max-w-md lg:max-w-lg rounded-xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}