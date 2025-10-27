import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import fourFoundationPillarImg from "../../assets/fourFoundationPillar.jpg";
import punarjagaranBookImg from "../../assets/punarjagaran_book.jpg";
import jkPratisthanLogoImg from "../../assets/JK_pratisthanLogo.png";
import Button from "../ui/Button";

export default function HeroSlider() {
  const { t, i18n } = useTranslation();

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    fade: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    fourFoundationPillarImg,
    punarjagaranBookImg,
    jkPratisthanLogoImg,
  ];

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
      className="w-screen min-h-[90vh] -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden flex flex-col md:block md:relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Slider */}
      <div className="h-[50vh] md:absolute md:inset-0 md:h-full">
        <Slider {...sliderSettings} className="w-full h-full">
          {images.map((image, index) => (
            <div key={index} className="h-[50vh] md:h-full">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:relative md:z-10 md:h-full md:text-white">
        <motion.div
          className="text-center space-y-6 md:bg-black md:bg-opacity-50 md:p-8 rounded-xl"
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

          <motion.div className="text-center" variants={itemVariants}>
            <p className="text-sm md:text-base italic opacity-90 mb-6">
              "{t("hero.subtitle")}"
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center gap-4"
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
      </div>
    </motion.section>
  );
}