import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutPage() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  // Fetch about object safely
  // const about = t("aboutPage", { returnObjects: true });

  return (
    <>
      <SEO
        title={t("about")}
        description={t("aboutPage.introduction.text")}
        keywords="Jaro Kilo Foundation, Objectives, Team, Nepal"
      />

      <div className="space-y-16 px-4 sm:px-6 lg:px-8 min-h-screen pb-2">
        {/* Short Bar / About Us Title */}
        <section className="bg-primary-600 text-white py-2 my-4 text-center rounded">
          <h1 className="text-2xl sm:text-3xl font-bold">{t("aboutPage.title")}</h1>
        </section>

        {/* Introduction & Objectives */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left: Introduction + Objectives */}
          <div data-aos="fade-right">
            <h2 className="text-3xl font-bold text-primary-600 mb-4">
              {t("aboutPage.introduction.title")}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t("aboutPage.introduction.text")}
            </p>

            <h3 className="text-2xl font-semibold text-primary-600 mb-3">
              {t("aboutPage.objectives.title")}
            </h3>
            <ul className="list-disc list-inside text-muted space-y-2">
              {t("aboutPage.objectives.list", { returnObjects: true }).map((obj, idx) => (
                <li key={idx}>{t(obj)}</li>
              ))}
            </ul>
          </div>

          {/* Right: Facebook iframe */}
          <div data-aos="fade-left" className="w-full h-fit items-center border-x-2 border-yellow-500 rounded-md">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FJAROKILOPRATISHTHANEPAL&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
              width="340"
              height="500"
              style={{ border: "none", overflow: "hidden", margin: "auto" }}
              scrolling="no"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen={true}
            />
          </div>
        </section>

        {/* Founding Members */}
        <section className="py-16 mt-14 bg-gray-50 rounded-lg">
          <div className="max-w-6xl mx-auto text-center mb-12 shadow-lg rounded-md py-2 border-y-2 border-yellow-400">
            <h2
              className="text-4xl font-bold text-red-600"
              data-aos="fade-down"
            >
              {t("aboutPage.foundingMembers.title")}
            </h2>
            <p
              className="text-lg text-gray-600 mt-2 "
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {t("aboutPage.foundingMembers.chairperson")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t("aboutPage.foundingMembers.members", { returnObjects: true }).map((member, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-100 transform hover:-translate-y-1 hover:scale-105 border-l-4 border-yellow-400"
                data-aos="fade-up"
                data-aos-delay={idx * 10}
              >
                <p className="text-gray-800">{t(member)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section
          className="bg-gradient-to-r from-primary-700 to-primary-500 p-8 sm:p-12 rounded-lg text-center shadow-lg"
          data-aos="zoom-in"
        >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" data-aos="fade-up">
              {t("common.joinUs")}
            </h2>
            <p className="text-lg mb-6" data-aos="fade-up" data-aos-delay="100">
              {t("common.joinText")}
            </p>
            <div
              className="flex flex-col sm:flex-row justify-center gap-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Link
                to="/contact"
                className="bg-secondary-400 text-primary-800 px-6 py-3 rounded-lg font-semibold motion-safe:transition-colors motion-safe:duration-200 hover:bg-secondary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400"
              >
                {t("common.contact")}
              </Link>
              <Link
                to="/programs"
                className="border-2 text-secondary-300 border-secondary-300 px-6 py-3 rounded-lg font-semibold motion-safe:transition-colors motion-safe:duration-200 hover:bg-secondary-400 hover:text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400"
              >
                {t("common.viewPrograms")}
              </Link>
            </div>
        </section>
      </div>
    </>
  );
}
