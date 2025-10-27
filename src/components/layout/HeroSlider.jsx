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
      className="relative w-screen min-h-[90vh] -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden flex flex-col lg:block"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Slider */}
      <div className="h-[50vh] lg:absolute lg:inset-0 lg:h-full">
        <Slider {...sliderSettings} className="w-full h-full">
          {images.map((image, index) => (
            <div key={index} className="h-full">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-content object-top"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Content Wrapper */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 lg:absolute lg:inset-0 z-10 lg:text-white lg:bg-black lg:bg-opacity-40">
        {/* Content Block */}
        <motion.div
          className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center items-center text-center lg:justify-between"
          variants={itemVariants}
        >
          {/* Top Text Block */}
          <div className="lg:mt-20">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl mt-2"
              variants={itemVariants}
            >
              {i18n.language === "np" ? (
                <span>
                  स्वागत गर्दछौँ{" "}
                  <span className="text-primary-default font-bold text-3xl md:text-5xl lg:text-6xl">
                    {t("hero.title")}
                  </span>
                </span>
              ) : (
                <span>
                  Welcome to{" "}
                  <span className="text-primary-default font-bold text-3xl md:text-5xl lg:text-6xl">
                    {t("hero.title")}
                  </span>
                </span>
              )}
            </motion.h1>
            <motion.div variants={itemVariants}>
              <p className="text-sm md:text-base lg:text-lg italic opacity-90 my-6">
                "{t("hero.subtitle")}"
              </p>
            </motion.div>
          </div>

          {/* Bottom Button Block */}
          <motion.div
            className="flex justify-center gap-4 lg:mb-20"
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